const { addKeyword } = require('@bot-whatsapp/bot')

const feedFlow = addKeyword('feedback')
.addAnswer('Muy pronto te daremos feedback de tu cv...')

module.exports = {
    feedFlow
} 