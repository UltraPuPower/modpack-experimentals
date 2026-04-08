ServerEvents.recipes(event => {
    let blacklistedRecipes = [
        /minecraft:.*netherite_block/
    ];

    blacklistedRecipes.forEach(id => {
        event.remove({mod: 'minecraft', id: id});
    });
    
    let blacklistedInputs = [
        
    ];

    blacklistedInputs.forEach(item => {
        event.remove({mod: 'minecraft', input: item});
    });
    
    let blacklistedOutputs = [
        /minecraft:(raw_)?(copper|iron|gold)(_(nugget|ingot|block))?/,
        /minecraft:(coal|lapis|quartz|redstone|diamond|emerald)(_block)?/
    ];

    blacklistedOutputs.forEach(item => {
        event.remove({mod: 'minecraft', output: item});
    });
    
    let blacklistedUsage = [
        
    ];

    blacklistedUsage.forEach(item => {
        event.remove({mod: 'minecraft', input: item});
        event.remove({mod: 'minecraft', output: item});
    });
});