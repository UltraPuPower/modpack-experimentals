// priority: -1
let fileExists = (path) => { // Thanks to @lexxieblack for figuring this out (https://discord.com/channels/303440391124942858/1473769843172970577/1474759303301959844)
    try {
        JsonIO.read(path)
    } catch (e) {
        if (String(e).includes('java.nio.charset.MalformedInputException')) return true
    }
    return false
}

const materialList = global.MaterialList;
const componentList = global.ComponentList;

const directMaterialDirection = 'kubejs/assets/kubejs/textures/item/materiallib';
const readMaterialDirection = 'kubejs:item/materiallib';

StartupEvents.registry('fluid', event => {
    materialList.forEach(material => {
        if (material.components.find(component => component == 'liquid')) {
            event.create(`materiallib:${material.id}_liquid`, 'kubejs:thick')
                .tint(material.colors[0])
                .noBlock();
        }
    });
});

StartupEvents.registry('item', event => {
    for (let i = 0; i < componentList.length; i++) {
        let component = componentList[i]
        if(!component.generateMoldItem) continue

        if(!fileExists(`${directMaterialDirection}/default/${component.id}.png`)) {
            console.warn(`Warning, could not find component texture for ${component.id} in default set`);
        }

        let newLiquidMold = event.create(`materiallib:empty_${component.id}_casting_mold`);
    };

    materialList.forEach(material => {
        const { id, colors, components, composition, textureSet, textureOverrides, itemOverrides } = material
        for (let i = 0; i < components.length; i++) {
            let component = components[i];

            if (itemOverrides[component]) continue;
            if (component == 'liquid') continue;

            let itemID = `${id}_${component}`;

            let textureLayer = 0;

            let newComponent = event.create(`materiallib:${itemID}`).tag(`c:${component}s`).tag(`c:${component}s/${id}`);

            if(textureOverrides[component]) {
                newComponent.texture(textureOverrides[component]);
                console.log(`found overwrite texture for ${itemID}`)
                continue;
            }

            if(fileExists(`${directMaterialDirection}/overrides/${itemID}.png`)) {
                newComponent.texture(`${readMaterialDirection}/overrides/${itemID}`);
                console.log(`found alternative texture for ${itemID}`)
                continue;
            }

            if(fileExists(`${directMaterialDirection}/${textureSet}/${component}.png`)) {
                newComponent.texture('layer0', `${readMaterialDirection}/${textureSet}/${component}`).color(0, colors[0]);
                textureLayer++;
            } else if (fileExists(`${directMaterialDirection}/deafult/${component}.png`)) {
                newComponent.texture('layer0', `${readMaterialDirection}/default/${component}`).color(0, colors[0]);
                textureSet = 'default';
                textureLayer++;
            } else console.warn(`No component texture found for ${itemID} in both ${textureSet} and default texture set`)

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

// Platform.mods.materiallib.name = 'Material Lib'
Platform.setModName("materiallib", "Material Lib");