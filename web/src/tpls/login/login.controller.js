/**
 * Created by xiangsong on 2017/4/2.
 */
(function () {
        'use strict';
        angular.module('mainApp')
            .controller('LoginCtrl',['$scope','$state','LocalStorageServices',function ($scope,$state,LocalStorageServices) {
                $scope.user ={
                    username:'',
                    password:''
                };
                $scope.userLogin =  function () {
                    //向远程验证用户TODO


                    LocalStorageServices.update("user",$scope.user);
                    $state.go('base.index');
                }


            }])

})()