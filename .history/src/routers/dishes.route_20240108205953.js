import express from 'express';
import Dishes from '../models/dishes.model.js';
import bodyParser from 'body-parser';

const router = express.Router();
router.use(bodyParser.json());

router.post("/")