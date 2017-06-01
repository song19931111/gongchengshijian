(function () {
        'use strict';
        angular.module('starter.controllers')
            .controller('BaiduCtrl',['$scope','LocalStorageServices','$cordovaCamera',function ($scope,LocalStorageServices,$cordovaCamera) {

              $scope.tirarFoto = function(){
                /*alert("开始定位");*/
                var map = new BMap.Map("allmap");
                map.centerAndZoom(new BMap.Point(116.331398,39.897445),11);
                map.enableScrollWheelZoom(true);

                baidu_location.getCurrentPosition(function(data){
                  /*alert(data);*/

                  $scope.data=data;
                  $rootScope.team=data;
                }, function(err){
                  alert("错误："+err)
                });

              };

            }])

})()
