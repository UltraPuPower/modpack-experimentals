// priority: 999999
function createComponentItemStack (material, component, count) {
    let itemId = global.generateComponentId(material, component);

    let materialObj = materialList.find(materialObj => materialObj.id == material);
    if (materialObj.itemOverrides[component]) itemId = materialObj.itemOverrides[component];

    return new ItemHandler(itemId, count);
};

function createComponentFluidStack (material, component, amount) {
    let fluidId = global.generateComponentId(material, component);

    let materialObj = materialList.find(materialObj => materialObj.id == material);
    if (materialObj.itemOverrides[component]) fluidId = materialObj.itemOverrides[component];

    return new FluidHandler(fluidId, amount)
};