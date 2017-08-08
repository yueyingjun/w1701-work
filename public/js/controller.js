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
}]).controller("index",["$scope","$http","Me",function($scope,$http,Me){
   $http({url:"/ajax/check",dataType:"text"}).then(function(e){
        if(e.data=="ok"){
            $http({url:"/ajax/select",method:"get",dataType:"text"}).then(function(e){
                $scope.data=e.data;
                $scope.name=Me.name;
            })
        }else{
            location.href="#!/login";

        }
   })



    $scope.jump=function(e){
       var url=(e.target.parentNode.getAttribute("href"));
       location.href=url;
    }
}]).controller("login",function ($scope,$http,Me) {

    $scope.login=function() {
        var name=$scope.name;
        var pass=$scope.pass;
        $http({url: "/ajax/login", method: "get", params: {name, pass}}).then(function (e) {
            var data=e.data;
            console.log(data);
            if(data.message=="ok"){
                Me.id=data.id;
                Me.name=data.name;

                localStorage.Me=JSON.stringify(Me);
                location.href="#!/index"
            }else{
               $scope.name="";
               $scope.pass="";
            }

        })
    }

}).controller("show",["$scope","$http","$routeParams","fns",function($scope,$http,$routeParams,fns){
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

    var init=0;
    mui(".mui-content").on("dragstart",".mui-navigate-right",function(e){
            init=this.style.left?parseInt(this.style.left):0;
    })

    mui(".mui-content").on("drag",".mui-navigate-right",function(e){

        var dir=e.detail.direction;
        var x=e.detail.deltaX;

        var left=init+x;

        if(dir=="left"){
            if(left<-100){
                left=-100;
            }
        }
        if(dir=="right"){
            if(left>0){
                left=0;
            }
        }

        this.style.left=left+"px";

    })

    $scope.del=function(id){

        Todo=Todo.filter(function(val){
          return val.id!=id
        })

        $scope.data=Todo;

        localStorage.todo=JSON.stringify(Todo);
    }


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
}).controller("log",function($scope,fns){
    $scope.back=fns.back;
 document.querySelector("html").style.fontSize=document.documentElement.clientWidth/750*100+"px";
}).controller("logWrite",function($scope,fns,$http,Me,Data){

  $scope.isshow=true;

  $scope.show=function(){
      $scope.isshow=false;
  }
    $scope.hide=function(){
        $scope.isshow=true;
    }


   $scope.back=fns.back;
   $scope.submit=function(){
       var done=$scope.done;
       var undo=$scope.undo;
       var doing=$scope.doing;
       var acctid=$scope.acctid;
       var sendid=Me.id;

       $http({url:"/ajax/addLog",params:{
           done,undo,doing,acctid,sendid
       },dataType:"text"}).then(function(e){
            if(e.data=="ok"){
                $scope.done="";
                $scope.undo="";
                $scope.doing="";
                $scope.acctid="";
                $scope.acctname="";
            }else{
                $scope.err=true;
            }
       })

   }

   $scope.err=false;




    $scope.add=function(e,id,name){
        if(e.target.flag){
            e.target.style.color = "";
            $scope.acctid = null;
            $scope.acctname = null;
            e.target.flag=false;
        }else {
            e.target.style.color = "red";
            $scope.acctid = id;
            $scope.acctname = name;
            e.target.flag=true;
        }
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





}).controller("select",function ($scope,Data,LogInfo,fns) {
    $scope.back=fns.back;


}).controller("logCat",function($scope,fns){
    $scope.back=fns.back;
}).controller("sendList",function($scope,fns,$http,Me){
    $scope.back=fns.back;
    console.log(Me.id);
    $http({url:"/ajax/sendList",params:{sendid:Me.id}}).then(function(e){
        $scope.data=e.data;

    })

}).controller("setting",function($scope,$http,fns){
    $scope.back=fns.back;
        $scope.logout=function(){
            $http({url:"/ajax/logout","dataType":"text"}).then(function(e){
                    if(e.data=="ok"){
                           location.href=
       "#!/login" ;            }
            })
        }
}).controller("reset",function ($scope,$http,Me,fns) {

    $scope.back=fns.back;
    $scope.submit=function(){
    var pass=$scope.pass;
    var pass1=$scope.pass1;
    var pass2=$scope.pass2;
    var id=Me.id;
    var obj={pass,pass1,pass2,id}
    $http({url:"/ajax/reset",params:obj,dataType:"text"}).then(function (e) {
            if(e.data=="ok"){
                location.href="#!/login";
            }
    })

    }

})



