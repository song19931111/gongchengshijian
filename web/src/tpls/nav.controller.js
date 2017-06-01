/**
 * Created by xiangsong on 2017/4/2.
 */
(function () {
    'use strict';
    angular.module('mainApp')
        .controller('navCtrl',['$scope','menuAjaxService','userAjaxService','LocalStorageServices',function ($scope,menuAjaxService,userAjaxService,LocalStorageServices) {
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
                    menuId:0,
                    menuName:"首页",
                    children:"",
                    url:"base.index",
                    isPage:true
                },
                {
                menuId:1,
                menuName:"用户管理",
                    children:"",
                url:"base.index.user",
                    isPage:true
                },
                {
                    menuId:2,
                    menuName:"角色管理",
                    children:"",
                    url:"base.index.role",
                    isPage:true
                },
                {
                    menuId:3,
                    menuName:"权限管理",
                    children:"",
                    url:"base.index.power"
                },
                {
                    menuId:4,
                    menuName:"数据字典",
                    url:"base.index.dict",
                    children:""
                },
                {
                    menuId:5,
                    menuName:"系统设置",
                    children:[
                        {menuId:6,
                            menuName:"考勤基本信息设置",
                            children:"",
                            url:"base.index.attend_base_info",
                            isPage:true},
                        {menuId:7,
                            menuName:"考勤参数设置",
                            children:"",
                            url:"base.index.attend_parameter",
                            isPage:true},
                        {menuId:8,
                            menuName:"考勤权重设置",
                            children:"",
                            url:"base.index.attend_weight",
                            isPage:true},
                    ],
                    url:'base.index.attend_base_info'
                },
                {
                    menuId:9,
                    menuName:"考勤信息汇总",
                    children:"",
                    url:"base.index.chart"
                },
                {
                    menuId:10,
                    menuName:"班级管理",
                    children:[
                        {menuId:11,
                            menuName:"班级基本管理",
                            children:"",
                            url:"base.index.class_info",
                            isPage:true},
                        {menuId:12,
                            menuName:"班级学生导入",
                            children:"",
                            url:"base.index.import_class_info",
                            isPage:true}
                    ],
                    url:"base.index.manageclass"
                },
                {
                    menuId:13,
                    menuName:"成绩管理",
                    children:"",
                    url:"base.index.manageclass"
                },

            ]
            var menuUrlId = {};

            for(var i=0;i<$scope.menulist.length;i++){
                menuUrlId[$scope.menulist[i].url] = $scope.menulist[i].menuId;
            }
            LocalStorageServices.update("menulist",$scope.menulist);
            LocalStorageServices.update("menuUrlId",menuUrlId);
        }])

})()