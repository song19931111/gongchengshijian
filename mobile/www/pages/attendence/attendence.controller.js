(function () {
        'use strict';
        angular.module('starter.controllers')
            .controller('AttendCtrl',['$scope','$ionicPopup','$ionicLoading','$state','$ionicHistory',function ($scope,$ionicPopup,$ionicLoading,$state,$ionicHistory) {
              //下载有几牌，几列:
              $scope.imgArrSeatSrc = ['pages/attendence/img/offseat.png','pages/attendence/img/seat.png'];
              $scope.rowCount =  6;
              $scope.colCount = 10;
              $scope.arrSeat = [];
              $scope.arrSeat =[$scope.rowCount,$scope.colCount];
              for(var i =0;i<$scope.rowCount;i++){
                $scope.arrSeat[i] = [];
                for(var j = 0;j<$scope.colCount;j++){
                  $scope.arrSeat[i][j] = 0;
                }
              }
              $scope.attendInfo = {
                place:"",
                longitude:"",
                latitude:"",

              };
              $scope.map = new BMap.Map("allmap");
                //确认对话框:
              $scope.showSelected = function() {
                var confirmPopup = $ionicPopup.confirm({
                  title: '提示',
                  template: '该座位已经被别人选了，如果选择座位情况有错，请联系教师？'
                });
                confirmPopup.then(function(res) {
                  if(res) {

                  } else {
                  }
                });
              };

              //不允许签到的提示:
              $scope.showNotAllowAttend = function() {
                var confirmPopup = $ionicPopup.confirm({
                  title: '提示',
                  template: '您的位置距离签到位置' + $scope.distance + '米,请确定您的位置再签到'
                });
                confirmPopup.then(function (res) {
                  $ionicHistory.goBack();
                });
              }
               //允许签到的提示
              $scope.showAllowAttend = function() {
                var confirmPopup = $ionicPopup.confirm({
                  title: '提示',
                  template:'您的位置距离签到位置'+$scope.distance+'米,确认选择这个位置？'
                });
                confirmPopup.then(function(res) {
                  if(res) {
                        //
                        //向服务器发送请求，告知其选中：

                        //服务器返回成功
                          $scope.arrSeat[$scope.selectRow][$scope.selectCol] = 1;
                        //服务器返回失败，该座位已经被选中
                  } else {
                  }
                });
              };
              //选中座位:
              $scope.selectSeat = function (rol,col) {
                  //1.向服务器发送请求，更新选中的情况:
                    //test代码：
                      $scope.selectRow = rol;
                      $scope.selectCol= col;
                      var isSelect = false ;
                      if( $scope.arrSeat[rol][col] == 1){
                        isSelect  = true;
                      }

                  // 2.如果被选中:
                  if(isSelect){
                    $scope.showSelected();
                  }else{
                    //如果没有选中:
                    $scope.attend();
                  }



              }
              //签到
              $scope.attend=function(){

                $ionicLoading.show({
                  template:'<span style="text-align:right;"><ion-spinner icon="ios" class="light"></ion-spinner>正在获取位置，请稍后.......</span>'
                  //template:'数据加载中，请稍后.......'
                });
                // var point1 = new BMap.Point(116.404, 39.915);
                // var point2 = new BMap.Point(116.404, 39.916);
                // var x = BMapLib.GeoUtils.getDistance(point1, point2);
                // console.log(x);
                //定位是否符合正确的位置
                baidu_location.getCurrentPosition(function(data){
                  $scope.attendInfo.longitude = data.longitude;
                  $scope.attendInfo.latitude = data.latitude;
                  // $scope.attendInfo.place = result.address;
                      $ionicLoading.hide();
                  //计算与正确签到位置的距离
                  var point1 = new BMap.Point(data.longitude,data.latitude);
                  var point2 = new BMap.Point($scope.courseInfo.longitude,$scope.courseInfo.latitude);
                  $scope.distance = BMapLib.GeoUtils.getDistance(point1, point2);
                  if($scope.distance <=500){
                    $scope.showAllowAttend();
                  }else{
                    $scope.showNotAllowAttend();
                  }
                  });
                }, function(err){
                var confirmPopup = $ionicPopup.confirm({
                  title: '提示',
                  template:'请开启您的定位功能,或者重新进行定位',
                });
                confirmPopup.then(function(res) {
                  if(res) {
                  } else {
                  }
                });
              };
              $scope.$on('$ionicView.enter',function () {
                 //向服务器获取教师设置的签到信息
                 //1.获取离当前时间最近的课程信息:
                //请求用户课程信息,返回:
                //当前课程名称
                //教师设置的签到的位置
                //距离上课的时间
                $scope.courseInfo={
                  courseName:"",
                  latitude:"",
                  longitude:"",
                  minute:""
                };
                $scope.courseInfo. latitude= 26.042926;
                $scope.courseInfo.longitude = 119.3211243;





                // 26.042926 119.3211243
              });

            }])

})()
