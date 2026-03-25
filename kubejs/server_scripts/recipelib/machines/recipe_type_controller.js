// priority: 100000
const recipeConsole = Java.createConsole("MaterialLib/Recipe Console");

const RecipeTypeList = [];

// Meant for auto-gen
const RecipeTypeHandler = {
    result: {
        recipeTypeId: '',
        usableMachines: []
    },

    create: (id) => {
        RecipeTypeHandler.result.recipeTypeId = id;
        recipeConsole.log(`Created recipe type: ${id}`);
        return RecipeTypeHandler;
    },

    setUsableMachine: (machine) => {
        RecipeTypeHandler.result.usableMachines.push(machine);
        return RecipeTypeHandler;
    },

    register: () => {
        let recipeObj = RecipeTypeHandler.result;
        RecipeTypeList.push(recipeObj);
        RecipeTypeHandler.reset()
        recipeConsole.log(`   Registered recipe type: ${recipeObj.recipeTypeId}`);
    },

    reset: () => {
        RecipeTypeHandler.result = {
            recipeTypeId: '',
            usableMachines: []
        };
    }
};