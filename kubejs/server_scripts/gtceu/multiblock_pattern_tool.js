ServerEvents.commandRegistry((event) => {
    const commands = event.commands;

    event.register(
        commands.literal('multiblock').then(
            commands
                .literal('get_pattern')
                .executes((ctx) => {
                        if (ctx.source.player) {
                            return runPatternCommand(ctx.source.player);
                        }
                        return 0;
                    })
        )
    );
});

const positionData = {};

BlockEvents.broken((event) => {
    const { player, block } = event;
    const pos = { x: block.x, y: block.y, z: block.z };
    let posIndex;

    if (player.mainHandItem.id === 'minecraft:netherite_hoe') {
        posIndex = 0;
    } else if (player.offHandItem.id === 'minecraft:netherite_hoe') {
        posIndex = 1;
    } else return;

    const playerName = String(player.name.getString());

    if (!positionData[playerName]) positionData[playerName] = [null, null];
    positionData[playerName][posIndex] = pos;

    player.sendSystemMessage(`§2Stored corner for position ${posIndex}: §6x: ${pos.x}, §9y: ${pos.y}, §az: ${pos.z}`);

    event.cancel(true);
});

const runPatternCommand = (player) => {
    const playerName = player.name.getString();

    if (!positionData[playerName]) {
        player.sendSystemMessage('§4Failed to run pattern command: player position data not found');
        return 1;
    } else if (!positionData[playerName][0]) {
        player.sendSystemMessage('§4Failed to run pattern command: player position data does not contain position 0');
        return 1;
    } else if (!positionData[playerName][1]) {
        player.sendSystemMessage('§4Failed to run pattern command: player position data does not contain position 1');
        return 1;
    }

    const pos0 = positionData[playerName][0];
    const pos1 = positionData[playerName][1];

    // ensure pos0 always contains the largest coordinates
    (['x', 'y', 'z']).forEach((coordinate) => {
        let coord0 = pos0[coordinate];
        let coord1 = pos1[coordinate];

        if (coord0 < coord1) {
            pos0[coordinate] = coord1;
            pos1[coordinate] = coord0;
        }
    });

    const difX = pos0.x - pos1.x;
    const difY = pos0.y - pos1.y;
    const difZ = pos0.z - pos1.z;

    let blockid;
    let symbolIndex = 0;
    const symbols = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

    let blockLegend = {
        'minecraft:air': ' ',
        'minecraft:oak_log': '@',
    };

    const blockPattern = [];
    for (let z = 0; z <= difZ; z++) {
        let yArr = [];
        for (let y = 0; y <= difY; y++) {
            let xArr = [];
            for (let x = 0; x <= difX; x++) {
                blockid = player.level.getBlock(pos1.x + x, pos1.y + y, pos1.z + z).id;

                if (!Object.keys(blockLegend).includes(blockid)) {
                    blockLegend[blockid] = symbols[symbolIndex];
                    symbolIndex++;
                    if (symbolIndex === symbols.length) {
                        player.sendSystemMessage('§4Multiblock pattern harvesting failed: no available symbol keys');
                        return 1;
                    }
                }

                let key = blockLegend[blockid];
                xArr.push(key);
            }
            yArr.push(xArr);
        }
        blockPattern.push(yArr);
    }

    let patternDef = '';

    let innerPattern = '';
    let aisles = [];
    let aisleString = '';
    let layers = [];
    let layerString = '';

    let keyDefinitions = '';
    let key = '';
    let appendAny = false;

    aisles = [];
    blockPattern.forEach((aisle) => {
        layers = [];
        aisle.forEach((layer) => {
            layerString = layer.join('');
            layers.push(`"${layerString}"`);
        });
        aisleString = layers.join(', ');
        aisles.push(`\n        .aisle(${aisleString})`);
    });
    innerPattern = aisles.join('');

    if (!innerPattern.includes('@')) {
        player.sendSystemMessage('§4Multiblock pattern harvesting failed: no controller substitute found');
        return 1;
    }

    keyDefinitions = "        .where('@': Predicates.controller(Predicates.blocks(definition.get())))";

    Object.keys(blockLegend).forEach((block) => {
        key = blockLegend[block];
        if (block !== 'minecraft:oak_log') {
            keyDefinitions += `\n            .where('${key}': Predicates.blocks(StarTMachineUtils.getBlock("${block}")))`;
        }
    });

    if (appendAny) keyDefinitions += "\n        .where(' ': Predicates.any())";
    keyDefinitions += '\n        .build()';

    patternDef = `.pattern(definition -> FactoryBlockPattern.start()${innerPattern}\n${keyDefinitions}\n)`;
    

    console.log('pattern:');
    console.log(patternDef);

    player.sendSystemMessage(
        `§aSuccesfully executed pattern harvesting command\n§9Player: §6${playerName}\n§9Dimensions: §6${difX + 1}x${difY + 1}x${difZ + 1}`
    );

    return 1;
};
