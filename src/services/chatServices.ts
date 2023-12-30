import { Request, Response } from 'express';
import db from '../db';

exports.createChat = async (req: Request, res: Response) => {
    const {firstId, secondId} = req.body;
    try{
        const chat = await db.chat.findFirst({
            where: {
                AND: [
                    {members: {has: firstId}},
                    {members: {has: secondId}},
                ],
            },
        });
        if(chat) return res.status(200).json(chat);

        const newChat = await db.chat.create({
            data: {
                members: [firstId, secondId],
            },
        });
        res.status(200).json(newChat);
    }catch(error){
        res.status(500).json({
            status: 'fail',
            error: error,
        });
    }
}

exports.findUserChats = async (req: Request, res: Response) => {
    const {userId} = req.params;
    try{
        const chats = await db.chat.findMany({
            where: {
                members: {has: userId},
            },
        });
        res.status(200).json(chats);
    }catch(error){
        res.status(500).json({
            status: 'fail',
            error: error,
        });
    }
}

exports.findChat = async (req: Request, res: Response) => {
    const {firstId, secondId} = req.params;
    try{
        const chat = await db.chat.findFirst({
            where: {
                AND: [
                    {members: {has: firstId}},
                    {members: {has: secondId}},
                ],
            },
        });
        if(!chat) return res.status(400).json({message: "Chat not found"});
        res.status(200).json(chat);
    }catch(error){
        res.status(500).json({
            status: 'fail',
            error: error,
        });
    }
}