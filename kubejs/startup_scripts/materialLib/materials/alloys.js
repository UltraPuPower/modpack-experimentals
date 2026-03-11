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

MaterialHandler.create('sapphire')
    .setColors('#3442BF', '#3E4CCB')
    .setComposition([''])
    .setComponents(['gem', 'gem_block'])
    .register();

MaterialHandler.create('steel')
    .setColors('#4D4545', '#303030')
    .setComposition(['1x iron'])
    .setComponents(['wire', 'nugget', 'liquid', 'block', 'rod'])
    .register();

MaterialHandler.create('constantan')
    .setColors('#54513C', '#6A6851')
    .setComposition(['1x copper', '1x nickel'])
    .setComponents(['plate', 'nugget', 'liquid', 'block'])
    .register();

MaterialHandler.create('electrum')
    .setColors('#FFFF8B', '#FF8533')
    .setComposition(['1x silver', '1x gold'])
    .setComponents(['wire', 'nugget', 'liquid', 'block'])
    .register();