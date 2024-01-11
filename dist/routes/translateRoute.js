"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const TranslateRouter = express.Router();
const translateController = require('../controllers/translateController');
TranslateRouter.post('/', translateController.translate);
exports.default = TranslateRouter;
