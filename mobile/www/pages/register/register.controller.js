/**
 * Created by xiangsong on 2017/5/20.
 */
(function () {
  'use strict';
  angular.module('starter.controllers')
    .controller('RegCtrl',['$scope','$interval','$http','$state',function ($scope,$interval,$http,$state) {
      $scope.codetime="获取验证码";
      var generateCode = function () {
          var Num = "";
          for (var i = 0; i < 6; i++) {
            Num += Math.floor(Math.random() * 10);
          }
          return Num;
      }
      $scope.login = function () {
        $state.go("app.home");
      }
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
        //%7B%22code%22:%22123456%22%7D&RecNum=18965089805&SignName=%E5%AD%A6%E7%94%9F%E7%AD%BE%E5%88%B0%E7%B3%BB%E7%BB%9F&TemplateCode=SMS_67650114
        //%7B%22code%22:%22123456%22%7D&RecNum=18965089805&SignName=%E5%AD%A6%E7%94%9F%E7%AD%BE%E5%88%B0%E7%B3%BB%E7%BB%9F&TemplateCode=SMS_67650114
        var code  =generateCode();
        $http({
          method:'GET',
          url:"http://sms.market.alicloudapi.com/singleSendSms",
          headers: {'Authorization':'APPCODE 56e86672a4f3488cb89545412ea51ca2',
                  'Content-Type':'application/json;charset=utf-8'
          },
          params:{
              ParamString:{"code":code},
              RecNum:"18965089805",
              TemplateCode:"SMS_67650114",
              SignName:'学生签到系统'
             },

        }).success(function(data,status,headers,config){
              console.log(data);
        }).error(function(data,status,headers,config){
          console.log(data);
        });

        //http://sms.market.alicloudapi.com/singleSendSms?ParamString={'code':'123456'}&RecNum=18965089805&&TemplateCode=SMS_67650114'  -H 'Authorization:APPCODE 你自己的AppCode

      }



    }])

})()
