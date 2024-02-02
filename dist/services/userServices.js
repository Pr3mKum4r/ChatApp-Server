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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../db"));
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "3d",
    });
};
exports.register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, preferredLanguage } = req.body;
    try {
        let user = yield db_1.default.user.findUnique({
            where: {
                email: email,
            },
        });
        if (user)
            return res.status(400).json({ message: "User with the given email already exists" });
        if (!name || !email || !password)
            return res.status(400).json({ message: "All fields are required" });
        if (!validator.isEmail(email))
            return res.status(400).json({ message: "Invalid email address" });
        if (!validator.isStrongPassword(password))
            return res.status(400).json({ message: "Password must be at least 8 characters long, and contain at least 1 lowercase, 1 uppercase, 1 number and 1 symbol" });
        const salt = yield bcrypt.genSalt(10);
        const hasedhPassword = yield bcrypt.hash(password, salt);
        user = yield db_1.default.user.create({
            data: {
                name: name,
                email: email,
                password: hasedhPassword,
                preferredLanguage: preferredLanguage
            },
        });
        const token = createToken(user.id);
        res.status(200).json({ id: user.id, name: user.name, email: user.email, token: token, preferredLanguage: user.preferredLanguage });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            status: 'fail',
            error: error,
        });
    }
});
exports.login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        let user = yield db_1.default.user.findUnique({
            where: {
                email: email,
            },
        });
        if (!user)
            return res.status(400).json({ message: "Invalid email or password" });
        const isValidPassword = yield bcrypt.compare(password, user.password);
        if (!isValidPassword)
            return res.status(400).json({ message: "Invalid email or password" });
        const token = createToken(user.id);
        res.status(200).json({ id: user.id, name: user.name, email: user.email, token: token, preferredLanguage: user.preferredLanguage });
    }
    catch (error) {
        res.status(500).json({
            status: 'fail',
            error: error,
        });
    }
});
exports.findUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield db_1.default.user.findUnique({
            where: {
                id: req.params.id,
            },
        });
        if (!user)
            return res.status(400).json({ message: "User not found" });
        //remove password from user object
        delete user.password;
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({
            status: 'fail',
            error: error,
        });
    }
});
exports.getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield db_1.default.user.findMany();
        //remove password from user object
        users.forEach((user) => {
            delete user.password;
        });
        res.status(200).json(users);
    }
    catch (error) {
        res.status(500).json({
            status: 'fail',
            error: error,
        });
    }
});
