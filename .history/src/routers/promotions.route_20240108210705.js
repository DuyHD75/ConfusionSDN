import express from 'express';
import bodyParser from 'body-parser';
import Promotions from '../models/promotions.model.js';

const promoRouter = express.Router();
promoRouter.use(bodyParser.json());
