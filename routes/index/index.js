var express = require('express');
var mysql = require('../common/mysql');
var path = require('path');
var router = express.Router();

/* GET home page.   跨域  1. jsonp*/
router.get('/', function(req, res, next) {
         console.log(111)
      res.render('index/index');

});


module.exports = router;
