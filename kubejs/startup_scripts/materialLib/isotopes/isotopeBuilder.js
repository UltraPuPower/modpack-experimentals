// priority: 100000

/**
 * @typedef {Object} IsotopeObject
 * @property {string} isotopeId - Id of the isotope
 * @property {string} symbol - Dependency components for this component
 * @property {number} protonCount - The amount of protons this isotope contains
 * @property {number} nucleonCount - The amount of protons this isotope contains
 */

function IsotopeBuilder() {
    return this
};

(()=>{
    IsotopeBuilder.isotopeTable = {};

    IsotopeBuilder.prototype.create = function(isotopeId) {
        this.isotopeId = isotopeId
        console.log(`Starting isotope registry for "${this.isotopeId}"`);
        return this;
    };

    IsotopeBuilder.prototype.setSymbol = function(symbol) {
        this.symbol = symbol
        return this;
    };

    IsotopeBuilder.prototype.setProtonCount = function(protons) {
        this.protons = protons
        return this;
    };

    IsotopeBuilder.prototype.SetNucleonCount = function(nucleons) {
        this.nucleons = nucleons
        return this;
    };

    IsotopeBuilder.prototype.register = function() {
        let isotopeKey = IsotopeBuilder.isotopeTable[this.isotopeId];
        if (typeof isotopeKey == 'number') {
            let keys = Object.keys(this)
            keys.forEach(key => testisotopeList[isotopeKey][key] = this[key]);
            console.log(`   Adjusting isotope "${this.isotopeId}"`);
        } else {
            IsotopeBuilder.isotopeTable[this.isotopeId] = testisotopeList.length;
            testisotopeList.push(this);
            console.log(`   Registering isotope "${this.isotopeId}"`);
        }
    };

})();