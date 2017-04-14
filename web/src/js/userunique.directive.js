/**
 * Created by xiangsong on 2017/4/7.
 */
angular.module('mainApp')
    .directive('userUnique',['$http',function ($http) {
        return {
            restrict:'AE'
            ,require:'ngModel'
            ,scope:{
                url:'@',
                mailUnique:'@'
            }
            ,link:function (scope,element,attrs,ctrl) {
                /*ctrl.$parsers.push(function (viewValue) {

                 });*/
                //console.log(ctrl);
                ctrl.$parsers.unshift(function (viewValue) {
                    var flag=true;
                    $http({
                        method:'GET'
                        ,url:scope.url//scope.url
                        ,params:{username:viewValue}
                    }).then(function (ret) {
                        //console.log(data);
                        angular.forEach(ret.data,function (item) {

                            if(flag==false)
                                return;
                            console.log( viewValue+"   "+item.username);
                            if(item.username==viewValue){
                                console.log( "重复"+item.username);
                                flag=false;
                            }
                        });
                        ctrl.$setValidity('userUnique',flag);
                    }).catch(function (data) {
                        ctrl.$setValidity('userUnique',false);
                    });
                    return viewValue;
                });

            }
        }
    }]);