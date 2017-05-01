/**
 * Created by Administrator on 2016/10/22 0022.
 */
(function () {
  'use strict';
  var APP_KEY='App';
  angular.module('starter.controllers')
    .controller('MainCtrl',['$scope','LocalStorageServices','$state',
      function ($scope,LocalStorageServices,$state) {
        var value=LocalStorageServices.get('App',{
          version:'1.0.0',
          run:false
        });
        if(value.run){
          $state.go('app.home');
        }
        else{
          value.run=true;
          //LocalStorageServices.update(APP_KEY,value);
          $state.go('welcome');//go后跟状态名称,第二个为传值
        }
      }]);
})();
