// priority: 99998
// requires: mekanism
// author: UltraPuPower1

MachineHandler.create('crusher')
    .setIO(1, 1, false, false, false, false)
    .addToRecipeTypes(['crushing'])
    .setRecipeFunction((event, itemI, itemO, fluidI, fluidO, chemicalI, chemicalO, recipeData, recipeId) => {
        let recipeJson = {
            "type": "mekanism:crushing",
            "input": itemI[0].getInputIngredient(),
            "output": itemO[0].getOutputIngredient()
        };

        event.custom(recipeJson).id(recipeId);
    })
    .register();

MachineHandler.create('precision_sawmill')
    .setIO(1, 2, false, false, false, false)
    .addToRecipeTypes(['cutting'])
    .setRecipeFunction((event, itemI, itemO, fluidI, fluidO, chemicalI, chemicalO, recipeData, recipeId) => {
        let recipeJson = {
            "type": "mekanism:sawing",
            "input": itemI[0].getInputIngredient(),
            "main_output": itemO[0].getOutputIngredient()
        };

        if (itemO[1]) {
            recipeJson["secondary_output"] = itemO[1].getOutputIngredient();
            recipeJson["secondary_chance"] = recipeData.odds ? recipeData.odds: 0.5;
        };

        event.custom(recipeJson).id(recipeId);
    })
    .register();

MachineHandler.create('enrichment_chamber')
    .setIO(1, 1, false, false, false, false)
    .addToRecipeTypes(['enriching'])
    .setRecipeFunction((event, itemI, itemO, fluidI, fluidO, chemicalI, chemicalO, recipeData, recipeId) => {
        let recipeJson = {
            "type": "mekanism:enriching",
            "input": itemI[0].getInputIngredient(),
            "output": itemO[0].getOutputIngredient()
        };

        event.custom(recipeJson).id(recipeId);
    })
    .register();

MachineHandler.create('combiner')
    .setIO(2, 1, false, false)
    .addToRecipeTypes(['combining'])
    .setRecipeFunction((event, itemI, itemO, fluidI, fluidO, chemicalI, chemicalO, recipeData, recipeId) => {
        let recipeJson = {
            "type": "mekanism:combining",
            "main_input": itemI[0].getInputIngredient(),
            "output": itemO[0].getOutputIngredient()
        };

        if (itemI[1]) {
            recipeJson["extra_input"] = itemI[1].getInputIngredient();
        };

        event.custom(recipeJson).id(recipeId);
    })
    .register();

MachineHandler.create('electrolytic_separator')
    .setIO(false, false, 1, false, false, 2)
    .addToRecipeTypes(['electrolysing'])
    .setRecipeFunction((event, itemI, itemO, fluidI, fluidO, chemicalI, chemicalO, recipeData, recipeId) => {
        let recipeJson = {
            "type": "mekanism:separating",
            "input": fluidI[0].getInputIngredient(),
            "left_chemical_output": chemicalO[0].getOutputIngredient(),
            "right_chemical_output": chemicalO[1].getOutputIngredient()
        };

        event.custom(recipeJson).id(recipeId);
    })
    .register();

MachineHandler.create('chemical_crystaliser')
    .setIO(false, false, false, 1, 1, false)
    .addToRecipeTypes(['crystallising'])
    .setRecipeFunction((event, itemI, itemO, fluidI, fluidO, chemicalI, chemicalO, recipeData, recipeId) => {
        let recipeJson = {
            "type": "mekanism:crystallizing",
            "input": chemicalI[0].getMekanismChemical(),
            "output": itemO[0].getOutputIngredient()
        };

        event.custom(recipeJson).id(recipeId);
    })
    .register();

MachineHandler.create('chemical_dissolution_chamber')
    .setIO(1, false, false, false, 1, 1)
    .addToRecipeTypes(['dissolving'])
    .setRecipeFunction((event, itemI, itemO, fluidI, fluidO, chemicalI, chemicalO, recipeData, recipeId) => {
        let recipeJson = {
            "type": "mekanism:dissolution",
            "item_input": itemI[0].getInputIngredient(),
            "chemical_input": chemicalI[0].getMekanismChemical(),
            "output": chemicalO[0].getOutputIngredient(),
            "per_tick_usage": false
        };

        if (recipeData.tickUsage) {
            recipeJson["per_tick_usage"] = recipeData.tickUsage
        }

        event.custom(recipeJson).id(recipeId);
    })
    .register();

MachineHandler.create('chemical_washer')
    .setIO(false, false, 1, false, 1, 1)
    .addToRecipeTypes(['chemical_washing'])
    .setRecipeFunction((event, itemI, itemO, fluidI, fluidO, chemicalI, chemicalO, recipeData, recipeId) => {
        let recipeJson = {
            "type": "mekanism:washing",
            "fluid_input": fluidI[0].getInputIngredient(),
            "chemical_input": chemicalI[0].getMekanismChemical(),
            "output": chemicalO[0].getOutputIngredient(),
        };

        event.custom(recipeJson).id(recipeId);
    })
    .register();

MachineHandler.create('pressurized_reaction_chamber')
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
            recipeJson["item_input"] = itemI[0].getInputIngredient();
            input = true;
        }
        if (fluidI[0]) {
            recipeJson["fluid_input"] = fluidI[0].getInputIngredient();
            input = true;
        }
        if (chemicalI[0]) {
            recipeJson["chemical_input"] = chemicalI[0].getMekanismChemical();
            input = true;
        }
        if (itemO[0]) {
            recipeJson["item_output"] = itemO[0].getOutputIngredient();
            output = true;
        }
        if (chemicalO[0]) {
            recipeJson["chemical_output"] = chemicalO[0].getOutputIngredient();
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

MachineHandler.create('chemical_oxidizer')
    .setIO(1, false, false, false, false, 1)
    .addToRecipeTypes(['oxidizing'])
    .setRecipeFunction((event, itemI, itemO, fluidI, fluidO, chemicalI, chemicalO, recipeData, recipeId) => {
        let recipeJson = {
            "type": "mekanism:oxidizing",
            "input": itemI[0].getInputIngredient(),
            "output": chemicalO[0].getOutputIngredient()
        };

        event.custom(recipeJson).id(recipeId);
    })
    .register();

MachineHandler.create('rotary_condensator')
    .setIO(false, false, false, 1, 1, false)
    .addToRecipeTypes(['condensating'])
    .setRecipeFunction((event, itemI, itemO, fluidI, fluidO, chemicalI, chemicalO, recipeData, recipeId) => {
        let recipeJson = {
            "type": "mekanism:rotary",
            "fluid_input": fluidI[0].getInputIngredient(),
            "chemical_input": chemicalI[0].getMekanismChemical(),
            "fluid_output": fluidO[0].getOutputIngredient(fluidO[0]),
            "chemical_output": chemicalO[0].getOutputIngredient()
        };

        event.custom(recipeJson).id(recipeId);
    })
    .register();

MachineHandler.create('metallurgic_infuser')
    .setIO(1, 1, false, false, 1, false)
    .addToRecipeTypes(['infusing'])
    .setRecipeFunction((event, itemI, itemO, fluidI, fluidO, chemicalI, chemicalO, recipeData, recipeId) => {
        let recipeJson = {
            "type": "mekanism:metallurgic_infusing",
            "item_input": itemI[0].getInputIngredient(),
            "chemical_input": chemicalI[0].getMekanismChemical(),
            "output": itemO[0].getOutputIngredient(),
            "per_tick_usage": false
        };

        if (recipeData.tickUsage) {
            recipeJson["per_tick_usage"] = recipeData.tickUsage
        }

        event.custom(recipeJson).id(recipeId);
    })
    .register();

MachineHandler.create('chemical_injection_chamber')
    .setIO(1, 1, false, false, 1, false)
    .addToRecipeTypes(['chemical_injection'])
    .setRecipeFunction((event, itemI, itemO, fluidI, fluidO, chemicalI, chemicalO, recipeData, recipeId) => {
        let recipeJson = {
            "type": "mekanism:injecting",
            "item_input": itemI[0].getInputIngredient(),
            "chemical_input": chemicalI[0].getMekanismChemical(),
            "output": itemO[0].getOutputIngredient(),
            "per_tick_usage": false
        };

        if (recipeData.tickUsage) {
            recipeJson["per_tick_usage"] = recipeData.tickUsage
        }

        event.custom(recipeJson).id(recipeId);
    })
    .register();

MachineHandler.create('purification_chamber')
    .setIO(1, 1, false, false, 1, false)
    .addToRecipeTypes(['purifying'])
    .setRecipeFunction((event, itemI, itemO, fluidI, fluidO, chemicalI, chemicalO, recipeData, recipeId) => {
        let recipeJson = {
            "type": "mekanism:purifying",
            "item_input": itemI[0].getInputIngredient(),
            "chemical_input": chemicalI[0].getMekanismChemical(),
            "output": itemO[0].getOutputIngredient(),
            "per_tick_usage": false
        };

        if (recipeData.tickUsage) {
            recipeJson["per_tick_usage"] = recipeData.tickUsage
        }

        event.custom(recipeJson).id(recipeId);
    })
    .register();

MachineHandler.create('osmium_compressor')
    .setIO(1, 1, false, false, 1, false)
    .addToRecipeTypes(['injection_compression'])
    .setRecipeFunction((event, itemI, itemO, fluidI, fluidO, chemicalI, chemicalO, recipeData, recipeId) => {
        let recipeJson = {
            "type": "mekanism:compressing",
            "item_input": itemI[0].getInputIngredient(),
            "chemical_input": chemicalI[0].getMekanismChemical(),
            "output": itemO[0].getOutputIngredient(),
            "per_tick_usage": false
        };

        if (recipeData.tickUsage) {
            recipeJson["per_tick_usage"] = recipeData.tickUsage
        }

        event.custom(recipeJson).id(recipeId);
    })
    .register();

MachineHandler.create('chemical_infuser')
    .setIO(1, 1, false, false, 1, false)
    .addToRecipeTypes(['chemical_infusing'])
    .setRecipeFunction((event, itemI, itemO, fluidI, fluidO, chemicalI, chemicalO, recipeData, recipeId) => {
        let recipeJson = {
            "type": "mekanism:chemical_infusing",
            "left_input": chemicalI[0].getMekanismChemical(),
            "right_input": chemicalI[1].getMekanismChemical(),
            "output": chemicalO[0].getOutputIngredient(),
        };

        if (recipeData.tickUsage) {
            recipeJson["per_tick_usage"] = recipeData.tickUsage
        }

        event.custom(recipeJson).id(recipeId);
    })
    .register();