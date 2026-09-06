function DimensionalUtils() {
    return this
};

(()=>{
    const $CompoundTag = Java.loadClass('net.minecraft.nbt.CompoundTag');
    const $IntTag = Java.loadClass('net.minecraft.nbt.IntTag');
    const $StringTag = Java.loadClass('net.minecraft.nbt.StringTag');

    DimensionalUtils.addLocationData = (data, dimension, x, y, z) => {
            const locationTag = new $CompoundTag;

            const posTag = new $CompoundTag;
            posTag.put("x", $IntTag.valueOf(x));
            posTag.put("y", $IntTag.valueOf(y));
            posTag.put("z", $IntTag.valueOf(z));

            const dimTag = $StringTag.valueOf(dimension);

            locationTag.put("position", posTag);
            locationTag.put("dimension", dimTag);

            data.put("kjs_dimensional:location", locationTag);

            return data;
    };

    DimensionalUtils.getBlockData = (block) => {
        const blockData = block.getEntityData();

        const customBlockData = blockData.get("data");

        return customBlockData;
    }

    DimensionalUtils.setBlockData = (block, data) => {
        const blockData = block.getEntityData();

        blockData.put("data", data);
        
        block.setEntityData(blockData);
    }

    DimensionalUtils.getDimensionLevel = (entity, dimension) => { // Entity is needed to obtain access to the server
        return entity.server["getLevel(net.minecraft.resources.ResourceLocation)"](dimension);
    }

    DimensionalUtils.title = (player, text, duration) => {
        const { server } = player;
        server.runCommandSilent(`title ${player.username} title ${text}`);
        if (duration) {
            server.scheduleInTicks(duration, (ctx) => {
                server.runCommandSilent(`title ${player.username} clear`);
            });
        }
    };

    DimensionalUtils.subtitle = (player, text) => {
        player.server.runCommandSilent(`title ${player.username} subtitle ${text}`);
    };

    DimensionalUtils.actionbar = (player, text) => {
        player.server.runCommandSilent(`title ${player.username} actionbar ${text}`);
    };

    DimensionalUtils.validateWarpAdress = (player, data, type) => {
        if (!data.contains("kjs_dimensional:location")) {
            DimensionalUtils.actionbar(player, `{"text":"${Text.translate(`effects.kjs_dimensional.unentangled_${type}`).getString()}"}`);
            return false;
        }

        const location = data.get("kjs_dimensional:location");
        if (!location.contains("position") || !location.contains("dimension")) {
            DimensionalUtils.actionbar(player, `{"text":"${Text.translate(`effects.kjs_dimensional.corrupted_${type}`).getString()}"}`);
            return false;
        }

        const dimension = location.get("dimension").getAsString();
        const position = location.get("position");
        if (!position.contains("x") || !position.contains("y") || !position.contains("z")) {
            DimensionalUtils.actionbar(player, `{"text":"${Text.translate(`effects.kjs_dimensional.corrupted_${type}`).getString()}"}`);
            return false;
        }

        const x = position.x.getAsInt();
        const y = position.y.getAsInt();
        const z = position.z.getAsInt();

        const destinationDimension = DimensionalUtils.getDimensionLevel(player, dimension);

        const locationBlock = destinationDimension.getBlock(x,y,z);
        console.log(locationBlock.pos);

        if (type == 'warp_stone') {
            if (locationBlock.down.id != 'kjs_dimensional:anchor_stone') {
                DimensionalUtils.actionbar(player, `{"text":"${Text.translate(`effects.kjs_dimensional.corrupted_${type}`).getString()}"}`);
                console.log(`No beacon for teleportation found at ${dimension} ${x}, ${y - 1}, ${z}`);
                return false;
            }
        }

        if (locationBlock.id != 'minecraft:air' || locationBlock.up.id != 'minecraft:air') {
            DimensionalUtils.actionbar(player, `{"text":"${Text.translate(`effects.kjs_dimensional.blocked_${type}`).getString()}"}`);
            console.log(`No space for teleportation found at ${dimension} ${x}, ${y}-${y + 1}, ${z}`);
            return false;
        }

        return { dimension: dimension, x: x, y: y, z: z }
    };

    DimensionalUtils.warp = (player, location) => {
        const { x, y, z, dimension } = location;

        player.potionEffects.add('minecraft:blindness', 21, 1, false, false);

        DimensionalUtils.title(player, `{"text":"${Text.translate('effects.kjs_dimensional.warping').getString()}"}`, 18);

        player.teleportTo(dimension, x + 0.5, y, z + 0.5, player.yaw, player.pitch);
    }

    DimensionalUtils.verifyLocationData = (player, data) => {
            if (data.isEmpty() || !data.contains("kjs_dimensional:location")) {
                DimensionalUtils.actionbar(player, `{"text":"${Text.translate('effects.kjs_dimensional.no_location').getString()}"}`);
                return false;
            }

            const location = data.get("kjs_dimensional:location");

            if (location.isEmpty()) {
                DimensionalUtils.actionbar(player, `{"text":"${Text.translate('effects.kjs_dimensional.no_location').getString()}"}`);
                return false;
            }

            if (!location.contains("dimension")) {
                DimensionalUtils.actionbar(player, `{"text":"${Text.translate('effects.kjs_dimensional.no_dimension').getString()}"}`);
                return false;
            }

            if (!location.contains("position")) {
                DimensionalUtils.actionbar(player, `{"text":"${Text.translate('effects.kjs_dimensional.no_position').getString()}"}`);
                return false;
            }
            const position = location.get("position");

            if (!position.contains("x") || !position.contains("y") || !position.contains("z")) {
                DimensionalUtils.actionbar(player, `{"text":"${Text.translate('effects.kjs_dimensional.incomplete_position').getString()}"}`);
                return false;
            }

            return true;
    };

})();