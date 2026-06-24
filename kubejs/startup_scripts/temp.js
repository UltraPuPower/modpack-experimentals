StartupEvents.registry('item', event => {
    event.create('funny_item');

    let newComponent = event.create('multi_layer_item')
        .displayName(toDisplayName('multi_layer_item'))
        .texture('layer0', `kubejs:item/materiallib/default/block`).color(0, '#337E64')
        .texture(`layer1`, `kubejs:item/materiallib/default/ingot`).color(1, '#333E7E');
});

StartupEvents.registry('block', event => {

    let newComponent = event.create('multi_layer_block')
        .modelGenerator(m => {
            m.parent("kubejs:block/layered_block");
            m.texture('all', `kubejs:item/materiallib/default/block`);
            m.texture('overlay', 'kubejs:item/materiallib/default/ingot');
            m.element(e => {
                e.allFaces(f => f.tex('#all').tintindex(0).cull());
            });
            m.element(e => {
                e.allFaces(f => f.tex('#overlay').tintindex(1).cull());
            });
        })
        .color(0, '#337E64')
        .color(1, '#333E7E')
        .item((i) => i.color(0, '#337E64').color(1, '#333E7E'))
    
});