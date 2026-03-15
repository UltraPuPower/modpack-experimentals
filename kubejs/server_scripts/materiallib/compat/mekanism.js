ServerEvents.recipes(event => {
    let blacklistedRecipes = [
        /mekanism:processing\/.*\/ingot\/from_dust_(smelting|blasting)/,
        /mekanism:processing\/.*\/ingot\/from_(nuggets|block)/,
        /mekanism:processing\/.*\/from_block/,
        /mekanism:(nuggets|storage_blocks)\/.*/,
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