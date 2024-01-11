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
const uuid_1 = require("uuid");
let AZURESUBSCRIPTIONKEY = process.env.AZURESUBSCRIPTIONKEY || undefined;
let AZUREENDPOINT = process.env.AZUREENDPOINT || undefined;
exports.translate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { sourceLanguage, messageText, targetLanguage } = req.body;
        if (!AZURESUBSCRIPTIONKEY || !AZUREENDPOINT) {
            res.send(`translationUnavailable`);
        }
        const response = yield fetch(`${AZUREENDPOINT}/translate?api-version=3.0&from=${encodeURIComponent(sourceLanguage)}&to=${encodeURIComponent(targetLanguage)}`, {
            method: "POST",
            headers: {
                "Ocp-Apim-Subscription-Key": AZURESUBSCRIPTIONKEY.toString(),
                "Content-type": "application/json",
                "X-ClientTraceId": (0, uuid_1.v4)().toString()
            },
            body: JSON.stringify([
                {
                    text: messageText
                }
            ])
        });
        const data = yield response.json();
        const translatedText = data[0]["translations"][0]["text"];
        res.status(200).json({ translatedText: translatedText });
    }
    catch (err) {
        console.log(err);
    }
});
