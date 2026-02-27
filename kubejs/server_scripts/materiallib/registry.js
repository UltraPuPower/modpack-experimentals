ServerEvents.recipes(event => {
    const materialList = global.MaterialList;
    const componentList = global.ComponentList;

    let dustItem = [itemHandler.createItemStack('materiallib:bronze_dust', 1)];
    let ingotItem = [itemHandler.createItemStack('materiallib:bronze_ingot', 1)];
    let nuggetItem = [itemHandler.createItemStack('materiallib:bronze_nugget', 1)];
    let plateItem = [itemHandler.createItemStack('materiallib:bronze_plate', 1)];

    let pressingRecipe = RecipeTypeList.find(recipeType => recipeType.recipeTypeId == 'pressing');
    let presses = pressingRecipe.usableMachines;

    [
        {usedRecipeType: 'pressing', itemI: ingotItem, itemO: plateItem, recipeData: {}},
        {usedRecipeType: 'blasting', itemI: dustItem, itemO: ingotItem, recipeData: {}},
        {usedRecipeType: 'compressing', itemI: nuggetItem, itemO: ingotItem, recipeData: {}}
    ].forEach(recipeObj =>{
        const { usedRecipeType, itemI, itemO, recipeData} = recipeObj;
        let recipeTypeRecipes = RecipeTypeList.find(recipeType => recipeType.recipeTypeId == usedRecipeType);
        let machines = recipeTypeRecipes.usableMachines;

        machines.forEach(usableMachine => {
            let machineObj = MachineList.find(machine => machine.machineId == usableMachine);
            machineObj.recipeFunction(event, itemI, itemO, [], [], recipeData);
        });
    });

//  // ================================================================================================================
    // const generateLiquidRecipes = (component, materialid, solid) => {
    //     let componentObj = componentList.find(newComponent => newComponent.id == component);
    //     let liquidAmount = componentObj.liquidAmount;

    //     liquefierRecipes(solid, Fluid.of(`materiallib:liquid_${materialid}`, liquidAmount));

    //     if (componentObj.generateMoldItem) {
    //         solidifyingRecipes([`materialLib:empty_${component}_casting_mold`, Fluid.of(`materiallib:liquid_${materialid}`, liquidAmount)], solid);
    //     }
    // };

    // const liquefierRecipes = (input, output) => {
    //     event.recipes.create.mixing(output, input).heated();
    // };

    // const solidifyingRecipes = (input, output) => {
    //     console.log(`solidifying ${output}`);
    // };

    // const gearRecipes = (material) => {
    //     event.shaped(`materiallib:${material}_gear`, [
    //         'ABA',
    //         'B B',
    //         'ABA'], {
    //         A: `materiallib:${material}_rod`,
    //         B: `materiallib:${material}_plate`
    //     });
    // };

    // materialList.forEach(material => {
    //     const { id, colors, components, composition, textureSet, textureOverrides, itemOverrides } = material;

    //     let items = {};
    //     components.forEach(component => {
    //         items[component] = (itemOverrides[component]) ? itemOverrides[component] : `materiallib:${id}_${component}`;
    //     });

    //     if (components.find(component => component == 'liquid')) {
    //         components.forEach(component => {
    //             let componentObj = componentList.find(newComponent => newComponent.id == component);
    //             if (componentObj.liquidAmount) {
    //                 generateLiquidRecipes(component, id, items[component]);
    //             }
    //         });
    //     }

    //     if (components.find(component => component == 'ingot')) {
    //         smeltingRecipes(items['dust'], items['ingot'], false);
    //         crushingRecipes(items['ingot'], items['dust']);
    //     }

    //     if (components.find(component => component == 'plate')) {
    //         pressingRecipes(items['ingot'], items['plate']);
    //         crushingRecipes(items['plate'], items['dust']);
    //     }

    //     if (components.find(component => component == 'nugget')) {
    //         compressedRecipes(items['nugget'], items['ingot']);
    //     }

    //     if (components.find(component => component == 'block')) {
    //         compressedRecipes(items['ingot'], items['block']);
    //     }

    //     if (components.find(component => component == 'gem_block')) {
    //         compressedRecipes(items['gem'], items['gem_block']);
    //     }

    //     if (components.find(component => component == 'gem')) {
    //         crushingRecipes(items['gem'], items['dust']);
    //     }

    //     if (components.find(component => component == 'rod')) {
    //         cuttingRecipes(items['ingot'], Item.of(items['rod'], 2));
    //     }

    //     if (components.find(component => component == 'bolt')) {
    //         cuttingRecipes(items['rod'], Item.of(items['bolt'], 4));
    //     }

    //     if (components.find(component => component == 'screw')) {
    //         pressingRecipes(items['bolt'], items['screw']);
    //     }

    //     if (components.find(component => component == 'wire')) {
    //         cuttingRecipes(items['plate'], Item.of(items['wire'], 2));
    //     }

    //     if (components.find(component => component == 'gear')) {
    //         gearRecipes(id);
    //     }

    //     if (components.find(component => component == 'foil')) {
    //         rollingRecipes(items['plate'], Item.of(items['foil'], 4));
    //     }


    // });
});