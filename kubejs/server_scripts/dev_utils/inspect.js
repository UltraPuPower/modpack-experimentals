ItemEvents.rightClicked('minecraft:spyglass', event => {
    const block = event.target.block;

    if (block == null) return;

    const blockData = block.getEntityData();

    console.log(block, blockData);
    
    event.cancel();
});
