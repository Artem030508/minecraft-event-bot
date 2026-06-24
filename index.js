const mineflayer = require('mineflayer')

const bot = mineflayer.createBot({
    host: 'localhost',
    username: 'BotEvent',
    port: 49158,
    version: '1.21'

})

let eventInterval = null
let lastEvent = null
let eventTime = 60
let mode = 'normal'

const playerSelector = '@a[name=!BotEvent]'

const goodEvents = [
    'apple',
    'dog',
    'speed',
    'totem',
    'dungeon',
    'village',
    'ghost',
    'golem',
    'time',
    'kitstart',
    'player',
    'creeper',
]

const badEvents = [
    'lightning',
    'night',
    'hunger',
    'zombie',
    'tnt',
    'fireball',
    'waterdrop',
    'cold',
    'levitation',
    'rider',
    'label',
    'ghast',
    'tsunami',
    'scare'
]

const dungeons = [
    'minecraft:mansion',          
    'minecraft:pillager_outpost', 
    'minecraft:desert_pyramid',   
    'minecraft:ruined_portal',    
    'minecraft:jungle_pyramid',   
    'minecraft:swamp_hut'         
]

function lightningEvent() {
    bot.chat('Event: Гнев зевса')

    bot.chat(`/execute as ${playerSelector} at @s run summon minecraft:lightning_bolt ~ ~ ~`)

}

function nightEvent() {
    bot.chat('Event: Солнечное затмение')

    bot.chat('/time set midnight')

}

function appleEvent() {
    bot.chat('Event: Бонуска')

    bot.chat(`/give ${playerSelector} minecraft:golden_apple 1`)
}

function dogEvent() {
    bot.chat('Event: Друг человека')
    
    bot.chat(`/give ${playerSelector} minecraft:bone 5`)
    bot.chat(`/execute as ${playerSelector} at @s run summon minecraft:wolf ~2 ~ ~`)
}

function speedEvent() {
    bot.chat('Event: I can`t stop')

    bot.chat(`/effect give ${playerSelector} minecraft:speed 20 70`)

}

function totemEvent() {
    bot.chat('Event: Бессмертие')

    bot.chat(`/give ${playerSelector} minecraft:totem_of_undying 1`)

}

function hungerEvent() {
    bot.chat('Event: Чревоугодие')

    bot.chat(`/effect give ${playerSelector} minecraft:hunger 10 255`)
    bot.chat(`/give ${playerSelector} minecraft:rotten_flesh 15`)
}

function zombieEvent() {
    bot.chat('Event: Зомби-апокалипсис')

    bot.chat(`/execute as ${playerSelector} at @s run summon minecraft:zombie ~2 ~ ~`)
    bot.chat(`/execute as ${playerSelector} at @s run summon minecraft:zombie ~-2 ~ ~`)
    bot.chat(`/execute as ${playerSelector} at @s run summon minecraft:zombie ~ ~ ~2`)
    }

function tntEvent() {
    bot.chat('Event: TnT')

    bot.chat(`/execute as ${playerSelector} at @s run summon minecraft:tnt ~ ~ ~ {fuse:40}`)
}

function dungeonEvent() {
    bot.chat('Event: Случайный данж')

    const randomDungeon = dungeons[Math.floor(Math.random() * dungeons.length)]

    bot.chat(`/execute as ${playerSelector} at @s positioned ~10 ~ ~ run place structure ${randomDungeon}`)
}

function fireballEvent() {
    bot.chat('Event: Фаерболл')

    bot.chat(`/execute as ${playerSelector} at @s run summon fireball ~ ~1 ~ {ExplosionPower:10}`)
}

function villageEvent() {
    bot.chat('Event: Деревня!')

    bot.chat(`/execute as ${playerSelector} at @s positioned ~15 ~ ~ run place structure minecraft:village_plains`)
}

function waterdropEvent() {
    bot.chat('Event: ВатерДроп')

    bot.chat(`/give ${playerSelector} minecraft:water_bucket 1`)
    bot.chat(`/execute as ${playerSelector} at @s run tp @s ~ ~70 ~`)
}

function ghostEvent() {
    bot.chat('Event: Призрак')

    bot.chat(`/gamemode spectator ${playerSelector}`)

    setTimeout(() => {
        bot.chat(`/gamemode survival ${playerSelector}`)
    }, 15000)
}

function coldEvent() {
    bot.chat('Event: Заморозка')

    bot.chat(`/effect give ${playerSelector} slowness 12 255 true`)
}

function levitationEvent() {
    bot.chat('Event: Невесомость')

    bot.chat(`/effect give ${playerSelector} levitation 15 1 true`)
}

function golemEvent() {
    bot.chat('Event: Подмога')

    bot.chat(`/give ${playerSelector} minecraft:iron_golem_spawn_egg 1`)
}

function timeEvent() {
    bot.chat('Event: Остановка времени')

    bot.chat('/tick freeze')

    setTimeout(() => {
        bot.chat('/tick unfreeze')
    }, 25000)
}

function riderEvent() {
    bot.chat('Event: Всадники Апокалипсиса')

    bot.chat(`/execute as ${playerSelector} at @s run summon minecraft:skeleton_horse ~6 ~ ~ {SkeletonTrap:1b}`)
}

function kitstartEvent() {
    bot.chat('Event: Кит старт')

    bot.chat(`/give ${playerSelector} minecraft:stone_sword[minecraft:enchantments={levels:{"minecraft:sharpness":2,"minecraft:knockback":1}}]`)

    bot.chat(`/give ${playerSelector} minecraft:leather_helmet`)
    bot.chat(`/give ${playerSelector} minecraft:leather_boots`)
    bot.chat(`/give ${playerSelector} minecraft:chainmail_chestplate`)
    bot.chat(`/give ${playerSelector} minecraft:chainmail_leggings`)
}

function labelEvent() {
    bot.chat('Event: Черная метка')

    bot.chat(`/effect give ${playerSelector} minecraft:bad_omen 99999 4 false`)
}

function playerEvent() {
    bot.chat('Event: Проигрователь')

    bot.chat(`/execute as ${playerSelector} at @s run setblock ~4 ~ ~ minecraft:jukebox`)

    bot.chat(`/execute as ${playerSelector} at @s run item replace block ~4 ~ ~ container.0 with minecraft:music_disc_mellohi`)
   
}

function ghastEvent() {
    bot.chat('Event: Гаст')

    bot.chat(`/execute as ${playerSelector} at @s run summon minecraft:ghast ~ ~6 ~`)
}

function creeperEvent() {
    bot.chat('Event: Creeper Aw Man!!!')

    bot.chat(`/execute as ${playerSelector} at @s run summon creeper ~2 ~ ~ {Fuse:30,ExplosionRadius:0}`)
}

function tsunamiEvent() {
    bot.chat('Event: Цунами')

    bot.chat(`/execute as ${playerSelector} at @s run fill ~-15 ~ ~-15 ~15 ~15 ~15 water`)
}

function scareEvent() {
    bot.chat('Event: Скример')

    bot.chat(`/effect give ${playerSelector} minecraft:blindness 15 0 true`)

    bot.chat(`/execute as ${playerSelector} at @s run summon minecraft:wither_skeleton ~2 ~ ~`)

    bot.chat(`/execute as ${playerSelector} at @s run playsound minecraft:entity.ghast.scream hostile @s ~ ~ ~ 10 1`)
}

const eventFunctions = {
    lightning: lightningEvent,
    night: nightEvent,
    apple: appleEvent,
    dog: dogEvent,
    speed: speedEvent,
    totem: totemEvent,
    hunger: hungerEvent,
    zombie: zombieEvent,
    tnt: tntEvent,
    dungeon: dungeonEvent,
    fireball: fireballEvent,
    village: villageEvent,
    waterdrop: waterdropEvent,
    ghost: ghostEvent,
    cold: coldEvent,
    levitation: levitationEvent,
    golem: golemEvent,
    time: timeEvent,
    rider: riderEvent,
    kitstart: kitstartEvent,
    label: labelEvent,
    player: playerEvent,
    ghast: ghastEvent,
    creeper: creeperEvent,
    tsunami: tsunamiEvent,
    scare: scareEvent
}


function getRandomEvent() {

    let pool

    if (mode === 'easy') {
        
        if (Math.random() < 0.7) {
            pool = goodEvents
        } else {
            pool = badEvents
        }

    } else if (mode === 'normal'){
        
        if (Math.random() < 0.5) {
            pool = goodEvents
        } else {
            pool = badEvents
        }

    } else {
        
        if (Math.random() < 0.3) {
            pool = goodEvents
        } else {
            pool = badEvents
        }

    }

    let event

    do {
        event = pool[Math.floor(Math.random() * pool.length)]
    } while (event === lastEvent)

    lastEvent = event

    return event
}



function startEventTimer() {

    eventInterval = setInterval(() => {

        const randomEvent = getRandomEvent()

        console.log('Запуск ивента:', randomEvent)

        eventFunctions[randomEvent]()

    }, eventTime * 1000)

}

bot.on('spawn', () => {
    console.log('бот зашел на сервер')
})


bot.on('chat', (username, message) => {
    if (username === bot.username) return

    console.log(username + ': ' + message)

    if (message === "!help") {
        bot.chat("========== EVENT BOT ==========");
        bot.chat("!help - показать помощь");
        bot.chat("!menu - показать меню ивентов");
        bot.chat("!time <время между ивентами> - изменить время между ивентами");
        bot.chat("!event <название ивента> - запуск конкретного ивента");
        bot.chat("!easy - лёгкий режим (70% хороших, 30% плохих)");
        bot.chat("!normal - обычный режим (50% хороших, 50% плохих)");
        bot.chat("!hard - сложный режим (30% хороших, 70% плохих)");
        bot.chat("!start - запуск ивентов");
        bot.chat("!stop - остановка ивентов");
        bot.chat("==========================");
    }

    if (message === "!menu") {
        bot.chat('========== EVENT MENU ==========')
        bot.chat('--- Хорошие ивенты ---')
        bot.chat('Apple - Золотое яблоко')
        bot.chat('Dog - Спавн собаки и кости')
        bot.chat('Speed - Очень высокая скорость')
        bot.chat('Totem - Тотем бессмертия')
        bot.chat('Village - Спавн деревни')
        bot.chat('Dungeon - Спавн случайного данжа')
        bot.chat('Golem - Яйцо призыва голема')
        bot.chat('Time - Остановка времени на 25 сек')
        bot.chat('Ghost - Режим наблюдателя на 15 сек')

        bot.chat('--- Плохие ивенты ---')
        bot.chat('Lightning - Спавн молнии')
        bot.chat('Night - Ночь')
        bot.chat('Hunger - Голод')
        bot.chat('Zombie - Спавн 3 зомби')
        bot.chat('TNT - Активирующийся динамит')
        bot.chat('Fireball - Спавн фаерболла')
        bot.chat('Water Drop - Тп игрока на 70 блоков вверх')
        bot.chat('Cold - Стан игрока на 15 сек')
        bot.chat('Levitation - Левитация на 15 сек')
        bot.chat('===============================')
    }

    if (message === '!easy') {
        
        mode = 'easy'
        bot.chat('Режим изменён на лёгкий.')
    }

    if (message === '!normal') {

        mode = 'normal'
        bot.chat('Режим изменён на обычный.')
    }

    if (message === '!hard') {

        mode = 'hard'
        bot.chat('Режим изменён на сложный.')
    }

    

    if (message.startsWith('!event ')) {

    const eventName = message.slice(7).trim().toLowerCase()

    if (eventFunctions[eventName]) {
        eventFunctions[eventName]()
    } else {
        bot.chat('Такого ивента не существует.')
    }

}

if (message.startsWith('!time ')) {

    const newTime = Number(message.slice(6).trim())

    if (isNaN(newTime) || newTime < 5) {
        bot.chat('Введите число больше либо равное 5.')
        return
    }

    eventTime = newTime

    bot.chat(`Новое время между ивентами: ${eventTime} сек.`)

    if (eventInterval) {

        clearInterval(eventInterval)

        startEventTimer()

        bot.chat('Таймер обновлен.')
    }
}


    if (message === '!start') {

        if (eventInterval) {
            bot.chat('Система ивентов уже запущена')
            return
        }

        bot.chat('Система ивентов запущена')

        startEventTimer()
    }

    if (message === '!stop') {

        clearInterval(eventInterval)

        eventInterval = null

        bot.chat('Система ивентов остановлена')
    }
})


bot.on('error', (err) => {
  console.log('ошибка:', err)
})

bot.on('kicked', (reason) => {
    console.log('Бота кикнули:')
    console.log(reason)
})

bot.on('end', (reason) => {
    console.log('Бот отключился:', reason)
})

