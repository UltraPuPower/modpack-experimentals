// priority: 99998
// requires: mekanism
// author: UltraPuPower1

ComponentHandler.create('dirty_slurry')
    .setComponentState('liquid')
    .setComponentType('chemical')
    .setComponentAffix({prefix: 'dirty', suffix: 'slurry'})
    .setRegistryLoader('mekanism')
    .register();

ComponentHandler.create('clean_slurry')
    .setComponentState('liquid')
    .setComponentType('chemical')
    .setDependencies(['dirty_slurry'])
    .setComponentAffix({prefix: 'clean', suffix: 'slurry'})
    .setRegistryLoader('mekanism')
    .register();

ComponentHandler.create('crystal')
    .setDependencies(['clean_slurry'])
    .setRegistryLoader('mekanism')
    .register();

ComponentHandler.create('shard')
    .setDependencies(['crystal'])
    .setRegistryLoader('mekanism')
    .register();

ComponentHandler.create('clump')
    .setDependencies(['shard'])
    .setRegistryLoader('mekanism')
    .register();

ComponentHandler.create('dirty_dust')
    .setDependencies(['clump'])
    .setComponentAffix({prefix: 'dirty', suffix: 'dust'})
    .setRegistryLoader('mekanism')
    .addAsDependant('ore')
    .register();