// priority: 1000000

global.packname = "example";

global.id = (id) => {`example:${id}`};

global.setToArray = (set) => {
    let newArray = [];
    set.forEach(element => {
        newArray.push(element);
    });
    return newArray
};

global.recipeIdStorage = {
    recipeIdList: [],

    addRecipeId: (recipe) => {
        global.recipeIdStorage.recipeIdList.push(recipe)
    }
}

// Disallowed class: dev.latvian.mods.rhino.EvaluatorException: Failed to load Java class 'java.nio.file.Files': Class is not allowed by class filter!
// const $Files = Java.loadClass('java.nio.file.Files');
// const fileChecker = (path) => {
//     return $Files.exists(path);
// }

const fileExists = (path) => { // Thanks to @lexxieblack for figuring this out (https://discord.com/channels/303440391124942858/1473769843172970577/1474759303301959844)
    try {
        JsonIO.read(path)
    } catch (e) {
        if (String(e).includes('java.nio.charset.MalformedInputException')) return true
    }
    return false
}

const generateName = (string) => {
    string = string.replace('_', ' ')
    let words = string.split(' ');
    for (let i = 0; i < words.length; i++) {
        let word = words[i];
        let firstLetter = word.slice(0,1);
        let rest = word.slice(1);
        words[i] = firstLetter.toUpperCase() + rest;
    }

    let returnString = words[0];
    for (let i = 1; i < words.length; i++) {
        returnString += ' '+words[i];
    }
    
    return returnString;
};

const replaceAll = (string, filter, replacement) => {
    while (string.includes(filter)) {
        string = string.replace(filter, replacement);
    }
    return string
}

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
            isotopeTooltip += '?'
            continue
        }
        let isotopeName = isotopeData[2];
        let isotopeCount = isotopeData[1];
        let isotopeObj = global.IsotopeList.find(isotopeObj => isotopeObj.isotopeId == isotopeName);
        if(!isotopeObj) {
            let materialObj = materialList.find(materialObj => materialObj.id == isotopeName);
            if (!materialObj) {
                tooltipConsole.warn(`Can't find isotope or material by the id of ${isotopeName}, defaulting to "?"`);
                isotopeTooltip += '?'
                continue
            }
            isotopeTooltipPart = `(${materialTooltipGenerator(materialObj.composition, grade+1)})`;
        } else {
            isotopeTooltipPart = isotopeObj.symbol;
        }
        isotopeTooltip += (isotopeCount == 1) ? `${isotopeTooltipPart}` :`${isotopeTooltipPart}${isotopeCount}`
    }

    subsciptNumbers.forEach((number, index) => {
        isotopeTooltip = replaceAll(isotopeTooltip, index, number);
    });
    
    return isotopeTooltip
};

global.itemRegex = /([0-9]*)x ([a-z_]*:[a-z_]*)/;
global.fluidRegex = /([a-z_]*:[a-z]_*) ([0-9]*)/;

global.isotopeRegex = /([0-9]*)x ([a-z_]*)/;