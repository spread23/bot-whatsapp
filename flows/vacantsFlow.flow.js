const { addKeyword } = require('@bot-whatsapp/bot')

const vacantsFlow = addKeyword('vacantes')
.addAnswer('En unos segundos te mostraremos las vacantes que tenemos para ti')

module.exports = {
    vacantsFlow
}