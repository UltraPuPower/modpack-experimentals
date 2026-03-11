// priority: -2
const materialList = global.MaterialList;
const $Component = Java.loadClass("net.minecraft.network.chat.Component")
const $Either = Java.loadClass("com.mojang.datafixers.util.Either")

// Composition tooltip for fluids
NativeEvents.onEvent("net.neoforged.neoforge.client.event.RenderTooltipEvent$GatherComponents", event => {
    if (!event.getItemStack().isEmpty()) return;
    if (event.getTooltipElements().size() < 2) return;
    var fluid = event.tooltipElements.get(1).left().get().getString()

    //example
    materialList.forEach(materialObj => {
        const { id, colors, components, composition, textureSet, textureOverrides, itemOverrides } = materialObj;
        let materialTooltip = global.dataObject['tooltipObject'][id];

        for (let i = 0; i < components.length; i++) {
            let component = components[i]
            let fluidId = '';
            if(global.dataObject.prefixList.includes(component)) fluidId = `materiallib:${component}_${id}`;
            if(global.dataObject.suffixList.includes(component)) fluidId = `materiallib:${id}_${component}`;

            if (itemOverrides[component]) fluidId = itemOverrides[component];

            if (fluid == fluidId) event.getTooltipElements().add(1, $Either.left($Component.literal(materialTooltip).color(0x535361)));
        }
    });
});

const disabledItemTooltip = Text.of('This item is disabled').bold().color('#D01B1B');
const disabledUseTooltip = Text.of('Use this item in the crafting table to get the proper variant').color('#555555');

ItemEvents.modifyTooltips(event => {
    // Composition tooltip for overrides
    materialList.forEach(materialObj => {
        const { id, colors, components, composition, textureSet, textureOverrides, itemOverrides } = materialObj;
        let completeTooltipText = Text.of('Composition: ').append(Text.of(global.dataObject['tooltipObject'][id])).color('#535361');
        for (let i = 0; i < components.length; i++) {
            let component = components[i];
            if (itemOverrides[component]) {
                event.modify(itemOverrides[component], tooltip => {
                    tooltip.insert(1, completeTooltipText);
                });
                continue;
            }
        }
    });

    // Blacklist
    for (let i = 0; i < itemBlackList.length; i++) {
        let { material, entries } = itemBlackList[i];

        let materialObj = materialList.find(materialObj => materialObj.id == material);
        if (!materialObj) continue
        console.log(`Blacklisting for material ${material}`)

        for (let j = 0; j < entries.length; j++) {
            let { component, itemEntries } = entries[j];

            if (!materialObj.components.includes(component)) continue
            console.log(`   Blacklisting entries for component ${component}`)

            itemEntries.forEach(item => {
                console.log('   adding tooltip to item')
                event.modify(item, tooltip => {
                    tooltip.removeLine(0)
                    tooltip.insert(0, disabledItemTooltip);
                    tooltip.insert(1, disabledUseTooltip);
                });
            });
        };
    };
});