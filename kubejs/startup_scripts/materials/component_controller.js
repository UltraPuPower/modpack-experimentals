// priority: 100000

global.componentList = [];

global.ComponentHandler = {
    id: '',
    dependencies: new Set([]),

    create: (id) => {
        global.ComponentHandler.id = id;
        return global.ComponentHandler
    },

    setDependencies: (dependencies) => {
        for (let i = 0; i < dependencies.length; i++) {
            let component = dependencies[i]
            let foundComponent = global.componentList.find(storedComponent => storedComponent.id == component)
            if (!foundComponent && component != "") {
                console.error(`[ComponentHandler] component "${component}" does not exist (component: "${global.ComponentHandler.id}")`)
                continue
            }
            global.ComponentHandler.dependencies.add(component)
        }
        return global.ComponentHandler
    },

    register: () => {
        const componentObj = {};
        const propertyArray = Object.getOwnPropertyNames(global.ComponentHandler)
        for (let i = 0; i < propertyArray.length; i++) {
            let property = propertyArray[i];
            let type = typeof global.ComponentHandler[property];
            if (type == 'function') continue;
            componentObj[property] = global.ComponentHandler[property];
        };
        
        global.componentList.push(componentObj);
        global.ComponentHandler.reset()
    },

    reset: () => {
        global.ComponentHandler.id = '';
        global.ComponentHandler.dependencies = new Set([]);
    }
};