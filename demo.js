var crypto=require("crypto");
function md5(str){
   var md5=crypto.createHash("md5");
   md5.update(str);
   return md5.digest("hex");
}
var str="ffff";

/*
*
*   电脑  都会对 应用软件做限制  系统层面
*
*   v8
*
* */







