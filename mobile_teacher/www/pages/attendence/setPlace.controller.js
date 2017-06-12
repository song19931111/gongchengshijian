(function () {
    'use strict';
    angular.module('starter.controllers')
        .controller('SetPlaceCtrl', ['$scope','$rootScope','$ionicLoading','$cordovaToast','courseAjaxService','$ionicHistory', function ($scope,$rootScope,$ionicLoading,$cordovaToast,courseAjaxService,$ionicHistory) {
          $scope.longitude = '';
          $scope.latitude = '';
          $scope.address='';
          $scope.gInfo  = {
            longitude:'',
            latitude:'',
            address:''
          };

          //从服务器端得到
          $scope.courseInfoList = [
            {
              infoId:1,
              courseName:"工程实践",
              isSetInfo:true,
              seatRowCount:2,
              seatDistribution:"0000000000",
              position:"26.042926,119.3211243",
            },
            {
              infoId:2,
              courseName:"工程实践2",
              isSetInfo:true,
              seatRowCount:3,
              seatDistribution:"000000000",
              position:"26.042926,119.3211243"
            },

          ];
          courseAjaxService.getCourseInfoTodayByTid().success(function (data, status, headers, config) {
            if(data.length>0){
              $scope.courseInfoList  =data;
            }else{
              $cordovaToast.showShortTop("该教师当天未有课程信息");
            }
          }).error(function (data, status, headers, config) {

          })
          $scope.setSeatInfo = {
            row:0,
            col:0,
          };


          $scope.selectCourseItem  = {info:""};
          $scope.setCourseInfo = {
            infoId:"",
            seatRowCount:"",
            position:"100,100", //设置的地理位置
            seatDistribution:"",
            isSetInfo:""
          };

          $scope.changeCourse = function () {
            if($scope.selectCourseItem.info.isSetInfo == true ){
            $scope.setSeatInfo.row = $scope.selectCourseItem.info.seatRowCount;
            $scope.setSeatInfo.col = $scope.selectCourseItem.info.seatDistribution.length/$scope.selectCourseItem.info.seatRowCount;
              var pos = $scope.selectCourseItem.info.position.split(",");
            $scope.gInfo.longitude =parseFloat(pos[1]);
            $scope.gInfo.latitude =parseFloat(pos[0]);
            $scope.$broadcast("updateGInfoByLocation", $scope.gInfo);
            angular.element("#address").click();
            }
          }





          // 验证提交的信息是否合法
          var isValid  =function () {
            if($scope.setSeatInfo.row <=0 || $scope.setSeatInfo.col <=0){
              $cordovaToast.showShortTop("行和列不能为0");
              return false ;
            }else if($scope.setCourseInfo.position==""){
              $cordovaToast.showShortTop("还未定位并设置具体的位置信息");
              return false ;
            }else if($scope.selectCourseItem==""){
              $cordovaToast.showShortTop("还未设置具体的课程");
            }
            return true;
          }

          $scope.confirm = function () {
            //确认参数是否合法:
            if(isValid() == false){
              return ;
            }
            $scope.setCourseInfo.infoId = $scope.selectCourseItem.info.infoId;
            //处理行列:
            for(var i = 0;i<$scope.setSeatInfo.row*$scope.setSeatInfo.col;i++){
              $scope.setCourseInfo+='0';
            }
            $scope.setCourseInfo.seatRowCount = $scope.setSeatInfo.row;

            //确认
            $ionicLoading.show({
              template:'<span style="text-align:right;"><ion-spinner icon="ios" class="light"></ion-spinner>正在获取位置，请稍后.......</span>'
              //template:'正在提交.......'
            });
            courseAjaxService.setCourseInfo($scope.setCourseInfo).success(function (data, status, headers, config) {
              if(data.error == "none"){
                $cordovaToast.showShortTop("更新成功");
                var infoId = $scope.selectCourseItem.info.infoId;
                for(var i=0;i<$scope.courseInfoList.length;i++){
                  if($scope.courseInfoList[i].infoId == infoId){
                    $scope.courseInfoList[i].position = $scope.setCourseInfo.position;
                    $scope.courseInfoList[i].seatRowCount = $scope.setCourseInfo.seatRowCount;
                    $scope.courseInfoList[i].seatDistribution = $scope.setCourseInfo.seatDistribution;
                  }
                }

              }
            }).error(function (data, status, headers, config) {

            })

          }
          $scope.confirmAndReturn = function () {
            //确认和返回
            $scope.confirm();
            $ionicHistory.goBack();


          }

          // $scope.$watch('gInfo.longitude',function (newValue,oldValue) {
          //   if (newValue != oldValue) {
          //     $scope.gInfo.longitude =newValue;
          //
          //   }
          // })
          // $scope.map = new BMap.Map("allmap");
          // $scope.map.centerAndZoom(new BMap.Point(116.331398,39.897445),11);
         //   $scope.mapWidth = angular.element('#allmap').css('width');
         //   $scope.mapHeight = angular.element('#allmap').css('height');
         //   $scope.mapWidth = $scope.mapWidth.substring(0,$scope.mapWidth.indexOf('px'));
         //   $scope.mapHeight = $scope.mapHeight.substring(0,$scope.mapHeight.indexOf('px'));
         //  //alert($scope.mapWidth/2+" "+$scope.mapHeight/2);
         //  $scope.map = new BMap.Map("allmap");
         //  //$scope.map.addControl(new BMap.ScaleControl());
         //  $scope.map.enableScrollWheelZoom(true);
         //  $scope.map.centerAndZoom(new BMap.Point(116.331398,39.897445),11);
         //  $scope.marker = new BMap.Marker(new BMap.Point(116.331398,39.897445));  // 创建标注
         // // $scope.map.addOverlay($scope.marker);               // 将标注添加到地图中
         // // $scope.marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
         //  // 添加比例尺控件
         //  // 自定义控件：
         //  // 定义一个控件类,即function
         //  function ZoomControl(){
         //    // 默认停靠位置和偏移量
         //    console.log($scope.mapWidth,$scope.mapHeight)
         //    this.defaultAnchor = BMAP_ANCHOR_TOP_LEFT;
         //    this.defaultOffset = new BMap.Size(Number($scope.mapWidth)/2-25, Number($scope.mapHeight)/2-50);
         //  }
         //
         // // 通过JavaScript的prototype属性继承于BMap.Control
         //  ZoomControl.prototype = new BMap.Control();
         //
         //  // 自定义控件必须实现自己的initialize方法,并且将控件的DOM元素返回
         //  // 在本方法中创建个div元素作为控件的容器,并将其添加到地图容器中
         //  ZoomControl.prototype.initialize = function(map){
         //    //创建一个DOM元素
         //    var img = document.createElement("img");
         //    img.src = 'pages/attendence/img/map.png';
         //    img.style.width = '50px';
         //    img.style.height = '50px';
         //    map.getContainer().appendChild(img);
         //    // // 将DOM元素返回
         //     return img;
         //  }
         //  // 创建控件
         //  var myZoomCtrl = new ZoomControl();
         //  // 添加到地图当中
         //  $scope.map.addControl(myZoomCtrl);
         //
         //
         //
         //  $scope.map.addEventListener("dragend",function(){
         //    var myGeo = new BMap.Geocoder();
         //    // 根据坐标得到地址描述
         //    $scope.gInfo.longitude = $scope.map.getCenter().lng;
         //    $scope.gInfo.latitude =  $scope.map.getCenter().lat;
         //    myGeo.getLocation(new BMap.Point($scope.gInfo.longitude,$scope.gInfo.latitude), function(result){
         //      if (result){
         //        $scope.gInfo.address = result.address;
         //        angular.element("#address").click();
         //        angular.element("#position").click();
         //      }
         //    });
         //
         //    $scope.marker.setPosition($scope.map.getCenter());
         //  });
          $scope.test =function () {
            console.log( $scope.gInfo);
          }
          $scope.tirarFoto = function(){
            baidu_location.getCurrentPosition(function(data) {
              $scope.gInfo.longitude = data.longitude;
              $scope.gInfo.latitude = data.latitude;
              $scope.setCourseInfo.position = $scope.gInfo.latitude.toString()+","+$scope.gInfo.longitude.toString();
              $scope.$broadcast("updateGInfoByLocation", $scope.gInfo);
              angular.element("#address").click();


            });
          };
          $scope.confirmByMapSelected = function () {
            //根据图中的所选，确定位置

          }
          $scope.$on('updateGInfo', function(event, data){
            $scope.gInfo =data;
            $scope.setCourseInfo.position = $scope.gInfo.latitude.toString()+","+$scope.gInfo.longitude.toString();
            angular.element("#address").click();
            console.log($scope.setCourseInfo);
          });
        }])

})()
