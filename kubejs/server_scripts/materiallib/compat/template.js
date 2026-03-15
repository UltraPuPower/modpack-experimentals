ServerEvents.recipes(event => {
    let blacklistedRecipes = [
        
    ];

    blacklistedRecipes.forEach(recipe => {
        event.remove({mod: 'modid', id: recipe});
    });
    
    let blacklistedInputs = [
        
    ];

    blacklistedInputs.forEach(input => {
        event.remove({mod: 'modid', id: input});
    });
    
    let blacklistedOutputs = [
        
    ];

    blacklistedOutputs.forEach(output => {
        event.remove({mod: 'modid', id: output});
    });
    
    let blacklistedUsage = [
        
    ];

    blacklistedOutputs.forEach(item => {
        event.remove({mod: 'modid', input: item});
        event.remove({mod: 'modid', output: item});
    });
});