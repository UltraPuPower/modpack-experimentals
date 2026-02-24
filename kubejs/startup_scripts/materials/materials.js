// priority: 5000

global.MaterialHandler.create('bronze')
    .setColors('#ffc370', '#69993B')
    .setComposition(['1x tin', '3x copper'])
    .setComponents(['ingot', 'plate', 'dust'])
    .register();

global.MaterialHandler.create('brass')
    .setColors('#A2EB66', 0)
    .setComposition(['1x zinc', '3x copper'])
    .setComponents(['gear'])
    .register();

global.MaterialHandler.create('invar')
    .setColors('#AAABAC', 0)
    .setComposition(['1x nickel', '2x iron'])
    .setComponents(['screw'])
    .register();

global.MaterialHandler.create('rose_gold')
    .setColors('#E59C3C', 0)
    .setComposition(['1x copper', '4x gold'])
    .setComponents(['wire'])
    .register();

global.MaterialHandler.create('diamond')
    .setColors('#93F6FB', 0)
    .setComposition([''])
    .setComponents(['gem'])
    .setOverrideItem('gem', 'minecraft:diamond')
    .register();