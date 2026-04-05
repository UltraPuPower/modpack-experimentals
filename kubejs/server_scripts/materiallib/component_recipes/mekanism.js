// priority: 100
// requires: mekanism
// author: UltraPuPower1

materialList.forEach(materialObj => {
    const { id, colors, components, composition, textureSet, textureOverrides, itemOverrides, dataObject } = materialObj;

    // Ore proc
    if(components.includes('dirty_dust')) {
        recipeBuilder.recipeType('chemical_washing').id(`materiallib:clean_${id}_slurry`)
            .fluidInputs([new FluidHandler('minecraft:water', 5)])
            .chemicalInputs([createComponentFluidStack(id, 'dirty_slurry', 1)])
            .chemicalOutputs([createComponentFluidStack(id, 'clean_slurry', 1)])
            .register();
            
        recipeBuilder.recipeType('crystallising').id(`materiallib:${id}_crystal`)
            .chemicalInputs([createComponentFluidStack(id, 'clean_slurry', 200)])
            .itemOutputs([createComponentItemStack(id, 'crystal', 1)])
            .register();
            
        recipeBuilder.recipeType('chemical_injection').id(`materiallib:${id}_shard`)
            .chemicalInputs([new FluidHandler('mekanism:hydrogen_chloride', 1)])
            .itemInputs([createComponentItemStack(id, 'crystal', 1)])
            .itemOutputs([createComponentItemStack(id, 'shard', 1)])
            .setRecipeData({tickUsage: true})
            .register();
            
        recipeBuilder.recipeType('purifying').id(`materiallib:${id}_clump`)
            .chemicalInputs([new FluidHandler('mekanism:oxygen', 1)])
            .itemInputs([createComponentItemStack(id, 'shard', 1)])
            .itemOutputs([createComponentItemStack(id, 'clump', 1)])
            .setRecipeData({tickUsage: true})
            .register();
            
        recipeBuilder.recipeType('crushing').id(`materiallib:dirty_${id}_dust`)
            .itemInputs([createComponentItemStack(id, 'clump', 1)])
            .itemOutputs([createComponentItemStack(id, 'dirty_dust', 1)])
            .register();
            
        recipeBuilder.recipeType('enriching').id(`materiallib:${id}_dust`)
            .itemInputs([createComponentItemStack(id, 'dirty_dust', 1)])
            .itemOutputs([createComponentItemStack(id, 'dust', 1)])
            .register();
    }

});