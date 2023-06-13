const { handleIncomingMessage } = require('./handle-incoming-message.js')
const { getBody } = require('./get-body.js')
const https = require('https')

module.exports = { startBot }

function startBot(botToken) {
  const options = {
    hostname: 'api.telegram.org',
    path: `/bot${botToken}/getUpdates`,
    method: 'GET',
  }

  let lastUpdateId = 0

  setInterval(() => {
    options.path = `/bot${botToken}/getUpdates?offset=${lastUpdateId + 1}`

    const req = https.request(options, async res => {
      const body = await getBody(res)
      const response = JSON.parse(body)
      if (response.result?.length > 0) {
        const updates = response.result

        updates.forEach(update => {
          handleIncomingMessage(update.message, botToken)
          lastUpdateId = update.update_id
        })
      }
    })

    req.on('error', error => {
      console.error('Error retrieving updates:', error)
    })

    req.end()
  }, 1000)
}