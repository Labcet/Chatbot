"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const bot_1 = require("@bot-whatsapp/bot");
const provider_baileys_1 = require("@bot-whatsapp/provider-baileys");
/**
 * Testing Bot WhatsApp
 */
const flowBienvenida = (0, bot_1.addKeyword)(['Hola', 'Buenas']).addAnswer('Hola, soy un bot de prueba. ¿En qué puedo ayudarte?');
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const provider = (0, bot_1.createProvider)(provider_baileys_1.BaileysProvider);
    provider.initHttpServer(3002);
    (_a = provider.http) === null || _a === void 0 ? void 0 : _a.server.post('send-message', (0, provider_baileys_1.handleCtx)((bot, req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const body = req.body;
        const phoneNumber = body.phoneNumber;
        const message = body.message;
        const mediaUrl = body.mediaUrl;
        yield bot.sendMessage(phoneNumber, message, {
            media: mediaUrl
        });
        res.end('El mensaje fue enviado correctamente!');
    })));
    yield (0, bot_1.createBot)({
        flow: (0, bot_1.createFlow)([flowBienvenida]),
        database: new bot_1.MemoryDB(),
        provider
    });
});
main();
