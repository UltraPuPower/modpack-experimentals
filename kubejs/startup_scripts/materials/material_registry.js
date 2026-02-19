// priority: -1

StartupEvents.registry('item', event => {
    const materials = global.MaterialList;

    const secondaryList = ['dust']
    const overlayList = ['wire']

    materials.forEach(material => {
        const { id, colors, components, composition, overrides, textureSet } = material
        for (let i = 0; i < components.length; i++) {
            let component = components[i]
            let textureLayer = 1;
            let newComponent = event.create(`${id}_${component}`).tag(`c:${component}s`).tag(`c:${component}s/${id}`);

            if(overrides[component]) {
                newComponent.texture(`kubejs:item/material/overrides/${id}_${component}`);
                continue;
            }

            newComponent.texture('layer0', `kubejs:item/material/${textureSet}/${component}`).color(0, colors[0]);

            if(colors[1] && secondaryList.includes(component)) {
                newComponent.texture(`layer${textureLayer}`, `kubejs:item/material/${textureSet}/${component}_secondary`).color(textureLayer, colors[1]);
                textureLayer++;
            }

            if(overlayList.includes(component)) {
                newComponent.texture(`layer${textureLayer}`, `kubejs:item/material/${textureSet}/${component}_overlay`);
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