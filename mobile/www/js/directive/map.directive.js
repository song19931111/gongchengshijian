/**
 * Created by xiangsong on 2017/6/1.
 */
angular.module('starter.controllers')
.directive("appMap", function ($rootScope) {
  return {
    restrict: "E",
    replace: true,
    template: "<div id='allMap'></div>",
    scope: {
    },
    link: function (scope, element, attrs) {
        var map;
      scope.gInfo  = {
        longitude:'',
        latitude:'',
        address:''
      };
      // 百度地图API功能
        scope.map = new BMap.Map("allMap");
        scope.map.enableScrollWheelZoom(true);
        scope.map.centerAndZoom(new BMap.Point(116.331398,39.897445),11);
        scope.mapWidth = scope.map.width;
        scope.mapHeight = scope.map.height;
       function ZoomControl(){
         // 默认停靠位置和偏移量
         this.defaultAnchor = BMAP_ANCHOR_TOP_LEFT;
         this.defaultOffset = new BMap.Size(Number(scope.mapWidth)/2-25, Number(scope.mapHeight)/2-50);
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
         scope.map.getContainer().appendChild(img);
         // // 将DOM元素返回
          return img;
       }
       // 创建控件
       var myZoomCtrl = new ZoomControl();
       // 添加到地图当中
      scope.map.addControl(myZoomCtrl);

      scope.$on('updateGInfoByLocation', function(event, data){
        var point = new BMap.Point(data.longitude,data.latitude);
        scope.map.centerAndZoom(point,19);
        scope.gInfo.longitude = data.longitude;
        scope.gInfo.latitude = data.latitude;
        var myGeo = new BMap.Geocoder();
        myGeo.getLocation(point, function(result){
          if (result){
            scope.gInfo.address = result.address;
            scope.$emit('updateGInfo',scope.gInfo);
          }
        });
      });


      scope.map.addEventListener("dragend",function(){
         var myGeo = new BMap.Geocoder();
         // 根据坐标得到地址描述
        scope.gInfo.longitude = scope.map.getCenter().lng;
        scope.gInfo.latitude =  scope.map.getCenter().lat;

          myGeo.getLocation(new BMap.Point(scope.gInfo.longitude,scope.gInfo.latitude), function(result){
           if (result){
             scope.gInfo.address = result.address;
             scope.$emit('updateGInfo',scope.gInfo);
           }
         });

         //$scope.marker.setPosition($scope.map.getCenter());
       });
    }
  };
});
