// priority: 100
// requires: mekanism
// author: UltraPuPower1

materialList.forEach(materialObj => {
    const { id, colors, components, composition, textureSet, textureOverrides, itemOverrides, dataObject } = materialObj;

    // Ore proc
    if(components.includes('crushed_raw')) {
        let resultSize = 1;
        if (dataObject.ore && dataObject.ore.harvestSize) resultSize = dataObject.ore.harvestSize;

        recipeBuilder.recipeType('pulverizing').id(`materiallib:raw_${id}`)
            .itemInputs([createComponentItemStack(id, 'raw', 1)])
            .itemOutputs([createComponentItemStack(id, 'crushed_raw', 2*resultSize)])
            .setRecipeData({tickUsage: true})
            .register();

        recipeBuilder.recipeType('pulverizing').id(`materiallib:raw_${id}_block`)
            .itemInputs([createComponentItemStack(id, 'raw_block', 1)])
            .itemOutputs([createComponentItemStack(id, 'crushed_raw', 18*resultSize)])
            .setRecipeData({tickUsage: true})
            .register();

        recipeBuilder.recipeType('pulverizing').id(`materiallib:${id}_ore`)
            .itemInputs([`1x #c:ores/${id}`])
            .itemOutputs([createComponentItemStack(id, 'crushed_raw', 3*resultSize)])
            .setRecipeData({tickUsage: true})
            .register();

        let componentResult = createComponentItemStack(id, 'dust', 1);
        if (components.includes('nugget')) componentResult = createComponentItemStack(id, 'nugget', 9);

        recipeBuilder.recipeType('splashing').id(`materiallib:crushed_raw_${id}`)
            .itemInputs([createComponentItemStack(id, 'crushed_raw', 1)])
            .itemOutputs([componentResult])
            .setRecipeData({tickUsage: true})
            .register();
    }

});