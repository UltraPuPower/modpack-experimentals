// // priority: -2
// const materialList = global.MaterialList;
// const componentList = global.ComponentList;

// const itemHandler = global.itemHandler

// ItemEvents.modifyTooltips(event => {
//     materialList.forEach(materialObj => {
//         const { id, colors, components, composition, textureSet, textureOverrides, itemOverrides } = materialObj;
//         let materialTooltip = materialTooltipGenerator(composition);
//         components.forEach(component => {
//             let componentObj = componentList.find(componentObj => componentObj.id == component);

//             let itemId = (itemOverrides[component]) ? itemOverrides[component] : `materiallib:${id}_${component}`

//             if (componentObj.state == 'solid') {
//                 event.add(itemId, materialTooltip);
//             } else {
//                 event.add(`${itemId}_bucket`, materialTooltip);
//             }
            
//         });
//     });

//     event.add(Ingredient.all, (item, advanced, text) => {
//         if (event.alt && item.nbt) {
//             text.add(Text.of('NBT: ').append(Text.prettyPrintNbt(item.nbt)));
//         }
//     })
// });

// ClientEvents.lang('en_us', event => {
//     materialList.forEach(materialObj => {
//         const { id, colors, components, composition, textureSet, textureOverrides, itemOverrides } = materialObj;
//         let materialName = 'Test';
//         event.add(`materiallib:${id}_liquid`, `Liquid ${materialName}`);
//         event.add(`materiallib:${id}_liquid_bucket`, `Liquid ${materialName} Bucket`);
//     });
// });

// const materialTooltipGenerator = (compositionArray) => {
//     return 'temporary tooltip'
// };

// const generateName = (string) => {
//     let words = string.split(' ');
//     for (let i = 0; i < words.length; i++) {
//         let word = words[i];
//         let firstLetter = word.slice(0,1);
//         let rest = word.slice(1,0);
//         words[i] = firstLetter.toUpperCase() + rest;
//     }

//     let returnString = words[0];
//     for (let i = 1; i < words.length; i++) {
//         returnString += ' '+words[i];
//     }
    
//     return returnString;
// };

// console.log(generateName('this is a test string'))