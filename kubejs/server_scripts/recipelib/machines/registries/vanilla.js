// priority: 99998
// requires: minecraft
// author: UltraPuPower1

MachineHandler.create('shapeless')
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

MachineHandler.create('shaped')
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

MachineHandler.create('crafting_compressor')
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

MachineHandler.create('furnace')
    .setIO(1, 1, false, false, false, false)
    .addToRecipeTypes(['smelting'])
    .setRecipeFunction((event, itemI, itemO, fluidI, fluidO, chemicalI, chemicalO, recipeData, recipeId) => {
        event.smelting(itemO[0].getItemOf(), itemI[0].getItemOf()).id(recipeId);
    })
    .register();
    
MachineHandler.create('smoker')
    .setIO(1, 1, false, false, false, false)
    .addToRecipeTypes(['smoking'])
    .setRecipeFunction((event, itemI, itemO, fluidI, fluidO, chemicalI, chemicalO, recipeData, recipeId) => {
        let input = [];
        let output = [];
        itemI.forEach(item => {
            input.push(item.getItemOf());
        });
        itemO.forEach(item => {
            output.push(item.getItemOf());
        });

        event.smoking(output[0], input[0]).id(recipeId);
    })
    .register();

MachineHandler.create('blast_furnace')
    .setIO(1, 1, false, false, false, false)
    .addToRecipeTypes(['blasting'])
    .setRecipeFunction((event, itemI, itemO, fluidI, fluidO, chemicalI, chemicalO, recipeData, recipeId) => {
        let input = [];
        let output = [];
        itemI.forEach(item => {
            input.push(item.getItemOf());
        });
        itemO.forEach(item => {
            output.push(item.getItemOf());
        });

        let newRecipeId = recipeId.replace('blast_furnace', 'furnace');

        if (!recipeData.melting_point || recipeData.melting_point < 500) {
            event.smelting(output[0], input[0]).id(newRecipeId);
            event.blasting(output[0], input[0]).id(recipeId);
            return
        } else if (recipeData.melting_point < 1000) {
            event.blasting(output[0], input[0]).id(recipeId);
            return
        }
    })
    .register();