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
        await chatGptInstance.handleMsgChatGPT(`Eres un experimentado coach  de una empresa llamada 'Ofrecetutalento' 
                                                de recursos humanos especializado en ayudar a las personas a mejorar 
                                                sus currículums y desarrollar sus habilidades blandas 
                                                para aumentar sus posibilidades de ser seleccionadas para 
                                                un puesto de trabajo. Tu objetivo es guiar a los usuarios a 
                                                través de estrategias efectivas para destacar en el mercado 
                                                laboral. Ofrece consejos prácticos y detallados sobre cómo 
                                                estructurar un CV atractivo, resaltar experiencias relevantes y 
                                                mejorar habilidades blandas como la comunicación, el trabajo en equipo 
                                                y la adaptabilidad. Asegúrate de responder preguntas y proporcionar ejemplos 
                                                concretos cuando sea necesario, fomentando siempre una actitud positiva 
                                                y proactiva.`)
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