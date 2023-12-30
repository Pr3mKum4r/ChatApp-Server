"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const MsgRouter = express.Router();
const msgController = require('../controllers/msgController');
MsgRouter.post('/', msgController.createMsg);
MsgRouter.get('/:chatId', msgController.getMsgs);
exports.default = MsgRouter;
