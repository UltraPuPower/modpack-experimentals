// priority: 99996

MaterialHandler.create('saltpeter')
    .setColors('#E2DFDC', '#D2E3E6')
    .setComposition(['1x potassium', '1x nitrogen', '3x oxygen'])
    .setComponents(['dust'])
    .register();

MaterialHandler.create('wood')
    .setColors('#5DAD62', '#475838')
    .setComposition([''])
    .setComponents(['dust'])
    .register();

MaterialHandler.create('hydrogen_chloride')
    .setColors('#DCDCDC', '#9EB7D0')// adjust
    .setComposition(['1x hydrogen', '1x chlorine'])
    .setComponents(['dust', 'dust_block'])
    .setMaterialData({compressionlevel: 'small'})
    .register();