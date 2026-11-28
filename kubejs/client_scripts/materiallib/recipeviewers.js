const itemBlackList = global.itemBlackList;

RecipeViewerEvents.removeRecipes(event => {
    // Hide transformation recipes
    console.log('hiding recipes')
    global.recipeIdStorage.recipeIdList.forEach(recipe => {
        event.remove(recipe)
    });
});

RecipeViewerEvents.removeEntries('item', event => {
    // Hiding items
    console.log('hiding items')
    for (let i = 0; i < itemBlackList.length; i++) {
        let { material, entries } = itemBlackList[i];

        let materialObj = materialList.find(materialObj => materialObj.id == material);
        if (!materialObj) continue

        for (let j = 0; j < entries.length; j++) {
            let { component, itemEntries } = entries[j];

            if (!materialObj.components.includes(component)) continue

            itemEntries.forEach(item => {
                event.remove(item)
            });
        };
    };
});