// priority: 5000
// requires: create

RecipeTypeHandler.create('pressing')
    .setUsableMachines(['mechanical_press'])
    .register();

RecipeTypeHandler.create('cutting')
    .setUsableMachines(['mechanical_saw'])
    .register();

RecipeTypeHandler.create('mixing')
    .setUsableMachines(['mechanical_mixer'])
    .register();

RecipeTypeHandler.create('liquefying')
    .setUsableMachines(['mechanical_mixer'])
    .register();

RecipeTypeHandler.create('solidifying')
    .setUsableMachines(['mechanical_mixer'])
    .register();

RecipeTypeHandler.create('crushing')
    .setUsableMachines(['millstone', 'crushing_wheel'])
    .register();