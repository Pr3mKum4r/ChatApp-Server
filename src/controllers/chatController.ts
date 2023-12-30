import { Request, Response } from 'express';
const chatServices = require('../services/chatServices');

exports.createChat = async (req: Request, res: Response) => {
    try{
        await chatServices.createChat(req, res);
    } catch(err){
        res.status(500).json({message: "Internal server error"});
    }
}

exports.findUserChats = async (req: Request, res: Response) => {
    try{
        await chatServices.findUserChats(req, res);
    } catch(err){
        res.status(500).json({message: "Internal server error"});
    }
}

exports.findChat = async (req: Request, res: Response) => {
    try{
        await chatServices.findChat(req, res);
    } catch(err){
        res.status(500).json({message: "Internal server error"});
    }
}