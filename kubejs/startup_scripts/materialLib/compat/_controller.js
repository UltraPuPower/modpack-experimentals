// priority: 99995
global.itemBlackList = [];

const materialList = global.MaterialList;

const BlacklistHandler = {
    material: '',
    discoveredIndex: false,
    entries: [],

    getMaterial: (materialId) => {
        let materialObj = materialList.find(material => material.id == materialId);
        if (materialObj) {
            BlacklistHandler.material = materialId
            let blackListObj = global.itemBlackList.find(entry => entry.material == BlacklistHandler.material);
            if (blackListObj) {
                blackListObj.entries.forEach(entry => {
                    BlacklistHandler.entries.push(entry)
                });
                BlacklistHandler.discoveredIndex = global.itemBlackList.indexOf(blackListObj);
            }
        } else console.warn(`   Blacklisting ran into an issue: can't find material ${materialId}`)
        return BlacklistHandler;
    },

    setItems: (entries) => {
        entries.forEach(entry => {
            const {component, items} = entry
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
        const blackListObj = {};
        const propertyArray = Object.getOwnPropertyNames(BlacklistHandler)
        for (let i = 0; i < propertyArray.length; i++) {
            let property = propertyArray[i];
            let type = typeof BlacklistHandler[property];
            if (type == 'function' || property == 'discoveredIndex') continue;
            blackListObj[property] = BlacklistHandler[property];
        };
        
        if (BlacklistHandler.discoveredIndex === false) {
            global.itemBlackList.push(blackListObj);
        } else {
            global.itemBlackList[BlacklistHandler.discoveredIndex] = blackListObj;
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