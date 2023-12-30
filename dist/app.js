"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
// ROUTES
app.use('/', (req, res) => {
    res.send('Hello from the server side!');
});
app.all('*', (req, res, next) => {
    res.json(`Can't find ${req.originalUrl} on this server!`);
});
module.exports = app;
