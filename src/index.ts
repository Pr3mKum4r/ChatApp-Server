const express = require('express');
import { Request, Response, NextFunction } from 'express';
const cors = require('cors');
const app = express();
const dotenv = require('dotenv');
import UserRouter from './routes/userRoute';
import ChatRouter from './routes/chatRoute';
import MessageRouter from './routes/msgRoute';

dotenv.config();
app.use(cors());

app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));


// ROUTES
app.use('/api/v1/users', UserRouter);
app.use('/api/v1/chats', ChatRouter);
app.use('/api/v1/messages', MessageRouter);

app.all('*', (req: Request, res: Response, next: NextFunction) => {
  res.json(`Can't find ${req.originalUrl} on this server!`);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`now listening on port ${port}`);
});

module.exports = app;