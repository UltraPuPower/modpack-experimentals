// priority: 10000
// requires: mekanism
// Author: UltraPuPower1

MachineHandler.create('crusher')
    .setIO(1, 1, false, false, false, false)
    .addToRecipeTypes(['crushing'])
    .setRecipeFunction((event, itemI, itemO, liquidI, liquidO, gasI, gasO, recipeData, recipeId) => {
        let recipeJson = {
            "type": "mekanism:crushing",
            "input": itemHandler.getInputIngredient(itemI[0]),
            "output": itemHandler.getOutputIngredient(itemO[0])
        };

        event.custom(recipeJson).id(`materiallib:crusher/${recipeId}`);
    })
    .register();

MachineHandler.create('precision_sawmill')
    .setIO(1, 2, false, false, false, false)
    .addToRecipeTypes(['cutting'])
    .setRecipeFunction((event, itemI, itemO, liquidI, liquidO, gasI, gasO, recipeData, recipeId) => {
        let recipeJson = {
            "type": "mekanism:sawing",
            "input": itemHandler.getInputIngredient(itemI[0]),
            "main_output": itemHandler.getOutputIngredient(itemO[0])
        };

        if (itemO[1]) {
            recipeJson["secondary_output"] = itemHandler.getOutputIngredient(itemO[1]);
            recipeJson["secondary_chance"] = recipeData.odds ? recipeData.odds: 0.5;
        };

        event.custom(recipeJson).id(`materiallib:sawmill/${recipeId}`);
    })
    .register();

MachineHandler.create('enrichment_chamber')
    .setIO(1, 1, false, false, false, false)
    .addToRecipeTypes(['enriching'])
    .setRecipeFunction((event, itemI, itemO, liquidI, liquidO, gasI, gasO, recipeData, recipeId) => {
        let recipeJson = {
            "type": "mekanism:enriching",
            "input": itemHandler.getInputIngredient(itemI[0]),
            "output": itemHandler.getOutputIngredient(itemO[0])
        };

        event.custom(recipeJson).id(`materiallib:enriching/${recipeId}`);
    })
    .register();

MachineHandler.create('combiner')
    .setIO(2, 1, false, false)
    .addToRecipeTypes(['combining'])
    .setRecipeFunction((event, itemI, itemO, liquidI, liquidO, gasI, gasO, recipeData, recipeId) => {
        let recipeJson = {
            "type": "mekanism:combining",
            "main_input": itemHandler.getInputIngredient(itemI[0]),
            "output": itemHandler.getOutputIngredient(itemO[0])
        };

        if (itemI[1]) {
            recipeJson["extra_input"] = itemHandler.getInputIngredient(itemI[1]);
        };

        event.custom(recipeJson).id(`materiallib:combining/${recipeId}`);
    })
    .register();

MachineHandler.create('electrolytic_separator')
    .setIO(false, false, 1, false, false, 2)
    .addToRecipeTypes(['electrolysing'])
    .setRecipeFunction((event, itemI, itemO, liquidI, liquidO, gasI, gasO, recipeData, recipeId) => {
        let recipeJson = {
            "type": "mekanism:separating",
            "input": fluidHandler.getInputIngredient(liquidI[0]),
            "left_chemical_output": fluidHandler.getOutputIngredient(gasO[0]),
            "right_chemical_output": fluidHandler.getOutputIngredient(gasO[1])
        };

        event.custom(recipeJson).id(`materiallib:electrolytic_separation/${recipeId}`);
    })
    .register();

MachineHandler.create('chemical_crystaliser')
    .setIO(false, false, false, 1, 1, false)
    .addToRecipeTypes(['crystallising'])
    .setRecipeFunction((event, itemI, itemO, liquidI, liquidO, gasI, gasO, recipeData, recipeId) => {
        let recipeJson = {
            "type": "mekanism:crystallizing",
            "input": fluidHandler.getMekanismChemical(gasI[0]),
            "output": itemHandler.getOutputIngredient(itemO[0])
        };

        event.custom(recipeJson).id(`materiallib:crystallising/${recipeId}`);
    })
    .register();

MachineHandler.create('chemical_dissolution_chamber')
    .setIO(1, false, false, false, 1, 1)
    .addToRecipeTypes(['dissolving'])
    .setRecipeFunction((event, itemI, itemO, liquidI, liquidO, gasI, gasO, recipeData, recipeId) => {
        let recipeJson = {
            "type": "mekanism:dissolution",
            "item_input": itemHandler.getInputIngredient(itemI[0]),
            "chemical_input": fluidHandler.getMekanismChemical(gasI[0]),
            "output": fluidHandler.getOutputIngredient(gasO[0]),
            "per_tick_usage": false
        };

        if (recipeData.tickUsage) {
            recipeJson["per_tick_usage"] = recipeData.tickUsage
        }

        event.custom(recipeJson).id(`materiallib:dissolving/${recipeId}`);
    })
    .register();

MachineHandler.create('chemical_washer')
    .setIO(false, false, 1, false, 1, 1)
    .addToRecipeTypes(['chemical_washing'])
    .setRecipeFunction((event, itemI, itemO, liquidI, liquidO, gasI, gasO, recipeData, recipeId) => {
        let recipeJson = {
            "type": "mekanism:washing",
            "fluid_input": fluidHandler.getInputIngredient(liquidI[0]),
            "chemical_input": fluidHandler.getMekanismChemical(gasI[0]),
            "output": fluidHandler.getOutputIngredient(gasO[0]),
        };

        event.custom(recipeJson).id(`materiallib:washing/${recipeId}`);
    })
    .register();

MachineHandler.create('pressurized_reaction_chamber')
    .setIO(1, 1, 1, false, 1, 1)
    .addToRecipeTypes(['pressurized_reaction'])
    .setRecipeFunction((event, itemI, itemO, liquidI, liquidO, gasI, gasO, recipeData, recipeId) => {
        let recipeJson = {
            "type": "mekanism:reaction",
            "duration": 100
        };

        let input = false;
        let output = false;

        if (itemI[0]) {
            recipeJson["item_input"] = itemHandler.getInputIngredient(itemI[0]);
            input = true;
        }
        if (liquidI[0]) {
            recipeJson["fluid_input"] = fluidHandler.getInputIngredient(liquidI[0]);
            input = true;
        }
        if (gasI[0]) {
            recipeJson["chemical_input"] = fluidHandler.getMekanismChemical(gasI[0]);
            input = true;
        }
        if (itemO[0]) {
            recipeJson["item_output"] = itemHandler.getOutputIngredient(itemO[0]);
            output = true;
        }
        if (gasO[0]) {
            recipeJson["chemical_output"] = fluidHandler.getOutputIngredient(gasO[0]);
            output = true;
        }
        
        if (!(input && output)) {
            console.warn(`aborted recipe generation for id: materiallib/pressurized_reaction/${recipeId}; No input or output`)
            return
        }

        if (recipeData.duration) {
            recipeJson["duration"] = recipeData.duration;
        }

        event.custom(recipeJson).id(`materiallib:pressurized_reaction/${recipeId}`);
    })
    .register();

MachineHandler.create('chemical_oxidizer')
    .setIO(1, false, false, false, false, 1)
    .addToRecipeTypes(['oxidizing'])
    .setRecipeFunction((event, itemI, itemO, liquidI, liquidO, gasI, gasO, recipeData, recipeId) => {
        let recipeJson = {
            "type": "mekanism:oxidizing",
            "input": itemHandler.getInputIngredient(itemI[0]),
            "output": fluidHandler.getOutputIngredient(gasO[0])
        };

        event.custom(recipeJson).id(`materiallib:oxidizing/${recipeId}`);
    })
    .register();

MachineHandler.create('rotary_condensator')
    .setIO(false, false, false, 1, 1, false)
    .addToRecipeTypes(['condensating'])
    .setRecipeFunction((event, itemI, itemO, liquidI, liquidO, gasI, gasO, recipeData, recipeId) => {
        let recipeJson = {
            "type": "mekanism:rotary",
            "fluid_input": fluidHandler.getInputIngredient(liquidO[0]),
            "chemical_input": fluidHandler.getMekanismChemical(gasI[0]),
            "fluid_output": fluidHandler.getOutputIngredient(liquidO[0]),
            "chemical_output": fluidHandler.getOutputIngredient(gasI[0])
        };

        event.custom(recipeJson).id(`materiallib:${recipeId}`);
    })
    .register();

MachineHandler.create('metallurgic_infuser')
    .setIO(1, 1, false, false, 1, false)
    .addToRecipeTypes(['infusing'])
    .setRecipeFunction((event, itemI, itemO, liquidI, liquidO, gasI, gasO, recipeData, recipeId) => {
        let recipeJson = {
            "type": "mekanism:metallurgic_infusing",
            "item_input": itemHandler.getInputIngredient(itemI[0]),
            "chemical_input": fluidHandler.getMekanismChemical(gasI[0]),
            "output": fluidHandler.getOutputIngredient(itemO[0]),
            "per_tick_usage": false
        };

        if (recipeData.tickUsage) {
            recipeJson["per_tick_usage"] = recipeData.tickUsage
        }

        event.custom(recipeJson).id(`materiallib:infusing/${recipeId}`);
    })
    .register();

MachineHandler.create('chemical_injection_chamber')
    .setIO(1, 1, false, false, 1, false)
    .addToRecipeTypes(['chemical_injection'])
    .setRecipeFunction((event, itemI, itemO, liquidI, liquidO, gasI, gasO, recipeData, recipeId) => {
        let recipeJson = {
            "type": "mekanism:injecting",
            "item_input": itemHandler.getInputIngredient(itemI[0]),
            "chemical_input": fluidHandler.getMekanismChemical(gasI[0]),
            "output": fluidHandler.getOutputIngredient(itemO[0]),
            "per_tick_usage": false
        };

        if (recipeData.tickUsage) {
            recipeJson["per_tick_usage"] = recipeData.tickUsage
        }

        event.custom(recipeJson).id(`materiallib:chemical_injection/${recipeId}`);
    })
    .register();

MachineHandler.create('purification_chamber')
    .setIO(1, 1, false, false, 1, false)
    .addToRecipeTypes(['purifying'])
    .setRecipeFunction((event, itemI, itemO, liquidI, liquidO, gasI, gasO, recipeData, recipeId) => {
        let recipeJson = {
            "type": "mekanism:purifying",
            "item_input": itemHandler.getInputIngredient(itemI[0]),
            "chemical_input": fluidHandler.getMekanismChemical(gasI[0]),
            "output": fluidHandler.getOutputIngredient(itemO[0]),
            "per_tick_usage": false
        };

        if (recipeData.tickUsage) {
            recipeJson["per_tick_usage"] = recipeData.tickUsage
        }

        event.custom(recipeJson).id(`materiallib:purifying/${recipeId}`);
    })
    .register();

MachineHandler.create('osmium_compressor')
    .setIO(1, 1, false, false, 1, false)
    .addToRecipeTypes(['injection_compression'])
    .setRecipeFunction((event, itemI, itemO, liquidI, liquidO, gasI, gasO, recipeData, recipeId) => {
        let recipeJson = {
            "type": "mekanism:compressing",
            "item_input": itemHandler.getInputIngredient(itemI[0]),
            "chemical_input": fluidHandler.getMekanismChemical(gasI[0]),
            "output": fluidHandler.getOutputIngredient(itemO[0]),
            "per_tick_usage": false
        };

        if (recipeData.tickUsage) {
            recipeJson["per_tick_usage"] = recipeData.tickUsage
        }

        event.custom(recipeJson).id(`materiallib:injection_compression/${recipeId}`);
    })
    .register();

MachineHandler.create('chemical_infuser')
    .setIO(1, 1, false, false, 1, false)
    .addToRecipeTypes(['chemical_infusing'])
    .setRecipeFunction((event, itemI, itemO, liquidI, liquidO, gasI, gasO, recipeData, recipeId) => {
        let recipeJson = {
            "type": "mekanism:chemical_infusing",
            "left_input": fluidHandler.getMekanismChemical(gasI[0]),
            "right_input": fluidHandler.getMekanismChemical(gasI[1]),
            "output": fluidHandler.getOutputIngredient(gasO[0]),
        };

        if (recipeData.tickUsage) {
            recipeJson["per_tick_usage"] = recipeData.tickUsage
        }

        event.custom(recipeJson).id(`materiallib:chemical_infusing/${recipeId}`);
    })
    .register();