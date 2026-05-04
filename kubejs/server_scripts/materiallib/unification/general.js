// priority: 100
const itemBlackList = global.itemBlackList;

ServerEvents.recipes(event => {
    for (let i = 0; i < itemBlackList.length; i++) {
        let { material, entries } = itemBlackList[i];

        let materialObj = materialList.find(materialObj => materialObj.id == material);
        if (!materialObj) continue;

        for (let j = 0; j < entries.length; j++) {
            let { component, itemEntries } = entries[j];

            if (!materialObj.components.includes(component)) continue;

            let itemId = global.generateComponentId(material, component);

            if (materialObj.itemOverrides[component]) itemId = materialObj.itemOverrides[component];

            let tag = `#c:${component}s/${material}`
            event.replaceInput({ input: tag }, tag, itemId);
            event.replaceOutput({ output: tag }, tag, itemId);

            if (material == 'aluminium') {
                tag = `#c:${component}s/aluminum`
                event.replaceInput({ input: tag }, tag, itemId);
                event.replaceOutput({ output: tag }, tag, itemId);
            }

            itemEntries.forEach(item => {
                event.replaceInput({ input: item }, item, itemId);
                event.replaceOutput({ output: item }, item, itemId);

                let recipeId = `materiallib:conversion/shapeless_${item.split(':')[0]}_${item.split(':')[1]}`
                global.recipeIdStorage.addRecipeId(recipeId);
                event.shapeless(itemId, item).id(recipeId);
            });
        };
    };
});

ServerEvents.tags('item', event => {
    for (let i = 0; i < itemBlackList.length; i++) {
        let { material, entries } = itemBlackList[i];

        let materialObj = materialList.find(materialObj => materialObj.id == material);
        if (!materialObj) continue

        for (let j = 0; j < entries.length; j++) {
            let { component, itemEntries } = entries[j];

            if (!materialObj.components.includes(component)) continue
            if (!global.materialLibData.itemList.includes(component) && !global.materialLibData.blockList.includes(component)) continue

            itemEntries.forEach(item => {
                if (component == 'deepslate_ore') {
                    component = 'ore'
                    event.remove('c:ores_in_ground/deepslate', item);
                }
                event.remove(`c:${component}s`, item);
                event.remove(`c:${component}s/${material}`, item);
                if (material == 'aluminium') event.remove(`c:${component}s/aluminum`, item);
            });
        };
    };
});

ServerEvents.tags('block', event => {
    for (let i = 0; i < itemBlackList.length; i++) {
        let { material, entries } = itemBlackList[i];

        let materialObj = materialList.find(materialObj => materialObj.id == material);
        if (!materialObj) continue

        for (let j = 0; j < entries.length; j++) {
            let { component, itemEntries } = entries[j];

            if (!materialObj.components.includes(component)) continue
            if (!global.materialLibData.blockList.includes(component)) continue

            itemEntries.forEach(block => {
                event.remove(`c:${component}s`, block);
                event.remove(`c:${component}s/${material}`, block);
                if (material == 'aluminium') event.remove(`c:${component}s/aluminum`, block);
            });
        };
    };
});