// priority: -1
const componentList = global.ComponentList;

const directMaterialDirection = 'kubejs/assets/kubejs/textures/item/materiallib';

const readMaterialDirection = 'kubejs:item/materiallib';

global.dataObject = {
    prefixList: [],
    suffixList: [],

    itemList: [],
    blockList: [],
    fluidList: [],

    tooltipObject: {},

    addToList: (addition, type) => {
        global.dataObject[type].push(addition);
    },

    addToObject: (addition, key, type) => {
        global.dataObject[type][key] = addition;
    }
};

componentList.forEach(component => {
    const { id, dependencies, liquidAmount, generateMoldItem, state, type, affixType } = component;
    if (affixType == 'suffix') {global.dataObject.addToList(id, 'suffixList'); }
    else if (affixType == 'prefix') {global.dataObject.addToList(id, 'prefixList');}

    if (type == 'item') {global.dataObject.addToList(id, 'itemList');}
    else if (type == 'block') {global.dataObject.addToList(id, 'blockList');}
    else if (type == 'fluid') {global.dataObject.addToList(id, 'fluidList');}
});

materialList.forEach(material => {
    const { id, colors, components, composition, textureSet, textureOverrides, itemOverrides } = material

    let materialTooltip = materialTooltipGenerator(composition, 1);

    global.dataObject.addToObject(materialTooltip, id, 'tooltipObject');
});

StartupEvents.registry('fluid', event => {

    materialList.forEach(material => {
        const { id, colors, components, composition, textureSet, textureOverrides, itemOverrides } = material
        
        let completeTooltipText = Text.of('Composition: ').append(Text.of(global.dataObject['tooltipObject'][id])).color('#535361');

        for (let i = 0; i < components.length; i++) {
            let component = components[i];

            if (itemOverrides[component]) continue;
            if (!global.dataObject.fluidList.includes(component)) continue;

            let fluidId = ''
            if(global.dataObject.prefixList.includes(component)) fluidId = `${component}_${id}`
            if(global.dataObject.suffixList.includes(component)) fluidId = `${id}_${component}`

            event.create(`materiallib:${fluidId}`, 'kubejs:thick').displayName(generateName(fluidId)).tint(material.colors[0]).noBlock().bucketItem.tooltip(completeTooltipText);
        }
    });
});

StartupEvents.registry('item', event => {
    for (let i = 0; i < componentList.length; i++) {
        let component = componentList[i]
        if(!component.generateMoldItem) continue

        if(!fileExists(`${directMaterialDirection}/molds/${component.id}.png`)) {
            console.warn(`Warning, could not find component texture for ${component.id} in molds`);
        }

        let newLiquidMold = event.create(`materiallib:empty_${component.id}_casting_mold`);
    };

    materialList.forEach(material => {
        const { id, colors, components, composition, textureSet, textureOverrides, itemOverrides } = material

        let completeTooltipText = Text.of('Composition: ').append(Text.of(global.dataObject['tooltipObject'][id])).color('#535361');

        for (let i = 0; i < components.length; i++) {
            let component = components[i];

            if (itemOverrides[component]) continue;
            if (!global.dataObject.itemList.includes(component)) continue;

            let itemId = ''
            if(global.dataObject.prefixList.includes(component)) itemId = `${component}_${id}`
            if(global.dataObject.suffixList.includes(component)) itemId = `${id}_${component}`

            let textureLayer = 0;

            let newComponent = event.create(`materiallib:${itemId}`).tag(`c:${component}s`).tag(`c:${component}s/${id}`).tooltip(completeTooltipText);

            if(id == 'aluminium') newComponent.tag(`c:${component}s/aluminum`)

            if(textureOverrides[component]) {
                newComponent.texture(textureOverrides[component]);
                console.log(`found overwrite texture for ${itemId}`)
                continue;
            }

            if(fileExists(`${directMaterialDirection}/overrides/${itemId}.png`)) {
                newComponent.texture(`${readMaterialDirection}/overrides/${itemId}`);
                console.log(`found alternative texture for ${itemId}`)
                continue;
            }

            if(fileExists(`${directMaterialDirection}/${textureSet}/${component}.png`)) {
                newComponent.texture('layer0', `${readMaterialDirection}/${textureSet}/${component}`).color(0, colors[0]);
                textureLayer++;
            } else if (fileExists(`${directMaterialDirection}/deafult/${component}.png`)) {
                newComponent.texture('layer0', `${readMaterialDirection}/default/${component}`).color(0, colors[0]);
                textureSet = 'default';
                textureLayer++;
            } else console.warn(`No component texture found for ${itemId} in both ${textureSet} and default texture set`)

            if(colors[1] && fileExists(`${directMaterialDirection}/${textureSet}/${component}_secondary.png`)) {
                newComponent.texture(`layer${textureLayer}`, `${readMaterialDirection}/${textureSet}/${component}_secondary`).color(textureLayer, colors[1]);
                textureLayer++;
            }

            if(fileExists(`${directMaterialDirection}/${textureSet}/${component}_overlay.png`)) {
                newComponent.texture(`layer${textureLayer}`, `${readMaterialDirection}/${textureSet}/${component}_overlay`);
                textureLayer++;
            }
        }
    });
});

StartupEvents.registry('block', event => {
    materialList.forEach(material => {
        const { id, colors, components, composition, textureSet, textureOverrides, itemOverrides } = material

        let completeTooltipText = Text.of('Composition: ').append(Text.of(global.dataObject['tooltipObject'][id])).color('#535361');

        for (let i = 0; i < components.length; i++) {
            let component = components[i];

            if (itemOverrides[component]) continue;
            if (!global.dataObject.blockList.includes(component)) continue;

            let blockId = ''
            if(global.dataObject.prefixList.includes(component)) blockId = `${component}_${id}`
            if(global.dataObject.suffixList.includes(component)) blockId = `${id}_${component}`

            let textureLayer = 0;

            let newComponent = event.create(`materiallib:${blockId}`).tag(`c:${component}s`).tag(`c:${component}s/${id}`);

            if(id == 'aluminium') newComponent.tag(`c:${component}s/aluminum`)

            newComponent.item(ctx => {
                ctx.tooltip(completeTooltipText);
            });

            if(textureOverrides[component]) {
                newComponent.texture(textureOverrides[component]);
                console.log(`found overwrite texture for ${blockId}`)
                continue;
            }

            if(fileExists(`${directMaterialDirection}/overrides/${blockId}.png`)) {
                newComponent.texture(`${readMaterialDirection}/overrides/${blockId}`);
                console.log(`found alternative texture for ${blockId}`)
                continue;
            }

            newComponent.parentModel("kubejs:block/two_layer")

            if(fileExists(`${directMaterialDirection}/${textureSet}/${component}.png`)) {
                newComponent.texture('layer0', `${readMaterialDirection}/${textureSet}/${component}`)//.color(0, colors[0]);
                newComponent.item(ctx => {
                    ctx.parentModel("minecraft:item/generated")
                    ctx.texture('layer0', `${readMaterialDirection}/${textureSet}/${component}`).color(0, colors[0]);
                });
                textureLayer++;
            } else if (fileExists(`${directMaterialDirection}/default/${component}.png`)) {
                newComponent.texture('layer0', `${readMaterialDirection}/default/${component}`)//.color(0, colors[0]);
                newComponent.item(ctx => {
                    ctx.texture('layer0', `${readMaterialDirection}/default/${component}`).color(0, colors[0]);
                });
                textureSet = 'default';
                textureLayer++;
            } else console.warn(`No component texture found for ${blockId} in both ${textureSet} and default texture set`)

            if(colors[1] && fileExists(`${directMaterialDirection}/${textureSet}/${component}_secondary.png`)) {
                console.log(`texturing layer "layer1" of ${blockId} (colors: ${colors[0]}, ${colors[1]})`)
                newComponent.texture(`layer1`, `${readMaterialDirection}/${textureSet}/${component}_secondary`)//.color(textureLayer, colors[1]);
                newComponent.item(ctx => {
                    ctx.texture(`layer1`, `${readMaterialDirection}/${textureSet}/${component}_secondary`).color(textureLayer, colors[1]);
                });
                textureLayer++;
            }

            if(fileExists(`${directMaterialDirection}/${textureSet}/${component}_overlay.png`)) {
                newComponent.texture(`layer${textureLayer}`, `${readMaterialDirection}/${textureSet}/${component}_overlay`);
                newComponent.item(ctx => {
                    ctx.texture(`layer${textureLayer}`, `${readMaterialDirection}/${textureSet}/${component}_overlay`);
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

Platform.setModName("materiallib", "Material Lib");