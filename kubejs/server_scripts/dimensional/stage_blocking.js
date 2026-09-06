(() => {
    NativeEvents.onEvent('net.neoforged.neoforge.event.entity.EntityTravelToDimensionEvent', (event) => {
        onDimensionChangeMethod(event);
    });

    PlayerEvents.loggedIn(event => {
        for (let data of dimensionData) {
            let { dimensionNamespace, dimensionId } = data;
            event.player.persistentData.putInt(`${dimensionNamespace}_${dimensionId}_attempt_age`, 0);
        }
    });

    const cooldown = 20 * 10;

    const onDimensionChangeMethod = (event) => {
        const { entity, dimension } = event;
        if (!entity.isPlayer()) return;

        for (let data of dimensionData) {
            let { dimensionNamespace, dimensionId, stage, title, subtitle } = data;

            if (dimension !== `${dimensionNamespace}:${dimensionNamespace === 'minecraft' ? `the_${dimensionId}` : dimensionId}`) continue;

            if (entity.stages.has(stage)) continue;

            event.setCanceled(true);

            let currentAge = entity.tickCount | 0;

            let oldAge = entity.persistentData.getInt(`${dimensionNamespace}_${dimensionId}_attempt_age`) | 0;
            if (oldAge > currentAge) {
                entity.persistentData.putInt(`${dimensionNamespace}_${dimensionId}_attempt_age`, Number(currentAge - cooldown));
                continue;
            }

            if (oldAge !== 0 && currentAge - cooldown < oldAge) continue;

            entity.persistentData.putInt(`${dimensionId}_attempt_age`, Number(currentAge));

            let subtitleText = Text.translate(subtitle).getString();
            let titleText = Text.translate(title).getString();

            entity.server.runCommandSilent(`title ${entity.username} subtitle {"text":"${subtitleText}","color":"gray","italic":true}`);
            entity.server.runCommandSilent(`title ${entity.username} title {"text":"${titleText}"}`);
        }
    };

    const dimensionData = [
        {
            dimensionNamespace: 'minecraft',
            dimensionId: 'nether',
            stage: 'access_nether',
            title: 'effects.kjs_dimensional.title.nether',
            subtitle: 'effects.kjs_dimensional.subtitle.nether'
        },
        {
            dimensionNamespace: 'minecraft',
            dimensionId: 'end',
            stage: 'access_end',
            title: 'effects.kjs_dimensional.title.end',
            subtitle: 'effects.kjs_dimensional.subtitle.end'
        }
    ];
})();
