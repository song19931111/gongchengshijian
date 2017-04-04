/**
 * Created by xiangsong on 2017/4/2.
 */
(function () {
    'use strict';
    angular.module('mainApp')
        .controller('navCtrl',['$scope','menuAjaxService','userAjaxService',function ($scope,menuAjaxService) {
            //sessionStorage取得用户登陆的信息：


            //查找用户的权限ID，存在sessionStorage

            //根据用户的权限ID 查找菜单的ID

            //根据菜单的ID,查找菜单的url:


            // menuAjaxService.getAll().then(function (result) {
            //
            // }).catch(function (data) {
            //
            // });
            $scope.menulist = [
                {
                menuid:1,
                menuname:"用户管理",
                fatherid:"",
                url:"base.index.user"
                },
                {
                    menuid:1,
                    menuname:"角色管理",
                    fatherid:"",
                    url:"base.index.role"
                },
                {
                    menuid:1,
                    menuname:"权限管理",
                    fatherid:"",
                    url:"base.index.power"
                },

            ]
        }])

})()