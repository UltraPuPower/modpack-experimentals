// priority: -1

StartupEvents.registry('item', event => {
    const materials = global.MaterialList;

    const secondaryList = {
        default: ['dust']
    };
    const overlayList = {
        default: ['wire']
    };

    materials.forEach(material => {
        const { id, colors, components, composition, textureSet, textureOverrides, itemOverrides } = material
        for (let i = 0; i < components.length; i++) {
            let component = components[i]
            if (itemOverrides[component]) continue;

            let newComponent = event.create(`${id}_${component}`).tag(`c:${component}s`).tag(`c:${component}s/${id}`);

            if(textureOverrides[component]) {
                newComponent.texture(textureOverrides[component]);
                continue;
            }

            let textureLayer = 1;
            newComponent.texture('layer0', `kubejs:item/materials/${textureSet}/${component}`).color(0, colors[0]);

            if(colors[1] && secondaryList[textureSet].includes(component)) {
                newComponent.texture(`layer${textureLayer}`, `kubejs:item/materials/${textureSet}/${component}_secondary`).color(textureLayer, colors[1]);
                textureLayer++;
            }

            if(overlayList[textureSet].includes(component)) {
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