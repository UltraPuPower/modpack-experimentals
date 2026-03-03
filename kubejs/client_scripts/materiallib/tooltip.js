// priority: -2
const materialList = global.MaterialList;
const componentList = global.ComponentList;
const isotopeList = global.IsotopeList

const itemHandler = global.itemHandler

const subsciptNumbers = ['\u2080', '\u2081', '\u2082', '\u2083', '\u2084', '\u2085', '₆\u2086', '\u2087', '\u2088', '\u2089']

ItemEvents.modifyTooltips(event => {
    materialList.forEach(materialObj => {
        const { id, colors, components, composition, textureSet, textureOverrides, itemOverrides } = materialObj;
        let materialTooltip = materialTooltipGenerator(composition, 1);
        subsciptNumbers.forEach((number, index) => {
            materialTooltip = materialTooltip.replace(index, number);
        });
        components.forEach(component => {
            let componentObj = componentList.find(componentObj => componentObj.id == component);

            let itemId = (itemOverrides[component]) ? itemOverrides[component] : `materiallib:${id}_${component}`;

            if (componentObj.state == 'solid') {
                event.add(itemId, Text.of('Composition: ').append(Text.of(materialTooltip)).color('#535361'));
            } else {
                event.add(`${itemId}_bucket`, Text.of('Composition: ').append(Text.of(materialTooltip)).color('#535361'));
            }
            
        });
    });
});

ClientEvents.lang('en_us', event => {
    // materialList.forEach(materialObj => {
    //     const { id, colors, components, composition, textureSet, textureOverrides, itemOverrides } = materialObj;
    //     let materialName = 'Test';
    //     event.add(`materiallib:${id}_liquid`, `Liquid ${materialName}`);
    //     event.add(`materiallib:${id}_liquid_bucket`, `Liquid ${materialName} Bucket`);
    // });
    event.renameItem('materiallib:bronze_liquid_bucket', 'Liquid Bronze Bucket');
});

const materialTooltipGenerator = (compositionArray, grade) => {
    let isotopeTooltip = '';
    for (let i = 0; i < compositionArray.length; i++) {
        let isotope = compositionArray[i]
        let isotopeTooltipPart = '';
        let isotopeData = isotope.match(global.isotopeRegex);
        if (!isotope || !isotope[1] || !isotope[2]) {
            console.warn(`  Regex failed to match on "${isotope}", defaulting to "?"`)
            isotopeTooltip += '?'
            continue
        }
        let isotopeName = isotopeData[2];
        let isotopeCount = isotopeData[1];
        let isotopeObj = isotopeList.find(isotopeObj => isotopeObj.isotopeId == isotopeName);
        if(!isotopeObj) {
            let materialObj = materialList.find(materialObj => materialObj.id == isotopeName);
            if (!materialObj) {
                console.warn(`Can't find isotope or material by the id of ${isotopeName}, defaulting to "?"`);
                isotopeTooltip += '?'
                continue
            }
            isotopeTooltipPart = `(${materialTooltipGenerator(materialObj.composition, grade++)})`;
        } else {
            isotopeTooltipPart = isotopeObj.symbol;
        }
        isotopeTooltip += `${isotopeTooltipPart}${isotopeCount}`
    }
    return isotopeTooltip
};