// priority: 50000
const machineConsole = Java.createConsole("MaterialLib/Machine Console");

const MachineList = [];

const itemHandler = global.itemHandler;
const fluidHandler = global.fluidHandler;

const functionBlockList = ['create', 'setIO', 'addToRecipeTypes', 'setRecipeFunction', 'register', 'reset']

const MachineHandler = {
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
    },

    create: (id) => {
        MachineHandler.machineId = id;
        machineConsole.log(`Created machine: ${id}`);
        return MachineHandler;
    },

    setIO: (itemI, itemO, liquidI, liquidO, gasI, gasO) => {
        MachineHandler.IOCapabilities = {
            itemInput: itemI,
            itemOutput: itemO,
            fluidInput: liquidI,
            fluidOutput: liquidO,
            gasInput: gasI,
            gasOutput: gasO
        };
        return MachineHandler;
    },

    addToRecipeTypes: (recipeTypes) => {
        recipeTypes.forEach(recipeType => {
            let recipeTypeObj = RecipeTypeList.find(RecipeType => RecipeType.recipeTypeId == recipeType);
            if (recipeTypeObj) {
                let recipeTypeIndex = RecipeTypeList.indexOf(recipeTypeObj);
                recipeTypeObj.usableMachines.push(MachineHandler.machineId);
                RecipeTypeList[recipeTypeIndex] = recipeTypeObj;
            } else {
                RecipeTypeHandler.create(recipeType)
                    .setUsableMachine(MachineHandler.machineId)
                    .register();
            }
        });
        return MachineHandler;
    },

    setRecipeFunction: (recipeFunction) => {
        MachineHandler.recipeFunction = recipeFunction;
        return MachineHandler;
    },

    register: () => {
        let machineObj = {};
        let machineKeys = Object.keys(MachineHandler);
        machineKeys.forEach(machinekey => {
            if (!functionBlockList.includes(machinekey)) {
                machineObj[machinekey] = MachineHandler[machinekey];
            }
        });
        MachineList.push(machineObj);
        MachineHandler.reset()
        machineConsole.log(`   Registered machine: ${machineObj.machineId}`);
    },

    reset: () => {
        MachineHandler.machineId = '';
        MachineHandler.IOCapabilities = {
            itemInput: 0,
            itemOutput: 0,
            fluidInput: 0,
            fluidOutput: 0,
            gasInput: 0,
            gasOutput: 0
        };
        MachineHandler.recipeFunction = (event, itemI, itemO, fluidI, fluidO, recipeData, recipeId) => {
            console.error(`Can't find a recipe function for ${MachineHandler.machineId}`);
        }
    }
    
};