import { Request, Response } from "express";
import {v4 as uuidv4} from "uuid";

let AZURESUBSCRIPTIONKEY = process.env.AZURESUBSCRIPTIONKEY || undefined;
let AZUREENDPOINT = process.env.AZUREENDPOINT || undefined;

exports.translate = async (req: Request, res: Response) => {
    try {
        const { sourceLanguage, messageText, targetLanguage } = req.body;

        if (!AZURESUBSCRIPTIONKEY || !AZUREENDPOINT ) {
            res.send(`translationUnavailable`);
        }

        const response = await fetch(`${AZUREENDPOINT}/translate?api-version=3.0&from=${encodeURIComponent(sourceLanguage)}&to=${encodeURIComponent(targetLanguage)}`, {
            method: "POST",
            headers: {
                "Ocp-Apim-Subscription-Key": AZURESUBSCRIPTIONKEY || ''.toString(),
                "Content-type": "application/json",
                "X-ClientTraceId": uuidv4().toString()
            },
            body: JSON.stringify([
                {
                    text: messageText
                }
            ])
        });

        const data = await response.json();


        const translatedText: string = data[0]["translations"][0]["text"];
        res.status(200).json({translatedText: translatedText});
    } catch (err) {
        console.log(err);
    }
};