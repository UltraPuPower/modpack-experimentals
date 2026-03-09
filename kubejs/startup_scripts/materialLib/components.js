// priority: 99998

ComponentHandler.create('dust')
    .register();

ComponentHandler.create('liquid')
    .setComponentState('liquid')
    .setComponentType('fluid')
    .setComponentAffix('prefix')
    .register();

ComponentHandler.create('ingot')
    .setDependencies(['dust'])
    .setLiquidAmount(144)
    .generateMold()
    .register();

ComponentHandler.create('plate')
    .setDependencies(['ingot'])
    .setLiquidAmount(144)
    .generateMold()
    .register();

ComponentHandler.create('rod')
    .setDependencies(['ingot'])
    .setLiquidAmount(144/2)
    .register();

ComponentHandler.create('gear')
    .setDependencies(['plate', 'rod'])
    .setLiquidAmount(144*4)
    .generateMold()
    .register();

ComponentHandler.create('bolt')
    .setDependencies(['rod'])
    .setLiquidAmount(144/8)
    .register();

ComponentHandler.create('screw')
    .setDependencies(['bolt'])
    .setLiquidAmount(144/8)
    .register();

ComponentHandler.create('ring')
    .setDependencies(['rod'])
    .setLiquidAmount(144/4)
    .register();

ComponentHandler.create('wire')
    .setDependencies(['plate'])
    .setLiquidAmount(144/2)
    .register();

ComponentHandler.create('foil')
    .setDependencies(['plate'])
    .setLiquidAmount(144/4)
    .register();

ComponentHandler.create('nugget')
    .setDependencies(['ingot'])
    .setLiquidAmount(144/9)
    .generateMold()
    .register();

ComponentHandler.create('block')
    .setDependencies(['ingot'])
    .setLiquidAmount(144*9)
    .setComponentType('block')
    .generateMold()
    .register();

ComponentHandler.create('gem')
    .setDependencies(['dust'])
    .register();

ComponentHandler.create('gem_block')
    .setDependencies(['gem'])
    .setComponentType('block')
    .register();