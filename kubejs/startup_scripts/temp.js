StartupEvents.registry('item', event => {
    event.create('funny_item');

    let newComponent = event.create('multi_layer_item')
        .displayName(toDisplayName('multi_layer_item'))
        .texture('layer0', `kubejs:item/materiallib/default/block`).color(0, '#337E64')
        .texture(`layer1`, `kubejs:item/materiallib/default/ingot`).color(1, '#333E7E');
});

StartupEvents.registry('block', event => {

    let newComponent = event.create('multi_layer_block')
        .displayName(toDisplayName('multi_layer_block'))
        .parentModel("kubejs:block/two_layer")
        // .texture('layer0', `kubejs:item/materiallib/default/block`)
        .color(0, 0x337E64)
        // .texture(`layer1`, `kubejs:item/materiallib/default/ingot`)
        .color(1, 0x333E7E);
    
});