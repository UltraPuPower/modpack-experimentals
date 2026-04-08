// priority: 100
// requires: minecraft
// author: UltraPuPower1
const materialList = global.MaterialList;
const componentList = global.ComponentList;

const generateFluidRecipes = (materialObj) => {
    const { id, colors, components, composition, textureSet, textureOverrides, itemOverrides, dataObject } = materialObj;

    for (let i = 0; i < components.length; i++) {
        let component = components[i];
        let componentObj = componentList.find(componentObj => componentObj.id == component);
        
        let liquidVolume = componentObj.liquidAmount;

        if (!liquidVolume) continue;

        if (!dataObject.melting_point) dataObject.melting_point = 320

        recipeBuilder.recipeType('liquefying').id(`materiallib:${id}_${component}`)
            .itemInputs([createComponentItemStack(id, component, 1)])
            .fluidOutputs([createComponentFluidStack(id, 'liquid', liquidVolume)])
            .setRecipeData(dataObject)
            .register();


        if(!componentObj.generateMoldItem) continue;

        let fluidMold = new ItemHandler(`materiallib:empty_${component}_casting_mold`, 1)

        recipeBuilder.recipeType('solidifying').id(`materiallib:${id}_${component}`)
            .itemInputs([fluidMold])
            .fluidInputs([createComponentFluidStack(id, 'liquid', liquidVolume)])
            .itemOutputs([createComponentItemStack(id, component, 1), fluidMold])
            .register();

    }

};

materialList.forEach(materialObj => {
    const { id, colors, components, composition, textureSet, textureOverrides, itemOverrides, dataObject } = materialObj;

    if(components.includes('liquid')) generateFluidRecipes(materialObj);

    // Basic ingot components
    if(components.includes('nugget')) {
        recipeBuilder.recipeType('compressing').id('materiallib:')
            .itemInputs([createComponentItemStack(id, 'nugget', 1)])
            .itemOutputs([createComponentItemStack(id, 'ingot', 1)])
            .setRecipeData(dataObject)
            .register();
    }

    if(components.includes('ingot')) {
        recipeBuilder.recipeType('blasting').id(`materiallib:${id}_ingot`)
            .itemInputs([createComponentItemStack(id, 'dust', 1)])
            .itemOutputs([createComponentItemStack(id, 'ingot', 1)])
            .setRecipeData(dataObject)
            .register();

        recipeBuilder.recipeType('crushing').id(`materiallib:${id}_ingot`)
            .itemInputs([createComponentItemStack(id, 'ingot', 1)])
            .itemOutputs([createComponentItemStack(id, 'dust', 1)])
            .setRecipeData(dataObject)
            .register();
    }

    if(components.includes('block')) {
        recipeBuilder.recipeType('compressing').id('materiallib:')
            .itemInputs([createComponentItemStack(id, 'ingot', 1)])
            .itemOutputs([createComponentItemStack(id, 'block', 1)])
            .setRecipeData(dataObject)
            .register();
    }

    // Basic gem components
    if(components.includes('gem')) {
        recipeBuilder.recipeType('crushing').id(`materiallib:${id}_gem`)
            .itemInputs([createComponentItemStack(id, 'gem', 1)])
            .itemOutputs([createComponentItemStack(id, 'dust', 1)])
            .setRecipeData(dataObject)
            .register();
    }

    if(components.includes('gem_block')) {
        recipeBuilder.recipeType('compressing').id('materiallib:')
            .itemInputs([createComponentItemStack(id, 'gem', 1)])
            .itemOutputs([createComponentItemStack(id, 'gem_block', 1)])
            .setRecipeData(dataObject)
            .register();
    }

    if(components.includes('dust_block')) {
        recipeBuilder.recipeType('compressing').id('materiallib:')
            .itemInputs([createComponentItemStack(id, 'dust', 1)])
            .itemOutputs([createComponentItemStack(id, 'dust_block', 1)])
            .setRecipeData(dataObject)
            .register();
    }

    // Basic ore components
    if(components.includes('raw_block')) {
        recipeBuilder.recipeType('compressing').id('materiallib:')
            .itemInputs([createComponentItemStack(id, 'raw', 1)])
            .itemOutputs([createComponentItemStack(id, 'raw_block', 1)])
            .setRecipeData(dataObject)
            .register();
    }

    if(components.includes('raw')) {
        let componentResult = 'dust';
        if (components.includes('gem')) componentResult = 'gem';
        if (components.includes('ingot')) componentResult = 'ingot';

        let resultSize = 1;
        if (dataObject.ore && dataObject.ore.harvestSize) resultSize = dataObject.ore.harvestSize;

        recipeBuilder.recipeType('blasting').id(`materiallib:raw_${id}_to_${componentResult}`)
            .itemInputs([createComponentItemStack(id, 'raw', 1)])
            .itemOutputs([createComponentItemStack(id, componentResult, resultSize)])
            .setRecipeData(dataObject)
            .register();
    }

    // Processed Components
    if(components.includes('plate')) {
        recipeBuilder.recipeType('pressing').id(`materiallib:${id}_plate`)
            .itemInputs([createComponentItemStack(id, 'ingot', 1)])
            .itemOutputs([createComponentItemStack(id, 'plate', 1)])
            .register();

        recipeBuilder.recipeType('crushing').id(`materiallib:${id}_plate`)
            .itemInputs([createComponentItemStack(id, 'plate', 1)])
            .itemOutputs([createComponentItemStack(id, 'dust', 1)])
            .setRecipeData(dataObject)
            .register();
    }

    if(components.includes('rod')) {
        recipeBuilder.recipeType('cutting').id(`materiallib:${id}_rod`)
            .itemInputs([createComponentItemStack(id, 'ingot', 1)])
            .itemOutputs([createComponentItemStack(id, 'rod', 2)])
            .setRecipeData(dataObject)
            .register();
    }

    if(components.includes('bolt')) {
        recipeBuilder.recipeType('cutting').id(`materiallib:${id}_bolt`)
            .itemInputs([createComponentItemStack(id, 'rod', 1)])
            .itemOutputs([createComponentItemStack(id, 'bolt', 4)])
            .setRecipeData(dataObject)
            .register();
    }

    if(components.includes('screw')) {
        recipeBuilder.recipeType('pressing').id(`materiallib:${id}_screw`)
            .itemInputs([createComponentItemStack(id, 'bolt', 1)])
            .itemOutputs([createComponentItemStack(id, 'screw', 1)])
            .register();
    }

    if(components.includes('wire')) {
        recipeBuilder.recipeType('cutting').id(`materiallib:${id}_wire`)
            .itemInputs([createComponentItemStack(id, 'plate', 1)])
            .itemOutputs([createComponentItemStack(id, 'wire', 4)])
            .setRecipeData(dataObject)
            .register();
    }

    if(components.includes('gear')) {
        dataObject.shaped = {pattern: ['aba', 'b b', 'aba'], key: {a: `materiallib:${id}_rod`, b: `materiallib:${id}_plate`}}
        recipeBuilder.recipeType('shaped').id(`materiallib:${id}_gear`)
            .itemOutputs([createComponentItemStack(id, 'gear', 1)])
            .setRecipeData(dataObject)
            .register();
    }

});