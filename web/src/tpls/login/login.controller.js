/**
 * Created by xiangsong on 2017/4/2.
 */
(function () {
        'use strict';
        angular.module('mainApp')
            .controller('LoginCtrl',['$scope','$location','LocalStorageServices','permissionService','userAjaxService',function ($scope,$location,LocalStorageServices,permissionService,userAjaxService) {
                $scope.user ={
                    username:'',
                    password:''
                };
                $scope.userLogin =  function () {
                    //向远程验证用户TODO

                    var loginData ={};
                    //LocalStorageServices.update("user",$scope.user);
                    if($scope.user.username.indexOf("@")){
                        loginData['mail']=$scope.user.username;
                    }else{
                        loginData['tel']=$scope.user.username;
                    }
                    loginData['password']=$scope.user.password;
                                        //向远程验证用户TODO


                    //LocalStorageServices.update("user",$scope.user);
                    var power = {
                        //"roleId":1,
                        //"roleName":"管理员",
                        "addPower":[],
                        "deletePower":[],
                        "modifyPower":[],
                        "selectPower":[],
                        "menuPower":[],


                    };
                    userAjaxService.login(loginData).then(function (result) {
                            if(result.data.error =="none"){
                                LocalStorageServices.update("token",result.data.token);
                                LocalStorageServices.update("user",$scope.user);
                                power.addPower  =result.data.addPower;
                                power.deletePower  =result.data.deletePower;
                                power.modifyPower  =result.data.modifyPower;
                                power.selectPower  =result.data.selectPower;
                                power.menuPower  =result.data.menuPower;
                                permissionService.setPermission(power);
                                $location.path('index');

                            }
                    }).catch(function (result) {
                                alert("网络错误");
                    })



                    //sessionStorage.setItem('power',angular.toJson(power));
                    //设置权限:




                    //sessionStorage.setItem('power',angular.toJson(power));
                    //设置权限:
                    permissionService.setPermission(power);



                }


            }])

})()