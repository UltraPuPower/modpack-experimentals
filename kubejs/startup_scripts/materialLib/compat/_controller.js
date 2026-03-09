// priority: 99995
global.BlackList = [];

const materialList = global.MaterialList;

const BlacklistHandler = {
    material: '',
    discoveredIndex: false,
    entries: [],

    getMaterial: (materialId) => {
        let materialObj = materialList.find(material => material.id == materialId);
        if (materialObj) {
            BlacklistHandler.material = materialId
            let blackListObj = global.BlackList.find(entry => entry.material == BlacklistHandler.material);
            if (blackListObj) {
                console.log(blackListObj.entries)
                blackListObj.entries.forEach(entry => {
                    BlacklistHandler.entries.push(entry)
                });
                BlacklistHandler.discoveredIndex = global.BlackList.indexOf(blackListObj);
            }
        } else console.warn(`   Blacklisting ran into an issue: can't find material ${materialId}`)
        return BlacklistHandler;
    },

    setItems: (entries) => {
        console.log(`   Going over entries`);
        entries.forEach(entry => {
            const {component, items} = entry
            console.log(`   Component: ${component} with ${items.length} items`);
            let componentObj = BlacklistHandler.entries.find(componentEntry => componentEntry.component == component);
            if (!componentObj) {
                BlacklistHandler.entries.push({component: component, itemEntries: items});
            } else {
                let componentIndex = BlacklistHandler.entries.indexOf(componentObj);
                items.forEach(item => {
                    componentObj.itemEntries.push(item);
                });
                BlacklistHandler.entries[componentIndex] = componentObj;
            }
        });
        return BlacklistHandler;
    },

    /**
     * Finishes setting the blacklist by registering it and cleaning the handler
     */
    register: () => {
        console.log(`   Registering Blacklist`)
        const blackListObj = {};
        const propertyArray = Object.getOwnPropertyNames(BlacklistHandler)
        for (let i = 0; i < propertyArray.length; i++) {
            let property = propertyArray[i];
            let type = typeof BlacklistHandler[property];
            if (type == 'function' || property == 'discoveredIndex') continue;
            blackListObj[property] = BlacklistHandler[property];
        };
        
        if (BlacklistHandler.discoveredIndex === false) {
            global.BlackList.push(blackListObj);
        } else {
            global.BlackList[BlacklistHandler.discoveredIndex] = blackListObj;
        }
        BlacklistHandler.reset()
    },

    /**
     * Resets the blacklist registry handler, not meant for usage outside of handler
     */
    reset: () => {
        BlacklistHandler.material = '';
        BlacklistHandler.discoveredIndex = false;
        BlacklistHandler.entries = [];
    }
};