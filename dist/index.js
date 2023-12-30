"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const cors = require('cors');
const app = express();
const dotenv = require('dotenv');
const userRoute_1 = __importDefault(require("./routes/userRoute"));
const chatRoute_1 = __importDefault(require("./routes/chatRoute"));
const msgRoute_1 = __importDefault(require("./routes/msgRoute"));
dotenv.config();
app.use(cors());
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
// ROUTES
app.use('/api/v1/users', userRoute_1.default);
app.use('/api/v1/chats', chatRoute_1.default);
app.use('/api/v1/messages', msgRoute_1.default);
app.all('*', (req, res, next) => {
    res.json(`Can't find ${req.originalUrl} on this server!`);
});
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`now listening on port ${port}`);
});
module.exports = app;
