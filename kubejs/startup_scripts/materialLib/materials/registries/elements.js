// priority: 99996

MaterialHandler.create('lead')
    .setColors('#7e6f82', '#290633')
    .setComposition(['1x lead'])
    .setMaterialType('metal')
    .addComponents(['wire', 'ore'])
    .register();

MaterialHandler.create('aluminium')
    .setColors('#7DB9D8', '#756AC9')
    .setComposition(['1x aluminium'])
    .setMaterialType('metal')
    .addComponents(['wire', 'rod', 'ore'])
    .register();

MaterialHandler.create('silver')
    .setColors('#DCDCFF', '#5A4705')
    .setComposition(['1x silver'])
    .setMaterialType('metal')
    .addComponents(['ore'])
    .register();

MaterialHandler.create('nickel')
    .setColors('#CCDFF5', '#59563A')
    .setComposition(['1x nickel'])
    .setMaterialType('metal')
    .addComponents(['ore'])
    .register();

MaterialHandler.create('uranium')
    .setColors('#1D891D', '#33342C')
    .setComposition(['1x uranium'])
    .setMaterialType('metal')
    .addComponents(['ore'])
    .register();

MaterialHandler.create('sulfur')
    .setColors('#AFDE12', '#997922')
    .setComposition(['1x sulfur'])
    .addComponents(['dust'])
    .register();

MaterialHandler.create('zinc')
    .setColors('#EBEBFA', '#232C30')
    .setComposition(['1x zinc'])
    .setMaterialType('metal')
    .addComponents(['ore'])
    .register();

MaterialHandler.create('tin')
    .setColors('#FAFEFF', '#4E676C')
    .setComposition(['1x tin'])
    .setMaterialType('metal')
    .addComponents(['ore'])
    .register();

MaterialHandler.create('osmium')
    .setColors('#54AFFF', '#6E6EFF')
    .setComposition(['1x osmium'])
    .setMaterialType('metal')
    .addComponents(['ore'])
    .register();

MaterialHandler.create('fluorite')
    .setColors('#589ED6', '#2C35BC')
    .setComposition(['1x fluorine'])
    .addComponents(['gem_block', 'ore'])
    .register();

MaterialHandler.create('lithium')
    .setColors('#D7E7EE', '#BDC7DB')
    .setComposition(['1x lithium'])
    .addComponents(['gem_block'])
    .register();

MaterialHandler.create('hydrogen')
    .setColors('#0000B5', 0)
    .setComposition(['1x hydrogen'])
    .addComponents(['gas'])
    .register();

MaterialHandler.create('chlorine')
    .setColors('#878181', 0)
    .setComposition(['1x chlorine'])
    .addComponents(['gas'])
    .register();