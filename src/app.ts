import { createBot, createFlow, MemoryDB, createProvider, addKeyword } from '@bot-whatsapp/bot'
import { BaileysProvider, handleCtx } from '@bot-whatsapp/provider-baileys'

/**
 * Testing Bot WhatsApp
 */

const flowBienvenida = addKeyword(['Hola', 'Buenas']).addAnswer('Hola, soy un bot de prueba. ¿En qué puedo ayudarte?')



const main = async () => { 

    const provider = createProvider(BaileysProvider);

    provider.initHttpServer(3002)

    provider.http?.server.post('send-message', handleCtx(async (bot, req, res) => {

        const body = req.body
        
        const phoneNumber = body.phoneNumber
        const message = body.message
        const mediaUrl = body.mediaUrl

        await bot.sendMessage(phoneNumber, message, {
            media: mediaUrl
        })
        res.end('El mensaje fue enviado correctamente!')
    }))

    await createBot({
        flow: createFlow([flowBienvenida]),
        database: new MemoryDB(),
        provider
    })
}

main()