(function () {
    'use strict';
    angular.module('starter.controllers')
        .controller('ForgetPasswordCtrl', ['$scope','userAjaxService','$state','LocalStorageServices','$location', function ($scope,userAjaxService,$state,LocalStorageServices,$location) {


          if ($location.path() == '/forgetPass') {
            $scope.userInfo = {
              tel:"",
              password:"",
              confirmPassword:"",
              code:"",
              generateCode:"",
              userId:""
            };
          }
          if ($location.path() == '/updatePass') {
            $scope.userInfo = LocalStorageServices.get("userInfo");
          }
          $scope.codetime="获取验证码";
          $scope.isUserCode = false;
          $scope.isButtonDisable = false ;

          var generateCode = function () {
            var Num = "";
            for (var i = 0; i < 6; i++) {
              Num += Math.floor(Math.random() * 10);
            }
            return Num;
          }

          //判断一个object {} 是否为空
          function isEmptyObject(e) {
            var t;
            for (t in e)
              return !1;
            return !0
          }
          //发送短信
          $scope.sendCode = function (error) {
            if (!isEmptyObject(error)) {
              $cordovaToast.showShortTop('请输入正确的手机号码');
              return;
            }
            $scope.time = 60;
            var timer = null;
            $scope.isButtonDisable = true;
            timer = $interval(function () {
              $scope.time = $scope.time - 1;
              $scope.codetime = $scope.time + "秒后获取验证码";
              if ($scope.time === 0) {
                $scope.codetime = "获取验证码";
                $interval.cancel(timer);
                $scope.isButtonDisable = false;
              }
            }, 1000);
            //%7B%22code%22:%22123456%22%7D&RecNum=18965089805&SignName=%E5%AD%A6%E7%94%9F%E7%AD%BE%E5%88%B0%E7%B3%BB%E7%BB%9F&TemplateCode=SMS_67650114
            //%7B%22code%22:%22123456%22%7D&RecNum=18965089805&SignName=%E5%AD%A6%E7%94%9F%E7%AD%BE%E5%88%B0%E7%B3%BB%E7%BB%9F&TemplateCode=SMS_67650114
            $scope.userInfo.generateCode = generateCode();
            $http({
              method: 'GET',
              url: "http://sms.market.alicloudapi.com/singleSendSms",
              headers: {
                'Authorization': 'APPCODE 56e86672a4f3488cb89545412ea51ca2',
                'Content-Type': 'application/json;charset=utf-8'
              },
              params: {
                ParamString: {"code": $scope.userInfo.generateCode},
                RecNum: $scope.userInfo.tel,
                TemplateCode: "SMS_67650114",
                SignName: '学生签到系统'
              },

            }).success(function (data, status, headers, config) {
              console.log(data);
            }).error(function (data, status, headers, config) {
              console.log(data);
            });
          }
          var isValid = function () {
            if($scope.userInfo.code == $scope.userInfo.generateCode &&$scope.userInfo.password==$scope.userInfo.confirmPassword){
              return true ;
            }

            return false;
          }
          $scope.goNextStep = function (error) {
            if(isEmptyObject(error) && isValid()){
              //查询存在这个用户
              userAjaxService.getByTel($scope.userInfo.tel).success(function (data,status,headers,config) {
                if(data.total!= 0){
                  $scope.userInfo.userId = data.userId;
                  LocalStorageServices.update($scope.userInfo);
                  $state.go("updatePass");
                }else{
                  $cordovaToast.showShortTop("没有这个用户");
                }
              }).error(function (data,status,headers,config) {
                $cordovaToast.showShortTop("请检查您的网络是否连接");
              })
            }
          }


          $scope.confirmUpdatePassword =function (error) {
            if(isEmptyObject(error) && isValid()){
              var requestInfo = {"password":$scope.userInfo.password,"userId":$scope.userInfo.userId};
              userAjaxService.modify(requestInfo).success(function (data,status,headers,config) {
                $cordovaToast.showShortTop("修改密码成功");
                $state.go('login');
              }).error(function (data,status,headers,config) {
                $cordovaToast.showShortTop("请检查您的网络是否连接");
              })
            }
          }
        }])

})()
