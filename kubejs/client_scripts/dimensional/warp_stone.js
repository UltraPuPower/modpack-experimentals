BlockEvents.rightClicked('kjs_dimensional:warp_stone', event => {
    const { player, hand, item } = event;

    if (hand != 'MAIN_HAND') return;

    if (item.id == 'kjs_dimensional:portal_wand' || player.isShiftKeyDown()) {
        return;
    }

    event.cancel();
});