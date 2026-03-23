// priority: 10000
// requires: mekanism

MachineHandler.create('crusher')
    .setIO(1, 1, false, false)
    .addToRecipeTypes(['crushing'])
    .setRecipeFunction((event, itemI, itemO, liquidI, liquidO, gasI, gasO, recipeData, recipeId) => {
        let recipeJson = {
            "type": "mekanism:crushing",
            "input": itemHandler.getItemIngredient(itemI[0]),
            "output": itemHandler.getIdIngredient(itemO[0])
        };

        event.custom(recipeJson).id(`materiallib:crusher/${recipeId}`);
    })
    .register();

MachineHandler.create('precision_sawmill')
    .setIO(1, 2, false, false)
    .addToRecipeTypes(['cutting'])
    .setRecipeFunction((event, itemI, itemO, liquidI, liquidO, gasI, gasO, recipeData, recipeId) => {
        let recipeJson = {
            "type": "mekanism:sawing",
            "input": itemHandler.getItemIngredient(itemI[0]),
            "main_output": itemHandler.getIdIngredient(itemO[0])
        };

        if (itemO[1]) {
            recipeJson["secondary_output"] = itemHandler.getIdIngredient(itemO[1])
            recipeJson["secondary_chance"] = recipeData.odds ? recipeData.odds: 0.5
        }

        event.custom(recipeJson).id(`materiallib:sawmill/${recipeId}`);
    })
    .register();

MachineHandler.create('enrichment_chamber')
    .setIO(1, 1, false, false)
    .addToRecipeTypes(['cutting'])
    .setRecipeFunction((event, itemI, itemO, liquidI, liquidO, gasI, gasO, recipeData, recipeId) => {
        let recipeJson = {
            "type": "mekanism:enriching",
            "input": itemHandler.getItemIngredient(itemI[0]),
            "output": itemHandler.getIdIngredient(itemO[0])
        };

        event.custom(recipeJson).id(`materiallib:enriching/${recipeId}`);
    })
    .register();

MachineHandler.create('combiner')
    .setIO(1, 1, false, false)
    .addToRecipeTypes(['combining'])
    .setRecipeFunction((event, itemI, itemO, liquidI, liquidO, gasI, gasO, recipeData, recipeId) => {
        let recipeJson = {
            "type": "mekanism:enriching",
            "input": itemHandler.getItemIngredient(itemI[0]),
            "output": itemHandler.getIdIngredient(itemO[0])
        };

        event.custom(recipeJson).id(`materiallib:enriching/${recipeId}`);
    })
    .register();