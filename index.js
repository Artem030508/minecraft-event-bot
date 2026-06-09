const mineflayer = require('mineflayer')

const bot = mineflayer.createBot({
    host: 'localhost',
    username: 'ZELIMHAN',
    port: 25565,
    version: '1.21'

})

bot.on('spawn', () => {
    console.log('бот зашел на сервер')
})

bot.on('chat', (username, message) => {
    if (username === bot.username) return
    console.log(username + ': ' + message)

    if (message === '!event') {
        bot.chat('рандомный ивент запущен ')
    }
})

bot.on('error', (err) => {
  console.log('ошибка:', err)
})

bot.on('end', () => {
  console.log('бот отключился')
})