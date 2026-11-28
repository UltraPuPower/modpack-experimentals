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

const testmaterialList = [];

function MaterialBuilder() {
    return this
};

(()=>{
    MaterialBuilder.materialTable = {};

    MaterialBuilder.materialTypes = {
        'composite': {components: ['dust']},
        'metal': {components: ['block', 'nugget', 'plate', 'liquid'], materialProperties: {melting_point: 400, toughness: 50}},
        'salt': {components: ['dust_block'], materialProperties: {compressionlevel: 4}},
        'plastic': {components: ['block', 'liquid']},
        'gem': {components: ['gem_block']}
    };

    function findNestedComponents(material, component, grade) {
        if (grade > 30) {console.error(`Nested component 30 deep, breaking (${component})`); return;}
        if (component == '') return
        let dependencies = [];
        let result = [];
        let foundComponent = global.ComponentList.find(storedComponent => storedComponent.id == component);
        if (!foundComponent) {console.error(`Component "${component}" does not exist (at material: "${material}")`); return}
        dependencies = foundComponent.dependencies;
        if (dependencies) dependencies.forEach(dependency => findNestedComponents(material, dependency, grade+1).forEach(element => result.pushUnique(element)));
        result.pushUnique(component);
        return result
    };

    MaterialBuilder.prototype.create = function(materialId) {
        this.materialId = materialId
        console.log(`Starting material registry for "${this.materialId}"`);
        return this
    };

    MaterialBuilder.prototype.setColors = function(primary, secondary) {
        this.colors = {};
        this.colors.primary = primary;
        this.colors.secondary = secondary || false;
        return this
    };

    MaterialBuilder.prototype.setComposition = function(composition) {
        this.composition = composition
        return this
    };

    MaterialBuilder.prototype.setComponents = function(components) {
        if (!this.components) this.components = [];
        components.forEach(component => findNestedComponents(this.materialId, component, 1).forEach(element => this.components.pushUnique(element)));
        return this;
    };

    MaterialBuilder.prototype.setTextureSet = function(textureSet) {
        this.textureSet = textureSet
        return this
    };

    MaterialBuilder.prototype.addCustomTextures = function(textureObjects) {
        this.textureOverrides = {};
        textureObjects.forEach(element => this.textureOverrides[element.component] = element.location);
        return this
    };

    MaterialBuilder.prototype.addItemOverrides = function(itemOverrides) {
        this.itemOverrides = {};
        itemOverrides.forEach(override => this.itemOverrides[override.component] = override.item);
        return this
    };

    MaterialBuilder.prototype.addMaterialProperties = function(properties) {
        if (!this.materialProperties) this.materialProperties = {};
        let keys = Object.keys(properties)
        keys.forEach(key => this.materialProperties[key] = properties[key]);
        return this
    };

    MaterialBuilder.prototype.setMaterialType = function(type) {
        if (MaterialBuilder.materialTypes[type]) {
            this.materialType = type;
            let keys = Object.keys(MaterialBuilder.materialTypes[type])
            if (keys.includes('components')) {
                if (!this.components) this.components = [];
                MaterialBuilder.materialTypes[type].components.forEach(key => this.components.pushUnique(key));
            } else if (keys.includes('materialProperties')) {
                Object.keys(MaterialBuilder.materialTypes[type].materialProperties).forEach(key => {
                    if (!this.materialProperties) this.materialProperties = {};
                    if (!this.materialProperties[key]) this.materialProperties[key] = materialTypes[type].materialProperties[key]
                });
            };
        } else console.warn(`Invalid type for ${ComponentHandler.id}: ${type}`);
        return this
    };

    MaterialBuilder.prototype.register = function() {
        let materialKey = MaterialBuilder.materialTable[this.materialId];
        if (typeof materialKey == 'number') {
            let keys = Object.keys(this)
            keys.forEach(key => testmaterialList[materialKey][key] = this[key]);
            console.log(`   Adjusting material "${this.materialId}"`);
        } else {
            MaterialBuilder.materialTable[this.materialId] = testmaterialList.length;
            testmaterialList.push(this);
            console.log(`   Registering material "${this.materialId}"`);
        }
    };

})();