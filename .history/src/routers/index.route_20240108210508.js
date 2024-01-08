import express from 'express';
import dishRouter from './dishes.route.js';

const router = express.Router();

router.use("/");

router.use("/dishes",dishRouter)
