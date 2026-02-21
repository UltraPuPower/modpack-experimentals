let fileExists = (path) => { // Thanks to @lexxieblack for figuring this out (https://discord.com/channels/303440391124942858/1473769843172970577/1474759303301959844)
    try {
        JsonIO.read(path)
        return true
    } catch (e) {
        if (String(e).includes('java.nio.charset.MalformedInputException')) return true
    }
    return false
}

const generateTextureData = () => {
    const materials = global.MaterialList;
    const rawTextureList =[];

    let checkList = ['bronze_dust', 'rose_gold_wire', 'diamond_dust']

    materials.forEach(material => {
        const { id, colors, components, composition, textureSet, textureOverrides, itemOverrides } = material
        for (let i = 0; i < components.length; i++) {
            let component = components[i]

            if (itemOverrides[component]) continue;

            let itemID = `${id}_${component}`;

            let intermediateTextureObject = {id: itemID};

            if(textureOverrides[component]) {
                rawTextureList.push(intermediateTextureObject.texture = textureOverrides[component]);
                continue;
            }

            if (fileExists(`kubejs/assets/kubejs/textures/item/overrides/${id}_${component}.png`)) {
                rawTextureList.push(intermediateTextureObject.texture = `kubejs:item/overrides/${id}_${component}.png`);
                continue;
            }

            let directMaterialDirection = 'kubejs/assets/kubejs/textures/item/materials';
            let realMaterialDirection = 'kubejs:item/materials';
            let defaultSet;
            let textureLayer = 0

            if (fileExists(`${directMaterialDirection}/${textureSet}/${id}_${component}.png`)) {
                intermediateTextureObject.texture[textureLayer] = {
                    texture: `${realMaterialDirection}/${textureSet}/${id}_${component}.png`,
                    color: `0x${colors[0].split('#')[1]}`
                };
                textureLayer += 1;
            } else if (fileExists(`${directMaterialDirection}/default/${id}_${component}.png`)) {
                intermediateTextureObject.texture[textureLayer] = {
                    texture: `${realMaterialDirection}/default/${id}_${component}.png`,
                    color: `0x${colors[0].split('#')[1]}`
                };
                defaultSet = true
                textureLayer += 1;
            } else console.warn(`No valid texture found for ${id}_${component} in both ${textureSet} and default texture sets`);
            
            let set = defaultSet ? 'default' : textureSet;

            if (fileExists(`${directMaterialDirection}/${set}/${id}_${component}_secondary.png`)) {
                intermediateTextureObject.texture[textureLayer] = {
                    texture: `${realMaterialDirection}/default/${id}_${component}_secondary.png`,
                    color: `0x${colors[1].split('#')[1]}`
                };
                textureLayer += 1;
            }

            if (fileExists(`${directMaterialDirection}/${set}/${id}_${component}_overlay.png`)) {
                intermediateTextureObject.texture[textureLayer] = `${realMaterialDirection}/default/${id}_${component}_secondary.png`;
                textureLayer += 1;
            }

            if (checkList.includes(itemID)) {
                console.log(intermediateTextureObject);
            }

            rawTextureList.push(intermediateTextureObject);

            // // assembled
            // listObj = {
            //     itemId: '',
            //     texture = {
            //         0: {texture: '', color: ''},
            //         1: {texture: '', color: ''},
            //         2: texture: ''
            //     }
            // }

            // // override
            // listObj = {
            //     itemId: '',
            //     texture = ''
            // }
        }
    });

    return rawTextureList
}

ClientEvents.generateAssets('after_mods', event => {

    const defaultSetTexture = fileExists('kubejs/assets/kubejs/textures/item/materials/default/dust.png');
    const customSetTexture = fileExists('kubejs/assets/kubejs/textures/item/materials/special/dust.png');
    const overrideTexture = fileExists('kubejs/assets/kubejs/textures/item/overrides/bronze_dust.png');

    console.log(`default exists: ${defaultSetTexture}`);
    console.log(`custom exists: ${customSetTexture}`);
    console.log(`override exists: ${overrideTexture}`);

    const rawTextureList = generateTextureData();

    event.itemModel(`kubejs:models/item/bronze_dust.json`, {
        "loader": "neoforge:item_layers",
        "parent": "item/generated",
        "textures": {
            "layer0": "kubejs:item/materials/default/dust.png",
            "layer1": "kubejs:item/materials/default/dust_secondary.png"
        },
        "neoforge_data": {
            "layers": {
                "0": {
                    "color": "0xffc370",
                },
                "1": {
                    "color": "0x69993B",
                }
            }
        }
    });

});