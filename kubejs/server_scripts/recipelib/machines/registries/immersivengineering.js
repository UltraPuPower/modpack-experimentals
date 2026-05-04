// priority: 99998
// requires: immersiveengineering
// author: UltraPuPower1

function immersiveItemFixer(itemIngredient) {
    if (itemIngredient.count == 1) return itemIngredient

    let itemKeys = Object.keys(itemIngredient)
    let predicateKey = (itemKeys.includes('tag')) ? 'tag' : 'item'

    let newItem = {
        "basePredicate": {},
        "count": itemIngredient.count
    };
    newItem.basePredicate[predicateKey] = itemIngredient[predicateKey]

    return newItem;
}

MachineHandler.create('immersiveengineering:alloy_kiln')
    .setIO(2, 1, false, false, false, false)
    .addToRecipeTypes(['primitive_alloying'])
    .setRecipeFunction((event, itemI, itemO, fluidI, fluidO, chemicalI, chemicalO, recipeData, recipeId) => {
        let recipeJson = {
            "type": "immersiveengineering:alloy",
            "input0": immersiveItemFixer(itemI[0].getIngredient()),
            "input1": immersiveItemFixer(itemI[1].getIngredient()),
            "result": itemO[0].getItemStack()
        };

        event.custom(recipeJson).id(recipeId);
    })
    .register();

MachineHandler.create('immersiveengineering:arc_furnace')
    .setIO(5, 1, false, false, false, false)
    .addToRecipeTypes(['alloying', 'primitive_alloying'])
    .setRecipeFunction((event, itemI, itemO, fluidI, fluidO, chemicalI, chemicalO, recipeData, recipeId) => {
        let recipeJson = {
            "type": "immersiveengineering:arc_furnace",
            "additives": [],
            "input": immersiveItemFixer(itemI[0].getIngredient()),
            "results": [immersiveItemFixer(itemO[0].getIngredient())],
            "energy": (recipeData.energy) ? recipeData.energy : 51200,
            "time": (recipeData.duration) ? recipeData.duration : 100
        };

        for(let i = 1; i < itemI.length; i++) {
            recipeJson.additives.push(immersiveItemFixer(itemI[i].getIngredient()))
        }

        if (recipeData.wasteProduct) recipeJson.slag = {"item": recipeData.wasteProduct}

        event.custom(recipeJson).id(recipeId);
    })
    .register();

MachineHandler.create('immersiveengineering:blast_furnace')
    .setIO(5, 1, false, false, false, false)
    .addToRecipeTypes(['blasting'])
    .setRecipeFunction((event, itemI, itemO, fluidI, fluidO, chemicalI, chemicalO, recipeData, recipeId) => {
        let recipeJson = {
            "type": "immersiveengineering:blast_furnace",
            "input": immersiveItemFixer(itemI[0].getIngredient()),
            "result": [immersiveItemFixer(itemO[0].getIngredient())],
            "time": (recipeData.duration) ? recipeData.duration : 500
        };

        if (!recipeData.melting_point || (recipeData.melting_point < 900 || recipeData.melting_point > 1800)) return

        if (recipeData.wasteProduct) recipeJson.slag = {"item": recipeData.wasteProduct}

        event.custom(recipeJson).id(recipeId);
    })
    .register();

MachineHandler.create('immersiveengineering:blast_furnace_fuel')
    .setIO(5, 1, false, false, false, false)
    .addToRecipeTypes(['blast_furnace_fuel'])
    .setRecipeFunction((event, itemI, itemO, fluidI, fluidO, chemicalI, chemicalO, recipeData, recipeId) => {
        let recipeJson = {
            "type": "immersiveengineering:blast_furnace_fuel",
            "input": itemI[0].getIngredient(),
            "time": (recipeData.duration) ? recipeData.duration : 100
        };

        event.custom(recipeJson).id(recipeId);
    })
    .register();

MachineHandler.create('immersiveengineering:engineers_workbench')
    .setIO(6, 1, false, false, false, false)
    .addToRecipeTypes(['blueprint_crafting'])
    .setRecipeFunction((event, itemI, itemO, fluidI, fluidO, chemicalI, chemicalO, recipeData, recipeId) => {
        if (!recipeData.blueprint) {console.warn(`Failed to create recipe with id "${recipeId}"; Blueprint crafting requires category for blueprint`); return}
        let recipeJson = {
            "type": "immersiveengineering:blueprint",
            "category": recipeData.blueprint,
            "inputs": [],
            "result": itemO[0].getItemStack(),
        };

        itemI.forEach(item => recipeJson.inputs.push(immersiveItemFixer(item.getIngredient())));

        event.custom(recipeJson).id(recipeId);
    })
    .register();

MachineHandler.create('immersiveengineering:bottling_machine')
    .setIO(1, 1, 1, false, false, false)
    .addToRecipeTypes(['filling'])
    .setRecipeFunction((event, itemI, itemO, fluidI, fluidO, chemicalI, chemicalO, recipeData, recipeId) => {
        let recipeJson = {
            "type": "immersiveengineering:bottling_machine",
            "fluid": fluidI[0].getIngredient(),
            "input": itemI[0].getIngredient(),
            "results": [itemO[0].getItemStack()],
        };

        event.custom(recipeJson).id(recipeId);
    })
    .register();

MachineHandler.create('immersiveengineering:garden_cloche')
    .setIO(2, 4, 1, false, false, false)
    .addToRecipeTypes(['crop_growing'])
    .setRecipeFunction((event, itemI, itemO, fluidI, fluidO, chemicalI, chemicalO, recipeData, recipeId) => {
        let recipeJson = {
            "type": "immersiveengineering:cloche",
            "fluid": (fluidI[0]) ? fluidI[0].getIngredient() : "minecraft:water",
            "input": itemI[0].getIngredient(),
            "render": {
                "type": (recipeData.display && recipeData.display.type) ? recipeData.display.type : "immersiveengineering:generic",
                "block":(recipeData.display && recipeData.display.block) ? recipeData.display.block : "minecraft:oak_sapling"
            },
            "results": [itemO[0].getItemStack()],
            "soil": (itemI[1]) ? itemI[1].getIngredient() : "minecraft:dirt",
            "time": (recipeData.duration) ? recipeData.duration : 100
        };

        event.custom(recipeJson).id(recipeId);
    })
    .register();

MachineHandler.create('immersiveengineering:coke_oven')
    .setIO(1, 1, false, 1, false, false)
    .addToRecipeTypes(['coke_oven'])
    .setRecipeFunction((event, itemI, itemO, fluidI, fluidO, chemicalI, chemicalO, recipeData, recipeId) => {
        let recipeJson = {
            "type": "immersiveengineering:coke_oven",
            "creosote": (fluidO[0]) ? fluidO[0].amount : 500,
            "input": immersiveItemFixer(itemI[0].getIngredient()),
            "result": immersiveItemFixer(itemO[0].getIngredient()),
            "time": (recipeData.duration) ? recipeData.duration : 1000
        };

        event.custom(recipeJson).id(recipeId);
    })
    .register();

MachineHandler.create('immersiveengineering:crusher')
    .setIO(1, 1, false, false, false, false)
    .addToRecipeTypes(['crushing', 'pulverizing'])
    .setRecipeFunction((event, itemI, itemO, fluidI, fluidO, chemicalI, chemicalO, recipeData, recipeId) => {
        let recipeJson = {
            "type": "immersiveengineering:crusher",
            "energy": (recipeData.energy) ? recipeData.energy : 1600,
            "input": immersiveItemFixer(itemI[0].getIngredient()),
            "result": itemO[0].getItemStack(),
            // "secondaries": [
            //     {
            //         "chance": 0.5,
            //         "output": {
            //             "tag": "c:dusts/sulfur"
            //         }
            //     }
            // ]
        };

        event.custom(recipeJson).id(recipeId);
    })
    .register();

MachineHandler.create('immersiveengineering:fermenter')
    .setIO(1, false, false, 1, false, false)
    .addToRecipeTypes(['fermenting'])
    .setRecipeFunction((event, itemI, itemO, fluidI, fluidO, chemicalI, chemicalO, recipeData, recipeId) => {
        let recipeJson = {
            "type": "immersiveengineering:fermenter",
            "energy": (recipeData.energy) ? recipeData.energy : 1600,
            "input": immersiveItemFixer(itemI[0].getIngredient()),
            "fluid": fluidO[0].getFluidStack()
        };

        event.custom(recipeJson).id(recipeId);
    })
    .register();

MachineHandler.create('immersiveengineering:fertilizer')
    .setIO(1, false, false, 1, false, false)
    .addToRecipeTypes(['fertilizer'])
    .setRecipeFunction((event, itemI, itemO, fluidI, fluidO, chemicalI, chemicalO, recipeData, recipeId) => {
        if (!recipeData.multiplier) {console.warn(`Failed to create recipe with id "${recipeId}"; Fertilizer recipes require a multiplier`); return}
        let recipeJson = {
            "type": "immersiveengineering:fertilizer",
            "growthModifier": recipeData.multiplier,
            "input": immersiveItemFixer(itemI[0].getIngredient())
        };

        event.custom(recipeJson).id(recipeId);
    })
    .register();

MachineHandler.create('immersiveengineering:metal_press')
    .setIO(2, 1, false, false, false, false)
    .addToRecipeTypes(['extruder'])
    .setRecipeFunction((event, itemI, itemO, fluidI, fluidO, chemicalI, chemicalO, recipeData, recipeId) => {
        let recipeJson = {
            "type": "immersiveengineering:metal_press",
            "input": itemI[0].getIngredient(),
            "mold": itemI[1].id,
            "result": itemO[0].getIngredient(),
            "energy": (recipeData.energy) ? recipeData.energy : 1600
        };

        event.custom(recipeJson).id(recipeId);
    })
    .register();

MachineHandler.create('immersiveengineering:mixer')
    .setIO(6, false, 1, 1, false, false)
    .addToRecipeTypes(['mixing'])
    .setRecipeFunction((event, itemI, itemO, fluidI, fluidO, chemicalI, chemicalO, recipeData, recipeId) => {
        let recipeJson = {
            "type": "immersiveengineering:mixer",
            "inputs": [],
            "fluid": fluidI[0].getIngredient(),
            "result": fluidO[0].getFluidStack(),
            "energy": (recipeData.energy) ? recipeData.energy : 1600
        };

        itemI.forEach(item => recipeJson.inputs.push(immersiveItemFixer(item.getIngredient())));

        event.custom(recipeJson).id(recipeId);
    })
    .register();

MachineHandler.create('immersiveengineering:refinery')
    .setIO(1, false, 2, 1, false, false)
    .addToRecipeTypes(['refining'])
    .setRecipeFunction((event, itemI, itemO, fluidI, fluidO, chemicalI, chemicalO, recipeData, recipeId) => {
        let recipeJson = {
            "type": "immersiveengineering:refinery",
            "catalyst": {},
            "input0": fluidI[0].getIngredient(),
            "input1": fluidI[1].getIngredient(),
            "result": fluidO[0].getFluidStack(),
            "energy": (recipeData.energy) ? recipeData.energy : 1600
        };

        recipeJson.catalyst[(Object.keys(itemI[0]).includes('tag')) ? 'tag' : 'item'] = itemI[0].id

        event.custom(recipeJson).id(recipeId);
    })
    .register();

MachineHandler.create('immersiveengineering:sawmill')
    .setIO(1, 1, false, false, false, false)
    .addToRecipeTypes(['cutting'])
    .setRecipeFunction((event, itemI, itemO, fluidI, fluidO, chemicalI, chemicalO, recipeData, recipeId) => {
        let recipeJson = {
            "type": "immersiveengineering:sawmill",
            "input": itemI[0].getIngredient(),
            "result": itemO[0].getItemStack(),
            "energy": (recipeData.energy) ? recipeData.energy : 1600,
            // "secondaryOutputs": [
            //     {
            //         "chance": 0.5,
            //         "output": {
            //             "tag": "c:dusts/sulfur"
            //         }
            //     }
            // ]
        };

        event.custom(recipeJson).id(recipeId);
    })
    .register();

MachineHandler.create('immersiveengineering:squeezer')
    .setIO(1, 1, false, 1, false, false)
    .addToRecipeTypes(['squeezing'])
    .setRecipeFunction((event, itemI, itemO, fluidI, fluidO, chemicalI, chemicalO, recipeData, recipeId) => {
        let recipeJson = {
            "type": "immersiveengineering:squeezer",
            "fluid": fluidO[0].getFluidStack(),
            "input": immersiveItemFixer(itemI[0].getIngredient()),
            "result": itemO[0].getIngredient(),
            "energy": (recipeData.energy) ? recipeData.energy : 1600
        };

        event.custom(recipeJson).id(recipeId);
    })
    .register();

MachineHandler.create('immersiveengineering:squeezer')
    .setIO(1, 1, false, 1, false, false)
    .addToRecipeTypes(['squeezing'])
    .setRecipeFunction((event, itemI, itemO, fluidI, fluidO, chemicalI, chemicalO, recipeData, recipeId) => {
        let recipeJson = {
            "type": "immersiveengineering:squeezer",
            "fluid": fluidO[0].getFluidStack(),
            "input": immersiveItemFixer(itemI[0].getIngredient()),
            "result": itemO[0].getIngredient(),
            "energy": (recipeData.energy) ? recipeData.energy : 1600
        };

        event.custom(recipeJson).id(recipeId);
    })
    .register();

MachineHandler.create('immersiveengineering:windmill')
    .setIO(false, false, false, false, false, false)
    .addToRecipeTypes(['windmill_biomes'])
    .setRecipeFunction((event, itemI, itemO, fluidI, fluidO, chemicalI, chemicalO, recipeData, recipeId) => {
        if (!recipeData.multiplier) {console.warn(`Failed to create recipe with id "${recipeId}"; Windmill recipes require a multiplier`); return}
        if (!recipeData.biomeTag) {console.warn(`Failed to create recipe with id "${recipeId}"; Windmill recipes require a biome tag`); return}
        let recipeJson = {
            "type": "immersiveengineering:windmill_biome",
            "biomeTag": recipeData.biomeTag,
            "modifier": recipeData.multiplier
        };

        event.custom(recipeJson).id(recipeId);
    })
    .register();

MachineHandler.create('immersiveengineering:thermoelectric_generator')
    .setIO(1, false, false, false, false, false)
    .addToRecipeTypes(['thermoelectric_generator_sources'])
    .setRecipeFunction((event, itemI, itemO, fluidI, fluidO, chemicalI, chemicalO, recipeData, recipeId) => {
        if (!recipeData.temperature) {console.warn(`Failed to create recipe with id "${recipeId}"; Thermoelectric recipes require a temperature`); return}
        let recipeJson = {
            "type": "immersiveengineering:thermoelectric_source",
            "singleBlock": itemI[0].id,
            "tempKelvin": recipeData.temperature
        };

        event.custom(recipeJson).id(recipeId);
    })
    .register();