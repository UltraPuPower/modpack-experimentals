(() => {
    NativeEvents.onEvent('net.neoforged.neoforge.event.entity.EntityTravelToDimensionEvent', (event) => {
        onDimensionChangeMethod(event);
    });

    const cooldown = 20 * 10;

    const onDimensionChangeMethod = (event) => {
        const { entity, dimension } = event;
        if (!entity.isPlayer()) return;

        for (let data of dimensionData) {
            let { dimensionNamespace, dimensionId, stage, color, title, subtitle } = data;

            if (dimension !== `${dimensionNamespace}:${dimensionNamespace === 'minecraft' ? `the_${dimensionId}` : dimensionId}`) continue;

            if (entity.stages.has(stage)) continue;

            event.setCanceled(true);

            let currentAge = entity.tickCount | 0;

            let oldAge = entity.persistentData.getInt(`${dimensionId}_attempt_age`) | 0;
            if (oldAge > currentAge) {
                entity.persistentData.putInt(`${dimensionId}_attempt_age`, Number(currentAge - cooldown));
                continue;
            }

            if (oldAge !== 0 && currentAge - cooldown < oldAge) continue;

            entity.persistentData.putInt(`${dimensionId}_attempt_age`, Number(currentAge));

            let subtitleText = Text.translate(subtitle).getString();
            let titleText = Text.translate(title).getString();

            entity.server.runCommandSilent(`title ${entity.username} subtitle {"text":"${subtitleText}","color":"gray","italic":true}`);
            entity.server.runCommandSilent(`title ${entity.username} title {"text":"${titleText}","color":"${color}"}`);
        }
    };

    const dimensionData = [
        {
            dimensionNamespace: 'minecraft',
            dimensionId: 'nether',
            stage: 'access_nether',
            color: 'dark_red',
            title: 'effects.dimensions.title.nether',
            subtitle: 'effects.dimensions.subtitle.nether'
        },
        {
            dimensionNamespace: 'minecraft',
            dimensionId: 'end',
            stage: 'access_end',
            color: 'dark_purple',
            title: 'effects.dimensions.title.end',
            subtitle: 'effects.dimensions.subtitle.end'
        }
    ];
})();
