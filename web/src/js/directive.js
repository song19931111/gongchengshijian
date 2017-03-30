angular.module('starter',[])
    .directive('buttonMessage',function () {
        return{
            restrict:'E',
            replace:true,
            template:''
            ,scope:{
                buttonText:'@'
            },
            controller:function ($scope,$element,$attrs,$compile,$timeout,$interval) {
                var el=$compile('<button ng-disabled="false" ng-click="sendMessage();">{{buttonText}}</button>')($scope);
                $element.append(el);
                $scope.sendMessage=function () {
                    $element[0].removeChild($element[0].firstChild);
                    $scope.count=60;
                    $scope.buttonText='已发送('+$scope.count+')';
                    var time=$interval(function(){
                        $scope.count--;
                        $scope.buttonText='已发送('+$scope.count+')';
                    },1000);
                    $timeout(function () {
                        $interval.cancel(time);
                        $element[0].removeChild($element[0].firstChild);
                        $scope.buttonText='点击发送';
                        var e3=$compile('<button ng-disabled="false" ng-click="sendMessage();">{{buttonText}}</button>')($scope);
                        $element.append(e3);
                    },60000);
                    var e2=$compile('<button ng-disabled="true" ng-click="sendMessage();">{{buttonText}}</button>')($scope);
                    $element.append(e2);
                };
            }
        }
    });