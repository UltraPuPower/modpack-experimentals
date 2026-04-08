ServerEvents.recipes(event => {
    let blacklistedRecipes = [
        /create:pressing\/.*_ingot/,
        /create:crafting\/materials\/.*_(nugget|ingot|block)(_from_(de)?compacting)?/,
        /create:.*compat.*/,
        /create:splashing\/.*crushed_raw_.*/,
        /create:crushing\/.*ore.*/,
        /create:crushing\/.*raw.*/
    ];

    blacklistedRecipes.forEach(id => {
        event.remove({mod: 'create', id: id});
    });
    
    let blacklistedInputs = [
        
    ];

    blacklistedInputs.forEach(item => {
        event.remove({mod: 'create', input: item});
    });
    
    let blacklistedOutputs = [
        
    ];

    blacklistedOutputs.forEach(item => {
        event.remove({mod: 'create', output: item});
    });
    
    let blacklistedUsage = [
        
    ];

    blacklistedOutputs.forEach(item => {
        event.remove({mod: 'create', input: item});
        event.remove({mod: 'create', output: item});
    });
});