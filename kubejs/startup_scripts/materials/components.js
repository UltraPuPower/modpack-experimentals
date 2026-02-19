// priority: 50000

global.ComponentHandler.create('ingot')
    .register();

global.ComponentHandler.create('plate')
    .setDependencies(['ingot'])
    .register();

global.ComponentHandler.create('rod')
    .setDependencies(['ingot'])
    .register();

global.ComponentHandler.create('gear')
    .setDependencies(['plate', 'rod'])
    .register();

global.ComponentHandler.create('bolt')
    .setDependencies(['rod'])
    .register();

global.ComponentHandler.create('screw')
    .setDependencies(['bolt'])
    .register();

global.ComponentHandler.create('ring')
    .setDependencies(['rod'])
    .register();

global.ComponentHandler.create('wire')
    .setDependencies(['plate'])
    .register();

global.ComponentHandler.create('foil')
    .setDependencies(['plate'])
    .register();

global.ComponentHandler.create('nugget')
    .setDependencies(['ingot'])
    .register();

global.ComponentHandler.create('dust')
    .register();

console.log('Finished component registry')