import express from 'express';
import dishRouter from './dishes.route.js';
import leaderRouter from './leaders.route.js';
import promoRouter from './promotions.route.js';

const router = express.Router();

router.use("/");

router.use("/dishes", dishRouter);
app.use('/leaders', leaderRouter);
app.use('/promotions', promoRouter);

