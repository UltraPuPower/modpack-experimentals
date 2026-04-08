ServerEvents.recipes(event => {
    let blacklistedRecipes = [
        /immersiveengineering:smelting\/(ingot_.*|.*_ingot)_from_dust(_from_blasting)?/,
        /immersiveengineering:crafting\/(ingot_.*|.*_ingot)_to_(storage|nugget)_.*/,
        /immersiveengineering:crafting\/(storage|nugget)_.*_to_(ingot_.*|.*_ingot)/,
        /immersiveengineering:metalpress\/(gear|plate|rod|wire)_.*/,
        /immersiveengineering:crafting\/(stick|wire)_.*/,
        /immersiveengineering:crusher\/ingot_.*/,
        'immersiveengineering:arc_recycling_list'
    ];

    blacklistedRecipes.forEach(id => {
        event.remove({mod: 'immersiveengineering', id: id});
    });
    
    let blacklistedInputs = [
        
    ];

    blacklistedInputs.forEach(item => {
        event.remove({mod: 'immersiveengineering', input: item});
    });
    
    let blacklistedOutputs = [
        
    ];

    blacklistedOutputs.forEach(item => {
        event.remove({mod: 'immersiveengineering', output: item});
    });
    
    let blacklistedUsage = [
        
    ];

    blacklistedUsage.forEach(item => {
        event.remove({mod: 'immersiveengineering', input: item});
        event.remove({mod: 'immersiveengineering', output: item});
    });
});