// priority: 99996

MaterialHandler.create('copper')
    .setColors('#E77C56', '#E4673E')
    .setComposition(['1x copper'])
    .setComponents(['wire', 'nugget', 'liquid', 'block'])
    .setOverrideItem([
        {component: 'ingot', item: 'minecraft:copper_ingot'},
        {component: 'block', item: 'minecraft:copper_block'}
    ])
    .register();

MaterialHandler.create('iron')
    .setColors('#EEEEEE', '#979797')
    .setComposition(['1x iron'])
    .setComponents(['plate', 'nugget', 'liquid', 'block', 'rod'])
    .setOverrideItem([
        {component: 'nugget', item: 'minecraft:iron_nugget'},
        {component: 'ingot', item: 'minecraft:iron_ingot'},
        {component: 'block', item: 'minecraft:iron_block'}
    ])
    .register();

MaterialHandler.create('gold')
    .setColors('#FDF55F', '#F25833')
    .setComposition(['1x gold'])
    .setComponents(['plate', 'nugget', 'liquid', 'block'])
    .setOverrideItem([
        {component: 'nugget', item: 'minecraft:gold_nugget'},
        {component: 'ingot', item: 'minecraft:gold_ingot'},
        {component: 'block', item: 'minecraft:gold_block'}
    ])
    .register();

MaterialHandler.create('diamond')
    .setColors('#C8FFFF', 0)
    .setComposition(['64x carbon'])
    .setComponents(['gem_block'])
    .setOverrideItem([
        {component: 'gem', item: 'minecraft:diamond'},
        {component: 'gem_block', item: 'minecraft:diamond_block'}
    ])
    .register();

MaterialHandler.create('netherite')
    .setColors('#4b4042', '#474447')
    .setComposition(['4x gold', '4x mystery'])
    .setComponents(['plate', 'nugget', 'liquid', 'block', 'rod'])
    .setOverrideItem([
        {component: 'ingot', item: 'minecraft:netherite_ingot'},
        {component: 'block', item: 'minecraft:netherite_block'}
    ])
    .register();

MaterialHandler.create('emerald')
    .setColors('#657882', '#33302E')
    .setComposition(['1x mystery'])
    .setComponents(['gem_block'])
    .setOverrideItem([
        {component: 'gem', item: 'minecraft:emerald'},
        {component: 'gem_block', item: 'minecraft:emerald_block'}
    ])
    .register();

MaterialHandler.create('lapis_lazuli')
    .setColors('#3D54FF', '#210D78')
    .setComposition(['1x mystery'])
    .setComponents(['gem_block'])
    .setOverrideItem([
        {component: 'gem', item: 'minecraft:lapis_lazuli'},
        {component: 'gem_block', item: 'minecraft:lapis_block'}
    ])
    .register();

MaterialHandler.create('quartz')
    .setColors('#F8EFE3', '#E6C1BB')
    .setComposition(['1x silicon', '2x oxygen'])
    .setComponents(['gem_block'])
    .setOverrideItem([
        {component: 'gem', item: 'minecraft:quartz'},
        {component: 'gem_block', item: 'minecraft:quartz_block'}
    ])
    .setMaterialData({compressionlevel: 4})
    .register();

MaterialHandler.create('coal')
    .setColors('#393E41', '#101015')
    .setComposition(['1x carbon'])
    .setComponents(['gem_block'])
    .setOverrideItem([
        {component: 'gem', item: 'minecraft:coal'},
        {component: 'gem_block', item: 'minecraft:coal_block'}
    ])
    .register();

MaterialHandler.create('charcoal')
    .setColors('#7D6F58', '#13110D')
    .setComposition(['1x carbon'])
    .setComponents(['gem_block'])
    .setOverrideItem([
        {component: 'gem', item: 'minecraft:charcoal'}
    ])
    .register();

MaterialHandler.create('redstone')
    .setColors('#ff0000', '#340605')
    .setComposition(['1x mystery'])
    .setComponents(['gem_block'])
    .setOverrideItem([
        {component: 'gem', item: 'minecraft:redstone'},
        {component: 'gem_block', item: 'minecraft:redstone_block'}
    ])
    .register();

MaterialHandler.create('obsidian')
    .setColors('#3B2754', '#000001')
    .setComposition(['1x mystery'])
    .setComponents(['gem_block'])
    .setOverrideItem([
        {component: 'gem_block', item: 'minecraft:obsidian'}
    ])
    .setMaterialData({compressionlevel: 4})
    .register();