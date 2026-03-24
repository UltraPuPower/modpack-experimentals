// priority: 100000
const recipeConsole = Java.createConsole("MaterialLib/Recipe Console");

const RecipeTypeList = [];

// Meant for auto-gen
const RecipeTypeHandler = {
    recipeTypeId: '',
    usableMachines: [],

    create: (id) => {
        RecipeTypeHandler.recipeTypeId = id;
        recipeConsole.log(`Created recipe type: ${id}`);
        return RecipeTypeHandler;
    },

    setUsableMachine: (machine) => {
        RecipeTypeHandler.usableMachines.push(machine);
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
        recipeConsole.log(`   Registered recipe type: ${recipeObj.recipeTypeId}`);
    },

    reset: () => {
        RecipeTypeHandler.recipeTypeId = '';
        RecipeTypeHandler.usableMachines = [];
        RecipeTypeHandler.componentTransformations = {};
    }
};