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
    .setComposition(['2x aluminium', '3x oxygen'])
    .register();

MaterialHandler.create('test')
    .setColors('#7B7FA3', '#848697')
    .addComponents(['ore'])
    .useTextureSet('custom')
    .setComposition([''])
    .register();

MaterialHandler.create('lazurite')
    .setComposition(['6x aluminium', '6x silicon', '8x calcium', '8x sodium'])
    .register();

MaterialHandler.create('sodalite')
    .setComposition(['3x aluminium', '3x silicon', '4x sodium', '1x chlorine'])
    .register();

MaterialHandler.create('pyrite')
    .setComposition(['1x iron', '2x sulfur'])
    .register();

MaterialHandler.create('calcite')
    .setComposition(['1x calcium', '1x carbon', '3x oxygen'])
    .register();

MaterialHandler.create('ruby')
    .setComposition(['1x chromium', '2x aluminium', '3x oxygen'])
    .register();

MaterialHandler.create('silicon_dioxide')
    .setComposition(['1x silicon', '2x oxygen'])
    .register();

MaterialHandler.create('biotite')
    .setComposition(['1x potassium', '3x magnesium', '3x aluminium', '2x fluorine', '3x silicon', '10x oxygen'])
    .register();