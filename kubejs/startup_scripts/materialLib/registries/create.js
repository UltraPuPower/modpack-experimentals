// priority: -2
// requires: create
// author: UltraPuPower1

StartupEvents.registry('item', event => {
    materialList.forEach(material => {
        const { id, colors, components, composition, textureSet, textureOverrides, itemOverrides } = material

        let completeTooltipText = Text.of('Composition: ').append(Text.of(global.materialLibData['tooltipObject'][id])).color('#535361');

        for (let component of components) {
            if (!global.materialLibData.loader.create.includes(component)) continue
            if (itemOverrides[component] || !global.materialLibData.itemList.includes(component)) {
                console.log(`broke item registry for component "${component}" of material "${id}"; O: ${!!itemOverrides[component]}, I: ${!global.materialLibData.itemList.includes(component)}`)
                continue
            };

            let itemId = global.generateComponentId(id, component)

            let textureLayer = 0;

            event.create(itemId)
                .displayName(toDisplayName(itemId))
                .tag(`c:${component}s`)
                .tag(`c:${component}s/${id}`)
                .tooltip(completeTooltipText)
                .texture('layer0', 'create:item/crushed_raw_tin').color(0, colors[0]);
                
            registryConsole.log(`Created item: ${itemId}`);
        }
    });
});