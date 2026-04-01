(()=>{
    const components = global.ComponentList;
    let componentIdList = ['bucket']
    components.forEach(component => {
        const { id } = component
        componentIdList.push(id)
    })

    const itemObject = {
        itemObject: {},

        addMaterialItem: (item) => {
            let idArray = item.id.split(':');
            if (idArray[0] != 'materiallib') return
            let splitId = idArray[1].split('_');
            let partArray = [];
            for (let i = 0; i < splitId.length; i++) {
                let part = splitId[i];
                if (!componentIdList.includes(part)){
                    partArray.push(part);
                }
            }
            let material = partArray.map(value => value).join('_');
            if (!itemObject.itemObject[material]) itemObject.itemObject[material] = []
            itemObject.itemObject[material].push(item.id)
        }
    }

    StartupEvents.registry('creative_mode_tab', event => {
        event.create('materiallib:materiallib').displayName('Material Lib').icon(() => 'minecraft:nether_star').content(() => Ingredient.of('#c:mold'));
    });

    StartupEvents.modifyCreativeTab('kubejs:tab', event => {
        Ingredient.of('%kubejs:tab').stacks.forEach(item => {
            itemObject.addMaterialItem(item)
        });
        let materials = Object.keys(itemObject.itemObject);
        materials.forEach(material => {
            itemObject.itemObject[material].forEach(item => {
                event.remove(item);
            })
        });
    });

    StartupEvents.modifyCreativeTab('materiallib:materiallib', event => {
        let previous = ''
        Ingredient.of('%materiallib:materiallib').stacks.forEach(item => {
            previous = item.id
        });
        let materials = Object.keys(itemObject.itemObject).sort().reverse();
        materials.forEach(material => {
            if (material == 'empty_casting_mold') return
            itemObject.itemObject[material].forEach(item => {
                event.addAfter(previous, item);
            })
        });
    });
})()