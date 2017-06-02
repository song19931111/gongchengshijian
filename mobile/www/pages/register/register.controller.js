/**
 * Created by xiangsong on 2017/5/20.
 */
(function () {
  'use strict';
  angular.module('starter.controllers')
    .controller('RegCtrl',['$scope','$interval','$http','$state','$cordovaToast',function ($scope,$interval,$http,$state,$cordovaToast) {
      $scope.codetime="获取验证码";

      $scope.regInfo = {
        code:"",
        generateCode:"none",
        tel:"",
        password:"",
        confirmPassword:"",
      };

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

      //判断一个object {} 是否为空
      function isEmptyObject(e) {
        var t;
        for (t in e)
          return !1;
        return !0
      }
      function isLogin() {
        //判断密码和验证码是否正确:
        if($scope.regInfo.confirmPassword == $scope.regInfo.password && $scope.regInfo.code == $scope.regInfo.generateCode){
          return true ;
        }
        return false ;
      }
      //下一步:
      $scope.goNextStep = function (error) {
        //$state.go("register2");
        if(isEmptyObject(error) && isLogin()){
          $state.go("register2");
        }
      }
      //发送短信
      $scope.sendCode = function (error) {

        if( !isEmptyObject(error)){
          $cordovaToast.showShortTop('请输入正确的手机号码');
          return;
        }
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
        $scope.regInfo.generateCode  =generateCode();
        $http({
          method:'GET',
          url:"http://sms.market.alicloudapi.com/singleSendSms",
          headers: {'Authorization':'APPCODE 56e86672a4f3488cb89545412ea51ca2',
                  'Content-Type':'application/json;charset=utf-8'
          },
          params:{
              ParamString:{"code":$scope.regInfo.generateCode},
              RecNum:$scope.regInfo.tel,
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
