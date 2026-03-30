// priority: 99994
// requires: mekanism
// author: UltraPuPower1

// Compat
BlacklistHandler.getMaterial('copper')
    .setItems([
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
        {component: 'plate', items: ['create:iron_sheet']}
    ])
    .register();

BlacklistHandler.getMaterial('gold')
    .setItems([
        {component: 'plate', items: ['create:golden_sheet']}
    ])
    .register();

// New Materials
BlacklistHandler.getMaterial('zinc')
    .setItems([
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