// priority: 50000

global.ComponentHandler.create('dust')
    .register();

global.ComponentHandler.create('liquid')
    .register();

global.ComponentHandler.create('ingot')
    .setDependencies(['dust'])
    .setLiquidAmount(144)
    .generateMold()
    .register();

global.ComponentHandler.create('plate')
    .setDependencies(['ingot'])
    .setLiquidAmount(144)
    .generateMold()
    .register();

global.ComponentHandler.create('rod')
    .setDependencies(['ingot'])
    .setLiquidAmount(144/2)
    .register();

global.ComponentHandler.create('gear')
    .setDependencies(['plate', 'rod'])
    .setLiquidAmount(144*4)
    .generateMold()
    .register();

global.ComponentHandler.create('bolt')
    .setDependencies(['rod'])
    .setLiquidAmount(144/8)
    .register();

global.ComponentHandler.create('screw')
    .setDependencies(['bolt'])
    .setLiquidAmount(144/8)
    .register();

global.ComponentHandler.create('ring')
    .setDependencies(['rod'])
    .setLiquidAmount(144/4)
    .register();

global.ComponentHandler.create('wire')
    .setDependencies(['plate'])
    .setLiquidAmount(144/2)
    .register();

global.ComponentHandler.create('foil')
    .setDependencies(['plate'])
    .setLiquidAmount(144/4)
    .register();

global.ComponentHandler.create('nugget')
    .setDependencies(['ingot'])
    .setLiquidAmount(144/9)
    .generateMold()
    .register();

global.ComponentHandler.create('block')
    .setDependencies(['ingot'])
    .setLiquidAmount(144*9)
    .generateMold()
    .register();

global.ComponentHandler.create('gem')
    .setDependencies(['dust'])
    .register();

global.ComponentHandler.create('gem_block')
    .setDependencies(['gem'])
    .register();