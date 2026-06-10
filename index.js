const mineflayer = require('mineflayer')

const bot = mineflayer.createBot({
    host: 'localhost',
    username: 'ZELIMHAN',
    port: 25565,
    version: '1.21'

})

const events = [
    'death',
    'night',
    'rain'
]

bot.on('spawn', () => {
    console.log('бот зашел на сервер')
})

bot.on('chat', (username, message) => {
    if (username === bot.username) return

    console.log(username + ': ' + message)

    if (message === '!event') {
        const randomEvent = events[Math.floor(Math.random() * events.length)]

        bot.chat(`Выпал ивент: ${randomEvent}`)

        if (randomEvent === 'night') {
            bot.chat('/time set night')
        }

        if (randomEvent === 'rain') {
            bot.chat('/weather rain')
        }
    }
})

bot.on('error', (err) => {
  console.log('ошибка:', err)
})

bot.on('end', () => {
  console.log('бот отключился')
})