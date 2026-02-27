// priority: 10000
const RecipeTypeList = [];

console.log('registering recipe types:');

const RecipeTypeHandler = {
    recipeTypeId: '',
    usableMachines: [],
    componentTransformations: {},

    create: (id) => {
        RecipeTypeHandler.recipeTypeId = id;
        return RecipeTypeHandler;
    },

    setUsableMachines: (usableMachines) => {
        let availableMachines = []
        MachineList.forEach(machine => {
            availableMachines.push(machine.machineId);
        });
        usableMachines.forEach(usableMachine => {
            if (availableMachines.includes(usableMachine)) {
                RecipeTypeHandler.usableMachines.push(usableMachine);
            } else console.warn(`invalid machine for ${RecipeTypeHandler.recipeTypeId}: ${usableMachine}`)
        });
        return RecipeTypeHandler;
    },

    setComponentTransmutation: (transformations) => {
        RecipeTypeHandler.componentTransformations = transformations;
        return RecipeTypeHandler;
    },

    register: () => {
        let recipeObj = {};
        let recipeKeys = Object.keys(RecipeTypeHandler);
        recipeKeys.forEach(recipeKey => {
            if (typeof RecipeTypeHandler[recipeKey] != 'function') {
                recipeObj[recipeKey] = RecipeTypeHandler[recipeKey];
            }
        });
        RecipeTypeList.push(recipeObj);
        RecipeTypeHandler.reset()
        console.log(`   register recipe type: ${recipeObj.recipeTypeId}`);
    },

    reset: () => {
        RecipeTypeHandler.recipeTypeId = '';
        RecipeTypeHandler.usableMachines = [];
        RecipeTypeHandler.componentTransformations = {};
    }
};