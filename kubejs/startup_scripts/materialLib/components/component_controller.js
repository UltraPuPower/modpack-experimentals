// priority: 99999
const componentConsole = Java.createConsole("MaterialLib/Component Console");

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

let componentStates = ['solid', 'liquid', 'gas', 'plasma'];
let componentTypes = ['item', 'block', 'fluid', 'chemical'];
let componentAffixes = ['prefix', 'suffix'];

/**
 * @typedef {Object} ComponentHandler The handler for component registry
 */
const ComponentHandler = {
    result: {
        id: '',
        dependencies: new Set([]),
        liquidAmount: 0,
        generateMoldItem: false,
        state: 'solid',
        type: 'item',
        affixData: 'suffix',
        loader: 'base'
    },

    /**
     * Initiates the creation of a component by setting the id
     * @param {string} id - The id of the item in the stack
     * @returns {Handler} Component Handler, allows for method chaining
     */
    create: (id) => {
        ComponentHandler.result.id = id;
        componentConsole.log(`Creating component with id ${id}`);
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
            ComponentHandler.result.dependencies.add(component)
        }
        ComponentHandler.result.dependencies = global.setToArray(ComponentHandler.result.dependencies)
        return ComponentHandler
    },

    /**
     * Flags the component for mold generation and subsequently solidifying recipes on the server side
     * @returns {Handler} Component Handler, allows for method chaining
     */
    generateMold: () => {
        ComponentHandler.result.generateMoldItem = true;
        return ComponentHandler
    },

    /**
     * Sets the state of the material that this component is in
     * @param {string} state - A state of matter: solid, liquid, gas, plasma
     * @returns {Handler} Component Handler, allows for method chaining
     */
    setComponentState: (state) => {
        if (componentStates.includes(state)) {
            ComponentHandler.result.state = state;
        } else componentConsole.warn(`Invalid state for ${ComponentHandler.id}: ${state}`)
        return ComponentHandler
    },

    /**
     * Sets the state of the material that this component is in
     * @param {string} type - A type of component: item, block, fluid
     * @returns {Handler} Component Handler, allows for method chaining
     */
    setComponentType: (type) => {
        if (componentTypes.includes(type)) {
            ComponentHandler.result.type = type;
        } else componentConsole.warn(`Invalid type for ${ComponentHandler.id}: ${type}`)
        return ComponentHandler
    },

    /**
     * Sets the liquid volume of the component
     * @param {string[]} amount - The amount of millibuckets the component gives when liquefied
     * @returns {Handler} Component Handler, allows for method chaining
     */
    setLiquidAmount: (amount) => {
        ComponentHandler.result.liquidAmount = amount
        return ComponentHandler
    },

    /**
     * Sets the type of affix the component is
     * @param {string} affix - The affix of the component: prefix, suffix, {prefix: '', suffix: ''}
     * @returns {Handler} Component Handler, allows for method chaining
     */
    setComponentAffix: (affix) => {
        if ((typeof affix == 'string' && componentAffixes.includes(affix)) || (typeof affix == 'object' && Object.keys(affix).includes('prefix') && Object.keys(affix).includes('suffix'))) {
            ComponentHandler.result.affixData = affix;
        } else componentConsole.warn(`Invalid affix for ${ComponentHandler.id}: ${affix}`)
        return ComponentHandler
    },

    /**
     * Dictates what loader file is used for generating the component
     * @param {string} loader - The loader file that should be used
     * @returns {Handler} Component Handler, allows for method chaining
     */
    setRegistryLoader: (loader) => {
        ComponentHandler.result.loader = loader;
        return ComponentHandler
    },

    /**
     * Adds the current component as a dependency to a different one
     * @param {string} component - The component that needs this component as a dependancy
     * @returns {Handler} Component Handler, allows for method chaining
     */
    addAsDependant: (component) => {
        let componentObj = global.ComponentList.find(componentObj => componentObj.id == component)
        let index = global.ComponentList.indexOf(componentObj)
        componentObj.dependencies.push(ComponentHandler.result.id)
        global.ComponentList[index] = componentObj
        return ComponentHandler
    },

    /**
     * Finishes the creation of a component by registering it and cleaning the handler
     */
    register: () => {
        const componentObj = ComponentHandler.result;
        componentConsole.log(`  Registering ${ComponentHandler.id}`);
        global.ComponentList.push(componentObj);
        ComponentHandler.reset()
    },

    /**
     * Resets the component creation handler, not meant for usage outside of handler
     */
    reset: () => {
        ComponentHandler.result = {
            id: '',
            dependencies: new Set([]),
            liquidAmount: 0,
            generateMoldItem: false,
            state: 'solid',
            type: 'item',
            affixData: 'suffix',
            loader: 'base'
        };
    }
};