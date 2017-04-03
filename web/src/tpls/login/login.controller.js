/**
 * Created by xiangsong on 2017/4/2.
 */
(function () {
        'use strict';
        angular.module('mainApp')
            .controller('LoginCtrl',['$scope',function ($scope) {
                $scope.user ={
                    username:'',
                    password:''
                };

            }])

})()