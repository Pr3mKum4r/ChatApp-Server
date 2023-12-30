"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const ChatRouter = express.Router();
const chatController = require('../controllers/chatController');
ChatRouter.post('/', chatController.createChat);
ChatRouter.get('/:userId', chatController.findUserChats);
ChatRouter.get('/find/:firstId/:secondId', chatController.findChat);
exports.default = ChatRouter;
