var express = require('express');
var router = express.Router();

/* GET users listing. */
router.use(function(req,res,next){
   if(req.cookies.adminLogin){
      next();
   }else{
      res.redirect("/login/index");
   }
})
router.get('/', function(req, res, next) {
   res.render("admin/index");
});

module.exports = router;
