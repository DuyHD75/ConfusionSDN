import express from 'express';
import Leaders from '../models/leaders.model.js';
import bodyParser from 'body-parser';


const leaderRouter = express.Router();
leaderRouter.use(bodyParser.json());


leaderRouter.route('/')
     .get((req, res, next) => {
          Leaders.find({})
               .then((leaders) => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(leaders);
               }, (err) => next(err))
               .catch((err) => next(err));
     })
     .post((req, res, next) => {
          Leaders.create(req.body)
               .then((dish) => {
                    console.log("dish created ", dish)
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(dish);
               }, (err) => next(err))
               .catch((err) => next(err));
     })
     .put((req, res, next) => {
          res.statusCode = 403;
          res.end('PUT operation not supported on /Leaders path !');
     })
     .delete((req, res, next) => {
          Leaders.deleteMany({})
               .then((resp) => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(resp);
               }, (err) => next(err))
               .catch((err) => next(err));
     });

leaderRouter.route('/:leaderId')
     .get((req, res, next) => {
          Leaders.findById(req.params.leaderId)
               .then((leader) => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(leader);
               }, (err) => next(err))
               .catch((err) => next(err));
     })
     .post((req, res, next) => {
          res.statusCode = 403;
          res.end("");
     })
     .put((req, res, next) => {
          Leaders.findByIdAndUpdate(req.params.leaderId, {
               $set: req.body
          }, { new: true })
               .then((leader) => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(leader);
               }, (err) => next(err))
               .catch((err) => next(err));
     })
     .delete((req, res, next) => {
          Leaders.findByIdAndRemove(req.params.leaderId)
               .then((resp) => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(resp);
               }, (err) => next(err))
               .catch((err) => next(err));
     });

export default leaderRouter;