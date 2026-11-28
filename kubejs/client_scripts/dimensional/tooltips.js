ItemEvents.modifyTooltips(event => {
    event.modify("kjs_dimensional:portal_wand", text => {
        text.dynamic("warpTooltip");
    });

    event.modify("kjs_dimensional:warp_scroll", text => {
        text.dynamic("warpTooltip");
    });
});

const dimNames = {
    "minecraft:the_end": "§5The End",
    "minecraft:the_nether": "§4The Nether",
    "minecraft:overworld": "§2The Overworld"
}

ItemEvents.dynamicTooltips("warpTooltip", event => {
    const item = event.item;

    const data = item.getCustomData();
    const langPiece = item.id.split(':')[1]

    if (!data.contains("kjs_dimensional:location")) {
        event.add(Text.translate(`tooltip.kjs_dimensional.${langPiece}.empty`));
        return
    };

    const location = data.get("kjs_dimensional:location");
    if (!location.contains("position") || !location.contains("dimension")) return;

    const dimension = location.get("dimension").getAsString();
    const position = location.get("position");

    if (!position.contains("x") || !position.contains("y") || !position.contains("z")) return;

    const x = position.x.getAsInt();
    const y = position.y.getAsInt();
    const z = position.z.getAsInt();

    event.add(Text.translate('tooltip.kjs_dimensional.location.position', x, y, z));
    event.add(Text.translate('tooltip.kjs_dimensional.location.dimension', dimNames[String(dimension)]));

});