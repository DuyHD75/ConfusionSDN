import express from 'express';
import dishRouter from './dishes.route.js';
import leaderRouter from './leaders.route.js';
import promoRouter from './promotions.route.js';

const router = express.Router();

router.use("/dishes", dishRouter);
router.use('/leaders', leaderRouter);
router.use('/promotions', promoRouter);

export default router;