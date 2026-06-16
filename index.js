const mineflayer = require('mineflayer')

const bot = mineflayer.createBot({
    host: 'localhost',
    username: 'ZELIMHAN',
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
    'golod',
    'zombie',
    'tnt',
    'dungeon',
    'fireball',
    'village',
    'waterdrop'
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

function golodEvent() {
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
    bot.chat('/execute as @a at @s run tp @s ~ ~50 ~')
}

bot.on('spawn', () => {
    console.log('бот зашел на сервер')
})

bot.on('chat', (username, message) => {
    if (username === bot.username) return

    console.log(username + ': ' + message)

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

            if (randomEvent === 'golod') {
                golodEvent()
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

bot.on('end', () => {
  console.log('бот отключился')
})