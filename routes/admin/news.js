var express=require("express");
var mysql=require("../common/mysql");
var tree=require("../common/tree");
var router=express.Router();
router.get("/add",function(req,res){
    tree.getTree("category",function(data){
        res.render("admin/newAdd",{str:data});
    })
});

router.get("/addCon",function(req,res){
    var cid=req.query.cid;
    var title=req.query.title;
    var con=req.query.con;
    mysql.query("insert into news (cid,title,con) values (?,?,?)",[cid,title,con],function(err,result){
            if(err){
                console.log("err")
            }else{
                if(result.affectedRows>0){
                    res.redirect("/news/add")
                }
            }
    })
})

router.get("/addCat",function(req,res){
    tree.getTree("category",function(data){
        res.render("admin/newAddCat",{str:data});
    })

})
router.get("/addCatCon",function(req,res){
     var pid=req.query.pid;
     var name=req.query.name;
     mysql.query("insert into category (pid,name) values (?,?)",[pid,name],function(err,result){
            if(err){
                console.log("err");
            }else{
                if(result.affectedRows>0){
                    res.redirect("/news/addCat");
                }
            }
     })
})

module.exports=router;

