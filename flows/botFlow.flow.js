const { addKeyword } = require('@bot-whatsapp/bot')

const ChatGPTClass = require('../chatgpt.class')

const exitFlow = addKeyword('quiero salir').addAnswer('Ok, escribeme cuando quieras iniciar tu proceso de selección 😊 Vuelve pronto')

const chatGptInstance = new ChatGPTClass()

const botFlow = addKeyword('bot')
.addAnswer('Hola, Estoy aquí para ayudarte a mejorar tu CV y tus habilidades blandas 😁, Si en algún momento quieres salir de esta conversación y volver al menu principal escribe *QUIERO SALIR* 👌,Preguntame lo que quieras.',
    {
        capture:true
    },
    async (ctx, { fallBack }) => {
        const response = await chatGptInstance.handleMsgChatGPT(ctx.body)
        const message = response.text

        if (ctx.body.toUpperCase() !== 'QUIERO SALIR') {
            return fallBack(message)
        }
    },[exitFlow]
)

module.exports = {
    botFlow
}