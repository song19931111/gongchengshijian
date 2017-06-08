(function () {
        'use strict';
        angular.module('starter.controllers')
            .controller('LoginCtrl',['$scope','$interval','$state',function ($scope,$interval,$state) {
            $scope.user = {
              tel:"",
              password:"",
              code:""
            };
              $scope.codetime="获取验证码";
              $scope.loginMethodText = "使用密码登陆";
              $scope.isUserCode = false;
              $scope.isButtonDisable = false ;

              /*
              更改登陆方式
               */
              $scope.changeLoginMethod = function () {
                $scope.isUserCode = !$scope.isUserCode;
                if($scope.isUserCode){
                  $scope.loginMethodText = "使用密码登陆";
                }else{
                  $scope.loginMethodText = "使用手机验证码登陆";
                }
              }
              /*
              发送验证码
               */
              $scope.sendCode = function () {
                $scope.time = 60;
                var timer = null;
                $scope.isButtonDisable = true;
                timer = $interval(function(){
                  $scope.time = $scope.time - 1;
                  $scope.codetime = $scope.time+"秒后获取验证码";
                  if($scope.time === 0) {
                    $scope.codetime = "获取验证码";
                    $interval.cancel(timer);
                    $scope.isButtonDisable = false;
                  }
                }, 1000);
              }
              $scope.login = function () {
                $state.go('app.home');
              }


            }])

})()
