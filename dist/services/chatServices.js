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
exports.createChat = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstId, secondId } = req.body;
    try {
        const chat = yield db_1.default.chat.findFirst({
            where: {
                AND: [
                    { members: { has: firstId } },
                    { members: { has: secondId } },
                ],
            },
        });
        if (chat)
            return res.status(200).json(chat);
        const newChat = yield db_1.default.chat.create({
            data: {
                members: [firstId, secondId],
            },
        });
        res.status(200).json(newChat);
    }
    catch (error) {
        res.status(500).json({
            status: 'fail',
            error: error,
        });
    }
});
exports.findUserChats = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    try {
        const chats = yield db_1.default.chat.findMany({
            where: {
                members: { has: userId },
            },
        });
        res.status(200).json(chats);
    }
    catch (error) {
        res.status(500).json({
            status: 'fail',
            error: error,
        });
    }
});
exports.findChat = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstId, secondId } = req.params;
    try {
        const chat = yield db_1.default.chat.findFirst({
            where: {
                AND: [
                    { members: { has: firstId } },
                    { members: { has: secondId } },
                ],
            },
        });
        if (!chat)
            return res.status(400).json({ message: "Chat not found" });
        res.status(200).json(chat);
    }
    catch (error) {
        res.status(500).json({
            status: 'fail',
            error: error,
        });
    }
});
