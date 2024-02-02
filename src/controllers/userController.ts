import { Request, Response } from 'express';
const userServices = require('../services/userServices');

exports.registerUser = async (req: Request, res: Response) => {
    try{
        await userServices.register(req, res);
    } catch(err){
        res.status(500).json({message: "Internal server error"});
    }
}

exports.loginUser = async (req: Request, res: Response) => {
    try{
        await userServices.login(req, res);
    } catch(err){
        console.log(err);
        res.status(500).json({message: "Internal server error"});
    }
}

exports.findUser = async (req: Request, res: Response) => {
    try{
        await userServices.findUser(req, res);
    } catch(err){
        res.status(500).json({message: "Internal server error"});
    }
}

exports.getAllUsers = async (req: Request, res: Response) => {
    try{
        await userServices.getAllUsers(req, res);
    } catch(err){
        res.status(500).json({message: "Internal server error"});
    }
}