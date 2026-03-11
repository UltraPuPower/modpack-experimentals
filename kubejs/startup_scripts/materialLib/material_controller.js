// priority: 99997
/**
 * @typedef {String} assetLocation String describing a valid minecraft asset location (e.g. minecraft:item/iron_ingot)
 */

/**
 * @typedef {String} textureSet String describing a texture set. These are located at .../instance/kubejs/assets/kubejs/textures/<item/block>/materiallib/, depending on whether the set exists for items, blocks or both
 */

/**
 * @typedef {Object} MaterialObject
 * @property {string} id - Id of the material
 * @property {string[]} colors - Array containing primary and possible secondary color
 * @property {string[]} composition - Dependency components for this component
 * @property {Set} components - Which component to generate for the material
 * @property {textureSet} textureSet - The used texture set for component generation
 * @property {Object} textureOverrides - Sets a custom texture for the component instead of the default texture generation
 * @property {Object} itemOverrides - Sets an item to replace a component
 */

/**
 * @param {Array<MaterialObject>} MaterialList
 */
global.MaterialList = [];


/**
 * @typedef {Object} MaterialHandler The handler for material registry
 */
const MaterialHandler = {
    id: '',
    colors: [],
    composition: [],
    components: new Set([]),
    textureSet: "default",
    textureOverrides: {},
    itemOverrides: {},
    dataObject: {},

    /**
     * Sets identifier for the material
     * @param {string[]} amount - The id for the material
     * @returns {MaterialHandler} Material Handler, allows for method chaining
     */
    create: (id) => {
        MaterialHandler.id = id;
        return MaterialHandler;
    },

    /**
     * Sets the primary and secondary colors of the materials
     * @param {string} primaryColor - The primary color, must be a valid color code using # hexadecimal notation
     * @param {string} secondaryColor - The primary color, can be a valid color code using # hexadecimal notation or 0 for ignoring secondary color
     * @returns {MaterialHandler} Material Handler, allows for method chaining
     */
    setColors: (primaryColor, secondaryColor) => {
        MaterialHandler.colors = [primaryColor, secondaryColor];
        return MaterialHandler;
    },

    /**
     * Sets the composition of the material in elements or other materials
     * @param {string[]} composition - An array of submaterials that make up this material
     * @returns {MaterialHandler} Material Handler, allows for method chaining
     */
    setComposition: (composition) => {
        MaterialHandler.composition = composition;
        return MaterialHandler;
    },

    /**
     * Sets the components for the material
     * @param {string[]} components - All components that should be generated for the material
     * @returns {MaterialHandler} Material Handler, allows for method chaining
     */
    setComponents: (components) => {
        for (let i = 0; i < components.length; i++) {
            MaterialHandler.findNestedComponents(components[i], 1);
        }
        return MaterialHandler;
    },

    /**
     * Sets the texture set used by the material for component texture generation
     * @param {textureSet} set - A texture set
     * @returns {MaterialHandler} Material Handler, allows for method chaining
     */
    useTextureSet: (set) => {
        MaterialHandler.textureSet = set;
        return MaterialHandler;
    },

    /**
     * Flags a component to be given a custom texture instead of the auto generated one
     * @param {string} component - The component for which the asset will be replaced
     * @param {assetLocation} location - The location of the replacement asset
     * @returns {MaterialHandler} Material Handler, allows for method chaining
     */
    setOverrideTexture: (component, location) => {
        MaterialHandler.textureOverrides[component] = location;
        return MaterialHandler;
    },

    /**
     * Flags a component to be skipped on material generation and provides an alternative item for recipe generation
     * @param {string} component - The component that will be replaced
     * @param {string} itemId - The id of the item that serves as the replacement for the auto generated item
     * @returns {MaterialHandler} Material Handler, allows for method chaining
     */
    setOverrideItem: (overrideArray) => {
        overrideArray.forEach(override => {
            MaterialHandler.itemOverrides[override.component] = override.item;
        });
        return MaterialHandler;
    },

    /**
     * Flags a component to be skipped on material generation and provides an alternative item for recipe generation
     * @param {string} component - The component that will be replaced
     * @param {string} itemId - The id of the item that serves as the replacement for the auto generated item
     * @returns {MaterialHandler} Material Handler, allows for method chaining
     */
    setMaterialData: (dataObject) => {
        MaterialHandler.dataObject = dataObject;
        return MaterialHandler;
    },

    /**
     * Finishes the creation of a material by registering it and cleaning the handler
     */
    register: () => {
        const materialObj = {};
        const propertyArray = Object.getOwnPropertyNames(MaterialHandler);
        for (let i = 0; i < propertyArray.length; i++) {
            let property = propertyArray[i];

            let type = typeof MaterialHandler[property];
            if (type == 'function') continue;
            
            // Done for debug purposes, Rhino does not like logging sets
            if (!(property == 'components')) {
                materialObj[property] = MaterialHandler[property];
                continue;
            }
            
            materialObj[property] = [];
            MaterialHandler[property].forEach(component => {
                materialObj[property].push(component);
            });
        };
        
        global.MaterialList.push(materialObj);
        MaterialHandler.reset();
    },

    /**
     * Resets the material creation handler, not meant for usage outside of handler
     */
    reset: () => {
        MaterialHandler.id = '';
        MaterialHandler.colors = [];
        MaterialHandler.composition = [];
        MaterialHandler.components = new Set([]);
        MaterialHandler.textureSet = "default";
        MaterialHandler.textureOverrides = {};
        MaterialHandler.itemOverrides = {};
        MaterialHandler.dataObject = {};
    },

    // ==========[Utils]========== \\
    /**
     * Loops through component dependencies and adds all to the component set
     * @param {string} component - Id of the root component
     * @param {string[]} grade - The current nesting grade
     */
    findNestedComponents: (component, grade) => {        
        let dependencies = [];
        let foundComponent = global.ComponentList.find(storedComponent => storedComponent.id == component);
        if (!foundComponent && component != "") {
            console.error(`[MaterialHandler] component "${component}" does not exist (material: "${MaterialHandler.id}")`);
            return
        }
        MaterialHandler.components.add(component);
        dependencies = global.setToArray(foundComponent.dependencies);
        if (dependencies) {
            for (let i = 0; i < dependencies.length; i++) {
                MaterialHandler.findNestedComponents(dependencies[i], grade+1);
            }
        }
        
    }

};