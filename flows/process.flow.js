const { addKeyword, EVENTS } = require('@bot-whatsapp/bot')

const { feedFlow } = require('./feedFlow.flow')
const { vacantsFlow } = require('./vacantsFlow.flow')

const process = addKeyword('proceso')
.addAnswer('Gracias por continuar en el proceso 😁, podemos proceder con la recopilación de tu información 👍')
.addAnswer('Para comenzar, necesito algunos datos personales, para identificarte en nuestro sistema 🙌')
.addAnswer('¿Podrías indicarme tu nombre completo?', {capture:true}, async (ctx, { flowDynamic, state }) => {
    await state.update({ name: ctx.body })
    const myState = state.getMyState()

    await flowDynamic(`Gracias ${ myState.name }`)
})
.addAnswer('¿Podrías indicarme tu numero de documento?', {capture:true}, async (ctx, { flowDynamic, state }) => {
    await state.update({ document: ctx.body })
    const myState = state.getMyState()

    await flowDynamic(`Muchas gracias por el documento ${ myState.name }`)
})
.addAnswer('Perfecto👍 ¿Podrías indicarme tu numero de whatsapp, para mantener una comunicación fluida contigo?😁',
    {
        capture:true
    },
    async (ctx, { flowDynamic, state }) => {
        await state.update({ cel: ctx.body })
        const myState = state.getMyState()

        await flowDynamic(`Muchas gracias por tu whatsapp 😊`)
    }
)
.addAnswer('continuemos ya falta poco, ¿Podrías indicarme cual es tu correo electrónico? (Introduce por favor un formato tipo: *mail@mail.com*)', 
    {
        capture:true
    },
    async (ctx, { flowDynamic, state }) => {
        await state.update({ email: ctx.body })
        const myState = state.getMyState()

        await flowDynamic(`Gracias por tu correo ${ myState.name } 😁`)
    }
)
.addAnswer(`a continuación puedes adjuntar tu CV en los siguientes formatos. (PDF, DOC)`, 
    {
        capture:true
    },
    async (ctx, { flowDynamic, state }) => {
        await state.update({ cv: ctx.body })
        const myState = state.getMyState()

        await flowDynamic(`Felicidades si llegaste a este paso ${myState.name} tus datos son nombre: ${ myState.name } documento: ${ myState.document } whatsapp: ${ myState.cel } correo: ${ myState.email }`)
    }
)
.addAnswer('Ya tengo todos tus datos para el proceso de selección, muchas gracias👌')
.addAnswer('Si quieres recibir un feedback de tu CV, escribe *FEEDBACK*, si quieres ver las vacantes relacionadas con tus talentos, escribe *VACANTES*',
    {
        capture:true
    },
    async (ctx, { flowDynamic, fallBack }) => {
        if (ctx.body.toUpperCase() !== 'FEEDBACK' && ctx.body.toUpperCase()  !== 'VACANTES') {
            return fallBack('Debes escribir *FEEDBACK* o *VACANTES*')
        }
    }//,[flowFeedback, flowVacants]
)


module.exports = {
    process
}