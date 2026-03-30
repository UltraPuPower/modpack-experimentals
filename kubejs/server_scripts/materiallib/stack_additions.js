// priority: 999999
function createComponentItemStack (material, component, count) {
    let itemId = '';
    if(global.dataObject.prefixList.includes(component)) itemId = `materiallib:${component}_${material}`;
    if(global.dataObject.suffixList.includes(component)) itemId = `materiallib:${material}_${component}`;

    let materialObj = materialList.find(materialObj => materialObj.id == material);
    if (materialObj.itemOverrides[component]) itemId = materialObj.itemOverrides[component];

    return new ItemHandler(itemId, count);
};

function createComponentFluidStack (material, component, amount) {
    let fluidId = '';
    if(global.dataObject.prefixList.includes(component)) fluidId = `materiallib:${component}_${material}`;
    if(global.dataObject.suffixList.includes(component)) fluidId = `materiallib:${material}_${component}`;

    let materialObj = materialList.find(materialObj => materialObj.id == material);
    if (materialObj.itemOverrides[component]) fluidId = materialObj.itemOverrides[component];

    return new FluidHandler(fluidId, amount)
};