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

    let replaceList = [
        {inp: true, out: false, filter: {id: 'create:milling/coal'}, input: 'minecraft:coal', output: 'materiallib:coal_dust'},
        {inp: true, out: false, filter: {id: 'create:milling/charcoal'}, input: 'minecraft:charcoal', output: 'materiallib:charcoal_dust'}
    ];

    replaceList.forEach(entry => {
        const { inp, out, filter, input, output } = entry
        if (inp) event.replaceInput(filter, input, output);
        if (out) event.replaceOutput(filter, input, output);
    });
});