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