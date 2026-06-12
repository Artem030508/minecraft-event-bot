const mineflayer = require('mineflayer')

const bot = mineflayer.createBot({
    host: 'localhost',
    username: 'ZELIMHAN',
    port: 25565,
    version: '1.21'

})

const events = [
    'lightning',
    'night',
    'apple',
    'dog',

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
    bot.chat('Event: ')

    bot.chat('/give @a minecraft:golden_apple 1')
}

function dogEvent() {
    bot.chat('Event: Друг человека')
    

    bot.chat('/give @a minecraft:bone 5')
    bot.chat('/execute as @a at @s run summon minecraft:wolf ~2 ~ ~')
}


bot.on('spawn', () => {
    console.log('бот зашел на сервер')
})

bot.on('chat', (username, message) => {
    if (username === bot.username) return

    console.log(username + ': ' + message)

    if (message === '!event') {
        const randomEvent = events[Math.floor(Math.random() * events.length)]


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
    }
})

bot.on('error', (err) => {
  console.log('ошибка:', err)
})

bot.on('end', () => {
  console.log('бот отключился')
})