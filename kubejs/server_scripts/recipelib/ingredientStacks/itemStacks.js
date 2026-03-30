// priority: 1000000
/**
 * @typedef {Object} intermediateItemStack
 * @property {string} id - Item id of the item in the stack
 * @property {number} count - Amount of items in the stack
 * @property {object} components - Minecraft components (previously NBT)
 */

/**
 * Creates an intermediate item stack for usage by other functions
 * @param {string} id - The id of the item in the stack
 * @param {number} count - The amount of items in the stack
 */
function ItemHandler(id, count) {
    this.id = id;
    this.count = (count) ? count: 1;
}

ItemHandler.prototype.addComponentData = function(data) {
    this.components = data;
}

/**
 * Creates an intermediate item stack for usage by other functions
 * @param {intermediateItemStack} stack - An intermediate item stack
 * @param {number} amount - The new amount of items in the stack
 */
ItemHandler.prototype.modifyAmount = function(count) {
    this.count = count;
}

/**
 * Creates a valid recipe itemstack from the intermediate item stack
 * @returns {$ItemStack} Valid recipe item stack
 */
ItemHandler.prototype.getItemOf = function() {
    return (this.components) ? Item.of(this.id, this.count, this.components) : Item.of(this.id, this.count);
}

/**
 * Creates a valid json item object from the intermediate item stack
 * @returns {$ItemStack} Valid json item object using "item" notation for inputs
 */
ItemHandler.prototype.getInputIngredient = function() {
    let itemObject = {
        "item": this.id,
        "count": this.count
    };
    return itemObject;
}

/**
 * Creates a valid json item object from the intermediate item stack
 * @returns {$ItemStack} Valid json item object using "id" notation for outputs
 */
ItemHandler.prototype.getOutputIngredient = function() {
    let itemObject = {
        "id": this.id,
        "count": this.count
    };
    if (this.components) itemObject["components"] = this.components;
    return itemObject
}