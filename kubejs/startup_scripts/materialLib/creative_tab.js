(()=>{
    const components = global.ComponentList;
    let componentIdList = ['bucket']
    components.forEach(component => {
        const { id } = component
        componentIdList.push(id)
    })

    const itemObject = {
        itemObject: {},

        addMaterialItem: (item) => {
            let idArray = item.id.split(':');
            if (idArray[0] != 'materiallib') return
            let splitId = idArray[1].split('_');
            let partArray = [];
            for (let i = 0; i < splitId.length; i++) {
                let part = splitId[i];
                if (!componentIdList.includes(part)){
                    partArray.push(part);
                }
            }
            let material = partArray.map(value => value).join('_');
            if (!itemObject.itemObject[material]) itemObject.itemObject[material] = []
            itemObject.itemObject[material].push(item.id)
        }
    }

    // Create a materiallib tab
    StartupEvents.registry('creative_mode_tab', event => {
        event.create('materiallib:materiallib').displayName('Material Lib').icon(() => 'minecraft:nether_star').content(() => Ingredient.of('#c:mold'));
    });

    // Remove materiallib items from the kubejs tab
    StartupEvents.modifyCreativeTab('kubejs:tab', event => {
        Ingredient.of('%kubejs:tab').stacks.forEach(item => {
            itemObject.addMaterialItem(item)
        });
        let materials = Object.keys(itemObject.itemObject);
        materials.forEach(material => {
            itemObject.itemObject[material].forEach(item => {
                event.remove(item);
            })
        });
    });

    // Add materiallib items to the materiallib tab
    StartupEvents.modifyCreativeTab('materiallib:materiallib', event => {
        let previous = ''
        Ingredient.of('%materiallib:materiallib').stacks.forEach(item => {
            previous = item.id
        });
        let materials = Object.keys(itemObject.itemObject).sort().reverse();
        materials.forEach(material => {
            if (material == 'empty_casting_mold') return
            itemObject.itemObject[material].forEach(item => {
                event.addAfter(previous, item);
            })
        });
    });

    // Blacklisting
    let creativeTabs = ['irons_spellbooks:spellbook_blocks', 'minecraft:hotbar', 'create:palettes', 'minecraft:op_blocks', 'minecraft:building_blocks', 'minecraft:food_and_drinks', 'ars_nouveau:glyphs', 'minecraft:search', 'irons_spellbooks:spellbook_equipment', 'farmersdelight:farmersdelight', 'minecraft:ingredients', 'minecraft:functional_blocks', 'minecraft:tools_and_utilities', 'sophisticatedstorage:main', 'ars_nouveau:general', 'irons_spellbooks:spellbook_materials', 'kubejs:tab', 'immersiveengineering:main', 'create:base', 'minecraft:colored_blocks', 'sophisticatedcore:main', 'minecraft:inventory', 'minecraft:redstone_blocks', 'irons_spellbooks:spellbook_scrolls', 'mekanism:mekanism', 'minecraft:spawn_eggs', 'minecraft:natural_blocks', 'minecraft:combat']

    let blacklistItems = [];

    const itemBlackList = global.itemBlackList;
    itemBlackList.forEach(materialBlacklistObj => {
        materialBlacklistObj.entries.forEach(entry => {
            entry.itemEntries.forEach(item => {
                blacklistItems.push(item);
            });
        });
    });

    StartupEvents.modifyCreativeTab(creativeTabs, event => {
        event.remove(blacklistItems);
    });

    if (global.generateLogs.creativeTabs) {
        StartupEvents.registry('creative_mode_tab', event => {
            console.log('========================[Creative tabs]========================');
            console.log(`let creativeTabs = [${Registry.of("minecraft:creative_mode_tab").keys.map((tab) => `'${tab}'`).join(', ')}]`);
        });
    }

})()