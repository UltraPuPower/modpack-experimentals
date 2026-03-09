// priority: 100000
const RecipeTypeList = [];

console.log('registering recipe types:');

const RecipeTypeHandler = {
    recipeTypeId: '',
    usableMachines: [],

    create: (id) => {
        RecipeTypeHandler.recipeTypeId = id;
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