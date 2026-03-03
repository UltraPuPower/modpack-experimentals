// priority: 50000

MachineHandler.create('shapeless')
    .setIO(9, 1, false, false)
    .setRecipeFunction((event, itemI, itemO, fluidI, fluidO, recipeData, recipeId) => {
        let input = [];
        let output = [];
        itemI.forEach(item => {
            input.push(itemHandler.getItemOf(item));
        });
        itemO.forEach(item => {
            output.push(itemHandler.getItemOf(item));
        });

        event.shapeless(output[0], input).id(`materiallib:shapeless/${recipeId}`);
    })
    .register();

MachineHandler.create('shaped')
    .setIO(9, 1, false, false)
    .setRecipeFunction((event, itemI, itemO, fluidI, fluidO, recipeData, recipeId) => {
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
            output.push(itemHandler.getItemOf(item));
        });

        event.shaped(output[0], recipeData.shaped.pattern, recipeData.shaped.key).id(`materiallib:shaped${recipeId}`);
    })
    .register();

MachineHandler.create('crafting_compressor')
    .setIO(1, 1, false, false)
    .setRecipeFunction((event, itemI, itemO, fluidI, fluidO, recipeData, recipeId) => {
        let uncompressed = itemI[0].id
        let compressed = itemO[0].id

        event.shapeless(Item.of(uncompressed, 9), compressed).id(`materiallib:shapeless/decompressing/${compressed.split(':')[1]}`);
        event.shaped(compressed, ['aaa', 'aaa', 'aaa'], {a: uncompressed}).id(`materiallib:shaped/compressing/${uncompressed.split(':')[1]}`);
    })
    .register();

MachineHandler.create('furnace')
    .setIO(1, 1, false, false)
    .setRecipeFunction((event, itemI, itemO, fluidI, fluidO, recipeData, recipeId) => {
        let input = [];
        let output = [];
        itemI.forEach(item => {
            input.push(itemHandler.getItemOf(item));
        });
        itemO.forEach(item => {
            output.push(itemHandler.getItemOf(item));
        });

        event.smelting(output[0], input[0]).id(`materiallib:smelting/${recipeId}`);
    })
    .register();
    
MachineHandler.create('smoker')
    .setIO(1, 1, false, false)
    .setRecipeFunction((event, itemI, itemO, fluidI, fluidO, recipeData, recipeId) => {
        let input = [];
        let output = [];
        itemI.forEach(item => {
            input.push(itemHandler.getItemOf(item));
        });
        itemO.forEach(item => {
            output.push(itemHandler.getItemOf(item));
        });

        event.smoking(output[0], input[0]).id(`materiallib:smoking/${recipeId}`);
    })
    .register();

MachineHandler.create('blast_furnace')
    .setIO(1, 1, false, false)
    .setRecipeFunction((event, itemI, itemO, fluidI, fluidO, recipeData, recipeId) => {
        let input = [];
        let output = [];
        itemI.forEach(item => {
            input.push(itemHandler.getItemOf(item));
        });
        itemO.forEach(item => {
            output.push(itemHandler.getItemOf(item));
        });

        if (!recipeData.heatlevel || recipeData.heatlevel < 500) {
            event.smelting(output[0], input[0]).id(`materiallib:smelting/${recipeId}`);
            event.blasting(output[0], input[0]).id(`materiallib:blasting/${recipeId}`);
            return
        } else if (recipeData.heatlevel < 1000) {
            event.blasting(output[0], input[0]).id(`materiallib:blasting/${recipeId}`);
            return
        }
    })
    .register();