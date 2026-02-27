// priority: 5000

RecipeTypeHandler.create('smelting')
    .setUsableMachines(['furnace'])
    .register();

RecipeTypeHandler.create('smoking')
    .setUsableMachines(['smoker'])
    .register();

RecipeTypeHandler.create('blasting')
    .setUsableMachines(['blast_furnace'])
    .register();

RecipeTypeHandler.create('crafting')
    .setUsableMachines(['shaped'])
    .register();

RecipeTypeHandler.create('shapeless')
    .setUsableMachines(['shapeless'])
    .register();

RecipeTypeHandler.create('compressing')
    .setUsableMachines(['crafting_compressor'])
    .register();