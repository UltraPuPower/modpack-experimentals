ServerEvents.recipes(event => {
    let blacklistedRecipes = [
        /mekanism:processing\/.*\/ingot\/from_dust_(smelting|blasting)/,
        /mekanism:processing\/.*\/ingot\/from_(nuggets|block)/,
        /mekanism:processing\/.*\/from_block/,
        /mekanism:processing\/.*\/ingot_to_dust/, /mekanism:processing\/.*\/dust\/from_ingot/, /mekanism:processing\/.*\/to_dust/,
        /mekanism:(nuggets|storage_blocks)\/.*/,
        /mekanism:crushing\/.*_dust/,
    ];

    blacklistedRecipes.forEach(recipe => {
        event.remove({mod: 'mekanism', id: recipe});
    });
    
    let blacklistedInputs = [
        
    ];

    blacklistedInputs.forEach(input => {
        event.remove({mod: 'mekanism', id: input});
    });
    
    let blacklistedOutputs = [
        
    ];

    blacklistedOutputs.forEach(output => {
        event.remove({mod: 'mekanism', id: output});
    });
    
    let blacklistedUsage = [
        
    ];

    blacklistedOutputs.forEach(item => {
        event.remove({mod: 'mekanism', input: item});
        event.remove({mod: 'mekanism', output: item});
    });
});