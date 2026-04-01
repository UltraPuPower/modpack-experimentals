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

    blacklistedRecipes.forEach(recipe => {
        event.remove({mod: 'immersiveengineering', id: recipe});
    });
    
    let blacklistedInputs = [
        
    ];

    blacklistedInputs.forEach(input => {
        event.remove({mod: 'immersiveengineering', input: input});
    });
    
    let blacklistedOutputs = [
        
    ];

    blacklistedOutputs.forEach(output => {
        event.remove({mod: 'immersiveengineering', output: output});
    });
    
    let blacklistedUsage = [
        
    ];

    blacklistedUsage.forEach(item => {
        event.remove({mod: 'immersiveengineering', input: item});
        event.remove({mod: 'immersiveengineering', output: item});
    });
});