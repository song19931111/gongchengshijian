/**
 * Created by xiangsong on 2017/4/2.
 */
var mainApp = angular.module('mainApp',['ui.router','ngMessages','tm.pagination','ngAnimate','ui.bootstrap','toastr','chart.js',

'angularFileUpload'/*'ngFileUpload'*/]);
mainApp.config(function ($stateProvider,$urlRouterProvider) {

    $stateProvider
        .state('base', {
            url: '/',
            views: {
                '': {
                    templateUrl: 'tpls/main.html',
                    controller:'mainCtrl'
                },
                'nav@base': {

                },
                'head@base':{

                },
                'content@base': {
                    templateUrl: 'tpls/home/home.html'
                },
                'bottom@base':{
                    templateUrl:'tpls/bottom.html'
                },

            }
        })
        .state('base.index', {
            url: 'index',
            views: {
                'nav@base': {
                    templateUrl: 'tpls/nav.html',
                    controller:'navCtrl'

                },
                'head@base':{
                    templateUrl: 'tpls/head.html',
                    controller:'headCtrl'
                },
            }
        })
        .state('base.index.user', {
            url: '/user',
            views: {
                'content@base': {
                    templateUrl: 'tpls/user/user.html',
                    controller:"UserCtrl"
                }

            }
        })
        .state('base.index.power', {
        url: '/power',
            params:{id:null,isUser:null},
        views: {
            'content@base': {
                templateUrl: 'tpls/power/power.html',
                controller:"PowerCtrl"
            }

        }
    })
        .state('base.index.role', {
            url: '/role',
            views: {
                'content@base': {
                    templateUrl: 'tpls/role/role.html',
                    controller:"RoleCtrl"
                }

            }
        })
        .state('base.index.dict', {
        url: '/dict',
        views: {
            'content@base': {
                templateUrl: 'tpls/dict/dict.html',
                controller:"dictCtrl"
            }

        }
    })
        .state('base.index.dict_detail', {
            url: '/dict_detail',
            views: {
                'content@base': {
                    templateUrl: 'tpls/dict/dict_detail.html',
                    controller:"dictDetailCtrl"
                }
            }
        })

        .state('base.index.attend_base_info', {
            url: '/attend_base_info',
            views: {
                'content@base': {
                    templateUrl: 'tpls/setting/baseinfo/attend_baseinfo.html',
                    controller:"attendBaseInfoCtrl"
                }

            }
        })
        .state('base.index.attend_parameter', {
            url: '/attend_parameter',
            views: {
                'content@base': {
                    templateUrl: 'tpls/setting/parameter/attend_parameter.html',
                    controller:"attendParameterCtrl"
                }

            }
        })
        .state('base.index.attend_weight', {
            url: '/attend_weight',
            views: {
                'content@base': {
                    templateUrl: 'tpls/setting/weight/attend_weight.html',
                    controller:"attendWeightCtrl"
                }

            }
        })
        .state('base.index.chart', {
            url: '/chart',
            views: {
                'content@base': {
                    templateUrl: 'tpls/chart/chart.html',
                    controller:"chartCtrl"
                }

            }
        })
        .state('base.index.class_info', {
            url: '/class_info',
            views: {
                'content@base': {
                    templateUrl: 'tpls/class/class_info.html',
                    controller:"classCtrl"
                }

            }
        })
        .state('base.index.import_class_info', {
            url: '/import_class_info',
            views: {
                'content@base': {
                    templateUrl: 'tpls/class/class_info_import.html',
                    controller:"ClassInfoImportCtrl"
                }

            }
        })


        .state('login', {
            url: '/login',
            views: {
                '': {
                    templateUrl: 'tpls/login/login.html',
                    controller:"LoginCtrl"
                }

            }
        })

    $urlRouterProvider.otherwise('index');
});