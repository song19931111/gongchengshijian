(function () {
        'use strict';
        angular.module('starter.controllers')
            .controller('LoginCtrl',['$scope','$interval','$state','$cordovaToast',
              '$http','userAjaxService','LocalStorageServices',function ($scope,$interval,$state,$cordovaToast,$http,userAjaxService,LocalStorageServices) {
            $scope.userInfo = {
              tel:"",
              password:"",
              code:"",
              generateCode:"",
            };
              $scope.codetime="获取验证码";
              $scope.loginMethodText = "使用验证码登陆";
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
              function isVaildate() {
                if(!$scope.isUserCode){
                  return true;
                }
                //判断密码和验证码是否正确:
                if($scope.userInfo.code == $scope.userInfo.generateCode &&$scope.isUserCode){
                  return true ;
                }
                return false ;
              }

              $scope.login = function (error) {


                if(isEmptyObject(error) && isVaildate()){
                  // var requestInfo = {"password":$scope.userInfo.password,"userId":$scope.userInfo.userId};
                  var requestInfo ={"password":"","tel":""};
                  //采用验证码登陆
                    if($scope.userInfo.code !="" &&$scope.userInfo.code == $scope.userInfo.generateCode){
                      var postInfo = {"tel":"","status":"学生"};
                      postInfo.tel = $scope.userInfo.tel;

                      userAjaxService.getByTel(postInfo).success(function (data,status,headers,config) {
                        if(data.error == "none"){
                          LocalStorageServices.update("token",data.token);
                          $state.go('app.home');
                        }else{
                          $cordovaToast.showShortTop("没有这个用户");
                        }
                      }).error(function (data,status,headers,config) {
                        $cordovaToast.showShortTop("请检查您的网络是否连接");
                      })
                  }else{
                      requestInfo.tel = $scope.userInfo.tel;
                      requestInfo.password =$scope.userInfo.password;
                      requestInfo['status']="学生";
                      userAjaxService.getByTelAndPass(requestInfo).success(function (data,status,headers,config) {
                        if(data.error == "none"){
                          LocalStorageServices.update("token",data.token);
                          $state.go('app.home');
                        }else{
                          $cordovaToast.showShortTop("用户名或者密码错误");
                        }
                      }).error(function (data,status,headers,config) {
                        $cordovaToast.showShortTop("请检查您的网络是否连接");
                      })
                    }
                }


                // if(isEmptyObject(error) && isVaildate()){
                //   $state.go('app.home');
                // }

              }
            }])

})()
