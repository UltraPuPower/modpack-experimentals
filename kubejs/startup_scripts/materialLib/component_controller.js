// priority: 100000

/**
 * @typedef {Object} ComponentObject
 * @property {string} id - Id of the component
 * @property {string[]} dependencies - Dependency components for this component
 * @property {number} liquidAmount - The amount of millibuckets this component should produce when liquefied
 * @property {boolean} generateMoldItem - Whether to generate a mold or not, and subsequently whether the component can be solidified
 */

/**
 * @param {Array<ComponentObject>} ComponentList
 */
global.ComponentList = [];

const ComponentHandler = {
    id: '',
    dependencies: new Set([]),
    liquidAmount: 0,
    generateMoldItem: false,

    /**
     * Initiates the creation of a component by setting the id
     * @param {string} id - The id of the item in the stack
     * @returns {Handler} Component Handler, allows for method chaining
     */
    create: (id) => {
        ComponentHandler.id = id;
        return ComponentHandler
    },

    /**
     * Sets the dependencies of the component
     * @param {string[]} dependencies - An array containing the id's of all components required as a dependency
     * @returns {Handler} Component Handler, allows for method chaining
     */
    setDependencies: (dependencies) => {
        for (let i = 0; i < dependencies.length; i++) {
            let component = dependencies[i]
            let foundComponent = global.ComponentList.find(storedComponent => storedComponent.id == component)
            if (!foundComponent && component != "") {
                console.error(`[ComponentHandler] component "${component}" does not exist (component: "${ComponentHandler.id}")`)
                continue
            }
            ComponentHandler.dependencies.add(component)
        }
        return ComponentHandler
    },

    /**
     * Flags the component for mold generation and subsequently solidifying recipes on the server side
     * @returns {Handler} Component Handler, allows for method chaining
     */
    generateMold: () => {
        ComponentHandler.generateMoldItem = true;
        return ComponentHandler
    },

    /**
     * Sets the liquid volume of the component
     * @param {string[]} amount - The amount of millibuckets the component gives when liquefied
     * @returns {Handler} Component Handler, allows for method chaining
     */
    setLiquidAmount: (amount) => {
        ComponentHandler.liquidAmount = amount
        return ComponentHandler
    },

    /**
     * Finishes the creation of a component by registering it and cleaning the handler
     */
    register: () => {
        const componentObj = {};
        const propertyArray = Object.getOwnPropertyNames(ComponentHandler)
        for (let i = 0; i < propertyArray.length; i++) {
            let property = propertyArray[i];
            let type = typeof ComponentHandler[property];
            if (type == 'function') continue;
            componentObj[property] = ComponentHandler[property];
        };
        
        global.ComponentList.push(componentObj);
        ComponentHandler.reset()
    },

    /**
     * Resets the component creation handler, not meant for usage outside of handler
     */
    reset: () => {
        ComponentHandler.id = '';
        ComponentHandler.dependencies = new Set([]);
        ComponentHandler.liquidAmount = 0;
        ComponentHandler.generateMoldItem = false;
    }
};