ServerEvents.recipes(event => {
    let blacklistedRecipes = [
        
    ];

    blacklistedRecipes.forEach(recipe => {
        event.remove({mod: 'minecraft', id: recipe});
    });
    
    let blacklistedInputs = [
        'minecraft:netherite_block'
    ];

    blacklistedInputs.forEach(input => {
        event.remove({mod: 'minecraft', id: input});
    });
    
    let blacklistedOutputs = [
        'minecraft:iron_block', 'minecraft:iron_nugget', 'minecraft:iron_ingot',
        'minecraft:gold_block', 'minecraft:gold_nugget', 'minecraft:gold_ingot',
        'minecraft:copper_block', 'minecraft:copper_ingot',
        'minecraft:netherite_block',
        'minecraft:diamond_block', 'minecraft:diamond',
        'minecraft:emerald_block', 'minecraft:emerald',
        'minecraft:lapis_block', 'minecraft:lapis_lazuli',
        'minecraft:redstone_block', 'minecraft:redstone',
        'minecraft:quartz_block', 'minecraft:quartz',
        'minecraft:coal_block', 'minecraft:coal'
    ];

    blacklistedOutputs.forEach(output => {
        event.remove({mod: 'minecraft', id: output});
    });
    
    let blacklistedUsage = [
        
    ];

    blacklistedOutputs.forEach(item => {
        event.remove({mod: 'minecraft', input: item});
        event.remove({mod: 'minecraft', output: item});
    });
});