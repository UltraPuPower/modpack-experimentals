// priority: 99996

MaterialHandler.create('bronze')
    .setColors('#ffc370', '#69993B')
    .setMaterialType('metal')
    .setComposition(['1x tin', '3x copper'])
    .register();

MaterialHandler.create('brass')
    .setColors('#A2EB66', 0)
    .setMaterialType('metal')
    .setComposition(['1x zinc', '3x copper'])
    .addComponents(['gear'])
    .register();

MaterialHandler.create('invar')
    .setColors('#AAABAC', 0)
    .setMaterialType('metal')
    .setComposition(['1x nickel', '2x iron'])
    .addComponents(['screw'])
    .register();

MaterialHandler.create('rose_gold')
    .setColors('#E59C3C', 0)
    .setMaterialType('metal')
    .setComposition(['1x copper', '4x gold'])
    .addComponents(['wire'])
    .register();

MaterialHandler.create('steel')
    .setColors('#4D4545', '#303030')
    .setMaterialType('metal')
    .setComposition(['1x iron'])
    .addComponents(['wire', 'rod'])
    .register();

MaterialHandler.create('constantan')
    .setColors('#54513C', '#6A6851')
    .setMaterialType('metal')
    .setComposition(['1x copper', '1x nickel'])
    .register();

MaterialHandler.create('electrum')
    .setColors('#FFFF8B', '#FF8533')
    .setMaterialType('metal')
    .setComposition(['1x silver', '1x gold'])
    .addComponents(['wire'])
    .register();