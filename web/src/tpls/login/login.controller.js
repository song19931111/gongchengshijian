/**
 * Created by xiangsong on 2017/4/2.
 */
(function () {
        'use strict';
        angular.module('mainApp')
            .controller('LoginCtrl',['$scope','$location','LocalStorageServices','permissionService',function ($scope,$location,LocalStorageServices,permissionService) {
                $scope.user ={
                    username:'',
                    password:''
                };
                $scope.userLogin =  function () {
                    //向远程验证用户TODO


                    LocalStorageServices.update("user",$scope.user);


                    var power = {
                        "roleId":1,
                        "roleName":"管理员",
                        "addPower":[1,2,3,4,5,6,7],
                        "deletePower":[1,2,3,4,5,6,7],
                        "modifyPower":[1,2,3,4,5,6,7],
                        "selectPower":[1,2,3,4,5,6,7],
                        "menuPower":[0,1,2,3,4,5],
                        "createPeople":"song",
                        "createTime":"2017-5-10",
                        "modifyTPeople":"ccc",
                        "modifyTime":"2017-4-3"

                    };
                    //sessionStorage.setItem('power',angular.toJson(power));
                    //设置权限:
                    permissionService.setPermission(power);
                    $location.path('index');


                }


            }])

})()