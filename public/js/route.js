angular.module("route",["ngRoute"])
.config(["$routeProvider",function($routeProvider){
     $routeProvider.when("/",{
         templateUrl:"/tpl/entry.html",
         controller:"entry"
     }).when("/index",{
         templateUrl:"/tpl/index.html",
         controller:"index",
     }).when("/welcome",{
         templateUrl:"/tpl/welcome.html",
         controller:"welcome"
     }).when("/show/:id",{
         templateUrl:"/tpl/show.html",
         controller:"show"
     }).when("/member",{
         templateUrl:"/tpl/member.html",
         controller:"member"
     }).when("/member/:mid",{
         templateUrl:"/tpl/memberInfo.html",
         controller:"memberInfo"
     }).when("/todo",{
         templateUrl:"/tpl/todo.html",
         controller:"todo"
     }).when("/todo/add",{
         templateUrl:"/tpl/todoAdd.html",
         controller:"todoAdd"
     }).when("/todo/edit/:cid",{
         templateUrl:"/tpl/todoEdit.html",
         controller:"todoEdit"
     }).when("/log",{
         templateUrl:"/tpl/log.html",
         controller:"log"
     }).when("/log/write",{
         templateUrl:"/tpl/logWrite.html",
         controller:"logWrite"
     }).when("/log/select",{
         templateUrl:"/tpl/select.html",
         controller:"select"
     }).when("/login",{
         templateUrl:"/tpl/login.html",
         controller:"login"
     }).when("/log/cat",{
         templateUrl:"/tpl/logCat.html",
         controller:"logCat",
     }).when("/log/sendList",{
         templateUrl:"/tpl/sendList.html",
         controller:"sendList",
     }).when("/setting",{
         templateUrl:"/tpl/setting.html",
         controller:"setting",
     }).when("/reset",{
         templateUrl:"/tpl/reset.html",
         controller:"reset",
     })
}])