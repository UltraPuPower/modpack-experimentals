ServerEvents.recipes(event => {
    let blacklistedRecipes = [
        /create:pressing\/.*_ingot/,
        /create:crafting\/materials\/.*_(nugget|ingot|block)_from_(de)?compacting/,
        /create:cutting\/compat\/immersiveengineering\/wire_.*/
    ];

    blacklistedRecipes.forEach(recipe => {
        event.remove({mod: 'create', id: recipe});
    });
    
    let blacklistedInputs = [
        
    ];

    blacklistedInputs.forEach(input => {
        event.remove({mod: 'create', id: input});
    });
    
    let blacklistedOutputs = [
        
    ];

    blacklistedOutputs.forEach(output => {
        event.remove({mod: 'create', id: output});
    });
    
    let blacklistedUsage = [
        
    ];

    blacklistedOutputs.forEach(item => {
        event.remove({mod: 'create', input: item});
        event.remove({mod: 'create', output: item});
    });
});