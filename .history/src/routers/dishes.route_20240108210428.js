import express from 'express';
import Dishes from '../models/dishes.model.js';
import bodyParser from 'body-parser';

const dish = express.Router();
router.use(bodyParser.json());


dishRouter.route('/')
     .get((req, res, next) => {
          Dishes.find({})
               .populate('comments.author')
               .then((dishes) => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(dishes);
               }, (err) => next(err))
               .catch((err) => next(err));
     })
     .post((req, res, next) => {
          Dishes.create(req.body)
               .then((dish) => {
                    console.log("Dish created ", dish)
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(dish);
               }, (err) => next(err))
               .catch((err) => next(err));
     })
     .put((req, res, next) => {
          res.statusCode = 403;
          res.end('PUT operation not supported on /dishes path !');
     })
     .delete((req, res, next) => {
          Dishes.deleteMany({})
               .then((resp) => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(resp);
               }, (err) => next(err))
               .catch((err) => next(err));
     });

dishRouter.route("/:dishId")
     .get((req, res, next) => {
          Dishes.findById(req.params.dishId)
               .then((dish) => {
                    res.statusCode = 200;
                    res.setHeader("Content-Type", "application/json");
                    res.json(dish);
               }, (err) => next(err))
               .catch((err) => next(err));
     })
     .post((req, res, next) => {
          res.statusCode = 403;
          res.end("");
     })
     .put((req, res, next) => {
          Dishes.findByIdAndUpdate(req.params.dishId, {
               $set: req.body
          }, { new: true })
               .then((dish) => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(dish);
               }, (err) => next(err))
               .catch((err) => next(err));
     })
     .delete((req, res, next) => {
          Dishes.findByIdAndRemove(req.params.dishId)
               .then((resp) => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(resp);
               }, (err) => next(err))
               .catch((err) => next(err));
     });

//=================== DISHES - COMMENTS
dishRouter.route("/:dishId/comments")
     .get((req, res, next) => {
          Dishes.findById(req.params.dishId)
               .then((dish) => {
                    if (dish) {
                         res.statusCode = 200;
                         res.setHeader("Content-Type", "application/json");
                         res.json(dish.comments);
                    } else {
                         err = new Error('Dish ' + req.params.dishId + ' not found !');
                         err.statusCode = 404;
                         return next(err);
                    }
               }, (err) => next(err))
               .catch((err) => next(err));
     })
     .post((req, res, next) => {
          Dishes.findById(req.params.dishId)
               .then((dish) => {
                    if (dish) {
                         dish.comments.push(req.body);
                         dish.save()
                              .then((dish) => {
                                   res.statusCode = 200;
                                   res.setHeader("Content-Type", "application/json");
                                   res.json(dish.comments);
                              });
                    } else {
                         err = new Error('Dish ' + req.params.dishId + ' not found !');
                         err.statusCode = 404;
                         return next(err);
                    }
               }, (err) => next(err))
               .catch((err) => next(err));
     })
     .put((req, res, next) => {
          res.statusCode = 403;
          res.end("PUT operation not supported for the /dishes/" + req.params.dishId + "/comments path !");
     })
     .delete((req, res, next) => {
          Dishes.findById(req.params.dishId)
               .then((dish) => {
                    if (dish) {
                         dish.comments = [];
                         dish.save()
                              .then((dish) => {
                                   res.statusCode = 200;
                                   res.setHeader("Content-Type", "application/json");
                                   res.json(dish.comments);
                              });
                    } else {
                         err = new Error('Dish ' + req.params.dishId + ' not found !');
                         err.statusCode = 404;
                         return next(err);
                    }
               }, (err) => next(err))
               .catch((err) => next(err));
     });


// ============ DISHES - COMMENTS WITH ID
dishRouter.route("/:dishId/comments/:commentId")
     .get((req, res, next) => {
          Dishes.findById(req.params.dishId)
               .then((dish) => {
                    if (dish != null && dish.comments.id(req.params.commentId) != null) {
                         res.statusCode = 200;
                         res.setHeader("Content-Type", "application/json");
                         res.json(dish.comments.id(req.params.commentId));
                    } else {
                         err = new Error('Comment ' + req.params.dishId + ' not found !');
                         err.statusCode = 404;
                         return next(err);
                    }
               }, (err) => next(err))
               .catch((err) => next(err));
     })
     .post((req, res, next) => {
          res.statusCode = 403;
          res.end("PUT not suppoted for the comments id path !")
     })
     .put((req, res, next) => {
          Dishes.findById(req.params.dishId)
               .then((dish) => {
                    if (dish != null && dish.comments.id(req.params.commentId) != null) {
                         if (req.body.rating) {
                              dish.comments.id(req.params.commentId).rating = req.body.rating;
                         }
                         if (req.body.comment) {
                              dish.comments.id(req.params.commentId).comment = req.body.comment;
                         }
                         dish.save()
                              .then((dish) => {
                                   res.statusCode = 200;
                                   res.setHeader("Content-Type", "application/json");
                                   res.json(dish.comments);
                              }, (err) => next(err));
                    } else if (dish == null) {
                         err = new Error('Dish ' + req.params.dishId + ' not found !');
                         err.statusCode = 404;
                         return next(err);
                    } else {
                         err = new Error('Comment ' + req.params.commentId + ' not found !');
                         err.statusCode = 404;
                         return next(err);
                    }
               }, (err) => next(err))
               .catch((err) => next(err));
     })
     .delete((req, res, next) => {
          Dishes.findById(req.params.dishId)
               .then((dish) => {
                    if (dish != null && dish.comments.id(req.params.commentId) != null) {
                         dish.comments.pull(req.params.commentId);
                         dish.save()
                              .then((dish) => {
                                   res.statusCode = 200;
                                   res.setHeader("Content-Type", "application/json");
                                   res.json(dish);
                              }, (err) => next(err));
                    } else if (dish == null) {
                         err = new Error('Dish ' + req.params.dishId + ' not found !');
                         err.statusCode = 404;
                         return next(err);
                    } else {
                         err = new Error('Comment ' + req.params.commentId + ' not found !');
                         err.statusCode = 404;
                         return next(err);
                    }
               }, (err) => next(err))
               .catch((err) => next(err));
     });


     export default dis