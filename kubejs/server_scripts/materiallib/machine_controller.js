// priority: 100000
const MachineList = [];

const functionBlockList = ['create', 'setIO', 'setRecipeFunction', 'register', 'reset']

console.log('registering machines:');

const MachineHandler = {
    machineId: '',
    IOCapabilities: {
        itemInput: 0,
        itemOutput: 0,
        fluidInput: 0,
        fluidOutput: 0
    },
    recipeFunction: (event, itemI, itemO, fluidI, fluidO, recipeData) => {
        console.warn(`Can't find a recipe function for ${MachineHandler.machineId}`);
    },

    create: (id) => {
        MachineHandler.machineId = id;
        return MachineHandler;
    },

    setIO: (itemI, itemO, fluidI, fluidO) => {
        MachineHandler.IOCapabilities = {
        itemInput: itemI,
        itemOutput: itemO,
        fluidInput: fluidI,
        fluidOutput: fluidO
        };
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
        console.log(`   register machine: ${machineObj.machineId}`);
    },

    reset: () => {
        MachineHandler.machineId = '';
        MachineHandler.IOCapabilities = {
            itemInput: 0,
            itemOutput: 0,
            fluidInput: 0,
            fluidOutput: 0
        };
        MachineHandler.recipeFunction = (event, itemI, itemO, fluidI, fluidO, recipeData) => {
            console.warn(`Can't find a recipe function for ${MachineHandler.machineId}`);
        }
    }
    
};