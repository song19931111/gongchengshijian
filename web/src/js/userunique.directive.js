/**
 * Created by xiangsong on 2017/4/7.
 */
angular.module('mainApp')
    .directive('validUnique',['$http',function ($http) {
        return {
            restrict:'AE'
            ,require:'ngModel'
            ,scope:{
                url:'@',
                mailUnique:'@',
                value:'@',
                namelist:'@'
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
                        angular.forEach(ret.data[scope.namelist],function (item) {
                            console.log(ret.data);
                            if(flag==false)
                                return;
                            console.log(scope.value);
                            console.log( viewValue+"   "+item[scope.value]);

                            if(item[scope.value]==viewValue){
                                console.log( "重复"+item[value]);
                                flag=false;
                            }
                        });
                        ctrl.$setValidity('validUnique',flag);
                    }).catch(function (data) {
                        ctrl.$setValidity('validUnique',false);
                    });
                    return viewValue;
                });

            }
        }
    }]);