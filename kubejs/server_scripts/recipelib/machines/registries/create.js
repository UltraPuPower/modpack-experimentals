// priority: 99998
// requires: create
// author: UltraPuPower1

function createFluidFixer(fluid) {
    fluid.type = 'neoforge:single';
    return fluid;
}

function createItemFixer(itemArr) {
    let newItemArr = [];
    itemArr.forEach(itemObj => {
        if (itemObj.count != 1) {
            for (let i = 1; i <= itemObj.count; i++){
                newItemArr.push(itemObj);
            }
        } else newItemArr.push(itemObj);
    })
    return newItemArr;
}

MachineHandler.create('create:mechanical_press')
    .setIO(1, 1, false, false, false, false)
    .addToRecipeTypes(['pressing'])
    .setRecipeFunction((event, itemI, itemO, fluidI, fluidO, chemicalI, chemicalO, recipeData, recipeId) => {
        itemI = createItemFixer(itemI);
        let recipeJson = {
            "type": "create:pressing",
            "ingredients": [itemI[0].getIngredient()],
            "results": [itemO[0].getItemStack()]
        };

        event.custom(recipeJson).id(recipeId);
    })
    .register();

MachineHandler.create('create:mechanical_compacter')
    .setIO(true, 1, true, false, false, false)
    .addToRecipeTypes(['compacting'])
    .setRecipeFunction((event, itemI, itemO, fluidI, fluidO, chemicalI, chemicalO, recipeData, recipeId) => {
        itemI = createItemFixer(itemI);
        let recipeJson = {
            "type": "create:compacting",
            "ingredients": [],
            "results": [itemO[0].getItemStack()]
        };
        
        itemI.forEach(item => {recipeJson.ingredients.push(item.getIngredient())});
        fluidI.forEach(fluid => {recipeJson.ingredients.push(createFluidFixer(fluid.getIngredient()))});

        event.custom(recipeJson).id(recipeId);
    })
    .register();

MachineHandler.create('create:mechanical_saw')
    .setIO(1, true, false, false, false, false)
    .addToRecipeTypes(['cutting'])
    .setRecipeFunction((event, itemI, itemO, fluidI, fluidO, chemicalI, chemicalO, recipeData, recipeId) => {
        let recipeJson = {
            "type": "create:cutting",
            "ingredients": [itemI[0].getIngredient()],
            "results": [itemO[0].getItemStack()]
        };

        event.custom(recipeJson).id(recipeId);
    })
    .register();

MachineHandler.create('create:mechanical_mixer')
    .setIO(true, true, true, true, false, false)
    .addToRecipeTypes(['mixing', 'liquefying', 'solidifying'])
    .setRecipeFunction((event, itemI, itemO, fluidI, fluidO, chemicalI, chemicalO, recipeData, recipeId) => {
        itemI = createItemFixer(itemI);
        let recipeJson = {
            "type": "create:mixing",
            "ingredients": [],
            "results": []
        };
        
        itemI.forEach(item => {recipeJson.ingredients.push(item.getIngredient())});
        fluidI.forEach(fluid => {recipeJson.ingredients.push(createFluidFixer(fluid.getIngredient()))});

        itemO.forEach(item => {recipeJson.results.push(item.getItemStack())});
        fluidO.forEach(fluid => {recipeJson.results.push(fluid.getFluidStack())});

        if (!recipeData.melting_point || recipeData.melting_point > 1000) let x = 1
        else if (recipeData.melting_point > 500) recipeJson.heat_requirement = 'superheated';
        else if (recipeData.melting_point > 300) recipeJson.heat_requirement = 'heated';

        event.custom(recipeJson).id(recipeId);
    })
    .register();

MachineHandler.create('create:millstone')
    .setIO(1, true, false, false, false, false)
    .addToRecipeTypes(['crushing'])
    .setRecipeFunction((event, itemI, itemO, fluidI, fluidO, chemicalI, chemicalO, recipeData, recipeId) => {
        let recipeJson = {
            "type": "create:milling",
            "ingredients": [itemI[0].getIngredient()],
            "results": []
        };

        itemO.forEach(item => {recipeJson.results.push(item.getItemStack())});

        if (!recipeData.toughness || recipeData.toughness < 200) event.custom(recipeJson).id(recipeId);
        
    })
    .register();

MachineHandler.create('create:crushing_wheels')
    .setIO(1, true, false, false, false, false)
    .addToRecipeTypes(['crushing', 'pulverizing'])
    .setRecipeFunction((event, itemI, itemO, fluidI, fluidO, chemicalI, chemicalO, recipeData, recipeId) => {
        let recipeJson = {
            "type": "create:crushing",
            "ingredients": [itemI[0].getIngredient()],
            "results": []
        };

        itemO.forEach(item => {recipeJson.results.push(item.getItemStack())});

        event.custom(recipeJson).id(recipeId);
    })
    .register();

MachineHandler.create('create:deployer')
    .setIO(2, 1, false, false, false, false)
    .addToRecipeTypes(['applying'])
    .setRecipeFunction((event, itemI, itemO, fluidI, fluidO, chemicalI, chemicalO, recipeData, recipeId) => {
        let recipeJson = {
            "type": "create:deploying",
            "ingredients": [itemI[0].getIngredient(), itemI[1].getIngredient()],
            "results": [itemO[0].getItemStack()]
        };

        if (recipeData.keepTool) {
            recipeJson.keep_held_item = true;
        }

        event.custom(recipeJson).id(recipeId);
    })
    .register();

MachineHandler.create('create:spout')
    .setIO(1, 1, 1, false, false, false)
    .addToRecipeTypes(['filling'])
    .setRecipeFunction((event, itemI, itemO, fluidI, fluidO, chemicalI, chemicalO, recipeData, recipeId) => {
        let recipeJson = {
            "type": "create:filling",
            "ingredients": [itemI[0].getIngredient(), createFluidFixer(fluidI[0].getIngredient())],
            "results": [itemO[0].getItemStack()]
        };

        event.custom(recipeJson).id(recipeId);
    })
    .register();

MachineHandler.create('create:encased_fan_water')
    .setIO(1, 1, 1, false, false, false)
    .addToRecipeTypes(['splashing'])
    .setRecipeFunction((event, itemI, itemO, fluidI, fluidO, chemicalI, chemicalO, recipeData, recipeId) => {
        let recipeJson = {
            "type": "create:splashing",
            "ingredients": [itemI[0].getIngredient()],
            "results": []
        };
        
        itemO.forEach(item => {recipeJson.results.push(item.getItemStack())});

        event.custom(recipeJson).id(recipeId);
    })
    .register();

MachineHandler.create('create:encased_fan_soul_fire')
    .setIO(1, 1, 1, false, false, false)
    .addToRecipeTypes(['haunting'])
    .setRecipeFunction((event, itemI, itemO, fluidI, fluidO, chemicalI, chemicalO, recipeData, recipeId) => {
        let recipeJson = {
            "type": "create:haunting",
            "ingredients": [itemI[0].getIngredient()],
            "results": []
        };
        
        itemO.forEach(item => {recipeJson.results.push(item.getItemStack())});

        event.custom(recipeJson).id(recipeId);
    })
    .register();