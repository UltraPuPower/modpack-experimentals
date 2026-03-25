// priority: 99997
const materialConsole = Java.createConsole("MaterialLib/Material Console");

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
    result: {
        id: '',
        colors: [],
        composition: [],
        components: new Set([]),
        textureSet: "default",
        textureOverrides: {},
        itemOverrides: {},
        dataObject: {}
    },

    /**
     * Sets identifier for the material
     * @param {string[]} id - The id for the material
     * @returns {MaterialHandler} Material Handler, allows for method chaining
     */
    create: (id) => {
        MaterialHandler.result.id = id;
        materialConsole.log(`Creating material with id ${id}`);
        return MaterialHandler;
    },

    /**
     * Sets the primary and secondary colors of the materials
     * @param {string} primaryColor - The primary color, must be a valid color code using # hexadecimal notation
     * @param {string} secondaryColor - The primary color, can be a valid color code using # hexadecimal notation or 0 for ignoring secondary color
     * @returns {MaterialHandler} Material Handler, allows for method chaining
     */
    setColors: (primaryColor, secondaryColor) => {
        MaterialHandler.result.colors = [primaryColor, secondaryColor];
        return MaterialHandler;
    },

    /**
     * Sets the composition of the material in elements or other materials
     * @param {string[]} composition - An array of submaterials that make up this material
     * @returns {MaterialHandler} Material Handler, allows for method chaining
     */
    setComposition: (composition) => {
        MaterialHandler.result.composition = composition;
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
        MaterialHandler.result.components = global.setToArray(MaterialHandler.result.components);
        return MaterialHandler;
    },

    /**
     * Sets the texture set used by the material for component texture generation
     * @param {textureSet} set - A texture set
     * @returns {MaterialHandler} Material Handler, allows for method chaining
     */
    useTextureSet: (set) => {
        MaterialHandler.result.textureSet = set;
        return MaterialHandler;
    },

    /**
     * Flags a component to be given a custom texture instead of the auto generated one
     * @param {string} component - The component for which the asset will be replaced
     * @param {assetLocation} location - The location of the replacement asset
     * @returns {MaterialHandler} Material Handler, allows for method chaining
     */
    setOverrideTexture: (component, location) => {
        MaterialHandler.result.textureOverrides[component] = location;
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
            MaterialHandler.result.itemOverrides[override.component] = override.item;
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
        MaterialHandler.result.dataObject = dataObject;
        return MaterialHandler;
    },

    /**
     * Finishes the creation of a material by registering it and cleaning the handler
     */
    register: () => {
        const materialObj = MaterialHandler.result;
        materialConsole.log(`   Registering material ${MaterialHandler.id}`);
        global.MaterialList.push(materialObj);
        MaterialHandler.reset();
    },

    /**
     * Resets the material creation handler, not meant for usage outside of handler
     */
    reset: () => {
        MaterialHandler.result = {
            id: '',
            colors: [],
            composition: [],
            components: new Set([]),
            textureSet: "default",
            textureOverrides: {},
            itemOverrides: {},
            dataObject: {}
        };
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
            materialConsole.error(`Component "${component}" does not exist (at material: "${MaterialHandler.id}")`);
            return
        }
        MaterialHandler.result.components.add(component);
        dependencies = global.setToArray(foundComponent.dependencies);
        if (dependencies) {
            for (let i = 0; i < dependencies.length; i++) {
                MaterialHandler.findNestedComponents(dependencies[i], grade+1);
            }
        }
        
    }

};