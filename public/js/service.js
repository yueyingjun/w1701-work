angular.module("service",[])
.factory("fns",function(){
    var obj={};
    obj.back=function(num=-1){

        history.go(num);
    }

    return obj;
}).factory("Data",["$http",function($http){
   return  $http({url:"/ajax/member"})

}]).factory("Todo",["$http",function($http){
     return localStorage.todo?JSON.parse(localStorage.todo):[];
}])