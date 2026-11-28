// priority: 100
// requires: mekanism
// author: UltraPuPower1

materialList.forEach(materialObj => {
    const { id, colors, components, composition, textureSet, textureOverrides, itemOverrides, dataObject } = materialObj;

    // Ore proc
    if(components.includes('dirty_dust')) {
        let resultSize = 1;
        if (dataObject.ore && dataObject.ore.harvestSize) resultSize = dataObject.ore.harvestSize;

        // dirty slurry
        recipeBuilder.recipeType('dissolving').id(`materiallib:dirty_${id}_slurry_from_ore`)
            .itemInputs([`1x #c:ores/${id}`])
            .chemicalInputs([new FluidHandler('mekanism:sulfuric_acid', 1)])
            .chemicalOutputs([createComponentFluidStack(id, 'dirty_slurry', 1000*resultSize)])
            .setRecipeData({tickUsage: true})
            .register();

        recipeBuilder.recipeType('dissolving').id(`materiallib:dirty_${id}_slurry_from_raw`)
            .itemInputs([createComponentItemStack(id, 'raw', 3)])
            .chemicalInputs([new FluidHandler('mekanism:sulfuric_acid', 1)])
            .chemicalOutputs([createComponentFluidStack(id, 'dirty_slurry', 2000*resultSize)])
            .setRecipeData({tickUsage: true})
            .register();

        recipeBuilder.recipeType('dissolving').id(`materiallib:dirty_${id}_slurry_from_raw_block`)
            .itemInputs([createComponentItemStack(id, 'raw_block', 1)])
            .chemicalInputs([new FluidHandler('mekanism:sulfuric_acid', 2)])
            .chemicalOutputs([createComponentFluidStack(id, 'dirty_slurry', 6000*resultSize)])
            .setRecipeData({tickUsage: true})
            .register();

        // slurry processing
        recipeBuilder.recipeType('chemical_washing').id(`materiallib:clean_${id}_slurry`)
            .fluidInputs([new FluidHandler('minecraft:water', 5)])
            .chemicalInputs([createComponentFluidStack(id, 'dirty_slurry', 1)])
            .chemicalOutputs([createComponentFluidStack(id, 'clean_slurry', 1)])
            .register();
            
        recipeBuilder.recipeType('crystallising').id(`materiallib:${id}_crystal`)
            .chemicalInputs([createComponentFluidStack(id, 'clean_slurry', 200)])
            .itemOutputs([createComponentItemStack(id, 'crystal', 1)])
            .register();
            
        // shards
        recipeBuilder.recipeType('chemical_injection').id(`materiallib:${id}_shard_from_ore`)
            .chemicalInputs([new FluidHandler('mekanism:hydrogen_chloride', 1)])
            .itemInputs([`1x #c:ores/${id}`])
            .itemOutputs([createComponentItemStack(id, 'shard', 4*resultSize)])
            .setRecipeData({tickUsage: true})
            .register();
            
        recipeBuilder.recipeType('chemical_injection').id(`materiallib:${id}_shard_from_raw`)
            .chemicalInputs([new FluidHandler('mekanism:hydrogen_chloride', 1)])
            .itemInputs([createComponentItemStack(id, 'raw', 3)])
            .itemOutputs([createComponentItemStack(id, 'shard', 8*resultSize)])
            .setRecipeData({tickUsage: true})
            .register();
            
        recipeBuilder.recipeType('chemical_injection').id(`materiallib:${id}_shard_from_raw_block`)
            .chemicalInputs([new FluidHandler('mekanism:hydrogen_chloride', 2)])
            .itemInputs([createComponentItemStack(id, 'raw_block', 1)])
            .itemOutputs([createComponentItemStack(id, 'shard', 24*resultSize)])
            .setRecipeData({tickUsage: true})
            .register();

        recipeBuilder.recipeType('chemical_injection').id(`materiallib:${id}_shard_from_crystal`)
            .chemicalInputs([new FluidHandler('mekanism:hydrogen_chloride', 1)])
            .itemInputs([createComponentItemStack(id, 'crystal', 1)])
            .itemOutputs([createComponentItemStack(id, 'shard', 1)])
            .setRecipeData({tickUsage: true})
            .register();
            
        // clumps
        recipeBuilder.recipeType('purifying').id(`materiallib:${id}_clump_from_raw_block`)
            .chemicalInputs([new FluidHandler('mekanism:oxygen', 2)])
            .itemInputs([createComponentItemStack(id, 'raw_block', 1)])
            .itemOutputs([createComponentItemStack(id, 'clump', 18*resultSize)])
            .setRecipeData({tickUsage: true})
            .register();

        recipeBuilder.recipeType('purifying').id(`materiallib:${id}_clump_from_ore`)
            .chemicalInputs([new FluidHandler('mekanism:oxygen', 1)])
            .itemInputs([`1x #c:ores/${id}`])
            .itemOutputs([createComponentItemStack(id, 'clump', 3*resultSize)])
            .setRecipeData({tickUsage: true})
            .register();

        recipeBuilder.recipeType('purifying').id(`materiallib:${id}_clump_from_raw`)
            .chemicalInputs([new FluidHandler('mekanism:oxygen', 1)])
            .itemInputs([createComponentItemStack(id, 'raw', 1)])
            .itemOutputs([createComponentItemStack(id, 'clump', 2*resultSize)])
            .setRecipeData({tickUsage: true})
            .register();

        recipeBuilder.recipeType('purifying').id(`materiallib:${id}_clump_from_shard`)
            .chemicalInputs([new FluidHandler('mekanism:oxygen', 1)])
            .itemInputs([createComponentItemStack(id, 'shard', 1)])
            .itemOutputs([createComponentItemStack(id, 'clump', 1)])
            .setRecipeData({tickUsage: true})
            .register();
            
        // dirty dust
        recipeBuilder.recipeType('crushing').id(`materiallib:dirty_${id}_dust`)
            .itemInputs([createComponentItemStack(id, 'clump', 1)])
            .itemOutputs([createComponentItemStack(id, 'dirty_dust', 1)])
            .register();
            
        // dusts
        recipeBuilder.recipeType('enriching').id(`materiallib:${id}_dust_from_raw_block`)
            .itemInputs([createComponentItemStack(id, 'raw_block', 1)])
            .itemOutputs([createComponentItemStack(id, 'dust', 12*resultSize)])
            .register();
            
        recipeBuilder.recipeType('enriching').id(`materiallib:${id}_dust_from_ore`)
            .itemInputs([`1x #c:ores/${id}`])
            .itemOutputs([createComponentItemStack(id, 'dust', 2*resultSize)])
            .register();
            
        recipeBuilder.recipeType('enriching').id(`materiallib:${id}_dust_from_raw`)
            .itemInputs([createComponentItemStack(id, 'raw', 3)])
            .itemOutputs([createComponentItemStack(id, 'dust', 4*resultSize)])
            .register();

        recipeBuilder.recipeType('enriching').id(`materiallib:${id}_dust_from_dirty_dust`)
            .itemInputs([createComponentItemStack(id, 'dirty_dust', 1)])
            .itemOutputs([createComponentItemStack(id, 'dust', 1)])
            .register();
    }

});