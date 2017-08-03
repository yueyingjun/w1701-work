var request=require("request");
var cheerio=require("cheerio");
var async=require("async");
var mysql=require("./routes/common/mysql");
var md5=require("./routes/common/md5");
var CronJob=require("cron").CronJob;


var buffer=Buffer.alloc(70000);//劣势

function save(str){
    var md5str=md5(str);
    for(var i=0;i<32;i+=4){
        var index=(parseInt(md5str.substr(i,4),16));

        buffer[index]=1;
    }
}

function diff(str,success,err){
    var flag=true;
    var md5str=md5(str);
    for(var i=0;i<32;i+=4){
        var index=(parseInt(md5str.substr(i,4),16));
        if(buffer[index]!=1){
            flag=false;
            break;
        }
    }
    if(flag){
       if(err){
           err();
       }
    }else{
        if(success){
            success();
        }
    }
}




var links=[];
var arr=[];
async.series([

    //1. 确定以前有什么东西
    function(next){
       mysql.query("select * from news",function(err,result){
           if(err){
               console.log("Select err");
           }else{
               for(var i=0;i<result.length;i++){
                   save(result[i].title)
               }

               next();
           }
       })
    },

    //2. 要获取列表的链接
     function (next){
         request("http://tech.ifeng.com/listpage/803/1/list.shtml",function(err,head,body){
            var $=cheerio.load(body);
            $(".zheng_list  .t_css").each(function(index,obj){
                var newobj={};
                newobj.url=$(obj).attr("href");
                newobj.title=$(obj).html();
                diff(newobj.title,function(){
                    links.push(newobj);
                })

            })

             next();
         })
     },
     //3.  根据链接依次串行的去获取所对应的内容

    // id title con cid
     function (next) {
         var i=0;
         if(links.length==0){
             next();
         }else {
             async.eachSeries(links, function (item, next1) {
                 request(item.url, function (err, head, body) {
                     var $ = cheerio.load(body);
                     var arr1 = [];
                     arr1.push(item.title);
                     arr1.push($("#main_content").html());
                     arr1.push(2);
                     arr.push(arr1);
                     next1();
                     i++;
                     if (i == links.length) {
                         next();
                     }

                 })
             })
         }


     },

    function(){
         mysql.query("insert into news (title,con,cid) values ? ",[arr],function (err) {
             if(err){
                 console.log("没有新数据");
             }else{
                 console.log(arr.length+"条更新成功");
             }
             mysql.end();
         })
    }

])




