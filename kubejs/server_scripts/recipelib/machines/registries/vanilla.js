// priority: 99998
// requires: minecraft
// author: UltraPuPower1

MachineHandler.create('minecraft:shapeless')
    .setIO(9, 1, false, false, false, false)
    .addToRecipeTypes(['shapeless'])
    .setRecipeFunction((event, itemI, itemO, fluidI, fluidO, chemicalI, chemicalO, recipeData, recipeId) => {
        let input = [];
        let output = [];
        itemI.forEach(item => {
            input.push(item.getItemOf());
        });
        itemO.forEach(item => {
            output.push(item.getItemOf());
        });

        event.shapeless(output[0], input).id(recipeId);
    })
    .register();

MachineHandler.create('minecraft:shaped')
    .setIO(9, 1, false, false, false, false)
    .addToRecipeTypes(['shaped'])
    .setRecipeFunction((event, itemI, itemO, fluidI, fluidO, chemicalI, chemicalO, recipeData, recipeId) => {
        if (!recipeData.shaped || !recipeData.shaped.pattern || !recipeData.shaped.key) {
            console.warn('unable to locate recipe data for shaped craft:');
            console.log(recipeData);
            console.log((!recipeData.shaped));
            console.log((!recipeData.shaped.pattern));
            console.log((!recipeData.shaped.key));
            return;
        }
        let output = [];
        itemO.forEach(item => {
            output.push(item.getItemOf());
        });

        event.shaped(output[0], recipeData.shaped.pattern, recipeData.shaped.key).id(recipeId);
    })
    .register();

MachineHandler.create('minecraft:crafting_compressor')
    .setIO(1, 1, false, false, false, false)
    .addToRecipeTypes(['compressing'])
    .setRecipeFunction((event, itemI, itemO, fluidI, fluidO, chemicalI, chemicalO, recipeData, recipeId) => {
        let uncompressed = itemI[0].id
        let compressed = itemO[0].id

        if (!recipeData.compressionlevel || recipeData.compressionlevel == 9) {
            event.shapeless(Item.of(uncompressed, 9), compressed).id(`materiallib:shapeless/decompressing/${compressed.split(':')[1]}`);
            event.shaped(compressed, ['aaa', 'aaa', 'aaa'], {a: uncompressed}).id(`materiallib:shaped/compressing/${uncompressed.split(':')[1]}`);
        } else if (recipeData.compressionlevel == 4) {
            event.shapeless(Item.of(uncompressed, 4), compressed).id(`materiallib:shapeless/decompressing/${compressed.split(':')[1]}`);
            event.shaped(compressed, ['aa ', 'aa ', '   '], {a: uncompressed}).id(`materiallib:shaped/compressing/${uncompressed.split(':')[1]}`);
        }
    })
    .register();

MachineHandler.create('minecraft:furnace')
    .setIO(1, 1, false, false, false, false)
    .addToRecipeTypes(['smelting'])
    .setRecipeFunction((event, itemI, itemO, fluidI, fluidO, chemicalI, chemicalO, recipeData, recipeId) => {
        let recipeJson = {
            "type": "minecraft:smelting",
            "category": "misc",
            "cookingtime": 200,
            "ingredient": itemI[0].getIngredient(),
            "result": itemO[0].getItemStack()
        };

        let categories = ['misc', 'blocks', 'food']
        if (recipeData.category && recipeData.category in categories) recipeJson.category = recipeData.category
        
        if (recipeData.duration) recipeJson.cookingtime = recipeData.duration
        
        if (recipeData.experience) recipeJson.experience = recipeData.experience

        event.custom(recipeJson).id(recipeId);
    })
    .register();

MachineHandler.create('minecraft:smoker')
    .setIO(1, 1, false, false, false, false)
    .addToRecipeTypes(['smoking'])
    .setRecipeFunction((event, itemI, itemO, fluidI, fluidO, chemicalI, chemicalO, recipeData, recipeId) => {
        let recipeJson = {
            "type": "minecraft:smoking",
            "category": "food",
            "cookingtime": 200,
            "ingredient": itemI[0].getIngredient(),
            "result": itemO[0].getItemStack()
        };

        let categories = ['misc', 'blocks', 'food']
        if (recipeData.category && recipeData.category in categories) recipeJson.category = recipeData.category
        
        if (recipeData.duration) recipeJson.cookingtime = recipeData.duration
        
        if (recipeData.experience) recipeJson.experience = recipeData.experience

        event.custom(recipeJson).id(recipeId);
    })
    .register();

MachineHandler.create('minecraft:blast_furnace')
    .setIO(1, 1, false, false, false, false)
    .addToRecipeTypes(['blasting'])
    .setRecipeFunction((event, itemI, itemO, fluidI, fluidO, chemicalI, chemicalO, recipeData, recipeId) => {
        let recipeJson = {
            "type": "minecraft:blasting",
            "category": "misc",
            "cookingtime": 200,
            "ingredient": itemI[0].getIngredient(),
            "result": itemO[0].getItemStack()
        };

        let categories = ['misc', 'blocks', 'food']
        if (recipeData.category && recipeData.category in categories) recipeJson.category = recipeData.category
        
        if (recipeData.duration) recipeJson.cookingtime = recipeData.duration
        
        if (recipeData.experience) recipeJson.experience = recipeData.experience

        if (!recipeData.melting_point || recipeData.melting_point < 500) {
            event.custom(recipeJson).id(recipeId);
            recipeJson.type = 'minecraft:smelting'
            event.custom(recipeJson).id(recipeId.replace('blast_furnace', 'furnace'));
        } else if (recipeData.melting_point < 1000) {
            event.custom(recipeJson).id(recipeId);
        }
    })
    .register();

/*
stonecutter:
{
  "type": "minecraft:stonecutting",
  "ingredient": {
    "item": "immersiveengineering:concrete"
  },
  "result": {
    "count": 1,
    "id": "immersiveengineering:concrete_brick"
  }
}
*/