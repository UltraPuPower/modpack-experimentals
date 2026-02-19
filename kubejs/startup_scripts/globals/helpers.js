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