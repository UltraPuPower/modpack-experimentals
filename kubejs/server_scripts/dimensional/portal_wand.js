ItemEvents.rightClicked('kjs_dimensional:portal_wand', event => {
    const { player, level, item, target } = event;
    const { block } = target;

    if (block == null && player.isShiftKeyDown()) {
        DimensionalUtils.actionbar(player, `{"text":"${Text.translate('effects.kjs_dimensional.wand_cleared').getString()}"}`);

        const data = item.getCustomData();

        data.remove("kjs_dimensional:location");

        item.setCustomData(data);
        
        return;
    }

    if (block == null || !block.id.includes('kjs_dimensional:')) return;

    if (block.id == 'kjs_dimensional:anchor_stone') {
        const { x, y, z } = block.pos;
        const blockDim = level.dimension;

        const data = item.getCustomData();

        data = DimensionalUtils.addLocationData(data, blockDim, x, y + 1, z);

        item.setCustomData(data);

        DimensionalUtils.actionbar(player, `{"text":"${Text.translate('effects.kjs_dimensional.wand_recording').getString()}"}`);

        return;
    }

    if (block.id == 'kjs_dimensional:warp_stone') {
        const data = item.getCustomData();

        if (!DimensionalUtils.verifyLocationData(player, data)) return;

        const location = data.get("kjs_dimensional:location");

        const blockData = DimensionalUtils.getBlockData(block);

        blockData.put("kjs_dimensional:location", location);

        DimensionalUtils.setBlockData(block, blockData);

        DimensionalUtils.actionbar(player, `{"text":"${Text.translate('effects.kjs_dimensional.wand_applying').getString()}"}`);
        
        return;
    }
});
