ServerEvents.recipes(event => {
    event.custom({
        "type": "minecraft:crafting_shaped",
        "pattern": [
            " A ",
            " A "
        ],
        "key": {
            "A": {"item": "minecraft:acacia_boat"}
        },
        "result": {
            "id": "minecraft:diamond_sword",
            "components": {
                "minecraft:custom_name": `{
                    \"text\":\"Sharp Stick\",
                    \"color\":\"dark_red\",
                    \"italic\":false,
                    \"bold\":true
                }`
            }
        }
    })
});

recipeBuilder.recipeType('squeezing').id('test')
    .itemInputs(['materiallib:iron_dust'])
    // .fluidInputs(['minecraft:water 1000', 'materiallib:liquid_bronze'])
    .itemOutputs(['materiallib:steel_ingot'])
    .fluidOutputs(['minecraft:lava 5000'])
    .setRecipeData({energy: 200})
    .register();