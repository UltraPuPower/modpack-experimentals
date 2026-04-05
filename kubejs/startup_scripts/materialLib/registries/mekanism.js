// priority: -2
// requires: mekanism
// author: UltraPuPower1

const Chemical = Java.loadClass('mekanism.api.chemical.Chemical')
const ChemicalBuilder = Java.loadClass('mekanism.api.chemical.ChemicalBuilder')

StartupEvents.registry('mekanism:chemical', event => {
    materialList.forEach(material => {
        const { id, colors, components, composition, textureSet, textureOverrides, itemOverrides } = material;

        for (let component of components) {
            if (!global.materialLibData.loader.mekanism.includes(component)) continue
            if (itemOverrides[component] || !global.materialLibData.chemicalList.includes(component)) continue;

            let chemicalId = global.generateComponentId(id, component)

            if (component == 'clean_slurry') {
                event.createCustom(chemicalId, () => Chemical(ChemicalBuilder.cleanSlurry()
                    .tint(Color.wrap(colors[0]).getRgb())
                    .ore(`c:ores/${id}`)
                ))
                .tag(`mekanism:clean`)
            } else if (component == 'dirty_slurry') {
                event.createCustom(chemicalId, () => Chemical(ChemicalBuilder.dirtySlurry()
                    .tint(Color.wrap(colors[0]).getRgb())
                    .ore(`c:ores/${id}`)
                ))
                .tag(`mekanism:dirty`)
            }
        }
    })
});

StartupEvents.registry('item', event => {
    materialList.forEach(material => {
        const { id, colors, components, composition, textureSet, textureOverrides, itemOverrides } = material

        let completeTooltipText = Text.of('Composition: ').append(Text.of(global.materialLibData['tooltipObject'][id])).color('#535361');

        for (let component of components) {
            if (!global.materialLibData.loader.mekanism.includes(component)) continue
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
                .texture('layer0', 'mekanism:item/empty')
                .texture('layer1', (component == 'dirty_dust') ? 'kubejs:item/materiallib/default/dust' : `mekanism:item/${component}`).color(1, colors[0])
                .texture('layer2', `mekanism:item/${component}_overlay`);
                
            registryConsole.log(`Created item: ${itemId}`);
        }
    });
});