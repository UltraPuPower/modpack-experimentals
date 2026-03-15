ServerEvents.recipes(event => {
    let blacklistedRecipes = [
        /immersiveengineering:smelting\/ingot_.*_from_dust(_from_blasting)?/,
        /immersiveengineering:crafting\/ingot_.*_to_(storage|nugget)_.*/,
        /immersiveengineering:crafting\/(storage|nugget)_.*_to_ingot_.*/,
        /immersiveengineering:metalpress\/(gear|plate|rod|wire)_.*/,
        /immersiveengineering:crafting\/stick_.*/,
        /immersiveengineering:crusher\/ingot_.*/
    ];

    blacklistedRecipes.forEach(recipe => {
        event.remove({mod: 'immersiveengineering', id: recipe});
    });
    
    let blacklistedInputs = [
        
    ];

    blacklistedInputs.forEach(input => {
        event.remove({mod: 'immersiveengineering', id: input});
    });
    
    let blacklistedOutputs = [
        
    ];

    blacklistedOutputs.forEach(output => {
        event.remove({mod: 'immersiveengineering', id: output});
    });
    
    let blacklistedUsage = [
        
    ];

    blacklistedOutputs.forEach(item => {
        event.remove({mod: 'immersiveengineering', input: item});
        event.remove({mod: 'immersiveengineering', output: item});
    });
});