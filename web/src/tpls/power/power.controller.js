/**
 * Created by Administrator on 2017/4/4 0004.
 */
(function () {
    'use strict';
    angular.module('mainApp')
        .controller('PowerCtrl', ['$scope', 'powerAjaxService','$state','$stateParams',
            function ($scope, powerAjaxService,$state,$stateParams) {
                $scope.id  =$stateParams.id;
                $scope.isUser =$stateParams.isUser;
                //console.log($scope.paramData);
               // console.log($scope.isUser);

                if($scope.id == null && $scope.isUser == null){
                    alert("请从用户或者角色中选择权限进入");
                    $state.go('base.index');
                    return ;
                }

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
                $scope.savePower = function () {
                    if($scope.isUser == true){
                        //设置用户的权限

                        //提交后台
                        $state.go("base.index.user");
                    }else{
                        //设置角色的权限

                        //提交后台
                        $state.go("base.index.role");
                    }
                }
            }]);
})();