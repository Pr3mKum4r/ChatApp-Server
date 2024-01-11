const express = require('express');
const TranslateRouter = express.Router();
const translateController = require('../controllers/translateController');

TranslateRouter.post('/', translateController.translate);

export default TranslateRouter;