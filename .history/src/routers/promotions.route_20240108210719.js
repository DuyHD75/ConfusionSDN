import express from 'express';
import bodyParser from 'body-parser';
import Promotions from '../models/promotions.model.js';

const promoRouter = express.Router();
promoRouter.use(bodyParser.json());




promoRouter.route('/')
     .get((req, res, next) => {
          Promotions.find({})
               .then((promotions) => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(promotions);
               }, (err) => next(err))
               .catch((err) => next(err));
     })
     .post((req, res, next) => {
          Promotions.create(req.body)
               .then((promo) => {
                    console.log("Promotion created ", promo)
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(promo);
               }, (err) => next(err))
               .catch((err) => next(err));
     })
     .put((req, res, next) => {
          res.statusCode = 403;
          res.end("PUT not supported !");
     })
     .delete((req, res, next) => {
          Promotions.deleteMany({})
               .then((resp) => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(resp);
               }, (err) => next(err))
               .catch((err) => next(err));
     });

promoRouter.route('/:promoId')
     .get((req, res, next) => {
          Promotions.findById(req.params.promoId)
               .then((promo) => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(promo);
               }, (err) => next(err))
               .catch((err) => next(err));
     })
     .post((req, res, next) => {
          res.statusCode = 403;
          res.end("");
     })
     .put((req, res, next) => {
          Promotions.findByIdAndUpdate(req.params.promoId, {
               $set: req.body
          }, { new: true })
               .then((prom) => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(prom);
               }, (err) => next(err))
               .catch((err) => next(err));
     })
     .delete((req, res, next) => {
          Promotions.findByIdAndRemove(req.params.promoId)
               .then((resp) => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(resp);
               }, (err) => next(err))
               .catch((err) => next(err));
     });

export default promoRouter;