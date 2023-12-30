import { Request, Response } from 'express';
const msgServices = require('../services/msgServices');

exports.createMsg = async (req: Request, res: Response) => {
    try{
        await msgServices.createMsg(req, res);
    } catch(err){
        res.status(500).json({message: "Internal server error"});
    }
}

exports.getMsgs = async (req: Request, res: Response) => {
    try{
        await msgServices.getMsgs(req, res);
    } catch(err){
        res.status(500).json({message: "Internal server error"});
    }
}