// priority: 99996

MaterialHandler.create('copper')
    .setColors('#E77C56', '#E4673E')
    .setMaterialType('metal')
    .setComposition(['1x copper'])
    .addComponents(['wire', 'ore'])
    .setOverrideItem([
        {component: 'ore', item: 'minecraft:copper_ore'},
        {component: 'deepslate_ore', item: 'minecraft:deepslate_copper_ore'},
        {component: 'raw', item: 'minecraft:raw_copper'},
        {component: 'raw_block', item: 'minecraft:raw_copper_block'},
        {component: 'ingot', item: 'minecraft:copper_ingot'},
        {component: 'block', item: 'minecraft:copper_block'}
    ])
    .register();

MaterialHandler.create('iron')
    .setColors('#EEEEEE', '#979797')
    .setMaterialType('metal')
    .setComposition(['1x iron'])
    .addComponents(['rod', 'ore'])
    .setOverrideItem([
        {component: 'ore', item: 'minecraft:iron_ore'},
        {component: 'deepslate_ore', item: 'minecraft:deepslate_iron_ore'},
        {component: 'raw', item: 'minecraft:raw_iron'},
        {component: 'raw_block', item: 'minecraft:raw_iron_block'},
        {component: 'nugget', item: 'minecraft:iron_nugget'},
        {component: 'ingot', item: 'minecraft:iron_ingot'},
        {component: 'block', item: 'minecraft:iron_block'}
    ])
    .register();

MaterialHandler.create('gold')
    .setColors('#FDF55F', '#F25833')
    .setMaterialType('metal')
    .setComposition(['1x gold'])
    .addComponents(['ore'])
    .setOverrideItem([
        {component: 'ore', item: 'minecraft:gold_ore'},
        {component: 'deepslate_ore', item: 'minecraft:deepslate_gold_ore'},
        {component: 'raw', item: 'minecraft:raw_gold'},
        {component: 'raw_block', item: 'minecraft:raw_gold_block'},
        {component: 'nugget', item: 'minecraft:gold_nugget'},
        {component: 'ingot', item: 'minecraft:gold_ingot'},
        {component: 'block', item: 'minecraft:gold_block'}
    ])
    .register();

MaterialHandler.create('diamond')
    .setColors('#C8FFFF', 0)
    .setMaterialType('gem')
    .setComposition(['64x carbon'])
    .addComponents(['ore'])
    .setOverrideItem([
        {component: 'ore', item: 'minecraft:diamond_ore'},
        {component: 'deepslate_ore', item: 'minecraft:deepslate_diamond_ore'},
        {component: 'gem', item: 'minecraft:diamond'},
        {component: 'gem_block', item: 'minecraft:diamond_block'}
    ])
    .register();

MaterialHandler.create('netherite')
    .setColors('#4b4042', '#474447')
    .setMaterialType('metal')
    .setComposition(['4x gold', '4x mystery'])
    .addComponents(['rod'])
    .setOverrideItem([
        {component: 'ingot', item: 'minecraft:netherite_ingot'},
        {component: 'block', item: 'minecraft:netherite_block'}
    ])
    .register();

MaterialHandler.create('emerald')
    .setColors('#17FF6C', '#003F00')
    .setMaterialType('gem')
    .setComposition(['3x beryllium', '2x aluminium', '6x silicon', '18x oxygen'])
    .addComponents(['ore'])
    .setOverrideItem([
        {component: 'ore', item: 'minecraft:emerald_ore'},
        {component: 'deepslate_ore', item: 'minecraft:deepslate_emerald_ore'},
        {component: 'gem', item: 'minecraft:emerald'},
        {component: 'gem_block', item: 'minecraft:emerald_block'}
    ])
    .register();

MaterialHandler.create('lapis')
    .setColors('#3D54FF', '#210D78')
    .setMaterialType('gem')
    .setComposition(['12x lazurite', '2x sodalite', '1x pyrite', '1x calcite'])
    .addComponents(['ore'])
    .setOverrideItem([
        {component: 'ore', item: 'minecraft:lapis_ore'},
        {component: 'deepslate_ore', item: 'minecraft:deepslate_lapis_ore'},
        {component: 'gem', item: 'minecraft:lapis_lazuli'},
        {component: 'gem_block', item: 'minecraft:lapis_block'}
    ])
    .register();

MaterialHandler.create('quartz')
    .setColors('#F8EFE3', '#E6C1BB')
    .setMaterialType('gem')
    .setComposition(['1x silicon_dioxide'])
    .setOverrideItem([
        {component: 'gem', item: 'minecraft:quartz'},
        {component: 'gem_block', item: 'minecraft:quartz_block'}
    ])
    .register();

MaterialHandler.create('coal')
    .setColors('#393E41', '#101015')
    .setMaterialType('gem')
    .setComposition(['1x carbon'])
    .addComponents(['ore'])
    .setOverrideItem([
        {component: 'ore', item: 'minecraft:coal_ore'},
        {component: 'deepslate_ore', item: 'minecraft:deepslate_coal_ore'},
        {component: 'gem', item: 'minecraft:coal'},
        {component: 'gem_block', item: 'minecraft:coal_block'}
    ])
    .register();

MaterialHandler.create('charcoal')
    .setColors('#7D6F58', '#13110D')
    .setMaterialType('gem')
    .setComposition(['1x carbon'])
    .setOverrideItem([
        {component: 'gem', item: 'minecraft:charcoal'}
    ])
    .register();

MaterialHandler.create('redstone')
    .setColors('#ff0000', '#340605')
    .setMaterialType('composite')
    .setComposition(['1x silicon', '5x pyrite', '1x ruby', '3x mercury'])
    .addComponents(['dust_block', 'ore'])
    .setOverrideItem([
        {component: 'ore', item: 'minecraft:redstone_ore'},
        {component: 'deepslate_ore', item: 'minecraft:deepslate_redstone_ore'},
        {component: 'dust', item: 'minecraft:redstone'},
        {component: 'dust_block', item: 'minecraft:redstone_block'}
    ])
    .register();

MaterialHandler.create('obsidian')
    .setColors('#3B2754', '#000001')
    .setMaterialType('gem')
    .setComposition(['1x magnesium', '1x iron', '2x silicon', '4x oxygen'])
    .setOverrideItem([
        {component: 'gem_block', item: 'minecraft:obsidian'}
    ])
    .register();

MaterialHandler.create('deepslate')
    .setColors('#4B4B4B', '#2F2F30')
    .setMaterialType('composite')
    .setComposition(['4x silicon_dioxide', '1x biotite'])
    .register();