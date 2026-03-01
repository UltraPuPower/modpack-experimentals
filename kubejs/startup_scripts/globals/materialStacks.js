// priority: 1000000
/**
 * @typedef {Object} intermediateItemStack
 * @property {string} id - Item id of the item in the stack
 * @property {number} count - Amount of items in the stack
 */

global.itemHandler = {
    /**
     * Creates an intermediate item stack for usage by other functions
     * @param {string} id - The id of the item in the stack
     * @param {number} count - The amount of items in the stack
     * @returns {intermediateItemStack} Valid intermediate item stack
     */
    createItemStack: (itemId, amount) => {
        return {id: itemId, count: amount}
    },

    createComponentItemStack: (material, component, count) => {
        let itemId = `materiallib:${material}_${component}`;

        let materialObj = materialList.find(materialObj => materialObj.id == material);
        if (materialObj.itemOverrides[component]) itemId = materialObj.itemOverrides[component]

        return {id: itemId, count: count}
    },

    /**
     * Creates a valid recipe itemstack from an intermediate item stack
     * @param {intermediateItemStack} id - An intermediate item stack as created by .createItemStack()
     * @returns {$ItemStack} Valid recipe item stack
     */
    getItemOf: (itemStack) => {
        console.log('getItemOf')
        console.log(itemStack)
        let newItemStack = Item.of(itemStack.id, itemStack.count);
        return newItemStack;
    },

    /**
     * Creates a valid json item object from an intermediate item stack
     * @param {intermediateItemStack} id - An intermediate item stack as created by .createItemStack()
     * @returns {$ItemStack} Valid json item object
     */
    getItemIngredient: (itemStack) => {
        return {
            "count": itemStack.count,
            "id": itemStack.id
        };
    }
};

/**
 * @typedef {Object} intermediateFluidStack
 * @property {string} id - Fluid id of the fluid in the stack
 * @property {number} amount - Amount of millibuckets in the stack
 */

global.fluidHandler = {
    /**
     * Creates an intermediate fluid stack for usage by other functions
     * @param {string} id - The id of the fluid in the stack
     * @param {number} amount - The amount of fluid in millibuckets for the stack
     * @returns {intermediateFluidStack} Valid intermediate fluid stack
     */
    createFluidStack: (fluidId, amount) => {
        return {id: fluidId, amount: amount}
    },

    createComponentFluidStack: (material, component, amount) => {
        let fluidId = `materiallib:${material}_${component}`;

        let materialObj = materialList.find(materialObj => materialObj.id == material);
        if (materialObj.itemOverrides[component]) fluidId = materialObj.itemOverrides[component]

        return {id: fluidId, amount: amount}
    },

    /**
     * Creates a valid recipe fluidstack from an intermediate fluid stack
     * @param {intermediateFluidStack} id - An intermediate fluid stack as created by .createFluidStack()
     * @returns {$FluidStack} Valid recipe fluid stack
     */
    getFluidOf: (fluidStack) => {
        return Fluid.of(fluidStack.id, fluidStack.amount);
    },

    /**
     * Creates a valid json fluid object from an intermediate fluid stack
     * @param {intermediateFluidStack} id - An intermediate fluid stack as created by .createFluidStack()
     * @returns {$fluidStack} Valid json fluid object
     */
    getFluidIngredient: (fluidStack) => {
        return {
            "amount": fluidStack.amount,
            "id": fluidStack.id
        };
    }
};