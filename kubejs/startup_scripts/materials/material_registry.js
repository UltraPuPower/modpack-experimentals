// priority: -1

StartupEvents.registry('item', event => {
    const materials = global.MaterialList;
    
    materials.forEach(material => {
        const { id, colors, components, composition, textureSet, textureOverrides, itemOverrides } = material
        for (let i = 0; i < components.length; i++) {
            let component = components[i]

            if (itemOverrides[component]) continue;

            let newComponent = event.create(`${id}_${component}`).tag(`c:${component}s`).tag(`c:${component}s/${id}`);
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