// priority: 1000000

global.packname = "example";

global.id = (id) => {`example:${id}`};

global.setViewer = (set) => {
    let newArray = [];
    set.forEach(element => {
        newArray.push(element);
    });
    return newArray
};

global.itemRegex = /([0-9]*)x ([a-z_]*:[a-z_]*)/;
global.fluidRegex = /([a-z_]*:[a-z]_*) ([0-9]*)/;