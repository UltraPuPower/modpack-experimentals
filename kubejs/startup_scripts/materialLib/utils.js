Platform.setModName("materiallib", "Material Lib");

const subsciptNumbers = ['\u2080', '\u2081', '\u2082', '\u2083', '\u2084', '\u2085', '\u2086', '\u2087', '\u2088', '\u2089'];
const tooltipConsole = Java.createConsole("MaterialLib/Tooltip Console");

const materialTooltipGenerator = (compositionArray, grade) => {
    if (grade > 15) return '0=0'
    let isotopeTooltip = '';
    for (let i = 0; i < compositionArray.length; i++) {
        let isotope = compositionArray[i]
        let isotopeTooltipPart = '';
        let isotopeData = isotope.match(global.isotopeRegex);
        if (!isotope || !isotope[1] || !isotope[2]) {
            tooltipConsole.warn(`  Regex failed to match on "${isotope}", defaulting to "?"`)
            isotopeTooltipPart = '?'
            continue
        }
        let isotopeName = isotopeData[2];
        let isotopeCount = isotopeData[1];
        let isotopeObj = global.IsotopeList.find(isotopeObj => isotopeObj.isotopeId == isotopeName);
        if(!isotopeObj) {
            let materialObj = materialList.find(materialObj => materialObj.id == isotopeName);
            if (!materialObj) {
                tooltipConsole.warn(`Can't find isotope or material by the id of ${isotopeName}, defaulting to "?"`);
                isotopeTooltipPart = '?'
                continue
            }
            isotopeTooltipPart = `(${materialTooltipGenerator(materialObj.composition, grade+1)})`;
        } else {
            isotopeTooltipPart = isotopeObj.symbol;
        }
        isotopeTooltip += (isotopeCount == 1) ? `${isotopeTooltipPart}` :`${isotopeTooltipPart}${isotopeCount}`
    }

    subsciptNumbers.forEach((number, index) => {
        isotopeTooltip = isotopeTooltip.replaceAll(index, number);
    });
    
    return isotopeTooltip
};

global.generateComponentId = (material, component) => {
    let id = '';
    if (global.materialLibData.affixLists.prefix.includes(component)) id = `materiallib:${component}_${material}`;
    else if (global.materialLibData.affixLists.suffix.includes(component)) id = `materiallib:${material}_${component}`;
    else if (global.materialLibData.affixLists.plural.includes(component)) {
        let componentObj = componentList.find(componentObj => componentObj.id == component);
        let affixData = componentObj.affixData
        id = `materiallib:${(affixData.prefix) ? `${affixData.prefix}_` : ''}${material}${(affixData.suffix) ? `_${affixData.suffix}` : ''}`
    } else console.log(`Affix issue with component ${component}`)
    return id
}