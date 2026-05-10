// priority: 1000000

global.id = (id) => {`${global.packname}:${id}`};

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

global.itemTagRegex = /(([0-9]*)x )?#([a-z_]*:[a-z_\/]*)/;
global.fluidTagRegex = /#([a-z_]*:[a-z_\/]*)( ([0-9]*))?/;

global.itemRegex = /(([0-9]*)x )?([a-z_]*:[a-z_]*)/;
global.fluidRegex = /([a-z_]*:[a-z_]*)( ([0-9]*))?/;

global.isotopeRegex = /([0-9]*)x ([a-z_]*)/;

// New methods
// String methods
String.prototype.replaceAll = function(filter, replacement) {
    let tempString = this
    while (tempString.includes(filter)) {
        tempString = tempString.replace(filter, replacement);
    }
    return tempString
}

// Array methods
Array.prototype.pushUnique = function(value) {
    if (!this.includes(value)) this.push(value);
}

Array.prototype.flat = function() {
    let newArray = new Array();
    for (let i = 0; i < this.length; i++) {
        if (Array.isArray(this[i])) this[i].flat().forEach(element => newArray.push(element));
        else newArray.push(this[i]);
    }
    return newArray
};

// Set methods
Set.prototype.toArray = function() {
    let newArray = new Array();
    this.forEach(element => {
        newArray.push(element);
    });
    return newArray
}

// Failsafe because I might do the stupid
Array.prototype.toArray = function() {
    console.log('array is now array')
    return this
}