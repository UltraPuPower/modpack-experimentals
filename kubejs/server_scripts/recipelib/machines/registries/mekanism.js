// priority: 99998
// requires: mekanism
// author: UltraPuPower1

MachineHandler.create('mekanism:crusher')
    .setIO(1, 1, false, false, false, false)
    .addToRecipeTypes(['crushing'])
    .setRecipeFunction((event, itemI, itemO, fluidI, fluidO, chemicalI, chemicalO, recipeData, recipeId) => {
        let recipeJson = {
            "type": "mekanism:crushing",
            "input": itemI[0].getIngredient(),
            "output": itemO[0].getItemStack()
        };

        event.custom(recipeJson).id(recipeId);
    })
    .register();

MachineHandler.create('mekanism:precision_sawmill')
    .setIO(1, 2, false, false, false, false)
    .addToRecipeTypes(['cutting'])
    .setRecipeFunction((event, itemI, itemO, fluidI, fluidO, chemicalI, chemicalO, recipeData, recipeId) => {
        let recipeJson = {
            "type": "mekanism:sawing",
            "input": itemI[0].getIngredient(),
            "main_output": itemO[0].getItemStack()
        };

        if (itemO[1]) {
            recipeJson["secondary_output"] = itemO[1].getItemStack();
            recipeJson["secondary_chance"] = recipeData.odds ? recipeData.odds: 0.5;
        };

        event.custom(recipeJson).id(recipeId);
    })
    .register();

MachineHandler.create('mekanism:enrichment_chamber')
    .setIO(1, 1, false, false, false, false)
    .addToRecipeTypes(['enriching'])
    .setRecipeFunction((event, itemI, itemO, fluidI, fluidO, chemicalI, chemicalO, recipeData, recipeId) => {
        let recipeJson = {
            "type": "mekanism:enriching",
            "input": itemI[0].getIngredient(),
            "output": itemO[0].getItemStack()
        };

        event.custom(recipeJson).id(recipeId);
    })
    .register();

MachineHandler.create('mekanism:combiner')
    .setIO(2, 1, false, false)
    .addToRecipeTypes(['combining'])
    .setRecipeFunction((event, itemI, itemO, fluidI, fluidO, chemicalI, chemicalO, recipeData, recipeId) => {
        let recipeJson = {
            "type": "mekanism:combining",
            "main_input": itemI[0].getIngredient(),
            "output": itemO[0].getItemStack()
        };

        if (itemI[1]) {
            recipeJson["extra_input"] = itemI[1].getIngredient();
        };

        event.custom(recipeJson).id(recipeId);
    })
    .register();

MachineHandler.create('mekanism:electrolytic_separator')
    .setIO(false, false, 1, false, false, 2)
    .addToRecipeTypes(['electrolysing'])
    .setRecipeFunction((event, itemI, itemO, fluidI, fluidO, chemicalI, chemicalO, recipeData, recipeId) => {
        let recipeJson = {
            "type": "mekanism:separating",
            "input": fluidI[0].getIngredient(),
            "left_chemical_output": chemicalO[0].getFluidStack(),
            "right_chemical_output": chemicalO[1].getFluidStack()
        };

        event.custom(recipeJson).id(recipeId);
    })
    .register();

MachineHandler.create('mekanism:chemical_crystaliser')
    .setIO(false, 1, false, false, 1, false)
    .addToRecipeTypes(['crystallising'])
    .setRecipeFunction((event, itemI, itemO, fluidI, fluidO, chemicalI, chemicalO, recipeData, recipeId) => {
        let recipeJson = {
            "type": "mekanism:crystallizing",
            "input": chemicalI[0].getMekanismChemical(),
            "output": itemO[0].getItemStack()
        };

        event.custom(recipeJson).id(recipeId);
    })
    .register();

MachineHandler.create('mekanism:chemical_dissolution_chamber')
    .setIO(1, false, false, false, 1, 1)
    .addToRecipeTypes(['dissolving'])
    .setRecipeFunction((event, itemI, itemO, fluidI, fluidO, chemicalI, chemicalO, recipeData, recipeId) => {
        let recipeJson = {
            "type": "mekanism:dissolution",
            "item_input": itemI[0].getIngredient(),
            "chemical_input": chemicalI[0].getMekanismChemical(),
            "output": chemicalO[0].getFluidStack(),
            "per_tick_usage": false
        };

        if (recipeData.tickUsage) {
            recipeJson["per_tick_usage"] = recipeData.tickUsage
        }

        event.custom(recipeJson).id(recipeId);
    })
    .register();

MachineHandler.create('mekanism:chemical_washer')
    .setIO(false, false, 1, false, 1, 1)
    .addToRecipeTypes(['chemical_washing'])
    .setRecipeFunction((event, itemI, itemO, fluidI, fluidO, chemicalI, chemicalO, recipeData, recipeId) => {
        let recipeJson = {
            "type": "mekanism:washing",
            "fluid_input": fluidI[0].getIngredient(),
            "chemical_input": chemicalI[0].getMekanismChemical(),
            "output": chemicalO[0].getFluidStack(),
        };

        event.custom(recipeJson).id(recipeId);
    })
    .register();

MachineHandler.create('mekanism:pressurized_reaction_chamber')
    .setIO(1, 1, 1, false, 1, 1)
    .addToRecipeTypes(['pressurized_reaction'])
    .setRecipeFunction((event, itemI, itemO, fluidI, fluidO, chemicalI, chemicalO, recipeData, recipeId) => {
        let recipeJson = {
            "type": "mekanism:reaction",
            "duration": 100
        };

        let input = false;
        let output = false;

        if (itemI[0]) {
            recipeJson["item_input"] = itemI[0].getIngredient();
            input = true;
        }
        if (fluidI[0]) {
            recipeJson["fluid_input"] = fluidI[0].getIngredient();
            input = true;
        }
        if (chemicalI[0]) {
            recipeJson["chemical_input"] = chemicalI[0].getMekanismChemical();
            input = true;
        }
        if (itemO[0]) {
            recipeJson["item_output"] = itemO[0].getItemStack();
            output = true;
        }
        if (chemicalO[0]) {
            recipeJson["chemical_output"] = chemicalO[0].getFluidStack();
            output = true;
        }
        
        if (!(input && output)) {
            console.warn(`aborted recipe generation for id: materiallib/pressurized_reaction/${recipeId}; No input or output`)
            return
        }

        if (recipeData.duration) {
            recipeJson["duration"] = recipeData.duration;
        }

        event.custom(recipeJson).id(recipeId);
    })
    .register();

MachineHandler.create('mekanism:chemical_oxidizer')
    .setIO(1, false, false, false, false, 1)
    .addToRecipeTypes(['oxidizing'])
    .setRecipeFunction((event, itemI, itemO, fluidI, fluidO, chemicalI, chemicalO, recipeData, recipeId) => {
        let recipeJson = {
            "type": "mekanism:oxidizing",
            "input": itemI[0].getIngredient(),
            "output": chemicalO[0].getFluidStack()
        };

        event.custom(recipeJson).id(recipeId);
    })
    .register();

MachineHandler.create('mekanism:rotary_condensator')
    .setIO(false, false, false, 1, 1, false)
    .addToRecipeTypes(['condensating'])
    .setRecipeFunction((event, itemI, itemO, fluidI, fluidO, chemicalI, chemicalO, recipeData, recipeId) => {
        let recipeJson = {
            "type": "mekanism:rotary",
            "fluid_input": fluidI[0].getIngredient(),
            "chemical_input": chemicalI[0].getMekanismChemical(),
            "fluid_output": fluidO[0].getFluidStack(),
            "chemical_output": chemicalO[0].getFluidStack()
        };

        event.custom(recipeJson).id(recipeId);
    })
    .register();

MachineHandler.create('mekanism:metallurgic_infuser')
    .setIO(1, 1, false, false, 1, false)
    .addToRecipeTypes(['infusing'])
    .setRecipeFunction((event, itemI, itemO, fluidI, fluidO, chemicalI, chemicalO, recipeData, recipeId) => {
        let recipeJson = {
            "type": "mekanism:metallurgic_infusing",
            "item_input": itemI[0].getIngredient(),
            "chemical_input": chemicalI[0].getMekanismChemical(),
            "output": itemO[0].getItemStack(),
            "per_tick_usage": false
        };

        if (recipeData.tickUsage) {
            recipeJson["per_tick_usage"] = recipeData.tickUsage
        }

        event.custom(recipeJson).id(recipeId);
    })
    .register();

MachineHandler.create('mekanism:chemical_injection_chamber')
    .setIO(1, 1, false, false, 1, false)
    .addToRecipeTypes(['chemical_injection'])
    .setRecipeFunction((event, itemI, itemO, fluidI, fluidO, chemicalI, chemicalO, recipeData, recipeId) => {
        let recipeJson = {
            "type": "mekanism:injecting",
            "item_input": itemI[0].getIngredient(),
            "chemical_input": chemicalI[0].getMekanismChemical(),
            "output": itemO[0].getItemStack(),
            "per_tick_usage": false
        };

        if (recipeData.tickUsage) {
            recipeJson["per_tick_usage"] = recipeData.tickUsage
        }

        event.custom(recipeJson).id(recipeId);
    })
    .register();

MachineHandler.create('mekanism:purification_chamber')
    .setIO(1, 1, false, false, 1, false)
    .addToRecipeTypes(['purifying'])
    .setRecipeFunction((event, itemI, itemO, fluidI, fluidO, chemicalI, chemicalO, recipeData, recipeId) => {
        let recipeJson = {
            "type": "mekanism:purifying",
            "item_input": itemI[0].getIngredient(),
            "chemical_input": chemicalI[0].getMekanismChemical(),
            "output": itemO[0].getItemStack(),
            "per_tick_usage": false
        };

        if (recipeData.tickUsage) {
            recipeJson["per_tick_usage"] = recipeData.tickUsage
        }

        event.custom(recipeJson).id(recipeId);
    })
    .register();

MachineHandler.create('mekanism:osmium_compressor')
    .setIO(1, 1, false, false, 1, false)
    .addToRecipeTypes(['injection_compression'])
    .setRecipeFunction((event, itemI, itemO, fluidI, fluidO, chemicalI, chemicalO, recipeData, recipeId) => {
        let recipeJson = {
            "type": "mekanism:compressing",
            "item_input": itemI[0].getIngredient(),
            "chemical_input": chemicalI[0].getMekanismChemical(),
            "output": itemO[0].getItemStack(),
            "per_tick_usage": false
        };

        if (recipeData.tickUsage) {
            recipeJson["per_tick_usage"] = recipeData.tickUsage
        }

        event.custom(recipeJson).id(recipeId);
    })
    .register();

MachineHandler.create('mekanism:chemical_infuser')
    .setIO(1, 1, false, false, 1, false)
    .addToRecipeTypes(['chemical_infusing'])
    .setRecipeFunction((event, itemI, itemO, fluidI, fluidO, chemicalI, chemicalO, recipeData, recipeId) => {
        let recipeJson = {
            "type": "mekanism:chemical_infusing",
            "left_input": chemicalI[0].getMekanismChemical(),
            "right_input": chemicalI[1].getMekanismChemical(),
            "output": chemicalO[0].getFluidStack(),
        };

        if (recipeData.tickUsage) {
            recipeJson["per_tick_usage"] = recipeData.tickUsage
        }

        event.custom(recipeJson).id(recipeId);
    })
    .register();