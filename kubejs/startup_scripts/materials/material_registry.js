// priority: -1
let fileExists = (path) => { // Thanks to @lexxieblack for figuring this out (https://discord.com/channels/303440391124942858/1473769843172970577/1474759303301959844)
    try {
        JsonIO.read(path)
    } catch (e) {
        if (String(e).includes('java.nio.charset.MalformedInputException')) return true
    }
    return false
}

StartupEvents.registry('item', event => {
    const materials = global.MaterialList;
    
    materials.forEach(material => {
        const { id, colors, components, composition, textureSet, textureOverrides, itemOverrides } = material
        for (let i = 0; i < components.length; i++) {
            let component = components[i];
            let itemID = `${id}_${component}`;

            let textureLayer = 0;

            let directMaterialDirection = 'kubejs/assets/kubejs/textures/item';

            if (itemOverrides[component]) continue;

            let newComponent = event.create(itemID).tag(`c:${component}s`).tag(`c:${component}s/${id}`);

            if(textureOverrides[component]) {
                newComponent.texture(textureOverrides[component]);
                console.log(`found overwrite texture for ${itemID}`)
                continue;
            }

            if(fileExists(`${directMaterialDirection}/materials/overrides/${itemID}.png`)) {
                newComponent.texture(`kubejs:item/materials/overrides/${itemID}`);
                console.log(`found alternative texture for ${itemID}`)
                continue;
            }

            if(fileExists(`${directMaterialDirection}/materials/${textureSet}/${component}.png`)) {
                newComponent.texture('layer0', `kubejs:item/materials/${textureSet}/${component}`).color(0, colors[0]);
                textureLayer++;
            } else if (fileExists(`${directMaterialDirection}/materials/deafult/${component}.png`)) {
                newComponent.texture('layer0', `kubejs:item/materials/default/${component}`).color(0, colors[0]);
                textureSet = 'default';
                textureLayer++;
            } else console.warn(`No component texture found for ${itemID} in both ${textureSet} and default texture set`)

            if(colors[1] && fileExists(`${directMaterialDirection}/materials/${textureSet}/${component}_secondary.png`)) {
                newComponent.texture(`layer${textureLayer}`, `kubejs:item/materials/${textureSet}/${component}_secondary`).color(textureLayer, colors[1]);
                textureLayer++;
            }

            if(fileExists(`${directMaterialDirection}/materials/${textureSet}/${component}_overlay.png`)) {
                newComponent.texture(`layer${textureLayer}`, `kubejs:item/materials/${textureSet}/${component}_overlay`);
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