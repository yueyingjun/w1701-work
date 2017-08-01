var express=require("express");
var mysql=require("../common/mysql");
var tree=require("../common/tree");
var router=express.Router();

router.get("/add",function(req,res) {

    tree.getTree("bumen",function(str){

        res.render("admin/bumen.ejs",{data:str})
    })


    /*递归*/

})


router.get("/addCon",function(req,res){

    var pid=req.query.pid;
    var name=req.query.name;

    mysql.query("insert into bumen (pid,name) values (?,?)",[pid,name],function(err,result){
            if(err){
                console.log("insert err");
            }else{
                if(result.affectedRows>0){
                    res.redirect("/bumen/add");
                }
            }
    })

})

module.exports=router;