// priority: 50000
MachineHandler.create('shapeless')
    .setIO(9, 1, false, false)
    .setRecipeFunction((event, itemI, itemO, fluidI, fluidO, recipeData) => {
        let input = [];
        let output = [];
        itemI.forEach(item => {
            input.push(itemHandler.getItemOf(item));
        });
        itemO.forEach(item => {
            output.push(itemHandler.getItemOf(item));
        });

        let recipeId = `materiallib:shapeless/${itemI[0].id.split(':')[1]}`
        event.shapeless(output[0], input).id(recipeId);
    })
    .register();

MachineHandler.create('shaped')
    .setIO(9, 1, false, false)
    .setRecipeFunction((event, itemI, itemO, fluidI, fluidO, recipeData) => {
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

        let recipeId = `materiallib:shaped/${itemO[0].id.split(':')[1]}`
        event.shaped(output[0], recipeData.shaped.pattern, recipeData.shaped.key).id(recipeId);
    })
    .register();

MachineHandler.create('crafting_compressor')
    .setIO(9, 1, false, false)
    .setRecipeFunction((event, itemI, itemO, fluidI, fluidO, recipeData) => {
        let uncompressed = itemI[0].id
        let compressed = itemO[0].id

        let recipeId = `materiallib:shapeless/decompressing/${compressed.split(':')[1]}`
        event.shapeless(Item.of(uncompressed, 9), compressed).id(recipeId);

        recipeId = `materiallib:shaped/compressing/${compressed.split(':')[1]}`
        event.shaped(compressed, ['aaa', 'aaa', 'aaa'], {a: uncompressed}).id(recipeId);
    })
    .register();

MachineHandler.create('furnace')
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

        let recipeId = `materiallib:smelting/${itemI[0].id.split(':')[1]}`
        event.smelting(output[0], input[0]).id(recipeId);
    })
    .register();
    
MachineHandler.create('smoker')
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

        let recipeId = `materiallib:smoking/${itemI[0].id.split(':')[1]}`
        event.smoking(output[0], input[0]).id(recipeId);
    })
    .register();

MachineHandler.create('blast_furnace')
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

        let blastingRecipeId = `materiallib:blasting/${itemI[0].id.split(':')[1]}`;
        let smeltingRecipeId = `materiallib:smelting/${itemI[0].id.split(':')[1]}`;

        if (!recipeData.heatlevel || recipeData.heatlevel < 500) {
            event.smelting(output[0], input[0]).id(smeltingRecipeId);
            event.blasting(output[0], input[0]).id(blastingRecipeId);
            return
        } else if (recipeData.heatlevel < 1000) {
            event.blasting(output[0], input[0]).id(blastingRecipeId);
            return
        }
    })
    .register();