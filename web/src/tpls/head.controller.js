/**
 * Created by xiangsong on 2017/4/7.
 */
(function () {
    'use strict';
    angular.module('mainApp')
        .controller('headCtrl',['$scope','LocalStorageServices','$state',function ($scope,LocalStorageServices,$state) {

            $scope.user = LocalStorageServices.get("user",null);
            if($scope.user == null){
                $state.go('login');
                return ;
            }
            //登出:
            $scope.userlogout  =function () {
                //向服务器发出Token


                //清空stroage


                //登出
                $state.go('login');
            }

            //登陆:
        }])

})()