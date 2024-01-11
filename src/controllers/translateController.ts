import { Request, Response } from 'express';
const TranslateService  = require('../services/translateServices');

exports.translate = async (req: Request, res: Response) => {
    try {
        await TranslateService.translate(req, res);
    } catch (err) {
        res.status(500).json({message: "Internal server error"});
    }
};