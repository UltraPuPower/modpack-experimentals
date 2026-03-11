const materialList = global.MaterialList;
const componentList = global.ComponentList;

ServerEvents.recipes(event => {

    const recipeRegistryHandler = (usedRecipeType, itemI, itemO, fluidI, fluidO, recipeData, recipeId) => {
        let recipeTypeRecipes = RecipeTypeList.find(recipeType => recipeType.recipeTypeId == usedRecipeType);
        let machines = recipeTypeRecipes.usableMachines;

        machines.forEach(usableMachine => {
            let machineObj = MachineList.find(machine => machine.machineId == usableMachine);
            machineObj.recipeFunction(event, itemI, itemO, fluidI, fluidO, recipeData, recipeId);
        });
    };

    const generateFluidRecipes = (materialObj) => {
        const { id, colors, components, composition, textureSet, textureOverrides, itemOverrides } = materialObj;

        for (let i = 0; i < components.length; i++) {
            let component = components[i];
            let componentObj = componentList.find(componentObj => componentObj.id == component);
            
            let liquidVolume = componentObj.liquidAmount;

            if (!liquidVolume) continue;

            recipeRegistryHandler('liquefying', [itemHandler.createComponentItemStack(id, component, 1)], [], [], [fluidHandler.createComponentFluidStack(id, 'liquid', liquidVolume)],  {heatlevel: 320}, `/liquefying/${id}_${component}`);

            if(!componentObj.generateMoldItem) continue;

            let fluidMold = itemHandler.createItemStack(`materiallib:empty_${component}_casting_mold`, 1)

            recipeRegistryHandler('solidifying', [fluidMold], [itemHandler.createComponentItemStack(id, component, 1), fluidMold], [fluidHandler.createComponentFluidStack(id, 'liquid', liquidVolume)], [], {}, `/solidifying/${id}_${component}`);

        }

    };

    materialList.forEach(materialObj => {
        const { id, colors, components, composition, textureSet, textureOverrides, itemOverrides, dataObject } = materialObj;

        if(components.includes('liquid')) generateFluidRecipes(materialObj);

        // Basic ingot components
        if(components.includes('nugget')) {
            recipeRegistryHandler('compressing', [itemHandler.createComponentItemStack(id, 'nugget', 1)], [itemHandler.createComponentItemStack(id, 'ingot', 1)], [], [], dataObject, false);
        }

        if(components.includes('ingot')) {
            recipeRegistryHandler('blasting', [itemHandler.createComponentItemStack(id, 'dust', 1)], [itemHandler.createComponentItemStack(id, 'ingot', 1)], [], [], {heatlevel: 300}, `${id}_ingot`);
            recipeRegistryHandler('crushing', [itemHandler.createComponentItemStack(id, 'ingot', 1)], [itemHandler.createComponentItemStack(id, 'dust', 1)], [], [], {toughness: 100}, `${id}_ingot`);
        }

        if(components.includes('block')) {
            recipeRegistryHandler('compressing', [itemHandler.createComponentItemStack(id, 'ingot', 1)], [itemHandler.createComponentItemStack(id, 'block', 1)], [], [], dataObject, false);
        }

        // Basic gem components
        if(components.includes('gem')) {
            recipeRegistryHandler('crushing', [itemHandler.createComponentItemStack(id, 'gem', 1)], [itemHandler.createComponentItemStack(id, 'dust', 1)], [], [], {toughness: 100}, `${id}_gem`);
        }

        if(components.includes('gem_block')) {
            recipeRegistryHandler('compressing', [itemHandler.createComponentItemStack(id, 'gem', 1)], [itemHandler.createComponentItemStack(id, 'gem_block', 1)], [], [], dataObject, false);
        }

        if(components.includes('dust_block')) {
            recipeRegistryHandler('compressing', [itemHandler.createComponentItemStack(id, 'dust', 1)], [itemHandler.createComponentItemStack(id, 'dust_block', 1)], [], [], dataObject, false);
        }

        // Processed Components
        if(components.includes('plate')) {
            recipeRegistryHandler('pressing', [itemHandler.createComponentItemStack(id, 'ingot', 1)], [itemHandler.createComponentItemStack(id, 'plate', 1)], [], [], {}, `${id}_plate`);
            recipeRegistryHandler('crushing', [itemHandler.createComponentItemStack(id, 'plate', 1)], [itemHandler.createComponentItemStack(id, 'dust', 1)], [], [], {toughness: 300}, `${id}_plate`);
        }

        if(components.includes('rod')) {
            recipeRegistryHandler('cutting', [itemHandler.createComponentItemStack(id, 'ingot', 1)], [itemHandler.createComponentItemStack(id, 'rod', 2)], [], [], {}, `${id}_rod`);
        }

        if(components.includes('bolt')) {
            recipeRegistryHandler('cutting', [itemHandler.createComponentItemStack(id, 'rod', 1)], [itemHandler.createComponentItemStack(id, 'bolt', 4)], [], [], {}, `${id}_bolt`);
        }

        if(components.includes('screw')) {
            recipeRegistryHandler('pressing', [itemHandler.createComponentItemStack(id, 'bolt', 1)], [itemHandler.createComponentItemStack(id, 'screw', 1)], [], [], {}, `${id}_screw`);
        }

        if(components.includes('wire')) {
            recipeRegistryHandler('cutting', [itemHandler.createComponentItemStack(id, 'plate', 1)], [itemHandler.createComponentItemStack(id, 'wire', 4)], [], [], {}, `${id}_wire`);
        }

        if(components.includes('gear')) {
            recipeRegistryHandler('shaped', [], [itemHandler.createComponentItemStack(id, 'gear', 1)], [], [], {shaped: {pattern: ['aba', 'b b', 'aba'], key: {a: `materiallib:${id}_rod`, b: `materiallib:${id}_plate`}}}, `${id}_gear`);
        }

    });

});