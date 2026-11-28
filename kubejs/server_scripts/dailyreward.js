// Daily reward script written for https://discord.com/channels/303440391124942858/1480237432199844125 by UltraPuPower1
let rewards = [
    {weight: 5, roll: {item: 'minecraft:copper_ingot', range: [16, 32]}},
    {weight: 2, roll: {item: 'minecraft:iron_ingot', range: [8, 16]}},
    {weight: 2, roll: {item: 'minecraft:emerald', range: [4, 8]}},
    {weight: 1, roll: {item: 'minecraft:diamond', range: [1, 4]}}
];

const getRandomWeighted = (inputArray) => {
    let totalWeight = 0;
    let countedWeight = 0;

    inputArray.forEach(element => {
        totalWeight += element.weight;
    });

    let rewardNumber = Math.ceil(Math.random() * totalWeight);

    for (let i = 0; i < inputArray.length; i++) {
        let element = inputArray[i]
        countedWeight += element.weight;
        if (countedWeight >= rewardNumber) return element.roll;
    }
};

const rollRange = (range) => {
    let lower = 0;
    let upper = 0;

    if (range[0] > range[1]) upper = range[0]; lower = range[1];
    if (range[1] > range[0]) upper = range[1]; lower = range[0];

    let diff = upper - lower;
    let roll = Math.floor(Math.random() * (diff+1));

    return lower+roll;
};

PlayerEvents.loggedIn(event => {
    const today = new Date()
    const day = today.getDate();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    let date = `${day}-${month}-${year}`;

    if (event.player.persistentData.lastRewardDay == date) {
        console.log(`detected login for player: ${event.player.username}, reward already received`)
        return;
    }
    event.player.persistentData.lastRewardDay = date

    console.log(`detected login for player: ${event.player.username}, handing out reward`)

    let reward = getRandomWeighted(rewards);

    event.server.runCommandSilent(`give ${event.player.username} ${reward.item} ${rollRange(reward.range)}`)
    event.player.tell('You received your daily reward')
});