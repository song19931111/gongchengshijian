/**
 * Created by xiangsong on 2017/4/2.
 */
var mainApp = angular.module('mainApp',['ui.router','ngMessages','tm.pagination','ngAnimate','ui.bootstrap']);
mainApp.config(function ($stateProvider,$urlRouterProvider) {

    $stateProvider
        .state('base', {
            url: '/',
            views: {
                '': {
                    templateUrl: 'tpls/main.html'
                },
                'nav@base': {

                },
                'content@base': {
                    templateUrl: 'tpls/home/home.html'
                },
                'bottom@base':{
                    templateUrl:'tpls/bottom.html'
                }
            }
        })
        .state('base.index', {
            url: 'index',
            views: {
                'nav@base': {
                    templateUrl: 'tpls/nav.html',
                    controller:'navCtrl'

                }
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
        views: {
            'content@base': {
                templateUrl: 'tpls/power/power.html',
                controller:"PowerCtrl"
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