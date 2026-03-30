// priority: 99997

/**
 * @typedef {Object} recipeBuilder The handler for machine registry
 */
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

    /**
     * 
     * Determines what recipe type is used
     * @param {string} recipeType - The recipe type used for this recipe
     * @returns {recipeBuilder} Recipe Builder, allows for method chaining
     */
    recipeType: (recipeType) => {
        recipeBuilder.usedRecipeType = recipeType;
        return recipeBuilder;
    },

    /**
     * Sets the recipe id for the recipe
     * @param {string} recipeID - The partial id under which this recipe is generated
     * @returns {recipeBuilder} Recipe Builder, allows for method chaining
     */
    id: (recipeID) => {
        recipeBuilder.recipeId = recipeID;
        return recipeBuilder;
    },

    /**
     * Adds item inputs to the recipe
     * @param {string} itemI - Array containing item inputs
     * @returns {recipeBuilder} Recipe Builder, allows for method chaining
     */
    itemInputs: (itemI) => {
        itemI.forEach(item => {
            recipeBuilder.itemI.push(item);
        });
        return recipeBuilder;
    },
    /**
     * Adds item outputs to the recipe
     * @param {string} itemO - Array containing item outputs
     * @returns {recipeBuilder} Recipe Builder, allows for method chaining
     */
    itemOutputs: (itemO) => {
        itemO.forEach(item => {
            recipeBuilder.itemO.push(item);
        });
        return recipeBuilder;
    },
    /**
     * Adds liquid inputs to the recipe
     * @param {string} liquidI - Array containing liquid inputs
     * @returns {recipeBuilder} Recipe Builder, allows for method chaining
     */
    fluidInputs: (liquidI) => {
        liquidI.forEach(liquid => {
            recipeBuilder.liquidI.push(liquid);
        });
        return recipeBuilder;
    },
    /**
     * Adds liquid outputs to the recipe
     * @param {string} liquidO - Array containing liquid outputs
     * @returns {recipeBuilder} Recipe Builder, allows for method chaining
     */
    fluidOutputs: (liquidO) => {
        liquidO.forEach(liquid => {
            recipeBuilder.liquidO.push(liquid);
        });
        return recipeBuilder;
    },
    /**
     * Adds gas inputs to the recipe
     * @param {string} gasI - Array containing gas inputs
     * @returns {recipeBuilder} Recipe Builder, allows for method chaining
     */
    chemicalInputs: (gasI) => {
        gasI.forEach(gas => {
            recipeBuilder.gasI.push(gas);
        });
        return recipeBuilder;
    },
    /**
     * Adds gas outputs to the recipe
     * @param {string} gasO - Array containing gas outputs
     * @returns {recipeBuilder} Recipe Builder, allows for method chaining
     */
    chemicalOutputs: (gasO) => {
        gasO.forEach(gas => {
            recipeBuilder.gasO.push(gas);
        });
        return recipeBuilder;
    },
    
    /**
     * Sets special data to the recipe
     * @param {string} dataObj - Object containing data pointers
     * @returns {recipeBuilder} Recipe Builder, allows for method chaining
     */
    setRecipeData: (dataObj) => {
        recipeBuilder.recipeData = dataObj
        return recipeBuilder;
    },

    /**
     * Finishes the creation of a material by registering it and cleaning the handler
     */
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

    /**
     * Resets the material creation handler, not meant for usage outside of handler
     */
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
            machineObj.recipeFunction(event, itemI, itemO, liquidI, liquidO, gasI, gasO, recipeData, `recipelib:${usedRecipeType}/${usableMachine}/${recipeId}`);
        });
    })
};

const stackArrayBuilder = (input, type) => {
    if (type == 'item') {
        let inputArray = [];
        input.forEach(item => {
            let itemStack = {};
            if (typeof item == 'string') {
                let itemData = item.match(global.itemRegex);
                itemStack = new ItemHandler(itemData[2], Number(itemData[1]));
            } else if (typeof item == 'object') itemStack = item
            else console.error(`Unsupported recipe ingredient: ${item}`)
            inputArray.push(itemStack);
        });
        return inputArray;
    } else if (type == 'fluid') {
        let inputArray = [];
        input.forEach(fluid => {
            let fluidStack = {};
            if (typeof fluid == 'string') {
                let fluidData = fluid.match(global.fluidRegex);
                fluidStack = new FluidHandler(fluidData[1], Number(fluidData[2]));
            } else if (typeof fluid == 'object') fluidStack = fluid
            else console.error(`Unsupported recipe ingredient: ${fluid}`)
            inputArray.push(fluidStack);
        });
        return inputArray;
    } else {
        console.warn(`unknown state: ${type}`)
    }
};