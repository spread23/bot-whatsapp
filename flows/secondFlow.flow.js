const { addKeyword }  = require('@bot-whatsapp/bot')

//const { processFlow } = require('./processFlow.flow')
const { botFlow } = require('./botFlow.flow')
const { process } = require('./process.flow')

const secondFlow = addKeyword('Si acepto')
.addAnswer('Escribe *PROCESO* si quieres continuar en el proceso de selección, o escribe *BOT* si quieres recibir consejos de como puedes mejorar tu CV y mejorar tus habilidades blandas para aumentar tus posibilidades de ser seleccionado. 😊',
    {
        capture:true
    },
    async (ctx, { fallBack }) => {
        if (ctx.body.toUpperCase() !== 'PROCESO' && ctx.body.toUpperCase() !== 'BOT') {
            return fallBack('Debes escribir *PROCESO* o *BOT*')
        }
    },[process, botFlow]
)

const denyFlow = addKeyword('No acepto').addAnswer('Ok, Escribeme cuando quieras iniciar tu proceso de selección 😊, aca te estaré esperando')

module.exports = {
    secondFlow,
    denyFlow
}