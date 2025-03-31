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
        
        const message = body.message
        const mediaUrl = body.mediaUrl

        await bot.sendMessage('51959681467', message, {
            media: mediaUrl
        })
        res.end('Esto es del server de polka')
    }))

    await createBot({
        flow: createFlow([flowBienvenida]),
        database: new MemoryDB(),
        provider
    })
}

main()