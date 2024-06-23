const { createBot, createProvider, createFlow, addKeyword, EVENTS } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')

//Welcome flows import
const { flowWelcome } = require('./flows/welcome.flow')

//sub flows import
const { secondFlow, denyFlow } = require('./flows/secondFlow.flow')
const { botFlow, exitFlow } = require('./flows/botFlow.flow')
const { process } = require('./flows/process.flow')
const { feedFlow } = require('./flows/feedFlow.flow')
const { vacantsFlow } = require('./flows/vacantsFlow.flow')

const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flowWelcome, secondFlow, botFlow, process, feedFlow, vacantsFlow, exitFlow])
    const adapterProvider = createProvider(BaileysProvider)

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    QRPortalWeb()
}

main()
