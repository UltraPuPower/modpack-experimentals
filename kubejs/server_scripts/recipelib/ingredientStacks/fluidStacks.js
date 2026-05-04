// priority: 1000000
/**
 * @typedef {Object} intermediateFluidStack
 * @property {string} id - Fluid id of the fluid in the stack
 * @property {number} amount - Amount of millibuckets in the stack
 * @property {object} components - Minecraft components (previously NBT)
 */

/**
 * Creates an intermediate fluid stack for usage by other functions
 * @param {string} id - The id of the fluid in the stack
 * @param {number} amount - The amount of fluid in millibuckets for the stack
 */
function FluidHandler(id, amount) {
    this.id = id;
    this.amount = (amount) ? amount : 1000;
}

/**
 * Adds component data to the item stack
 * @param {object} data - An intermediate item stack
 */
FluidHandler.prototype.addComponentData = function(data) {
    this.components = data;
}

/**
 * Modifies the amount in the stack
 * @param {number} amount - The new amount of items in the stack
 */
FluidHandler.prototype.modifyAmount = function(amount) {
    this.amount = amount;
}

/**
 * Creates a valid recipe fluidstack from the intermediate fluid stack
 * @returns {$FluidStack} Valid recipe fluid stack
 */
FluidHandler.prototype.getFluidOf = function() {
    return (this.components) ? Fluid.of(this.id, this.amount, this.components) : Fluid.of(this.id, this.amount);
}

/**
 * Creates an Ingredient from the intermediate fluid stack
 * @returns {$Ingredient} Minecraft recipe ingredient
 */
FluidHandler.prototype.getIngredient = function() {
    let fluidObject = {
        "fluid": this.id,
        "amount": this.amount
    };
    return fluidObject;
}

/**
 * Creates a FluidStack from the intermediate fluid stack
 * @returns {$FluidStack} Minecraft recipe fluid stack
 */
FluidHandler.prototype.getFluidStack = function() {
    let fluidObject = {
        "id": this.id,
        "amount": this.amount
    };
    if (this.components) fluidObject["components"] = this.components;
    return fluidObject
}

/**
 * Creates an Ingredient from the intermediate fluid stack, as a chemical
 * @returns {$FluidStack} Minecraft recipe ingredient
 */
FluidHandler.prototype.getMekanismChemical = function() {
    let chemicalObject = {
        "amount": this.amount,
        "chemical": this.id
    };
    return chemicalObject;
}