var express = require('express');
var md5=require("../common/md5");
var mysql=require("../common/mysql");
var router = express.Router();
/* GET home page. */
router.get('/index', function(req, res, next) {
  res.render('admin/login');
});
router.post('/check', function(req, res) {
    var user=req.body.user;
    var pass=req.body.pass;
    mysql.query("select * from admin",function(err,result){
      var flag=true;
        for(var i=0;i<result.length;i++){
            if(result[i].user==user){
              if(result[i].pass==md5(pass)){
                flag=false;
                    res.cookie("adminLogin","yes");
                    res.cookie("uid",result[i].id);
                    res.cookie("user",result[i].user);
                    res.redirect("/admin");
              }
            }
        }
        if(flag){
            res.redirect("/login/index");
        }
    })



});
router.get("/logout",function(req,res){
      res.clearCookie("adminLogin");
      res.clearCookie("uid");
      res.clearCookie("user");
      res.redirect("/login/index")
})


module.exports = router;
