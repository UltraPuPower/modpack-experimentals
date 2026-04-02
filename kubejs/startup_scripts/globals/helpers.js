// priority: 1000000

global.id = (id) => {`${global.pachname}:${id}`};

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

const fileExists = (path) => { // Thanks to @lexxieblack for figuring this out (https://discord.com/channels/303440391124942858/1473769843172970577/1474759303301959844)
    try {
        JsonIO.read(path)
    } catch (e) {
        if (String(e).includes('java.nio.charset.MalformedInputException')) return true
    }
    return false
}

const toDisplayName = (id) => {
    if (id.includes(':')) id = id.split(':')[1]
    return id.split('_').map((word) => {
        return word.charAt(0).toLocaleUpperCase() + word.slice(1);
    }).join(' ');
};

const replaceAll = (string, filter, replacement) => {
    while (string.includes(filter)) {
        string = string.replace(filter, replacement);
    }
    return string
}

global.itemRegex = /(([0-9]*)x )?([a-z_]*:[a-z_]*)/;
global.fluidRegex = /([a-z_]*:[a-z_]*)( ([0-9]*))?/;

global.isotopeRegex = /([0-9]*)x ([a-z_]*)/;