let fileExists = (path) => { // Thanks to @lexxieblack for figuring this out (https://discord.com/channels/303440391124942858/1473769843172970577/1474759303301959844)
    try {
        JsonIO.read(path)
    } catch (e) {
        if (String(e).includes('java.nio.charset.MalformedInputException')) return true
    }
    return false
}

ClientEvents.generateAssets('after_mods', event => {

    const logBool = false;

    let specialLogger = (message) => {
        if (logBool) {
            console.log(message)
        }
    }

    const materials = global.MaterialList;
    const rawTextureList =[];

    materials.forEach(material => {
        const { id, colors, components, composition, textureSet, textureOverrides, itemOverrides } = material
        specialLogger(`going over ${material.id} for the following components:`)
        let logString = ''
        components.forEach(component => {
            if (logString) logString += ', '
            logString += component
        });
        specialLogger(logString)
        for (let i = 0; i < components.length; i++) {
            
            let component = components[i]
            let itemID = `${id}_${component}`;

            specialLogger(component);

            if (itemOverrides[component]) continue;
            specialLogger('   passed item override');

            let intermediateTextureObject = {
                id: itemID,
                texture: []
            };

            let ObjTextureLocation = intermediateTextureObject.texture;
            specialLogger(typeof ObjTextureLocation);

            if(textureOverrides[component]) {
                rawTextureList.push(ObjTextureLocation = textureOverrides[component]);
                specialLogger('   hanged on special texture override')
                continue;
            }
            specialLogger('   passed special texture override');

            if (fileExists(`kubejs/assets/kubejs/textures/item/overrides/${id}_${component}.png`)) {
                rawTextureList.push(ObjTextureLocation = `kubejs:item/overrides/${id}_${component}.png`);
                specialLogger('   hanged on normal texture override')
                continue;
            }
            specialLogger('   passed normal texture override');

            let directMaterialDirection = 'kubejs/assets/kubejs/textures/item/materials';
            let realMaterialDirection = 'kubejs:item/materials';
            let defaultSet;
            let textureLayer = 0

            specialLogger(colors)

            if (fileExists(`${directMaterialDirection}/${textureSet}/${component}.png`)) {
                ObjTextureLocation.push({
                    texture: `${realMaterialDirection}/${textureSet}/${component}.png`,
                    color: `0x${colors[0].split('#')[1]}`
                });
                specialLogger('   found defined set texture');
                textureLayer += 1;
            } else if (fileExists(`${directMaterialDirection}/default/${component}.png`)) {
                ObjTextureLocation.push({
                    texture: `${realMaterialDirection}/default/${component}.png`,
                    color: `0x${colors[0].split('#')[1]}`
                });
                specialLogger('   found default set texture');
                defaultSet = true
                textureLayer += 1;
            } else console.warn(`No valid texture found for ${id}_${component} in both ${textureSet} and default texture sets`);
            
            let set = defaultSet ? 'default' : textureSet;

            if (fileExists(`${directMaterialDirection}/${set}/${component}_secondary.png`) && colors[1]) {
                ObjTextureLocation.push({
                    texture: `${realMaterialDirection}/default/${component}_secondary.png`,
                    color: `0x${colors[1].split('#')[1]}`
                });
                textureLayer += 1;
                specialLogger('   found secondary texture');
            }

            if (fileExists(`${directMaterialDirection}/${set}/${component}_overlay.png`)) {
                ObjTextureLocation.push({
                    texture: `${realMaterialDirection}/default/${component}_secondary.png`
                });
                textureLayer += 1;
                specialLogger('   found overlay texture');
            }

            specialLogger(`handled ${itemID}`);

            rawTextureList.push(intermediateTextureObject);

            // // assembled
            // listObj = {
            //     itemId: '',
            //     texture = [
            //         {texture: '', color: ''},
            //         {texture: '', color: ''},
            //         {texture: ''}
            //     ]
            // }

            // // override
            // listObj = {
            //     itemId: '',
            //     texture = ''
            // }
        }
    });

    specialLogger('finished texture formatting\n===========================================================================');

    for (let i = 0; i < rawTextureList.length; i++) {
        let { textureId, texture } = rawTextureList[i]

        console.log('==============')
        console.log(textureId)
        console.log(`   ${typeof texture}`)
        console.log(texture)

        if(typeof texture == 'string') {
            event.itemModel(`kubejs:models/item/bronze_dust.json`, {
                "parent": "item/generated",
                "textures": {
                    "layer0": texture,
                }
            });
            continue
        }

        let textureObj = {};
        let layersObj = {};
        if (typeof texture == "array") {
            for(let i = 0; i < texture.length; i++) {
                let textureDataObj = texture[i];
                if (textureDataObj.color) {
                    textureObj[`layer${i}`] = textureDataObj["texture"];
                    layersObj[i] = {"color": textureDataObj.color};
                } else {
                    textureObj[`layer${i}`] = textureDataObj["texture"];
                }
            }
        } else if(typeof texture == 'object') {
            if (texture.color) {
                textureObj[`layer${i}`] = texture["texture"];
                layersObj[i] = {"color": texture.color};
            } else {
                textureObj[`layer${i}`] = texture["texture"];
            }
        } else {
            console.warn('  texture seems to be invalid')
        }
        
        event.itemModel(`kubejs:models/item/bronze_dust.json`, {
            "loader": "neoforge:item_layers",
            "parent": "item/generated",
            "textures": textureObj,
            "neoforge_data": {
                "layers": layersObj
            }
        });

    };

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
                    "color": "0xffc370"
                },
                "1": {
                    "color": "0x69993B"
                }
            }
        }
    });

});