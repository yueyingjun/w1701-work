var request=require("request");
var cheerio=require("cheerio");
var async=require("async");
var mysql=require("./routes/common/mysql");
var CronJob=require("cron").CronJob;

var links=[];
var arr=[];
async.series([

    //1. 要获取列表的链接
     function (next){
         request("http://tech.ifeng.com/listpage/803/1/list.shtml",function(err,head,body){
            var $=cheerio.load(body);
            $(".zheng_list  .t_css").each(function(index,obj){
                var newobj={};
                newobj.url=$(obj).attr("href");
                newobj.title=$(obj).html();
                links.push(newobj);
            })

             next();
         })
     },
     //2.  根据链接依次串行的去获取所对应的内容

    // id title con cid
     function (next) {
         var i=0;
         async.eachSeries(links,function(item,next1){
             request(item.url,function(err,head,body){
                    var $=cheerio.load(body);
                    var arr1=[];
                    arr1.push(item.title);
                    arr1.push($("#main_content").html());
                    arr1.push(2);
                    arr.push(arr1);
                    next1();
                    i++;
                    if(i==links.length){
                        next();
                    }

             })
         })


     },

    function(){

         console.log(arr);
         mysql.query("insert into news (title,con,cid) values ? ",[arr],function (err) {
             if(err){
                 console.log("err");
             }else{
                 console.log("ok");
             }
         })
    }

])




