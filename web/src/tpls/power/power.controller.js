/**
 * Created by Administrator on 2017/4/4 0004.
 */
(function () {
    'use strict';
    angular.module('mainApp')
        .controller('PowerCtrl', ['$scope', 'powerAjaxService',
            function ($scope, powerAjaxService) {
                powerAjaxService.getAll().then(function (result) {
                     console.log(result.data.powerList[0]);
                    if(result.data.powerList[0].checked=="0"){
                        console.log("111");
                    }
                    // console.log(result.data.total);
                    //$scope.paginationConf.totalItems = result.data.total;
                    //$scope.userList = result.data.userList;
                    $scope.powerList=result.data.powerList;
                }).catch(function (data) {
                    console.log('error');
                });
            }]);
})();