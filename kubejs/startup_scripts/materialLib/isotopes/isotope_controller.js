// priority: 100000
const isotopeConsole = Java.createConsole("MaterialLib/Isotope Console");

/**
 * @typedef {Object} IsotopeObject
 * @property {string} isotopeId - Id of the isotope
 * @property {string} symbol - Dependency components for this component
 * @property {number} protonCount - The amount of protons this isotope contains
 * @property {number} nucleonCount - The amount of protons this isotope contains
 */

/**
 * @param {Array<isotopeObject>} IsotopeList
 */
global.IsotopeList = [];

/**
 * @typedef {Object} IsotopeHandler The handler for isotope registry
 */
const IsotopeHandler = {
    result: {
        isotopeId: '',
        symbol: '',
        protonCount: 0,
        nucleonCount: 0
    },

    /**
     * Sets the identifier of the isotope
     * @param {string} id - The id of the isotope
     * @returns {IsotopeHandler} Isotope Handler, allows for method chaining
     */
    create: (id) => {
        IsotopeHandler.result.isotopeId = id;
        isotopeConsole.log(`Creating isotope with id ${id}`);
        return IsotopeHandler;
    },

    /**
     * Sets the symbol for the isotope (e.g. Uranium would have the standard symbol U)
     * @param {string} symbol - A symbol, can use any valid minecraft symbols
     * @returns {IsotopeHandler} Isotope Handler, allows for method chaining
     */
    setSymbol: (symbol) => {
        IsotopeHandler.result.symbol = symbol;
        return IsotopeHandler;
    },

    /**
     * Sets the amount of protons in an isotope
     * @param {string} protonCount - The amount of protons in the isotope
     * @returns {IsotopeHandler} Isotope Handler, allows for method chaining
     */
    setProtonCount: (protonCount) => {
        IsotopeHandler.result.protonCount = protonCount;
        return IsotopeHandler;
    },

    /**
     * Sets the amount of nucleodes in an isotope
     * @param {string} nucleonCount - The amount of nucleodes in this isotope
     * @returns {IsotopeHandler} Isotope Handler, allows for method chaining
     */
    setNucleonCount: (nucleonCount) => {
        IsotopeHandler.result.nucleonCount = nucleonCount;
        return IsotopeHandler;
    },

    /**
     * Finishes the creation of an isotope by registering it and cleaning the handler
     */
    register: () => {
        const isotopeObj = IsotopeHandler.result;
        isotopeConsole.log(`    Registering ${IsotopeHandler.isotopeId}`);
        global.IsotopeList.push(isotopeObj);
        IsotopeHandler.reset();
    },

    /**
     * Resets the isotope creation handler, not meant for usage outside of handler
     */
    reset: () => {
        IsotopeHandler.result = {
            isotopeId: '',
            symbol: '',
            protonCount: 0,
            nucleonCount: 0
        };
    }

};