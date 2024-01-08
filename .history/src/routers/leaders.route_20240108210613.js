import express from 'express';
import Leaders from '../models/leaders.model.js';
import bodyParser from 'body-parser';


const leaderRouter = express.Router();
leaderRouter.use(bodyParser.json());

