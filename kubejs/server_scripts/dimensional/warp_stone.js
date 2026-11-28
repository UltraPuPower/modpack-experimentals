BlockEvents.rightClicked('kjs_dimensional:warp_stone', event => {
    const { player, block, hand, item } = event;

    if (hand != 'MAIN_HAND') return;

    if (item.id == 'kjs_dimensional:portal_wand' || player.isShiftKeyDown()) {
        return;
    }

    if (item.id == 'minecraft:spyglass') {
        return;
    }

    const blockData = DimensionalUtils.getBlockData(block);

    const location = DimensionalUtils.validateWarpAdress(player, blockData, 'warp_stone');
    if (!location) event.cancel();

    DimensionalUtils.warp(player, location);

    event.cancel();
});
