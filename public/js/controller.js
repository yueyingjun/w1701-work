angular.module("controller",["service"])
.controller("entry",["$scope",function($scope){
    if(localStorage.welcome){
        location.href="#!/index"
    }else{
        location.href="#!/welcome"
    }

}]).controller("welcome",["$scope",function($scope){
    var swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        paginationClickable: true
    });

    $scope.save=function(){
        localStorage.welcome="yes";
    }
}]).controller("index",["$scope","$http",function($scope,$http){
   $http({url:"/ajax/select",method:"get",dataType:"text"}).then(function(e){
       $scope.data=e.data;
   })
}]).controller("show",["$scope","$http","$routeParams","fns",function($scope,$http,$routeParams,fns){
    var id=$routeParams.id;

    $http({url:"/ajax/select/"+id}).then(function(e){
        $scope.content=e.data[0];
    })
    $scope.back=fns.back;
}]).controller("member",["$scope","fns","$http","Data",function($scope,fns,$http,Data){
        $scope.toggle=function(obj){
           obj.flag=!(obj.flag);
        }

        Data.then(function(e){
            var data=e.data;
            var arr=[];

            //1.  把部门获取到
            var bumen=[];
            for(var i=0;i<data.length;i++){
                if(diff(bumen,data[i].bname)){
                    bumen.push(data[i].bname);
                }
            }


            for(var i=0;i<bumen.length;i++){
                var obj={};
                obj.parent=bumen[i];
                obj.son=[];
                for(var j=0;j<data.length;j++){
                    if(bumen[i]==data[j]["bname"]){
                        obj.son.push(data[j]);

                    }
                }

                arr.push(obj);


            }
                console.log(arr);

            $scope.data=arr;


            function diff(arr,newv){
                for(var i=0;i<arr.length;i++){
                    if(arr[i]==newv){
                        return false;
                    }
                }

                return true;
            }

        })
    $scope.back=fns.back;


}]).controller("memberInfo",["$scope","fns","Data","$routeParams",function($scope,fns,Data,$routeParams){
    var mid=$routeParams.mid;
    $scope.back=fns.back;
    Data.then(function(e){
       var data=e.data;
       $scope.data=data.filter(function(val){
            return val.id==mid
       })[0]

    })
}]).controller("todo",["$scope","fns","Todo",function($scope,fns,Todo){
    $scope.back=fns.back;
    $scope.data=Todo;
    mui(".mui-content").on('drag',".mui-navigate-right",function(e){
        console.log(e);
    })

}]).controller("todoAdd",["$scope","fns","Todo",function($scope,fns,Todo){
    $scope.back=fns.back;
    $scope.con="";
    $scope.submit=function(){
        var obj={};
        obj.id=maxId(Todo);
        obj.con=$scope.con;
        Todo.push(obj);
        localStorage.todo=JSON.stringify(Todo);
        $scope.con="";
    }

    function maxId(Todo){
        if(Todo.length>0) {
            var temp=Todo[0].id;
            for (var i = 0; i < Todo.length; i++) {
                if (temp < Todo[i].id) {
                    temp = Todo[i].id;
                }
            }
        }else{
            temp=1;
        }
        return temp+1;
    }


}]).controller("todoEdit",function($scope,$routeParams,Todo,fns){
    var id=$routeParams.cid;
    $scope.back=fns.back;
    $scope.con=Todo.filter(function(val){
        return val.id==id;
    })[0].con;
    $scope.edit=function(){
        for(var i=0;i<Todo.length;i++){
            if(Todo[i].id==id){
                Todo[i].con=$scope.con;
            }
        }

        localStorage.todo=JSON.stringify(Todo);
        $scope.con="";
    }
})


