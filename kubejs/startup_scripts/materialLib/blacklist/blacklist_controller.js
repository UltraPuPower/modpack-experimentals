// priority: 99995
const blacklistConsole = Java.createConsole("MaterialLib/Blacklist Console");

/**
 * @typedef {Object} BlacklistObject
 * @property {string} material - The material this blacklist entry governs
 * @property {blacklistItemEntry[]} entries - Dependency components for this component{ component, itemEntries }
 */

/**
 * @param {Array<BlacklistObject>} itemBlackList
 */
global.itemBlackList = [];
const materialList = global.MaterialList;

/**
 * @typedef {Object} BlacklistHandler The handler for blacklist entry registry
 */
const BlacklistHandler = {
    result: {
        material: '',
        entries: []
    },
    discoveredIndex: false,

    /**
     * Creates or pulls a material for blacklisting
     * @param {string} materialId - The id of the material
     * @returns {Handler} Component Handler, allows for method chaining
     */
    getMaterial: (materialId) => {
        let materialObj = materialList.find(material => material.id == materialId);
        if (!materialObj) {
            blacklistConsole.warn(`Blacklisting ran into an issue: can't find material ${materialId}`);
            return BlacklistHandler;
        }
        let blackListObj = global.itemBlackList.find(entry => entry.material == BlacklistHandler.result.material);
        if (blackListObj) {
            BlacklistHandler.result = blackListObj;
            BlacklistHandler.discoveredIndex = global.itemBlackList.indexOf(blackListObj);
            blacklistConsole.log(`Loaded material blacklist for ${materialId}`);
        } else {
            BlacklistHandler.result.material = materialId;
            blacklistConsole.log(`Created material blacklist for ${materialId}`);
        };
        return BlacklistHandler;
    },

    /**
     * Sets items for blacklisting
     * @param {blacklistItemEntry[]} entries - Objects containing replacement
     * @returns {Handler} Component Handler, allows for method chaining
     */
    setItems: (entries) => {
        entries.forEach(entry => {
            const {component, items} = entry
            let componentObj = BlacklistHandler.result.entries.find(componentEntry => componentEntry.component == component);
            if (!componentObj) {
                BlacklistHandler.result.entries.push({component: component, itemEntries: items});
            } else {
                let componentIndex = BlacklistHandler.result.entries.indexOf(componentObj);
                items.forEach(item => {
                    componentObj.itemEntries.push(item);
                });
                BlacklistHandler.result.entries[componentIndex] = componentObj;
            }
        });
        return BlacklistHandler;
    },

    /**
     * Finishes setting the blacklist by registering it and cleaning the handler
     */
    register: () => {
        const blackListObj = BlacklistHandler.result;
        
        if (BlacklistHandler.discoveredIndex === false) {
            global.itemBlackList.push(blackListObj);
            blacklistConsole.log(`  Registered material blacklist for ${BlacklistHandler.result.material}`);
        } else {
            global.itemBlackList[BlacklistHandler.discoveredIndex] = blackListObj;
            blacklistConsole.log(`  Overwrote material blacklist for ${BlacklistHandler.result.material}`);
        }
        BlacklistHandler.reset()
    },

    /**
     * Resets the blacklist registry handler, not meant for usage outside of handler
     */
    reset: () => {
        BlacklistHandler.result = {
            material: '',
            entries: []
        };
        BlacklistHandler.discoveredIndex = false;
    }
};