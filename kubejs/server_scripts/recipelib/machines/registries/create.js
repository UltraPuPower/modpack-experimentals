// priority: 99998
// requires: create
// author: UltraPuPower1

MachineHandler.create('mechanical_press')
    .setIO(1, 1, false, false, false, false)
    .addToRecipeTypes(['pressing'])
    .setRecipeFunction((event, itemI, itemO, fluidI, fluidO, chemicalI, chemicalO, recipeData, recipeId) => {
        let input = [];
        let output = [];
        itemI.forEach(item => {
            input.push(item.getItemOf());
        });
        itemO.forEach(item => {
            output.push(item.getItemOf());
        });

        event.recipes.create.pressing(output, input).id(recipeId);
    })
    .register();

MachineHandler.create('mechanical_compacter')
    .setIO(1, 1, false, false, false, false)
    .addToRecipeTypes(['compacting'])
    .setRecipeFunction((event, itemI, itemO, fluidI, fluidO, chemicalI, chemicalO, recipeData, recipeId) => {
        let input = [];
        let output = [];
        itemI.forEach(item => {
            input.push(item.getItemOf());
        });
        itemO.forEach(item => {
            output.push(item.getItemOf());
        });

        event.recipes.create.compacting(output, input).id(recipeId);
    })
    .register();

MachineHandler.create('mechanical_saw')
    .setIO(1, true, false, false, false, false)
    .addToRecipeTypes(['cutting'])
    .setRecipeFunction((event, itemI, itemO, fluidI, fluidO, chemicalI, chemicalO, recipeData, recipeId) => {
        let input = [];
        let output = [];
        itemI.forEach(item => {
            input.push(item.getItemOf());
        });
        itemO.forEach(item => {
            output.push(item.getItemOf());
        });

        event.recipes.create.cutting(output, input).id(recipeId);
    })
    .register();

MachineHandler.create('mechanical_mixer')
    .setIO(true, true, true, true, false, false)
    .addToRecipeTypes(['mixing', 'liquefying', 'solidifying'])
    .setRecipeFunction((event, itemI, itemO, fluidI, fluidO, chemicalI, chemicalO, recipeData, recipeId) => {
        let input = [];
        let output = [];
        itemI.forEach(item => {
            let fullItemStack = item.getItemOf();
            input.push(fullItemStack);
        });
        itemO.forEach(item => {
            output.push(item.getItemOf());
        });
        fluidI.forEach(fluid => {
            input.push(fluid.getFluidOf());
        });
        fluidO.forEach(fluid => {
            output.push(fluid.getFluidOf());
        });

        let recipe = event.recipes.create.mixing(output, input).id(recipeId);
        if (!recipeData.melting_point || recipeData.melting_point > 1000) return;
        if (recipeData.melting_point > 500) {recipe.superheated(); return;}
        if (recipeData.melting_point > 300) recipe.heated()
    })
    .register();

MachineHandler.create('millstone')
    .setIO(1, true, false, false, false, false)
    .addToRecipeTypes(['crushing'])
    .setRecipeFunction((event, itemI, itemO, fluidI, fluidO, chemicalI, chemicalO, recipeData, recipeId) => {
        let input = [];
        let output = [];
        itemI.forEach(item => {
            input.push(item.getItemOf());
        });
        itemO.forEach(item => {
            output.push(item.getItemOf());
        });

        if (!recipeData.toughness || recipeData.toughness < 200) event.recipes.create.milling(output, input).id(recipeId);
        
    })
    .register();

MachineHandler.create('crushing_wheel')
    .setIO(1, true, false, false, false, false)
    .addToRecipeTypes(['crushing'])
    .setRecipeFunction((event, itemI, itemO, fluidI, fluidO, chemicalI, chemicalO, recipeData, recipeId) => {
        let input = [];
        let output = [];
        itemI.forEach(item => {
            input.push(item.getItemOf());
        });
        itemO.forEach(item => {
            output.push(item.getItemOf());
        });

        event.recipes.create.crushing(output, input).id(recipeId);
    })
    .register();

MachineHandler.create('deployer')
    .setIO(2, 1, false, false, false, false)
    .addToRecipeTypes(['applying'])
    .setRecipeFunction((event, itemI, itemO, fluidI, fluidO, chemicalI, chemicalO, recipeData, recipeId) => {
        let output = [];
        itemO.forEach(item => {
            output.push(item.getItemOf());
        });

        let recipe = event.recipes.create.deploying(output, [itemI[0].getItemOf(), itemI[1].getItemOf()]).id(recipeId);

        if (recipeData.keepTool) {
            recipe.keepHeldItem();
        }
    })
    .register();

MachineHandler.create('spout')
    .setIO(1, 1, 1, false, false, false)
    .addToRecipeTypes(['filling'])
    .setRecipeFunction((event, itemI, itemO, fluidI, fluidO, chemicalI, chemicalO, recipeData, recipeId) => {
        event.recipes.create.filling(itemO[0].getItemOf(), [itemI[0].getItemOf(), fluidI[0].getFluidOf()]).id(recipeId);
    })
    .register();

MachineHandler.create('encased_fan_water')
    .setIO(1, 1, 1, false, false, false)
    .addToRecipeTypes(['bulk_washing'])
    .setRecipeFunction((event, itemI, itemO, fluidI, fluidO, chemicalI, chemicalO, recipeData, recipeId) => {
        let output = [];
        itemO.forEach(item => {
            output.push(item.getItemOf());
        });
        event.recipes.create.splashing(output, itemI[0].getItemOf()).id(recipeId);
    })
    .register();

MachineHandler.create('encased_fan_soul_fire')
    .setIO(1, 1, 1, false, false, false)
    .addToRecipeTypes(['bulk_haunting'])
    .setRecipeFunction((event, itemI, itemO, fluidI, fluidO, chemicalI, chemicalO, recipeData, recipeId) => {
        let output = [];
        itemO.forEach(item => {
            output.push(item.getItemOf());
        });
        event.recipes.create.haunting(output, itemI[0].getItemOf()).id(recipeId);
    })
    .register();