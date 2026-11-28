// priority: 99999

/**
 * @typedef {Object} ComponentObject
 * @property {string} id - Id of the component
 * @property {string[]} dependencies - Dependency components for this component
 * @property {number} liquidAmount - The amount of millibuckets this component should produce when liquefied
 * @property {boolean} generateMoldItem - Whether to generate a mold or not, and subsequently whether the component can be solidified
 */

const testcomponentList = [];

function ComponentBuilder() {
    return this;
};

(()=>{
    ComponentBuilder.componentTable = {};

    ComponentBuilder.states = ['solid', 'liquid', 'gas', 'plasma'];

    ComponentBuilder.types = ['item', 'block', 'fluid', 'chemical'];

    ComponentBuilder.affixes = ['prefix', 'suffix'];

    ComponentBuilder.prototype.create = function(componentId) {
        this.componentId = componentId
        console.log(`Starting component registry for "${this.componentId}"`);
        return this;
    };

    ComponentBuilder.prototype.setDependencies = function(dependencies) {
        if (!this.dependencies) this.dependencies = [];
        dependencies.forEach(component => this.dependencies.pushUnique(component));
        return this;
    };

    ComponentBuilder.prototype.doMoldGeneration = function() {
        this.generateMold = true
        return this;
    };

    ComponentBuilder.prototype.setComponentState = function(state) {
        if (ComponentBuilder.states.includes(state)) {
            this.state = state;
        } else componentConsole.warn(`Invalid state for ${this.componentId}: ${state}`)
        return this;
    };

    ComponentBuilder.prototype.setComponentType = function(type) {
        if (ComponentBuilder.types.includes(type)) {
            this.type = type;
        } else componentConsole.warn(`Invalid type for ${this.componentId}: ${type}`)
        return this;
    };

    ComponentBuilder.prototype.setComponentAffix = function(affix) {
        if ((typeof affix == 'string' && ComponentBuilder.affixes.includes(affix)) || (typeof affix == 'object' && Object.keys(affix).includes('prefix') && Object.keys(affix).includes('suffix'))) {
            this.affixData = affix;
        } else componentConsole.warn(`Invalid affix for ${this.componentId}: ${affix}`)
        return this;
    };

    ComponentBuilder.prototype.setLiquidAmount = function(amount) {
        this.liquidValue = amount
        return this;
    };

    ComponentBuilder.prototype.setRegistryLoader = function(loader) {
        this.registryLoader = loader
        return this;
    };

    ComponentBuilder.prototype.addDependant = function(component) {
        let componentIndex = ComponentBuilder.componentTable[component];
        let componentObj = testcomponentList[componentIndex];
        componentObj.dependencies.pushUnique(this.componentId)
        testcomponentList[componentIndex] = componentObj;
        return this;
    };

    ComponentBuilder.prototype.register = function() {
        let componentKey = ComponentBuilder.componentTable[this.componentId];
        if (typeof componentKey == 'number') {
            let keys = Object.keys(this)
            keys.forEach(key => testcomponentList[componentKey][key] = this[key]);
            console.log(`   Adjusting component "${this.componentId}"`);
        } else {
            ComponentBuilder.componentTable[this.componentId] = testcomponentList.length;
            testcomponentList.push(this);
            console.log(`   Registering component "${this.componentId}"`);
        }
    };

})();