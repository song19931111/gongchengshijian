/**
 * Created by xiangsong on 2017/4/2.
 */
var mainApp = angular.module('mainApp',['ui.router','ngMessages','tm.pagination','ngAnimate','ui.bootstrap']);
mainApp.config(function ($stateProvider,$urlRouterProvider) {

    $stateProvider
        .state('index', {
            url: '/index',
            views: {
                '': {
                    templateUrl: 'tpls/main.html'
                },
                'nav@index': {
                    templateUrl: 'tpls/nav.html',

                },
                'content@index': {
                    templateUrl: 'tpls/home/home.html'
                },
                'bottom@index':{
                    templateUrl:'tpls/bottom.html'
                }
            }
        })
        .state('index.user', {
            url: '/user',
            views: {
                'content@index': {
                    templateUrl: 'tpls/user/user.html',
                    controller:"UserCtrl"
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