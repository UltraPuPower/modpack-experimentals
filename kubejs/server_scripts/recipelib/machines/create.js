// priority: 10000
// requires: create

MachineHandler.create('mechanical_press')
    .setIO(1, 1, false, false)
    .addToRecipeTypes(['pressing'])
    .setRecipeFunction((event, itemI, itemO, liquidI, liquidO, gasI, gasO, recipeData, recipeId) => {
        let input = [];
        let output = [];
        itemI.forEach(item => {
            input.push(itemHandler.getItemOf(item));
        });
        itemO.forEach(item => {
            output.push(itemHandler.getItemOf(item));
        });

        event.recipes.create.pressing(output, input).id(`materiallib:pressing/${recipeId}`);
    })
    .register();

MachineHandler.create('mechanical_saw')
    .setIO(1, true, false, false)
    .addToRecipeTypes(['cutting'])
    .setRecipeFunction((event, itemI, itemO, liquidI, liquidO, gasI, gasO, recipeData, recipeId) => {
        let input = [];
        let output = [];
        itemI.forEach(item => {
            input.push(itemHandler.getItemOf(item));
        });
        itemO.forEach(item => {
            output.push(itemHandler.getItemOf(item));
        });

        event.recipes.create.cutting(output, input).id(`materiallib:cutting/${recipeId}`);
    })
    .register();

MachineHandler.create('mechanical_mixer')
    .setIO(true, true, true, true)
    .addToRecipeTypes(['mixing', 'liquefying', 'solidifying'])
    .setRecipeFunction((event, itemI, itemO, liquidI, liquidO, gasI, gasO, recipeData, recipeId) => {
        let input = [];
        let output = [];
        itemI.forEach(item => {
            let fullItemStack = itemHandler.getItemOf(item);
            input.push(fullItemStack);
        });
        itemO.forEach(item => {
            output.push(itemHandler.getItemOf(item));
        });
        liquidI.forEach(fluid => {
            input.push(fluidHandler.getFluidOf(fluid));
        });
        liquidO.forEach(fluid => {
            output.push(fluidHandler.getFluidOf(fluid));
        });

        let recipe = event.recipes.create.mixing(output, input).id(`materiallib:mixing/${recipeId}`);
        if (!recipeData.melting_point || recipeData.melting_point > 1000) return;
        if (recipeData.melting_point > 500) {recipe.superheated(); return;}
        if (recipeData.melting_point > 300) recipe.heated()
    })
    .register();

MachineHandler.create('millstone')
    .setIO(1, true, false, false)
    .addToRecipeTypes(['crushing'])
    .setRecipeFunction((event, itemI, itemO, liquidI, liquidO, gasI, gasO, recipeData, recipeId) => {
        let input = [];
        let output = [];
        itemI.forEach(item => {
            input.push(itemHandler.getItemOf(item));
        });
        itemO.forEach(item => {
            output.push(itemHandler.getItemOf(item));
        });

        if (!recipeData.toughness || recipeData.toughness < 200) event.recipes.create.milling(output, input).id(`materiallib:milling/${recipeId}`);
        
    })
    .register();

MachineHandler.create('crushing_wheel')
    .setIO(1, true, false, false)
    .addToRecipeTypes(['crushing'])
    .setRecipeFunction((event, itemI, itemO, liquidI, liquidO, gasI, gasO, recipeData, recipeId) => {
        let input = [];
        let output = [];
        itemI.forEach(item => {
            input.push(itemHandler.getItemOf(item));
        });
        itemO.forEach(item => {
            output.push(itemHandler.getItemOf(item));
        });

        event.recipes.create.crushing(output, input).id(`materiallib:crushing/${recipeId}`);
    })
    .register();