var express = require('express');
var router = express.Router();

/* GET home page.   跨域  1. jsonp*/
router.get('/', function(req, res, next) {

  res.render('index/index', { title: 'Express' });

});

module.exports = router;
