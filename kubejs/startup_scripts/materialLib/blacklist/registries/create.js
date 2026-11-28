// priority: 99994
// requires: mekanism
// author: UltraPuPower1

// Compat
BlacklistHandler.getMaterial('copper')
    .setItems([
        {component: 'crushed_raw', items: ['create:crushed_raw_copper']},
        {component: 'plate', items: ['create:copper_sheet']},
        {component: 'nugget', items: ['create:copper_nugget']}
    ])
    .register();

BlacklistHandler.getMaterial('obsidian')
    .setItems([
        {component: 'dust', items: ['create:powdered_obsidian']}
    ])
    .register();

BlacklistHandler.getMaterial('iron')
    .setItems([
        {component: 'crushed_raw', items: ['create:crushed_raw_iron']},
        {component: 'plate', items: ['create:iron_sheet']}
    ])
    .register();

BlacklistHandler.getMaterial('gold')
    .setItems([
        {component: 'crushed_raw', items: ['create:crushed_raw_gold']},
        {component: 'plate', items: ['create:golden_sheet']}
    ])
    .register();

// New Materials
BlacklistHandler.getMaterial('zinc')
    .setItems([
        {component: 'raw', items: ['create:raw_zinc']},
        {component: 'raw_block', items: ['create:raw_zinc_block']},
        {component: 'ore', items: ['create:zinc_ore']},
        {component: 'deepslate_ore', items: ['create:deepslate_zinc_ore']},
        {component: 'crushed_raw', items: ['create:crushed_raw_zinc']},
        {component: 'nugget', items: ['create:zinc_nugget']},
        {component: 'ingot', items: ['create:zinc_ingot']},
        {component: 'block', items: ['create:zinc_block']}
    ])
    .register();

// Alloys
BlacklistHandler.getMaterial('brass')
    .setItems([
        {component: 'nugget', items: ['create:brass_nugget']},
        {component: 'ingot', items: ['create:brass_ingot']},
        {component: 'block', items: ['create:brass_block']},
        {component: 'plate', items: ['create:brass_sheet']}
    ])
    .register();

// Compat compat
BlacklistHandler.getMaterial('aluminium')
    .setItems([
        {component: 'crushed_raw', items: ['create:crushed_raw_aluminum']}
    ])
    .register();
    
BlacklistHandler.getMaterial('nickel')
    .setItems([
        {component: 'crushed_raw', items: ['create:crushed_raw_nickel']}
    ])
    .register();
    
BlacklistHandler.getMaterial('silver')
    .setItems([
        {component: 'crushed_raw', items: ['create:crushed_raw_silver']}
    ])
    .register();
    
BlacklistHandler.getMaterial('lead')
    .setItems([
        {component: 'crushed_raw', items: ['create:crushed_raw_lead']}
    ])
    .register();
    
BlacklistHandler.getMaterial('uranium')
    .setItems([
        {component: 'crushed_raw', items: ['create:crushed_raw_uranium']}
    ])
    .register();
    
BlacklistHandler.getMaterial('osmium')
    .setItems([
        {component: 'crushed_raw', items: ['create:crushed_raw_osmium']}
    ])
    .register();
    
BlacklistHandler.getMaterial('tin')
    .setItems([
        {component: 'crushed_raw', items: ['create:crushed_raw_tin']}
    ])
    .register();
    