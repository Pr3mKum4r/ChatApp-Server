const express = require('express');
const MsgRouter = express.Router();
const msgController = require('../controllers/msgController');

MsgRouter.post('/', msgController.createMsg);
MsgRouter.get('/:chatId', msgController.getMsgs);

export default MsgRouter;