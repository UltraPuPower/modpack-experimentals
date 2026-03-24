const recipeBuilder = {
    recipeId: '',
    usedRecipeType: '',
    itemI: [],
    itemO: [],
    liquidI: [],
    liquidO: [],
    gasI: [],
    gasO: [],
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
    liquidInputs: (liquidI) => {
        liquidI.forEach(liquid => {
            recipeBuilder.liquidI.push(liquid);
        });
        return recipeBuilder;
    },
    liquidOutputs: (liquidO) => {
        liquidO.forEach(liquid => {
            recipeBuilder.liquidO.push(liquid);
        });
        return recipeBuilder;
    },
    gasInputs: (gasI) => {
        gasI.forEach(gas => {
            recipeBuilder.gasI.push(gas);
        });
        return recipeBuilder;
    },
    gasOutputs: (gasO) => {
        gasO.forEach(gas => {
            recipeBuilder.gasO.push(gas);
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
        let liquidI = stackArrayBuilder(recipeBuilder.liquidI, 'fluid');
        let liquidO = stackArrayBuilder(recipeBuilder.liquidO, 'fluid');
        let gasI = stackArrayBuilder(recipeBuilder.gasI, 'fluid');
        let gasO = stackArrayBuilder(recipeBuilder.gasO, 'fluid');

        recipeRegistryHandler(recipeBuilder.usedRecipeType, itemI, itemO, liquidI, liquidO, gasI, gasO, recipeBuilder.recipeData, recipeBuilder.recipeId);
        recipeBuilder.reset()
    },

    reset: () => {
        recipeBuilder.recipeId = '';
        recipeBuilder.usedRecipeType = '';
        recipeBuilder.itemI = [];
        recipeBuilder.itemO = [];
        recipeBuilder.liquidI = [];
        recipeBuilder.liquidO = [];
        recipeBuilder.gasI = [];
        recipeBuilder.gasO = [];
        recipeBuilder.recipeData = {};
    }
};

const recipeRegistryHandler = (usedRecipeType, itemI, itemO, liquidI, liquidO, gasI, gasO, recipeData, recipeId) => {
    let recipeTypeRecipes = RecipeTypeList.find(recipeType => recipeType.recipeTypeId == usedRecipeType);
    let machines = recipeTypeRecipes.usableMachines;

    ServerEvents.recipes(event => {
        machines.forEach(usableMachine => {
            let machineObj = MachineList.find(machine => machine.machineId == usableMachine);
            machineObj.recipeFunction(event, itemI, itemO, liquidI, liquidO, gasI, gasO, recipeData, recipeId);
        });
    })
};

const stackArrayBuilder = (input, type) => {
    if (type == 'item') {
        let inputArray = [];
        input.forEach(item => {
            let itemData = item.match(global.itemRegex);
            let itemStack = itemHandler.createItemStack(itemData[2], Number(itemData[1]));
            inputArray.push(itemStack);
        });
        return inputArray;
    } else if (type == 'fluid') {
        let inputArray = [];
        input.forEach(fluid => {
            let fluidData = fluid.match(global.fluidRegex);
            let fluidStack = fluidHandler.createFluidStack(fluidData[1], Number(fluidData[2]));
            inputArray.push(fluidStack);
        });
        return inputArray;
    } else {
        console.warn(`unknown state: ${type}`)
    }
};

// Test recipe
recipeBuilder.recipeType('bulk_washing').id('test')
    .itemInputs(['1x materiallib:iron_dust'])
    .itemOutputs(['1x materiallib:steel_ingot'])
    .register();