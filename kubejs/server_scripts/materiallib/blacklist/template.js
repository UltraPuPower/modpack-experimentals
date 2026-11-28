ServerEvents.recipes(event => {
    let blacklistedRecipes = [
        
    ];

    blacklistedRecipes.forEach(id => {
        event.remove({mod: 'modid', id: id});
    });
    
    let blacklistedInputs = [
        
    ];

    blacklistedInputs.forEach(input => {
        event.remove({mod: 'modid', input: item});
    });
    
    let blacklistedOutputs = [
        
    ];

    blacklistedOutputs.forEach(output => {
        event.remove({mod: 'modid', output: item});
    });
    
    let blacklistedUsage = [
        
    ];

    blacklistedUsage.forEach(item => {
        event.remove({mod: 'modid', input: item});
        event.remove({mod: 'modid', output: item});
    });
});