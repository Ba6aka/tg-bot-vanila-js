const { startBot } = require('./js/start-bot.js')

const botToken = process.env.TG_BOT_TOKEN

startBot(botToken)

