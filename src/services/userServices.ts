import { Request, Response } from 'express';
import db from '../db';
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const createToken = (id: number) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "3d",
    });
}

exports.register = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    try {
        let user = await db.user.findUnique({
            where: {
                email: email,
            },
        });
        if (user) return res.status(400).json({ message: "User with the given email already exists" });
        if (!name || !email || !password) return res.status(400).json({ message: "All fields are required" });
        if (!validator.isEmail(email)) return res.status(400).json({ message: "Invalid email address" });
        if (!validator.isStrongPassword(password)) return res.status(400).json({ message: "Password must be at least 8 characters long, and contain at least 1 lowercase, 1 uppercase, 1 number and 1 symbol" });
        
        const salt = await bcrypt.genSalt(10);
        const hasedhPassword = await bcrypt.hash(password, salt);
        user = await db.user.create({
            data: {
                name: name,
                email: email,
                password: hasedhPassword,
            },
        });

        const token = createToken(user.id);
        res.status(200).json({id: user.id, name: user.name, email: user.email, token: token});
    } catch (error) {
        res.status(500).json({
            status: 'fail',
            error: error,
        });
    }
}

exports.login = async (req: Request, res: Response) => {
    const {email, password} = req.body;

    try{
        let user = await db.user.findUnique({
            where: {
                email: email,
            },
        });
        if(!user) return res.status(400).json({message: "Invalid email or password"});
        const isValidPassword = await bcrypt.compare(password, user.password);
        if(!isValidPassword) return res.status(400).json({message: "Invalid email or password"});
        const token = createToken(user.id);
        res.status(200).json({id: user.id, name: user.name, email: user.email, token: token});
    }catch(error){
        res.status(500).json({
            status: 'fail',
            error: error,
        });
    }
}

exports.findUser = async (req: Request, res: Response) => {
    try{
        const user = await db.user.findUnique({
            where: {
                id: req.params.id,
            },
        });
        if(!user) return res.status(400).json({message: "User not found"});
        //remove password from user object
        delete user.password;
        res.status(200).json(user);
    }catch(error){
        res.status(500).json({
            status: 'fail',
            error: error,
        });
    }
}

exports.getAllUsers = async (req: Request, res: Response) => {
    try{
        const users = await db.user.findMany();
        //remove password from user object
        users.forEach((user:any) => {
            delete user.password;
        });
        res.status(200).json(users);
    }catch(error){
        res.status(500).json({
            status: 'fail',
            error: error,
        });
    }
}
