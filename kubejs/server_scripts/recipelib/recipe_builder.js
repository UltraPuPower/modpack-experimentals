// priority: 99997

/**
 * @typedef {Object} recipeBuilder The handler for machine registry
 */
const recipeBuilder = {
    recipeId: '',
    usedRecipeType: '',
    itemI: [],
    itemO: [],
    fluidI: [],
    fluidO: [],
    chemicalI: [],
    chemicalO: [],
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
            if (typeof item == 'string') {
                item = evaluateIngredient('item', item)
            }
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
            if (typeof item == 'string') {
                item = evaluateIngredient('item', item)
            }
            recipeBuilder.itemO.push(item);
        });
        return recipeBuilder;
    },
    /**
     * Adds liquid inputs to the recipe
     * @param {string} fluidI - Array containing liquid inputs
     * @returns {recipeBuilder} Recipe Builder, allows for method chaining
     */
    fluidInputs: (fluidI) => {
        fluidI.forEach(liquid => {
            if (typeof liquid == 'string') {
                liquid = evaluateIngredient('fluid', liquid)
            }
            recipeBuilder.fluidI.push(liquid);
        });
        return recipeBuilder;
    },
    /**
     * Adds liquid outputs to the recipe
     * @param {string} fluidO - Array containing liquid outputs
     * @returns {recipeBuilder} Recipe Builder, allows for method chaining
     */
    fluidOutputs: (fluidO) => {
        fluidO.forEach(liquid => {
            if (typeof liquid == 'string') {
                liquid = evaluateIngredient('fluid', liquid)
            }
            recipeBuilder.fluidO.push(liquid);
        });
        return recipeBuilder;
    },
    /**
     * Adds chemical inputs to the recipe
     * @param {string} chemicalI - Array containing chemical inputs
     * @returns {recipeBuilder} Recipe Builder, allows for method chaining
     */
    chemicalInputs: (chemicalI) => {
        chemicalI.forEach(chemical => {
            if (typeof chemical == 'string') {
                chemical = evaluateIngredient('fluid', chemical)
            }
            recipeBuilder.chemicalI.push(chemical);
        });
        return recipeBuilder;
    },
    /**
     * Adds chemical outputs to the recipe
     * @param {string} chemicalO - Array containing chemical outputs
     * @returns {recipeBuilder} Recipe Builder, allows for method chaining
     */
    chemicalOutputs: (chemicalO) => {
        chemicalO.forEach(chemical => {
            if (typeof chemical == 'string') {
                chemical = evaluateIngredient('fluid', chemical)
            }
            recipeBuilder.chemicalO.push(chemical);
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
        recipeRegistryHandler(recipeBuilder.usedRecipeType, recipeBuilder.itemI, recipeBuilder.itemO, recipeBuilder.fluidI, recipeBuilder.fluidO, recipeBuilder.chemicalI, recipeBuilder.chemicalO, recipeBuilder.recipeData, recipeBuilder.recipeId);
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
        recipeBuilder.fluidI = [];
        recipeBuilder.fluidO = [];
        recipeBuilder.chemicalI = [];
        recipeBuilder.chemicalO = [];
        recipeBuilder.recipeData = {};
    }
};

const recipeRegistryHandler = (usedRecipeType, itemI, itemO, fluidI, fluidO, chemicalI, chemicalO, recipeData, recipeId) => {
    let recipeTypeRecipes = RecipeTypeList.find(recipeType => recipeType.recipeTypeId == usedRecipeType);
    let machines = recipeTypeRecipes.usableMachines;

    ServerEvents.recipes(event => {
        machines.forEach(usableMachine => {
            let machineObj = MachineList.find(machine => machine.machineId == usableMachine);
            machineObj.recipeFunction(event, itemI, itemO, fluidI, fluidO, chemicalI, chemicalO, recipeData, `recipelib:${usedRecipeType}/${usableMachine}/${recipeId}`);
        });
    })
};

const evaluateIngredient = (type, input) => {
    if (type == 'item') {
        let itemStack = {};
        let itemData = item.match(global.itemRegex);
        itemStack = new ItemHandler(itemData[3], Number(itemData[2]));
        return itemStack;
    } else if (type == 'fluid') {
        let fluidStack = {};
        let fluidData = item.match(global.itemRegex);
        fluidStack = new FluidHandler(fluidData[1], Number(fluidData[3]));
        return fluidStack;
    } else {
        console.warn(`unknown state: ${type}`)
    }
};