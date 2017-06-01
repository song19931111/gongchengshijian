(function () {
    'use strict';
    angular.module('starter.controllers')
        .controller('SetPlaceCtrl', ['$scope', function ($scope) {
          $scope.gInfo  = {
            longitude:'',
            latitude:'',
            address:''
          };
           $scope.mapWidth = angular.element('#allmap').css('width');
           $scope.mapHeight = angular.element('#allmap').css('height');
           $scope.mapWidth = $scope.mapWidth.substring(0,$scope.mapWidth.indexOf('px'));
           $scope.mapHeight = $scope.mapHeight.substring(0,$scope.mapHeight.indexOf('px'));
          //alert($scope.mapWidth/2+" "+$scope.mapHeight/2);
          $scope.map = new BMap.Map("allmap");
          //$scope.map.addControl(new BMap.ScaleControl());
          $scope.map.enableScrollWheelZoom(true);
          $scope.map.centerAndZoom(new BMap.Point(116.331398,39.897445),11);
          $scope.marker = new BMap.Marker(new BMap.Point(116.331398,39.897445));  // 创建标注
         // $scope.map.addOverlay($scope.marker);               // 将标注添加到地图中
         // $scope.marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
          // 添加比例尺控件
          // 自定义控件：
          // 定义一个控件类,即function
          function ZoomControl(){
            // 默认停靠位置和偏移量
            console.log($scope.mapWidth,$scope.mapHeight)
            this.defaultAnchor = BMAP_ANCHOR_TOP_LEFT;
            this.defaultOffset = new BMap.Size(Number($scope.mapWidth)/2-25, Number($scope.mapHeight)/2-50);
          }

         // 通过JavaScript的prototype属性继承于BMap.Control
          ZoomControl.prototype = new BMap.Control();

          // 自定义控件必须实现自己的initialize方法,并且将控件的DOM元素返回
          // 在本方法中创建个div元素作为控件的容器,并将其添加到地图容器中
          ZoomControl.prototype.initialize = function(map){
            //创建一个DOM元素
            var img = document.createElement("img");
            img.src = 'pages/attendence/img/map.png';
            img.style.width = '50px';
            img.style.height = '50px';
            map.getContainer().appendChild(img);
            // // 将DOM元素返回
             return img;
          }
          // 创建控件
          var myZoomCtrl = new ZoomControl();
          // 添加到地图当中
          $scope.map.addControl(myZoomCtrl);



          $scope.map.addEventListener("dragend",function(){
            var myGeo = new BMap.Geocoder();
            // 根据坐标得到地址描述
            $scope.gInfo.longitude = $scope.map.getCenter().lng;
            $scope.gInfo.latitude =  $scope.map.getCenter().lat;
            myGeo.getLocation(new BMap.Point($scope.gInfo.longitude,$scope.gInfo.latitude), function(result){
              if (result){
                $scope.gInfo.address = result.address;
                angular.element("#address").click();
                angular.element("#position").click();
              }
            });

            $scope.marker.setPosition($scope.map.getCenter());
          });
          $scope.tirarFoto = function(){
            /*alert("开始定位");*/

            baidu_location.getCurrentPosition(function(data){
              /*alert(data);*/
              $scope.gInfo.longitude = data.longitude;
              $scope.gInfo.latitude = data.latitude;
              $scope.map.centerAndZoom(new BMap.Point(data.longitude,data.latitude),18);
              $scope.map.enableScrollWheelZoom(true);
              var myGeo = new BMap.Geocoder();
              // 根据坐标得到地址描述
              myGeo.getLocation(new BMap.Point(data.longitude,data.latitude), function(result){
                if (result){
                  $scope.gInfo.address = result.address;
                }
              });
            }, function(err){
              alert("获取地址错误："+err)
            });
          };
          $scope.confirmByMapSelected = function () {
            //根据图中的所选，确定位置

          }
        }])

})()
