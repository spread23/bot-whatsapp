const { addKeyword, EVENTS } = require('@bot-whatsapp/bot')

const { secondFlow, denyFlow } = require('./secondFlow.flow')

const flowWelcome = addKeyword(EVENTS.WELCOME)
.addAnswer(`Hola, y bienvenido/a al proceso de selección de OFRECETUTALENTO 🙌, Estoy aquí para ayudarte a postular a una vacante y guiarte a través del proceso de manera sencilla 👌`)
.addAnswer('*ACUERDO DE POLITICA DE PRIVACIDAD*')
.addAnswer(`Antes de continuar, es importante que leas y aceptes nuestra política de privacidad, puedes encontrarla en [LINK]`)
.addAnswer('¿Aceptas nuestra politica de privacidad?\n Escribe *SI ACEPTO* o *NO ACEPTO*', { capture:true }, async (ctx, { fallBack }) => {
    if (ctx.body.toUpperCase() !== 'SI ACEPTO' && ctx.body.toUpperCase() !== 'NO ACEPTO') {
        return fallBack('Debes escribir *SI ACEPTO* o *NO ACEPTO*')
    }
}, [secondFlow, denyFlow])

module.exports = {
    flowWelcome
}