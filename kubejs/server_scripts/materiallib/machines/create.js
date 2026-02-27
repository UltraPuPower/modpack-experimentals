// priority: 50000
// requires: create

MachineHandler.create('mechanical_press')
    .setIO(1, 1, false, false)
    .setRecipeFunction((event, itemI, itemO, fluidI, fluidO, recipeData) => {
        let input = [];
        let output = [];
        itemI.forEach(item => {
            input.push(itemHandler.getItemOf(item));
        });
        itemO.forEach(item => {
            output.push(itemHandler.getItemOf(item));
        });

        let recipeId = `materiallib:pressing/${itemI[0].id.split(':')[1]}`
        event.recipes.create.pressing(output, input).id(recipeId);
    })
    .register();

MachineHandler.create('mechanical_saw')
    .setIO(1, true, false, false)
    .setRecipeFunction((event, itemI, itemO, fluidI, fluidO, recipeData) => {
        let input = [];
        let output = [];
        itemI.forEach(item => {
            input.push(itemHandler.getItemOf(item));
        });
        itemO.forEach(item => {
            output.push(itemHandler.getItemOf(item));
        });

        let recipeId = `materiallib:cutting/${itemI[0].id.split(':')[1]}`
        event.recipes.create.cutting(output, input).id(recipeId);
    })
    .register();

MachineHandler.create('mechanical_mixer')
    .setIO(true, true, true, true)
    .setRecipeFunction((event, itemI, itemO, fluidI, fluidO, recipeData) => {
        let input = [];
        let output = [];
        itemI.forEach(item => {
            input.push(itemHandler.getItemOf(item));
        });
        itemO.forEach(item => {
            output.push(itemHandler.getItemOf(item));
        });
        fluidI.forEach(fluid => {
            input.push(fluidHandler.getItemOf(fluid));
        });
        fluidO.forEach(fluid => {
            output.push(fluidHandler.getItemOf(fluid));
        });

        let firstInput = (itemI[0]) ? itemI[0].id : fluidI[0].id
        let recipeId = `materiallib:mixing/${firstInput.split(':')[1]}`

        let recipe = event.recipes.create.mixing(output, input).id(recipeId);
        if (!recipeData.heatlevel || recipeData.heatlevel > 1000) return;
        if (recipeData.heatlevel > 500) {recipe.superheated(); return;}
        if (recipeData.heatlevel > 300) recipe.heated()
    })
    .register();

MachineHandler.create('millstone')
    .setIO(1, true, false, false)
    .setRecipeFunction((event, itemI, itemO, fluidI, fluidO, recipeData) => {
        let input = [];
        let output = [];
        itemI.forEach(item => {
            input.push(itemHandler.getItemOf(item));
        });
        itemO.forEach(item => {
            output.push(itemHandler.getItemOf(item));
        });

        let recipeId = `materiallib:milling/${itemI[0].id.split(':')[1]}`
        if (!recipeData.toughness || recipeData.toughness < 200) event.recipes.create.milling(output, input).id(recipeId);
        
    })
    .register();

MachineHandler.create('crushing_wheel')
    .setIO(1, true, false, false)
    .setRecipeFunction((event, itemI, itemO, fluidI, fluidO, recipeData) => {
        let input = [];
        let output = [];
        itemI.forEach(item => {
            input.push(itemHandler.getItemOf(item));
        });
        itemO.forEach(item => {
            output.push(itemHandler.getItemOf(item));
        });

        let recipeId = `materiallib:crushing/${itemI[0].id.split(':')[1]}`
        event.recipes.create.crushing(output, input).id(recipeId);
    })
    .register();