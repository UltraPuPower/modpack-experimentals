// priority: 10000

global.MaterialList = [];

global.MaterialHandler = {
    id: '',
    colors: [],
    composition: [],
    components: new Set([]),
    textureSet: "default",
    textureOverrides: {},
    itemOverrides: {},

    create: (id) => {
        global.MaterialHandler.id = id;
        return global.MaterialHandler;
    },

    setColors: (primaryColor, secondaryColor) => {
        global.MaterialHandler.colors = [primaryColor, secondaryColor];
        return global.MaterialHandler;
    },

    setComposition: (composition) => {
        global.MaterialHandler.composition = composition;
        return global.MaterialHandler;
    },

    setComponents: (components) => {
        for (let i = 0; i < components.length; i++) {
            global.MaterialHandler.findNestedComponents(components[i], 1);
        }
        return global.MaterialHandler;
    },

    useTextureSet: (set) => {
        global.MaterialHandler.textureSet = set;
        return global.MaterialHandler;
    },

    setOverrideTexture: (component, location) => {
        global.MaterialHandler.textureOverrides[component] = location;
        return global.MaterialHandler;
    },

    setOverrideItem: (component, itemId) => {
        global.MaterialHandler.itemOverrides[component] = itemId;
        return global.MaterialHandler;
    },

    register: () => {
        const materialObj = {};
        const propertyArray = Object.getOwnPropertyNames(global.MaterialHandler);
        for (let i = 0; i < propertyArray.length; i++) {
            let property = propertyArray[i];

            let type = typeof global.MaterialHandler[property];
            if (type == 'function') continue;
            
            // Done for debug purposes, Rhino does not like logging sets
            if (!(property == 'components')) {
                materialObj[property] = global.MaterialHandler[property];
                continue;
            }
            
            materialObj[property] = [];
            global.MaterialHandler[property].forEach(component => {
                materialObj[property].push(component);
            });
        };
        
        global.MaterialList.push(materialObj);
        global.MaterialHandler.reset();
    },

    reset: () => {
        global.MaterialHandler.id = '';
        global.MaterialHandler.colors = [];
        global.MaterialHandler.composition = [];
        global.MaterialHandler.components = new Set([]);
        global.MaterialHandler.textureSet = "default";
        global.MaterialHandler.textureOverrides = {};
        global.MaterialHandler.itemOverrides = {};
    },

    // ==========[Utils]========== \\
    findNestedComponents: (component, grade) => {        
        let dependencies = [];
        let foundComponent = global.ComponentList.find(storedComponent => storedComponent.id == component);
        if (!foundComponent && component != "") {
            console.error(`[MaterialHandler] component "${component}" does not exist (material: "${global.MaterialHandler.id}")`);
            return
        }
        global.MaterialHandler.components.add(component);
        dependencies = global.setViewer(foundComponent.dependencies);
        if (dependencies) {
            for (let i = 0; i < dependencies.length; i++) {
                global.MaterialHandler.findNestedComponents(dependencies[i], grade+1);
            }
        }
        
    }

};