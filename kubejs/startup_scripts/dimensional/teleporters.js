Platform.setModName("kjs_dimensional", "KubeJS Dimensional Utilities");

StartupEvents.registry('block', event => {
    event.create('kjs_dimensional:anchor_stone')
        .modelGenerator(m => {
            m.parent("minecraft:block/cube_bottom_top");
            m.texture('bottom', 'kjs_dimensional:block/anchor_stone_base');
            m.texture('side', 'kjs_dimensional:block/anchor_stone_base');
            m.texture('top', 'kjs_dimensional:block/anchor_stone_top');
        });

    event.create('kjs_dimensional:warp_stone')
        .blockEntity((e) => {})
        .texture('kjs_dimensional:block/warp_stone');
});

StartupEvents.registry('item', event => {
    event.create('kjs_dimensional:portal_wand')
        .texture('kjs_dimensional:item/portal_wand');
        
    event.create('kjs_dimensional:warp_scroll')
        .texture('kjs_dimensional:item/warp_scroll');
});
