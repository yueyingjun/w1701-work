var mysql=require("./mysql");

class tree {
    getTree(table,callback){
        var that=this;
        mysql.query("select * from "+table,function(err,result){
            if(err){
                console.log("err");
            }else{
                if(callback){
                    callback(that.loop(result,0,0,"-"))
                }
            }
        })
    }
    loop(result,pid,step,flag){
        var str="";
        step+=1;
        for(var i=0;i<result.length;i++){
            if(result[i].pid==pid){
                var flags=flag.repeat(step);
                str+=`<option value="${result[i].id}">${flags} ${result[i].name}</option>`;
                str+=this.loop(result,result[i].id,step,flag)
            }
        }

        return str;
    }
}


module.exports=new tree();