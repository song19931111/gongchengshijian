(function () {
        'use strict';
        angular.module('starter.controllers')
            .controller('BaiduCtrl',['$scope','LocalStorageServices','$cordovaCamera',function ($scope,LocalStorageServices,$cordovaCamera) {
              var map = new BMap.Map("allMap");
              map.centerAndZoom(new BMap.Point(116.331398,39.897445),11);

            }])

})()
