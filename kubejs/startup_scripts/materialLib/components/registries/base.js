// priority: 99998
// requires: minecraft
// author: UltraPuPower1

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

ComponentHandler.create('dust_block')
    .setDependencies(['dust'])
    .setComponentType('block')
    .register();

ComponentHandler.create('gas')
    .setComponentState('gas')
    .setComponentType('fluid')
    .register();

ComponentHandler.create('raw')
    .setComponentAffix('prefix')
    .register();

ComponentHandler.create('raw_block')
    .setDependencies(['raw'])
    .setComponentType('block')
    .setComponentAffix({prefix: 'raw', suffix: 'block'})
    .setComponentAffix('prefix')
    .register();

ComponentHandler.create('ore')
    .setDependencies(['dust', 'raw_block'])
    .setComponentType('block')
    .register();

ComponentHandler.create('deepslate_ore')
    .setComponentType('block')
    .addAsDependant('ore')
    .setComponentAffix({prefix: 'deepslate', suffix: 'ore'})
    .register();