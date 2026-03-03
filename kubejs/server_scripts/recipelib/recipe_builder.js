const recipeBuilder = {
    recipeId: '',
    usedRecipeType: '',
    itemI: [],
    itemO: [],
    fluidI: [],
    fluidO: [],
    recipeData: {},

    recipeType: (recipeType) => {
        recipeBuilder.usedRecipeType = recipeType;
        return recipeBuilder;
    },
    id: (recipeID) => {
        recipeBuilder.recipeId = recipeID;
        return recipeBuilder;
    },
    itemInputs: (itemI) => {
        itemI.forEach(item => {
            recipeBuilder.itemI.push(item);
        });
        return recipeBuilder;
    },
    itemOutputs: (itemO) => {
        itemO.forEach(item => {
            recipeBuilder.itemO.push(item);
        });
        return recipeBuilder;
    },
    fluidInputs: (fluidI) => {
        fluidI.forEach(fluid => {
            recipeBuilder.fluidI.push(fluid);
        });
        return recipeBuilder;
    },
    fluidOutputs: (fluidO) => {
        fluidO.forEach(fluid => {
            recipeBuilder.fluidO.push(fluid);
        });
        return recipeBuilder;
    },
    
    setRecipeData: (dataObj) => {
        recipeBuilder.recipeData = dataObj
        return recipeBuilder;
    },

    register: () => {
        let itemI = stackArrayBuilder(recipeBuilder.itemI, 'item');
        let itemO = stackArrayBuilder(recipeBuilder.itemO, 'item');
        let fluidI = stackArrayBuilder(recipeBuilder.fluidI, 'fluid');
        let fluidO = stackArrayBuilder(recipeBuilder.fluidO, 'fluid');

        recipeRegistryHandler(recipeBuilder.usedRecipeType, itemI, itemO, fluidI, fluidO, recipeBuilder.recipeData, recipeBuilder.recipeId);
        recipeBuilder.reset()
    },

    reset: () => {
        recipeBuilder.recipeId = '';
        recipeBuilder.usedRecipeType = '';
        recipeBuilder.itemI = [];
        recipeBuilder.itemO = [];
        recipeBuilder.fluidI = [];
        recipeBuilder.fluidO = [];
        recipeBuilder.recipeData = {};
    }
};

const recipeRegistryHandler = (usedRecipeType, itemI, itemO, fluidI, fluidO, recipeData, recipeId) => {
    let recipeTypeRecipes = RecipeTypeList.find(recipeType => recipeType.recipeTypeId == usedRecipeType);
    let machines = recipeTypeRecipes.usableMachines;

    ServerEvents.recipes(event => {
        machines.forEach(usableMachine => {
            let machineObj = MachineList.find(machine => machine.machineId == usableMachine);
            machineObj.recipeFunction(event, itemI, itemO, fluidI, fluidO, recipeData, recipeId);
        });
    })
};

const stackArrayBuilder = (input, type) => {
    if (type == 'item') {
        let inputArray = [];
        input.forEach(item => {
            let itemData = item.match(global.itemRegex);
            let itemStack = itemHandler.createItemStack(itemData[2], itemData[1]);
            inputArray.push(itemStack);
        });
        return inputArray;
    } else if (type == 'fluid') {
        let inputArray = [];
        input.forEach(fluid => {
            let fluidData = fluid.match(global.fluidRegex);
            let fluidStack = fluidHandler.createItemStack(fluidData[1], fluidData[2]);
            inputArray.push(fluidStack);
        });
        return inputArray;
    } else {
        console.warn(`unknown state: ${type}`)
    }
}

recipeBuilder.recipeType('mixing').id('bronze')
    .itemInputs(['3x minecraft:copper_ingot', '1x mekanism:ingot_tin'])
    .itemOutputs(['4x mekanism:ingot_bronze'])
    .register();