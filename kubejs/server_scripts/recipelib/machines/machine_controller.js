// priority: 50000
const machineConsole = Java.createConsole("MaterialLib/Machine Console");

/**
 * @typedef {Object} MachineObject
 * @property {string} machineId - The material this blacklist entry governs
 * @property {IOCapabilitiesObject[]} IOCapabilities - Object containing IO specifications of the machine
 * @property {function} recipeFunction - Used for actual recipe registry
 */

/**
 * @typedef {Object} IOCapabilitiesObject Either false (no capability), true (no limit to types) or a number for the amount of types
 * @property {number|boolean} itemInput - Amount of item inputs the machine can take
 * @property {number|boolean} itemOutput - Amount of item outputs the machine can take
 * @property {number|boolean} liquidInput - Amount of liquid inputs the machine can take (All minecraft fluids are liquids)
 * @property {number|boolean} liquidOutput - Amount of liquid outputs the machine can take (All minecraft fluids are liquids)
 * @property {number|boolean} gasInput - Amount of gas inputs the machine can take (Gases refer to Mekanism Chemicals)
 * @property {number|boolean} gasOutput - Amount of gas outputs the machine can take (Gases refer to Mekanism Chemicals)
 */

/**
 * @param {Array<MachineObject>} MachineList
 */
const MachineList = [];

const itemHandler = global.itemHandler;
const fluidHandler = global.fluidHandler;

const functionBlockList = ['create', 'setIO', 'addToRecipeTypes', 'setRecipeFunction', 'register', 'reset']

/**
 * @typedef {Object} MachineHandler The handler for machine registry
 */
const MachineHandler = {
    result: {
        machineId: '',
        IOCapabilities: {
            itemInput: 0,
            itemOutput: 0,
            liquidInput: 0,
            liquidOutput: 0,
            gasInput: 0,
            gasOutput: 0
        },
        recipeFunction: (event, itemI, itemO, fluidI, fluidO, recipeData, recipeId) => {
            console.error(`Can't find a recipe function for ${MachineHandler.machineId}`);
        }
    },

    /**
     * Sets identifier for the material
     * @param {string} id - The id for the material
     * @returns {MachineHandler} Machine Handler, allows for method chaining
     */
    create: (id) => {
        MachineHandler.result.machineId = id;
        machineConsole.log(`Created machine: ${id}`);
        return MachineHandler;
    },

    /**
     * Sets the IO capabilities of the machine
     * - All parameters are either false (no capability), true (no limit to types) or a number for the amount of types
     * @param {number|boolean} itemI - Item inputs
     * @param {number|boolean} itemO - Item outputs
     * @param {number|boolean} liquidI - Liquid inputs (Minecraft Fluids)
     * @param {number|boolean} liquidO - Liquid outputs (Minecraft Fluids)
     * @param {number|boolean} gasI - gas inputs (Mekanism Chemicals)
     * @param {number|boolean} gasO - gas outputs (Mekanism Chemicals)
     * @returns {MachineHandler} Machine Handler, allows for method chaining
     */
    setIO: (itemI, itemO, liquidI, liquidO, gasI, gasO) => {
        MachineHandler.result.IOCapabilities = {
            itemInput: itemI,
            itemOutput: itemO,
            fluidInput: liquidI,
            fluidOutput: liquidO,
            gasInput: gasI,
            gasOutput: gasO
        };
        return MachineHandler;
    },

    /**
     * Defines the recipe function used for generating recipes with the recipe builder
     * @param {function} recipeFunction Check the docs for this one, it is too much for a short param comment
     * @returns {MachineHandler} Machine Handler, allows for method chaining
     */
    setRecipeFunction: (recipeFunction) => {
        MachineHandler.result.recipeFunction = recipeFunction;
        return MachineHandler;
    },

    /**
     * Adds the machine to the recipe types it can execute, and creates the recipe type if it does not exist
     * @param {string[]} recipeTypes - The recipe types this machine can use
     * @returns {MachineHandler} Machine Handler, allows for method chaining
     */
    addToRecipeTypes: (recipeTypes) => {
        machineConsole.log(`Applying recipes to ${MachineHandler.result.machineId}`)
        recipeTypes.forEach(recipeType => {
            let recipeTypeObj = RecipeTypeList.find(RecipeType => RecipeType.recipeTypeId == recipeType);
            if (recipeTypeObj) {
                let recipeTypeIndex = RecipeTypeList.indexOf(recipeTypeObj);
                recipeTypeObj.usableMachines.push(MachineHandler.result.machineId);
                RecipeTypeList[recipeTypeIndex] = recipeTypeObj;
                machineConsole.log(`   Added machine to ${recipeType}`)
            } else {
                RecipeTypeHandler.create(recipeType)
                    .setUsableMachine(MachineHandler.result.machineId)
                    .register();
                machineConsole.log(`   Registerd ${recipeType}`)
            }
        });
        return MachineHandler;
    },

    /**
     * Finishes the creation of a material by registering it and cleaning the handler
     */
    register: () => {
        let machineObj = MachineHandler.result;
        MachineList.push(machineObj);
        MachineHandler.reset()
        machineConsole.log(`   Registered machine: ${machineObj.machineId}`);
    },

    /**
     * Resets the material creation handler, not meant for usage outside of handler
     */
    reset: () => {
        MachineHandler.result = {
            machineId: '',
            IOCapabilities: {
                itemInput: 0,
                itemOutput: 0,
                liquidInput: 0,
                liquidOutput: 0,
                gasInput: 0,
                gasOutput: 0
            },
            recipeFunction: (event, itemI, itemO, fluidI, fluidO, recipeData, recipeId) => {
                console.error(`Can't find a recipe function for ${MachineHandler.machineId}`);
            }
        }
    }
    
};