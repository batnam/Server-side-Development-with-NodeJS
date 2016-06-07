var express = require('express');
var bodyParser = require('body-parser');
var Verify = require('./verify');

var Favorites = require('../models/favorites');

var favoritesRouter = express.Router();
favoritesRouter.use(bodyParser.json());

favoritesRouter.route('/')
.all(Verify.verifyOrdinaryUser)

.get(function (req, res, next) {
    var userId = req.decoded._doc._id;
    Favorites.find({postedBy: userId})
    .populate('postedBy')
    .populate('dishes')
    .exec(function (err, dish) {
        if (err) next(err);
        res.json(dish);
    });
})

.post(function (req, res, next) {
    var userId = req.decoded._doc._id;
    var dishId = req.body._id;
    console.log("* DishID: " + dishId);
    console.log("* UserId: " + userId);
    Favorites.update(
    { postedBy: userId },
    { $push: { dishes: dishId } },
    { upsert: true },
    function (err, data) {
        if (err) next(err);
        res.json(data);
    });
})

/*
 .post(Verify.verifyOrdinaryUser, function (req, res, next) {
        Favorites.findOne({"postedBy": req.decoded._doc._id}, function (err, favs) {
            if (!favs) {
                Favorites.create(req.body, function (err, favs) {
                    if (err) throw err;
                    favs.postedBy = req.decoded._doc._id;
                    console.log('your favorite has been created!');
                    favs.dishes.push(req.body._id);
                    favs.save(function (err, favs) {
                        if (err) throw err;
                        console.log('Dish added');
                        res.json(favs);
                    });
                });

            } else {
                var test = favs.dishes.indexOf(req.body._id);
                if (test > -1) {
                    var err = new Error('This recipe is already in your favorite list');
                    err.status = 401;
                    return next(err);
                } else {
                    favs.dishes.push(req.body._id);
                    favs.save(function (err, favs) {
                        if (err) throw err;
                        console.log('Dish added');
                        res.json(favs);
                    });
                }
            }
        });
    })
 */

.delete(function (req, res, next) {
    var userId = req.decoded._doc._id;

    Favorites.remove({ postedBy: userId }, function (err, resp) {
        if (err) next(err);
        console.log("Delete all favorites with userID: " + userId);
        res.json(resp);
    });
});

favoritesRouter.route('/:dishId')
.delete(Verify.verifyOrdinaryUser, function (req, res, next) {
    var dishId = req.params.dishId;

    Favorites.findByIdAndRemove(dishId, function (err, resp) {
        if (err) return next(err);
         console.log("Delete all favorites with dishId: " + dishId);
        res.json(resp);
    });
});

module.exports = favoritesRouter;
