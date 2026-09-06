ItemEvents.rightClicked('minecraft:spyglass', event => {
    const block = event.target.block;

    const blockData = block.getEntityData();

    console.log(block, blockData);
    
    event.cancel();
});
