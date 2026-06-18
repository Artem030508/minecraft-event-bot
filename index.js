const mineflayer = require('mineflayer')

const bot = mineflayer.createBot({
    host: 'localhost',
    username: 'BotEvent',
    port: 49158,
    version: '1.21'

})

let eventInterval = null
let lastEvent = null
const playerSelector = '@a[name=!BotEvent]'

const events = [
    'lightning',
    'night',
    'apple',
    'dog',
    'speed',
    'totem',
    'hunger',
    'zombie',
    'tnt',
    'dungeon',
    'fireball',
    'village',
    'waterdrop',
    'ghost',
    'cold',
    'levitation',
    'golem',
    'time',
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
    time: timeEvent
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

        bot.chat('--- Плохие ивенты ---')
        bot.chat('Lightning - Спавн молнии')
        bot.chat('Night - Ночь')
        bot.chat('Hunger - Голод')
        bot.chat('Zombie - Спавн 3 зомби')
        bot.chat('TNT - Активирующийся динамит')
        bot.chat('Fireball - Спавн фаерболла')
        bot.chat('Water Drop - Тп игрока на 70 блоков вверх')
        bot.chat('Ghost - Режим наблюдателя на 15 сек')
        bot.chat('Cold - Стан игрока на 15 сек')
        bot.chat('Levitation - Левитация на 15 сек')
        bot.chat('===============================')
    }

    if (message.startsWith('!event ')) {

    const eventName = message.slice(7).trim().toLowerCase()

    if (eventFunctions[eventName]) {
        eventFunctions[eventName]()
    } else {
        bot.chat('Такого ивента не существует.')
    }

}

    if (message === '!start') {

        if (eventInterval) {
            bot.chat('Система ивентов уже запущена')
            return
        }

        bot.chat('Система ивентов запущена')

        eventInterval = setInterval(() => {

            let randomEvent

            do {
                randomEvent = events[Math.floor(Math.random() * events.length)]
            } while (randomEvent === lastEvent)

            lastEvent = randomEvent
           
            console.log(randomEvent)

            eventFunctions[randomEvent]()

        }, 60000) 
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

