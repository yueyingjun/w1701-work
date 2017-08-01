var express = require('express');
var mysql = require('../common/mysql');
var md5 = require('../common/md5');
var router = express.Router();
router.get("/add",function(req,res){
    res.render("admin/user")
})
router.get("/del/:id",function(req,res){
    var id=req.params.id;
    mysql.query("delete from admin where id="+id,function(err,result){
        if(err){
            console.log("delete err");
        }else{
            if(result.affectedRows>0){
                res.redirect("/user/show")
            }
        }
    })

})
router.get("/show",function(req,res){
    mysql.query("select * from admin",function(err,result){
            if(err){
                console.log("select err");
            }else{
               res.render("admin/userShow",{info:result})
            }
    })

})
router.get("/addUser",function(req,res){
    var user=req.query.user;
    var pass=md5(req.query.pass);
    mysql.query(`insert into admin (user,pass) values ('${user}','${pass}')`,function(err,result){
      if(err){
          console.log("insert error")
      }else{
          if(result.affectedRows>0){
              res.redirect("/user/add");
          }
      }
    })
})

"wrokApp    行业的新闻  爬虫   员工信列表 员工的详情页  to do list   angular "

module.exports=router;