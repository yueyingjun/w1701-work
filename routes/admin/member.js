
var express = require('express');
var tree = require("../common/tree");
var mysql = require("../common/mysql");
var md5 = require("../common/md5");
var xlsx = require("node-xlsx");
var multer = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {

        cb(null, Math.random() * 10000 + '-' + Date.now() + file.originalname)
    }
})
var upload = multer({storage: storage})
var router = express.Router();

/* GET home page. */
router.get('/add', function (req, res, next) {

    tree.getTree("bumen", function (str) {
        res.render("admin/memberAdd", {data: str})
    })
});

router.get("/memberAddCon", function (req, res) {
    var bumenid = req.query.bumenid;
    var zhiwu = req.query.zhiwu;
    var qq = req.query.qq;
    var email = req.query.email;
    var name = req.query.name;
    var phone = req.query.phone;
    var sex = req.query.sex;
    var pass=md5("123456");
    var state = 0;
    var numbers = req.query.numbers;
    var info = {bumenid, zhiwu, qq, email, name, phone, sex, state, numbers,pass};
    mysql.query("insert into member set ?", info, function (err, result) {
        if (err) {
            console.log("err");
            res.end();
        } else {
            if (result.affectedRows > 0) {
                res.redirect("/member/add");
            }
        }
    })


})


router.get("/excel", function (req, res) {

    res.render("admin/excel")
})


router.post("/upload", upload.single('file'), function (req, res, next) {

    //1.  部门的名字和他对应的id

    // promise  回调地狱  {xxx:1,xxx:2}


    new Promise(function (reslove, reject) {
        mysql.query("select * from bumen", function (err, result) {

            if (err) {
                reject();
            } else {
                var obj = {};
                for (var i = 0; i < result.length; i++) {
                    obj[result[i].name] = result[i].id;
                }

                reslove(obj)
            }

        })
    }).then(function (obj) {
        var filePath = req.file.path;
        var data = xlsx.parse(filePath)[0].data;
        var arr=[];
        for (var i = 1; i < data.length; i++) {
            var arr1=[];
            arr1.push(data[i][0]); //名字
            arr1.push(data[i][1]);  //编号
            arr1.push(data[i][2]); //职务
            var sex = data[i][3];   //性别
            if (sex == "男") {
                arr1.push(1);
            } else {
                arr1.push(2);
            }

            arr1.push(data[i][5]); //电话
            arr1.push(data[i][6]);  //email
            arr1.push(data[i][7]);   //qq
            if (data[i][8] == "在职") {  //状态
                arr1.push(0);
            } else if (data[i][8] == "离职") {
                arr1.push(1)
            } else if (data[i][8] == "休假") {
                arr1.push(2)
            }

            arr1.push(obj[data[i][4]])  //部门id
            arr1.push(md5("123456"))
            arr.push(arr1);

        }

        console.log(arr);

        mysql.query("replace into member (name,numbers,zhiwu,sex,phone,email,qq,state,bumenid,pass) values ? ",[arr],function(err){
            if(err){
                console.log("err");
            }else{
                res.end();
            }
        })


    })


})

module.exports = router;
