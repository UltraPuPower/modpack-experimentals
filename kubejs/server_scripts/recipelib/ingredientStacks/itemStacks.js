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

/**
 * Adds component data to the item stack
 * @param {object} data - An intermediate item stack
 */
ItemHandler.prototype.addComponentData = function(data) {
    this.components = data;
}

/**
 * Modifies the amount in the stack
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
 * Creates an Ingredient from the intermediate item stack
 * @returns {$Ingredient} Minecraft recipe ingredient
 */
ItemHandler.prototype.getIngredient = function() {
    let itemObject = {
        "item": this.id,
        "count": this.count
    };
    return itemObject;
}

/**
 * Creates an ItemStack from the intermediate item stack
 * @returns {$ItemStack} Minecraft recipe itemstack
 */
ItemHandler.prototype.getItemStack = function() {
    let itemObject = {
        "id": this.id,
        "count": this.count
    };
    if (this.components) itemObject["components"] = this.components;
    return itemObject
}