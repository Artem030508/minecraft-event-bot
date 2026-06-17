const mineflayer = require('mineflayer')

const bot = mineflayer.createBot({
    host: 'localhost',
    username: 'BOT EVENT',
    port: 49158,
    version: '1.21'

})

let eventInterval = null
let lastEvent = null

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

    bot.chat('/execute as @a at @s run summon minecraft:lightning_bolt ~ ~ ~')

}

function nightEvent() {
    bot.chat('Event: Солнечное затмение')

    bot.chat('/time set midnight')

}

function appleEvent() {
    bot.chat('Event: Бонуска')

    bot.chat('/give @a minecraft:golden_apple 1')
}

function dogEvent() {
    bot.chat('Event: Друг человека')
    
    bot.chat('/give @a minecraft:bone 5')
    bot.chat('/execute as @a at @s run summon minecraft:wolf ~2 ~ ~')
}

function speedEvent() {
    bot.chat('Event: I can`t stop')

    bot.chat('/effect give @a minecraft:speed 20 70')

}

function totemEvent() {
    bot.chat('Event: Бессмертие')

    bot.chat('/give @a minecraft:totem_of_undying 1')

}

function hungerEvent() {
    bot.chat('Event: Чревоугодие')

    bot.chat('/effect give @a minecraft:hunger 10 255')
    bot.chat('/give @a minecraft:rotten_flesh 15')
}

function zombieEvent() {
    bot.chat('Event: Зомби-апокалипсис')

    bot.chat('/execute as @a at @s run summon minecraft:zombie ~2 ~ ~')
    bot.chat('/execute as @a at @s run summon minecraft:zombie ~-2 ~ ~')  
    bot.chat('/execute as @a at @s run summon minecraft:zombie ~ ~ ~2')
}

function tntEvent() {
    bot.chat('Event: TnT')

    bot.chat('/execute as @a at @s run summon minecraft:tnt ~ ~ ~ {fuse:40}')
}

function dungeonEvent() {
    bot.chat('Event: Случайный данж')

    const randomDungeon = dungeons[Math.floor(Math.random() * dungeons.length)]

    bot.chat(`/execute as @a at @s positioned ~10 ~ ~ run place structure ${randomDungeon}`)
}

function fireballEvent() {
    bot.chat('Event: Фаерболл')

    bot.chat('/execute as @a at @s run summon fireball ~ ~1 ~ {ExplosionPower:10}')
}

function villageEvent() {
    bot.chat('Event: Деревня!')

    bot.chat('/execute as @a at @s positioned ~15 ~ ~ run place structure minecraft:village_plains')
}

function waterdropEvent() {
    bot.chat('Event: ВатерДроп')

    bot.chat('/give @a minecraft:water_bucket 1')
    bot.chat('/execute as @a at @s run tp @s ~ ~70 ~')
}

function ghostEvent() {
    bot.chat('Event: Призрак')

    bot.chat('/gamemode spectator @a')

    setTimeout(() => {
        bot.chat('/gamemode survival @a')
    }, 15000)
}

function coldEvent() {
    bot.chat('Event: Заморозка')

    bot.chat('/effect give @a slowness 12 255 true')
}

function levitationEvent() {
    bot.chat('Event: Невесомость')

    bot.chat('/effect give @a levitation 15 1 true')
}

function golemEvent() {
    bot.chat('Event: Подмога')

    bot.chat('/give @a minecraft:iron_golem_spawn_egg')
}

function timeEvent() {
    bot.chat('Event: Остановка времени')

    bot.chat('/tick freeze')

    setTimeout(() => {
        bot.chat('/tick unfreeze')
    }, 25000)
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
        bot.chat('Water Drop - Тп игрока на 50 блоков вверх')
        bot.chat('Ghost - Режим наблюдателя на 15 сек')
        bot.chat('Cold - Стан игрока на 15 сек')
        bot.chat('Levitation - Левитация на 15 сек')
        bot.chat('===============================')
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

            if (randomEvent === 'lightning') {
                lightningEvent()
            }

            if (randomEvent === 'night') {
                nightEvent()
            }

            if (randomEvent === 'apple') {
                appleEvent()
            }

            if (randomEvent === 'dog') {
                dogEvent()
            }

            if (randomEvent === 'speed') {
                speedEvent()
            }

            if (randomEvent === 'totem') {
                totemEvent()
            }

            if (randomEvent === 'hunger') {
                hungerEvent()
            }

            if (randomEvent === 'zombie') {
                zombieEvent()
            }

            if (randomEvent === 'tnt') {
                tntEvent()
            }

            if (randomEvent === 'dungeon') {
                dungeonEvent()
            }

            if (randomEvent === 'fireball') {
                fireballEvent()
            }

            if (randomEvent === 'village') {
                villageEvent()
            }

            if (randomEvent === 'waterdrop') {
                waterdropEvent()
            }

            if (randomEvent === 'ghost') {
                ghostEvent()
            }

            if (randomEvent === 'cold') {
                coldEvent()
            }

            if (randomEvent === 'levitation') {
                levitationEvent()
            }

            if (randomEvent === 'golem') {
                golemEvent()
            }

            if (randomEvent === 'time') {
                timeEvent()
            }

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

