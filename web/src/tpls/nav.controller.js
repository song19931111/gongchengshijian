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
                    children:null,
                url:"base.index.user",
                    isPage:true
                },
                {
                    menuid:2,
                    menuname:"角色管理",
                    children:null,
                    url:"base.index.role",
                    isPage:true
                },
                {
                    menuid:3,
                    menuname:"权限管理",
                    children:"",
                    url:"base.index.power"
                },
                {
                    menuid:4,
                    menuname:"数据字典",
                    children:[
                        {
                        menuid:11,
                        menuname:"数据字典主表",
                        children:"",
                       url:"base.index.dict"
                        },
                        {
                            menuid:12,
                            menuname:"数据字典明细表",
                            children:"",
                            url:"base.index.dict_detail"
                        }

                    ],
                    url:"base.index.dict"
                },
                {
                    menuid:5,
                    menuname:"系统设置",
                    children:[
                        {menuid:6,
                            menuname:"考勤基本信息设置",
                            children:null,
                            url:"base.index.attend_base_info",
                            isPage:true},
                        {menuid:7,
                            menuname:"考勤参数设置",
                            children:null,
                            url:"base.index.attend_parameter",
                            isPage:true},
                        {menuid:8,
                            menuname:"考勤权重设置",
                            children:null,
                            url:"base.index.attend_weight",
                            isPage:true},
                    ],
                    url:null
                },
                {
                    menuid:9,
                    menuname:"考勤信息汇总",
                    children:"",
                    url:"base.index.chart"
                },
                {
                    menuid:9,
                    menuname:"班级管理",
                    children:[
                        {menuid:6,
                            menuname:"班级基本管理",
                            children:null,
                            url:"base.index.class_info",
                            isPage:true},
                        {menuid:7,
                            menuname:"班级学生导入",
                            children:null,
                            url:"base.index.import_class_info",
                            isPage:true}
                    ],
                    url:"base.index.manageclass"
                },
                {
                    menuid:9,
                    menuname:"成绩管理",
                    children:"",
                    url:"base.index.manageclass"
                },

            ]
        }])

})()