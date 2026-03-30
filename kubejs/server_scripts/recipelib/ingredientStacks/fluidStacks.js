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

FluidHandler.prototype.addComponentData = function(data) {
    this.components = data;
}

/**
 * Creates an intermediate item stack for usage by other functions
 * @param {intermediateItemStack} stack - An intermediate item stack
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
 * Creates a valid json fluid object from the intermediate fluid stack
 * @returns {$fluidStack} Valid json fluid object using "fluid" notation
 */
FluidHandler.prototype.getInputIngredient = function() {
    let fluidObject = {
        "fluid": this.id,
        "amount": this.amount
    };
    return fluidObject;
}

/**
 * Creates a valid json fluid object from the intermediate fluid stack
 * @returns {$fluidStack} Valid json fluid object using "id" notation
 */
FluidHandler.prototype.getOutputIngredient = function() {
    let fluidObject = {
        "id": this.id,
        "amount": this.amount
    };
    if (this.components) fluidObject["components"] = this.components;
    return fluidObject
}

/**
 * Creates a valid json chemical object from an intermediate fluid stack
 * @returns {$fluidStack} Valid json chemical object using "id" notation
 */
FluidHandler.prototype.getOutputIngredient = function() {
    let chemicalObject = {
        "amount": fluidStack.amount,
        "chemical": fluidStack.id
    };
    return chemicalObject;
}