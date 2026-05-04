// priority: 1000000
/**
 * @typedef {Object} intermediateTagIngredient
 * @property {string} id - Tag id of the tag in the stack
 * @property {number} count - Amount of the tag in the stack
 */

/**
 * Creates an intermediate item stack for usage by other functions
 * @param {string} id - The id of the tag in the stack
 * @param {number} count - The amount of the tag in the stack
 */
function TagHandler(id, count) {
    this.id = id;
    this.count = (count) ? count: 1;
}

/**
 * Modifies the amount in the ingredient
 * @param {number} amount - The new amount of the tag in the stack
 */
TagHandler.prototype.modifyAmount = function(count) {
    this.count = count;
}

// /**
//  * Creates a valid recipe itemstack from the intermediate tag ingredient
//  * @returns {$ItemStack} Valid recipe item stack
//  */
// TagHandler.prototype.getItemOf = function() {
//     return Item.of(`#${this.id}`, this.count);
// }

// /**
//  * Creates a valid recipe fluidstack from the intermediate tag ingredient
//  * @returns {$FluidStack} Valid recipe fluid stack
//  */
// TagHandler.prototype.getFluidOf = function() {
//     return Fluid.of(`#${this.id}`, this.amount);
// }

/**
 * Creates an Ingredient from the intermediate item stack
 * @returns {$Ingredient} Minecraft recipe ingredient
 */
TagHandler.prototype.getIngredient = function() {
    let tagObject = {
        "tag": this.id,
        "count": this.count
    };
    return tagObject;
}