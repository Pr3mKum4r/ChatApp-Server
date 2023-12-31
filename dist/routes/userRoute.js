"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const UserRouter = express.Router();
const userController = require('../controllers/userController');
UserRouter.post('/register', userController.registerUser);
UserRouter.post('/login', userController.loginUser);
UserRouter.get('/:id', userController.findUser);
UserRouter.get('/', userController.getAllUsers);
exports.default = UserRouter;
