module.exports = { sendMessage }

const https = require('https')
const querystring = require('querystring')

function sendMessage(chatId, text, botToken) {
  const messageData = querystring.stringify({
    chat_id: chatId,
    text: text
  })

  const options = {
    hostname: 'api.telegram.org',
    path: `/bot${botToken}/sendMessage`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  }

  const req = https.request(options, res => {
    let data = ''

    res.on('data', chunk => {
      data += chunk
    })

    res.on('end', () => {
      console.log('Message sent:', data)
    })
  })

  req.on('error', error => {
    console.error('Error sending message:', error)
  })

  req.write(messageData)
  req.end()
}