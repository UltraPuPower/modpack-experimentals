// priority: -1
// requires: minecraft
// author: UltraPuPower1
const registryConsole = Java.createConsole("MaterialLib/Registry Console");

const componentList = global.ComponentList;

const directMaterialDirection = 'kubejs/assets/kubejs/textures/item/materiallib';

const readMaterialDirection = 'kubejs:item/materiallib';

global.materialLibData = {
    lookupTable: {
        components: {},
        materials: {}
    },

    affixLists: {
        prefix: [],
        plural: [],
        suffix: []
    },

    loader: {
        base: [],
        mekanism: [],
        create: []
    },

    itemList: [],
    blockList: [],
    fluidList: [],
    chemicalList: [],

    tooltipObject: {},

    pushToValue: (value, data) => {
        global.materialLibData[value].push(data);
    },

    setToObject: (object, key, data) => {
        global.materialLibData[object][key] = data;
    },

    pushToObject: (object, key, data) => {
        global.materialLibData[object][key].push(data);
    },

    setToNestedObject: (object, key, identifier, data) => {
        global.materialLibData[object][key][identifier] = (data);
    }
};

for (let i = 0; i < componentList.length; i++) {
    let { id, dependencies, liquidAmount, generateMoldItem, state, type, affixData, loader } = componentList[i];

    global.materialLibData.setToNestedObject('lookupTable', 'components', id, i);

    if (type == 'item') {global.materialLibData.pushToValue('itemList', id);}
    else if (type == 'block') {global.materialLibData.pushToValue('blockList', id);}
    else if (type == 'fluid') {global.materialLibData.pushToValue('fluidList', id);}
    else if (type == 'chemical') {global.materialLibData.pushToValue('chemicalList', id);}

    if (affixData == 'prefix') {global.materialLibData.pushToObject('affixLists', 'prefix', id);}
    else if (affixData == 'suffix') {global.materialLibData.pushToObject('affixLists', 'suffix', id);}
    else {global.materialLibData.pushToObject('affixLists', 'plural', id);}

    global.materialLibData.pushToObject('loader', loader, id)
};

for (let i = 0; i < materialList.length; i++) {
    let { id, colors, components, composition, textureSet, textureOverrides, itemOverrides } = materialList[i];

    global.materialLibData.setToNestedObject('lookupTable', 'materials', id, i);

    global.materialLibData.setToObject('tooltipObject', id, materialTooltipGenerator(composition, 1));
};

StartupEvents.registry('fluid', event => {
    materialList.forEach(material => {
        const { id, colors, components, composition, textureSet, textureOverrides, itemOverrides } = material
        
        let completeTooltipText = Text.of('Composition: ').append(Text.of(global.materialLibData['tooltipObject'][id])).color('#535361');

        for (let component of components) {
            if (!global.materialLibData.loader.base.includes(component)) continue
            if (itemOverrides[component] || !global.materialLibData.fluidList.includes(component)) continue;

            let fluidId = global.generateComponentId(id, component)

            event.create(fluidId, 'kubejs:thick').displayName(toDisplayName(fluidId)).tint(material.colors[0]).noBlock().bucketItem.tooltip(completeTooltipText);
            registryConsole.log(`Created fluid ${fluidId}`);
        }
    });
});

StartupEvents.registry('item', event => {
    materialList.forEach(material => {
        const { id, colors, components, composition, textureSet, textureOverrides, itemOverrides } = material

        let completeTooltipText = Text.of('Composition: ').append(Text.of(global.materialLibData['tooltipObject'][id])).color('#535361');

        for (let component of components) {
            if (!global.materialLibData.loader.base.includes(component)) continue
            if (itemOverrides[component] || !global.materialLibData.itemList.includes(component)) continue;

            let itemId = global.generateComponentId(id, component)

            let textureLayer = 0;

            let newComponent = event.create(itemId).displayName(toDisplayName(itemId)).tag(`c:${component}s`).tag(`c:${component}s/${id}`).tooltip(completeTooltipText);
            registryConsole.log(`Created item: ${itemId}`);

            if(id == 'aluminium') newComponent.tag(`c:${component}s/aluminum`)

            if(textureOverrides[component]) {
                newComponent.texture(textureOverrides[component]);
                registryConsole.log(`   found overwrite texture for ${itemId}`)
                continue;
            }

            if(fileExists(`${directMaterialDirection}/overrides/${itemId}.png`)) {
                newComponent.texture(`${readMaterialDirection}/overrides/${itemId}`);
                registryConsole.log(`   found alternative texture for ${itemId}`)
                continue;
            }

            let usedTextureSet = textureSet;

            if(!fileExists(`${directMaterialDirection}/${textureSet}/${component}.png`)) {
                if (fileExists(`${directMaterialDirection}/default/${component}.png`)) {
                    usedTextureSet = 'default';
                    registryConsole.log(`   found default texture for ${itemId}`);
                } else registryConsole.warn(`   No component texture found for "${itemId}" in both ${textureSet} and default texture set`)
            } else registryConsole.log(`   found set texture for "${itemId}"`)

            newComponent.texture('layer0', `${readMaterialDirection}/${usedTextureSet}/${component}`).color(0, colors[0]);
            textureLayer++;

            if(colors[1] && fileExists(`${directMaterialDirection}/${usedTextureSet}/${component}_secondary.png`)) {
                newComponent.texture(`layer${textureLayer}`, `${readMaterialDirection}/${usedTextureSet}/${component}_secondary`).color(textureLayer, colors[1]);
                textureLayer++;
            }

            if(fileExists(`${directMaterialDirection}/${usedTextureSet}/${component}_overlay.png`)) {
                newComponent.texture(`layer${textureLayer}`, `${readMaterialDirection}/${usedTextureSet}/${component}_overlay`);
                textureLayer++;
            }
        }
    });
    for (let i = 0; i < componentList.length; i++) {
        let component = componentList[i]
        if(!component.generateMoldItem) continue

        let newLiquidMold = event.create(`materiallib:empty_${component.id}_casting_mold`).tag('c:mold').tag(`c:mold/${component.id}`);
        registryConsole.log(`Created mold for ${component.id}`);

        if(!fileExists(`${directMaterialDirection}/molds/${component.id}.png`)) {
            registryConsole.warn(`  Warning, could not find component texture for ${component.id} in molds folder`);
        }
    };
});

StartupEvents.registry('block', event => {
    materialList.forEach(material => {
        const { id, colors, components, composition, textureSet, textureOverrides, itemOverrides } = material

        let completeTooltipText = Text.of('Composition: ').append(Text.of(global.materialLibData['tooltipObject'][id])).color('#535361');

        for (let component of components) {
            if (!global.materialLibData.loader.base.includes(component)) continue
            if (itemOverrides[component] || !global.materialLibData.blockList.includes(component)) continue;

            let blockId = global.generateComponentId(id, component)

            let textureLayer = 0;

            let newComponent = event.create(blockId).displayName(toDisplayName(blockId)).tag(`c:${component}s`).tag(`c:${component}s/${id}`);
            registryConsole.log(`Created block ${blockId}`);

            if(id == 'aluminium') newComponent.tag(`c:${component}s/aluminum`)

            newComponent.item(ctx => {
                ctx.tooltip(completeTooltipText);
            });

            if(textureOverrides[component]) {
                newComponent.texture(textureOverrides[component]);
                registryConsole.log(`   found overwrite texture for ${blockId}`)
                continue;
            }

            if(fileExists(`${directMaterialDirection}/overrides/${blockId}.png`)) {
                newComponent.texture(`${readMaterialDirection}/overrides/${blockId}`);
                registryConsole.log(`   found alternative texture for ${blockId}`)
                continue;
            }

            let usedTextureSet = textureSet;

            if(!fileExists(`${directMaterialDirection}/${textureSet}/${component}.png`)) {
                if (fileExists(`${directMaterialDirection}/default/${component}.png`)) {
                    usedTextureSet = 'default';
                    registryConsole.log(`   found default texture for ${blockId}`);
                } else registryConsole.warn(`   No component texture found for "${blockId}" in both ${textureSet} and default texture set`)
            } else registryConsole.log(`   found set texture for "${blockId}"`)

            let multilayer = false;

            if ((colors[1] && fileExists(`${directMaterialDirection}/${textureSet}/${component}_secondary.png`))){
                newComponent.parentModel("kubejs:block/two_layer");
                multilayer = true
            }

            if (!multilayer) {
                newComponent.texture(`${readMaterialDirection}/${usedTextureSet}/${component}`).color(0, colors[0]);
                newComponent.item(ctx => {
                    ctx.parentModel("minecraft:item/generated")
                    ctx.texture(`${readMaterialDirection}/${usedTextureSet}/${component}`).color(0, colors[0]);
                });
                continue
            }

            // Issue: Multilayer color support does not work
            // Items can take the colors, but the texture is not applied correctly, resulting in sharp contrast between layers
            newComponent.texture('layer0', `${readMaterialDirection}/${usedTextureSet}/${component}`)//.color(0, colors[0]);
            newComponent.item(ctx => {
                ctx.parentModel("minecraft:item/generated")
                ctx.texture('layer0', `${readMaterialDirection}/${usedTextureSet}/${component}`).color(0, colors[0]);
            });
            textureLayer++;

            if(colors[1] && fileExists(`${directMaterialDirection}/${usedTextureSet}/${component}_secondary.png`)) {
                registryConsole.log(`   texturing layer "layer1" of ${blockId} (colors: ${colors[0]}, ${colors[1]})`)
                newComponent.texture(`layer1`, `${readMaterialDirection}/${usedTextureSet}/${component}_secondary`)//.color(textureLayer, colors[1]);
                newComponent.item(ctx => {
                    ctx.texture(`layer1`, `${readMaterialDirection}/${usedTextureSet}/${component}_secondary`).color(textureLayer, colors[1]);
                });
                textureLayer++;
            }

            if(fileExists(`${directMaterialDirection}/${usedTextureSet}/${component}_overlay.png`)) {
                newComponent.texture(`layer${textureLayer}`, `${readMaterialDirection}/${usedTextureSet}/${component}_overlay`);
                newComponent.item(ctx => {
                    ctx.texture(`layer${textureLayer}`, `${readMaterialDirection}/${usedTextureSet}/${component}_overlay`);
                });
                textureLayer++;
            }
        }
    });
});

// Armor material
StartupEvents.registry('armor_material', event => {
    event.create('material');
});

// // Armor
// StartupEvents.registry('item', event => {
//     event.create('<material>_chestplate', 'chestplate')
//         .displayName('Custom Chestplate')
//         .texture('<exampleid>:item/<material>_chestplate')
//         .material('<exampleid>:<material>');
// });