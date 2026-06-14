const mineflayer = require('mineflayer')

const bot = mineflayer.createBot({
    host: 'localhost',
    username: 'ZELIMHAN',
    port: 25565,
    version: '1.21'

})

let eventInterval = null

const events = [
    'lightning',
    'night',
    'apple',
    'dog',
    'speed',
    'totem',
    'golod',
    'Zombie'


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
    bot.chat('Event: Золотое яблоко')

    bot.chat('/give @a minecraft:golden_apple 1')
}

function dogEvent() {
    bot.chat('Event: Друг человека')
    

    bot.chat('/give @a minecraft:bone 5')
    bot.chat('/execute as @a at @s run summon minecraft:wolf ~2 ~ ~')
}

function speedEvent() {
    bot.chat('Event: I can`t stop')

    bot.chat('/effect give @a minecraft:speed 15 70')

}

function totemEvent() {
    bot.chat('Event: Бессмертие')

    bot.chat('/give @a minecraft:totem_of_undying 1')

}

function golodEvent() {
    bot.chat('Event: Чревоугодие')

    bot.chat('/effect give @a minecraft:hunger 5 255')
    bot.chat('/give @a minecraft:rotten_flesh 15')
}

function ZombieEvent() {
    bot.chat('Event: Зомби-апокалипсис')

    bot.chat('/execute as @a at @s run summon minecraft:zombie ~2 ~ ~')
    bot.chat('/execute as @a at @s run summon minecraft:zombie ~-2 ~ ~')
    bot.chat('/execute as @a at @s run summon minecraft:zombie ~ ~ ~2')
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

            const randomEvent = events[Math.floor(Math.random() * events.length)]

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

            if (randomEvent === 'Zombie') {
                ZombieEvent()
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