/**
 * Created by xiangsong on 2017/5/20.
 */
(function () {
  'use strict';
  angular.module('starter.controllers')
    .controller('RegCtrl',['$scope','$interval','$http','$state','$cordovaToast','userAjaxService','$ionicLoading','$location','LocalStorageServices',function ($scope,$interval,$http,$state,$cordovaToast,userAjaxService,$ionicLoading,$location,LocalStorageServices) {
      $scope.codetime="获取验证码";
      if ($location.path() == '/register') {
        $scope.regInfo = {
          userName: "",
          code: "",
          generateCode: "none",
          tel: "",
          password: "",
          confirmPassword: "",
          colleageName: "",
          professionName: "",
          classId: "",
          mail: "",
        };
      }
      if ($location.path() == '/register2') {
        $scope.regInfo = LocalStorageServices.get("regInfo");
      }
      $scope.colleageInfo="";
      $scope.classList = "";
      $scope.classItem={"info":""};
      $scope.selectedColleageInfo ={"info":""};

      //$scope.colleageList = ["福州大学","厦门大学","哈尔滨工业大学"];
      $scope.colleageList ="";
      userAjaxService.getColleageName().success(function(data,status,headers,config){
        scope.colleageList = data;
        $ionicLoading.hide();
      }).error(function(data,status,headers,config){
        $ionicLoading.hide();
        $cordovaToast.showShortTop("数据加载失败，请检查网络");
      });


      $scope.changeColleage =function () {
        //清空
        $scope.classList = "";
        $scope.classItem={"info":""};
        $ionicLoading.show({
          template:'<span style="text-align:right;"><ion-spinner icon="ios" class="light"></ion-spinner>数据加载中.......</span>'
          //template:'数据加载中，请稍后.......'
        });
        //console.log($scope.regInfo);
        userAjaxService.getColleageInfoByName($scope.regInfo.colleageName).success(function(data,status,headers,config){
          $scope.colleageInfo = data;
          $ionicLoading.hide();
        }).error(function(data,status,headers,config){
          $ionicLoading.hide();
          $cordovaToast.showShortTop("数据加载失败，请检查网络");
        });
      }
      $scope.changeProfession =function () {
       // console.log($scope.selectedColleageInfo);
        $scope.classList =  $scope.selectedColleageInfo.info.classList;
        $scope.regInfo.professionName = $scope.selectedColleageInfo.info.professionName;

      }
      $scope.changeClass =function () {
        if($scope.classItem.info==""){
          return ;
        }
        $scope.regInfo.classId = $scope.classItem.info.classId;
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
          LocalStorageServices.update("regInfo",$scope.regInfo);
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
      $scope.confirm =function () {
        //  console.log($scope.regInfo);
        //if($scope.regInfo.)
        for(var key in $scope.regInfo){
          if($scope.regInfo[key] ==""){
            $cordovaToast.showShortTop("您有信息还没有填写完全，不能提交");
          }else{
              userAjaxService.addStudent($scope.regInfo).success(function (data,status,headers,config) {
                if(data.error =="none"){
                  $cordovaToast.showShortTop('注册成功');
                  $state.go("login");
                }
              }).error(function (data,status,headers,config) {
                $cordovaToast.showShortTop('请检查网络问题');
              })
          }
        }
      }


    }])

})()
