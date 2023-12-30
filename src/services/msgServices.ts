import { Request, Response } from 'express';
import db from '../db';

exports.createMsg = async (req: Request, res: Response) => {
    const {chatId, senderId, text} = req.body;
    try{
        const newMsg = await db.message.create({
            data: {
                chatId: chatId,
                senderId: senderId,
                text: text,
            },
        });
        res.status(200).json(newMsg);
    }catch(error){
        res.status(500).json({
            status: 'fail',
            error: error,
        });
    }
}

exports.getMsgs = async (req: Request, res: Response) => {
    const {chatId} = req.params;
    try{
        const msgs = await db.message.findMany({
            where: {
                chatId: chatId,
            },
        });
        res.status(200).json(msgs);
    }catch(error){
        res.status(500).json({
            status: 'fail',
            error: error,
        });
    }
}