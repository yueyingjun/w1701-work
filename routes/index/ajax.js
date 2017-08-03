var express=require("express");
var mysql=require("../common/mysql");
var router=express.Router();
router.get("/select",function(req,res){
   mysql.query("select * from news order by id desc",function(err,result){
       if(err){
           console.log("Err");
       }else {

           res.send(JSON.stringify(result))

       }
   })


})

router.get("/select/:id",function(req,res){
    var id=req.params.id;
    mysql.query(`select * from news where id=${id}`,function(err,result){
       res.end(JSON.stringify(result));
    })


})

router.get("/member",function(req,res){

    var sql=`select bumen.name as bname,member.* from bumen,member where bumen.id=member.bumenid`;
    mysql.query(sql,function(err,result){
            if(err){
                console.log("select err");
            }else{
                res.send(JSON.stringify(result));
            }
    });
})
module.exports=router;