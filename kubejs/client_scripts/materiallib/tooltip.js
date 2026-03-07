// priority: -2
const materialList = global.MaterialList;

ClientEvents.lang('en_us', event => {
    materialList.forEach(materialObj => {
        const { id, colors, components, composition, textureSet, textureOverrides, itemOverrides } = materialObj;
        let materialName = 'Test';
        event.add(`materiallib:${id}_liquid`, `Liquid ${materialName}`);
        event.add(`materiallib:${id}_liquid_bucket`, `Liquid ${materialName} Bucket`);
    });
    event.renameItem('materiallib:liquid_bronze_bucket', 'Liquid Bronze Bucket');
    // event.renameItem('materiallib:liquid_bronze', 'Liquid Bronze');
    event.add('fluid_type.materiallib.liquid_bronze', 'Liquid Bronze')
});

// ItemEvents.

ItemEvents.modifyTooltips(event => {
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
            if (!global.dataObject.blockList.includes(component)) continue;

            let blockId = '';
            if(global.dataObject.prefixList.includes(component)) blockId = `materiallib:${component}_${id}`;
            if(global.dataObject.suffixList.includes(component)) blockId = `materiallib:${id}_${component}`;
            event.modify(blockId, tooltip => {
                tooltip.insert(1, completeTooltipText);
            });
        }
    });
});

const $Component = Java.loadClass("net.minecraft.network.chat.Component")
const $Either = Java.loadClass("com.mojang.datafixers.util.Either")

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