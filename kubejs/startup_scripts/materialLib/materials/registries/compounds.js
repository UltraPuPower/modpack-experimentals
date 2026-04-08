// priority: 99996

MaterialHandler.create('saltpeter')
    .setColors('#E2DFDC', '#D2E3E6')
    .setMaterialType('salt')
    .setComposition(['1x potassium', '1x nitrogen', '3x oxygen'])
    .register();

MaterialHandler.create('wood')
    .setColors('#5DAD62', '#475838')
    .setMaterialType('composite')
    .setComposition([''])
    .register();

MaterialHandler.create('hydrogen_chloride')
    .setColors('#DCDCDC', '#9EB7D0')
    .setMaterialType('salt')
    .setComposition(['1x hydrogen', '1x chlorine'])
    .register();

MaterialHandler.create('sapphire')
    .setColors('#3442BF', '#3E4CCB')
    .setMaterialType('gem')
    .setComposition([''])
    .register();

MaterialHandler.create('test')
    .setColors('#7B7FA3', '#848697')
    .addComponents(['ore'])
    .useTextureSet('custom')
    .setComposition([''])
    .register();