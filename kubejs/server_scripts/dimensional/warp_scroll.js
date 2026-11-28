ItemEvents.rightClicked('kjs_dimensional:warp_scroll', event => {
    const { player, level, item } = event;

    if (!player.isShiftKeyDown()) return;

    const data = item.getCustomData();

    if (data.isEmpty() || !data.contains("kjs_dimensional:location")) {
        const { x, y, z } = player;
        const { dimension } = level;

        data = DimensionalUtils.addLocationData(data, dimension, x, y, z);

        item.setCustomData(data);

        DimensionalUtils.actionbar(player, `{"text":"${Text.translate('effects.kjs_dimensional.scroll_recording').getString()}"}`);

        return;
    }

    const location = DimensionalUtils.validateWarpAdress(player, data, 'warp_scroll');
    if (!location) {
        if (data.contains("kjs_dimensional:location")) data.remove("kjs_dimensional:location");
        event.cancel();
    }

    item.count--;
    DimensionalUtils.warp(player, location);

});
