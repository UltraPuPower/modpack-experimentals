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
        recipeBuilder.recipeId = (recipeID) ? recipeID : '';
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
        recipeRegistrate(recipeBuilder.usedRecipeType, recipeBuilder.itemI, recipeBuilder.itemO, recipeBuilder.fluidI, recipeBuilder.fluidO, recipeBuilder.chemicalI, recipeBuilder.chemicalO, recipeBuilder.recipeData, recipeBuilder.recipeId);
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

const recipeRegistrate = (usedRecipeType, itemI, itemO, fluidI, fluidO, chemicalI, chemicalO, recipeData, recipeId) => {
    let recipeTypeRecipes = RecipeTypeList.find(recipeType => recipeType.recipeTypeId == usedRecipeType);
    let machines = recipeTypeRecipes.usableMachines;

    let namespace = `recipelib`
    if (recipeId.includes(':')) {
        let idParts = recipeId.split(':')
        namespace = idParts[0]
        recipeId = idParts[1]
    } else if (global.namespace) {
        namespace = global.namespace
    }

    ServerEvents.recipes(event => {
        machines.forEach(usableMachine => {
            let machineObj = MachineList.find(machine => machine.machineId == usableMachine);

            let IO = machineObj.IOCapabilities;

            let itemICheck = runComparisonCheck(IO.itemI, itemI, 'itemI')
            let itemOCheck = runComparisonCheck(IO.itemO, itemO, 'itemO')
            let fluidICheck = runComparisonCheck(IO.fluidI, fluidI, 'fluidI')
            let fluidOCheck = runComparisonCheck(IO.fluidO, fluidO, 'fluidO')
            let chemicalICheck = runComparisonCheck(IO.chemicalI, chemicalI, 'chemicalI')
            let chemicalOCheck = runComparisonCheck(IO.chemicalO, chemicalO, 'chemicalO')

            let generatedRecipeId = `${namespace}:${usedRecipeType}/${usableMachine}/${recipeId}`

            if (itemICheck && itemOCheck && fluidICheck && fluidOCheck && chemicalICheck && chemicalOCheck) {
                machineObj.recipeFunction(event, itemI, itemO, fluidI, fluidO, chemicalI, chemicalO, recipeData, generatedRecipeId);
            } else {
                console.warn(`failed IO check for recipe: "${generatedRecipeId}"`)
            }
        });
    })
};

const runComparisonCheck = (boundary, value, type) => {
    if (typeof boundary == 'boolean') {
        if (boundary || value.length == 0) return true
        console.warn(`Attempted IO on unsupported type; attempt: ${type}`)
        return false
    }
    if (value.length > boundary) {
        console.warn(`Attempted IO exceeding supported size; attempt: ${type}`)
        return false
    }
    return true
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