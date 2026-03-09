// priority: 99996

MaterialHandler.create('bronze')
    .setColors('#ffc370', '#69993B')
    .setComposition(['1x tin', '3x copper'])
    .setComponents(['plate', 'nugget', 'liquid', 'block'])
    .register();

MaterialHandler.create('brass')
    .setColors('#A2EB66', 0)
    .setComposition(['1x zinc', '3x copper'])
    .setComponents(['gear'])
    .register();

MaterialHandler.create('invar')
    .setColors('#AAABAC', 0)
    .setComposition(['1x nickel', '2x iron'])
    .setComponents(['screw'])
    .register();

MaterialHandler.create('rose_gold')
    .setColors('#E59C3C', 0)
    .setComposition(['1x copper', '4x gold'])
    .setComponents(['wire'])
    .register();

MaterialHandler.create('diamond')
    .setColors('#93F6FB', 0)
    .setComposition([''])
    .setComponents(['gem'])
    .setOverrideItem([{component: 'gem', item: 'minecraft:diamond'}])
    .register();

MaterialHandler.create('sapphire')
    .setColors('#3442BF', 0)
    .setComposition([''])
    .setComponents(['gem', 'gem_block'])
    .register();

MaterialHandler.create('steel')
    .setColors('#4D4545', '#303030')
    .setComposition(['1x iron'])
    .setComponents(['plate', 'nugget', 'liquid', 'block'])
    .register();