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
exports.createMsg = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { chatId, senderId, text } = req.body;
    try {
        const newMsg = yield db_1.default.message.create({
            data: {
                chatId: chatId,
                senderId: senderId,
                text: text,
            },
        });
        res.status(200).json(newMsg);
    }
    catch (error) {
        res.status(500).json({
            status: 'fail',
            error: error,
        });
    }
});
exports.getMsgs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { chatId } = req.params;
    try {
        const msgs = yield db_1.default.message.findMany({
            where: {
                chatId: chatId,
            },
        });
        res.status(200).json(msgs);
    }
    catch (error) {
        res.status(500).json({
            status: 'fail',
            error: error,
        });
    }
});
