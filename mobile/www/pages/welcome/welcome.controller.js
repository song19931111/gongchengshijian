/**
 * Created by xiangsong on 2017/4/30.
 */
(function () {
  'use strict';
  angular.module('starter.controllers')
    .controller('WelcomeCtrl',['$scope','LocalStorageServices','$ionicSlideBoxDelegate','$state', function ($scope,LocalStorageServices,$ionicSlideBoxDelegate,$state) {
      var currentPlatform = ionic.Platform.platform();
      $scope.slideIndex = 0;
      $scope.slideChanged = slideChanged;
      $scope.next = function () {
        $ionicSlideBoxDelegate.next();
      };
      $scope.previous = function () {
        $ionicSlideBoxDelegate.previous();
      };



      if (currentPlatform && currentPlatform == 'android') {
        $scope.device = 'android';
      } else {
        $scope.device = 'iphone';
      }

      $scope.slides = [{
        top: '介绍1',
        img: 'pages/welcome/img/w1_.jpg'
      }, {
        top: '介绍2',
        img: 'pages/welcome/intro/intro1.jpg',
      }, {
        top: '介绍3',
        img: 'pages/welcome/img/w1_.jpg',
      }
      ];

      function slideChanged(index) {
        $scope.slideIndex = index;
      }

      $scope.goHome = function(){
        $state.go('login');
        Storage.set('introPage','alreadyShow');
      };




    }]);
})();
