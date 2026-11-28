ServerEvents.recipes(event => {
    let blacklistedRecipes = [
        /mekanism:(nuggets|storage_blocks)\/.*/,
        /mekanism:crushing\/.*_dust/,
        /mekanism:processing\/.*\/(clump|crystal|dirty_dust|dust|ingot|nugget|ore|raw|raw_storage_blocks|shard|slurry|storage_blocks)\/.*/,
        /mekanism:processing\/.*\/(.*_ore|(from|(ingot_)?to)_dust|from_block)/
    ];

    blacklistedRecipes.forEach(id => {
        event.remove({mod: 'mekanism', id: id});
    });
    
    let blacklistedInputs = [
        
    ];

    blacklistedInputs.forEach(item => {
        event.remove({mod: 'mekanism', input: item});
    });
    
    let blacklistedOutputs = [
        
    ];

    blacklistedOutputs.forEach(output => {
        event.remove({mod: 'mekanism', output: item});
    });
    
    let blacklistedUsage = [
        
    ];

    blacklistedUsage.forEach(item => {
        event.remove({mod: 'mekanism', input: item});
        event.remove({mod: 'mekanism', output: item});
    });
});