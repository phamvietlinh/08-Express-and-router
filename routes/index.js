// var express = require('express');
// var router = express.Router();
// let Food = require('../models/FoodModel')
global.router = require('express').Router();
var router = global.router;

router = require('./food');
router = require('./category');


/* GET home page. */
router.get('/', function(req, res, next) {
  	res.render('index', { title: 'Express' });
});



module.exports = router;
