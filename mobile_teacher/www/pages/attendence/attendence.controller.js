(function () {
        'use strict';
        angular.module('starter.controllers')
            .controller('AttendCtrl',['$scope','$ionicPopup','$ionicLoading','$state','$ionicHistory','attendAjaxService','courseAjaxService','$interval','$rootScope','$cordovaToast',function ($scope,$ionicPopup,$ionicLoading,$state,$ionicHistory,attendAjaxService,courseAjaxService,$interval,$rootScope,$cordovaToast) {
              //下载有几牌，几列:
              $scope.imgArrSeatSrc = ['pages/attendence/img/offseat.png','pages/attendence/img/seat.png'];

              $scope.attendDetail = {
                infoId:1,
                startTime:"2016-6-10 16:40",
                endTime:"2016-6-10 18:40",
                seatDistribution:"0101011000",
                seatRowCount:2,
                position:"26.042926,119.3211243",
                time:100,
                courseName:"工程实践"
              };
              var startInterval = function () {
                var interval_http = $interval(function () {
                  attendAjaxService.getDistributionAndTime($scope.attendDetail.infoId).success(function (data,status,headers,config) {
                    $scope.attendDetail.seatDistribution = data.seatDistribution;
                    $scope.attendDetail.time = data.time;
                  }).error(function (data,status,headers,config) {

                  })
                  console.log(1000);
                },30000);
                var interval_time = $interval(function () {
                  if($scope.attendDetail.time == 0){
                    $interval.cancel(interval_time);
                  }
                  $scope.attendDetail.time--;
                },1000);
              }


              startInterval();

              courseAjaxService.getCourseInfoLate().success(function (data,status,headers,config) {
                if(isEmptyObject(data)){
                  $cordovaToast.showShortTop("当前没有教师已设置的课程信息");
                }else{
                  $scope.attendDetail = data;
                  //开始计时发送
                  startInterval();
                }
              }).error(function (data,status,headers,config) {
                $cordovaToast.showShortTop("网络错误");
              })


              $scope.rowCount =  $scope.attendDetail.seatRowCount;
              $scope.colCount =  $scope.attendDetail.seatDistribution.length/$scope.attendDetail.seatRowCount;



              $scope.arrSeat = []; //用于维护座位的显示
              //$scope.arrSeat =[$scope.rowCount,$scope.colCount];
              for(var i =0;i<$scope.rowCount;i++){
                $scope.arrSeat[i] = [];
                for(var j = 0;j<$scope.colCount;j++){
                  if($scope.attendDetail.seatDistribution[i*$scope.colCount+j]=="0") {
                    $scope.arrSeat[i][j] = 0;
                  }else{
                    $scope.arrSeat[i][j] = 1;
                  }

                }
              }
              $scope.attendInfo = {
                place:"",
                longitude:"",
                latitude:"",
                selectedRow:"",
                selectedCol:"",
                positionIndex:"",

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
                        var info ={infoId:"",positionIndex:$scope.attendInfo.positionIndex};
                        //向服务器发送请求，告知其选中：
                        attendAjaxService.studentAttend(info).success(function (data,status,headers,config) {
                            if(data.error == "none"){
                              $cordovaToast.showShortTop("签到成功");
                            }else{
                              $cordovaToast.showShortTop(data.error);
                            }

                        }).error(function (data,status,headers,config) {

                        })

                          // $scope.arrSeat[$scope.selectRow][$scope.selectCol] = 1;
                        //服务器返回失败，该座位已经被选中
                  } else {
                  }
                });
              };
              //选中座位:
              $scope.selectSeat = function (row,col) {
                  //1.向服务器发送请求，更新选中的情况:
                $scope.attendInfo.selectedRow =row;
                $scope.attendInfo.selectedCol = col;
                $scope.attendInfo.positionIndex = row*$scope.colCount*$scope.attendInfo.selectedRow+$scope.attendInfo.selectedCol;
                console.log($scope.attendInfo.positionIndex);
                      var isSelect = false ;
                      if($scope.attendDetail.seatDistribution[$scope.attendInfo.positionIndex] == "1"){
                        isSelect = true ;
                      }
                      // if( $scope.arrSeat[rol][col] == 1){
                      //   isSelect  = true;
                      // }
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
                var position = $scope.attendDetail.position.split(",");
                $scope.courseInfo. latitude= parseFloat(position[0]);
                $scope.courseInfo.longitude = parseFloat(position[1]);





                // 26.042926 119.3211243
              });


              $rootScope.$on('$stateChangeStart',
                function(event, toState, toParams, fromState, fromParams){
                  console.log(fromState);
                  // transitionTo() promise will be rejected with
                  // a 'transition prevented' error
                  if(fromState.name =="app.attendence"){

                  }
                })


            }])

})()
