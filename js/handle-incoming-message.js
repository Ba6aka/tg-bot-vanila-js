const { sendMessage } = require('./send-message.js')
module.exports = { handleIncomingMessage }

function handleIncomingMessage(message, botToken) {
  const chatId = message.chat.id
  const text = message.text

  if (text === '/start') {
    sendMessage(chatId, 'Hello! Welcome to the bot.', botToken)
  } else if (text === '/help') {
    sendMessage(chatId, 'I can help you with various tasks.', botToken)
  } else {
    sendMessage(chatId, 'Sorry, I don\'t understand.', botToken)
  }
}