// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.element(document).ready(function() {
  // $.post('/api/user/queryUserPhonePri', function(data) {
  //   permissionList = data.data;
  //   angular.bootstrap(document, ['myApp']);
  // })
  console.log("进行权限查询");
})
angular.module('starter', ['ionic','ngCordova','starter.controllers','starter.services','ngMessages','ngAnimate'])
.run(function($ionicPlatform,$ionicPopup,$location,$ionicHistory,$rootScope,$cordovaToast) {




  $ionicPlatform.ready(function() {
    console.log("进入run方法");
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
  $ionicPlatform.registerBackButtonAction(function (e) {
    //判断处于哪个页面时双击退出
    // if ($location.path() == '/app/setplace') {
      if ($rootScope.backButtonPressedOnceToExit) {
        $ionicHistory.goBack();
      } else {
        $cordovaToast.showShortTop('再按一下返回上一级');
        $rootScope.backButtonPressedOnceToExit = true;
        e.preventDefault();
        setTimeout(function () {
          $rootScope.backButtonPressedOnceToExit = false;
        }, 2000);
      };
    //}
      if (!$ionicHistory.backView()) {
    //   $ionicHistory.goBack();
    // } else {
      $rootScope.backButtonPressedOnceToExit = true;
      $cordovaToast.showShortTop('再按一次退出系统');
      setTimeout(function () {
        $rootScope.backButtonPressedOnceToExit = false;
      }, 2000);
    }
    e.preventDefault();
    return false;
  }, 101);
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'pages/menu/menu.html',
    controller: 'MenuCtrl'
  })
    .state('main', {
      url: '/',
      controller: 'MainCtrl'
    })
  .state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html'
      }
    }
  })

  .state('app.browse', {
      url: '/browse',
      views: {
        'menuContent': {
          templateUrl: 'templates/browse.html'
        }
      }
    })
    .state('app.playlists', {
      url: '/playlists',
      views: {
        'menuContent': {
          templateUrl: 'templates/playlists.html',
          controller: 'PlaylistsCtrl'
        }
      }
    })

  .state('app.attendence', {
    url: '/attendence',
    views: {
      'menuContent': {
        templateUrl: 'pages/attendence/attendence.html',
        controller: 'AttendCtrl'
      }
    }
  })
    .state('app.findAttendence', {
      url: '/findAttendence',
      views: {
        'menuContent': {
          templateUrl: 'pages/attendence/findAttend.html',
          controller: 'findAttendCtrl'
        }
      }
    })

    // .state('app.attendence', {
    //   url: '/aoo/:playlistId',
    //   views: {
    //     'menuContent': {
    //       templateUrl: 'templates/playlist.html',
    //       controller: 'PlaylistCtrl'
    //     }
    //   }
    // })
    .state('welcome', {
      url: '/welcome',
      templateUrl: 'pages/welcome/welcome.html',
      controller: 'WelcomeCtrl'
    })
    .state('login', {
      url: '/login',
      templateUrl: 'pages/login/login.html',
      controller: 'LoginCtrl'
    })
    .state('register', {
      url: '/register',
      templateUrl: 'pages/register/register.html',
      controller: 'RegCtrl'
    })
    .state('register2', {
      url: '/register2',
      templateUrl: 'pages/register/register.step2.html',
      controller: 'RegCtrl'
    })
    .state('app.home', {
      url: '/home',
      views: {
        'menuContent': {
          templateUrl: 'pages/home/home.html',
          controller: 'HomeCtrl'
        }
      }
    })
    .state('app.account', {
      url: '/account',
      views: {
        'menuContent': {
          templateUrl: 'pages/account/account.html',
          controller: 'AccountCtrl'
        }
      }
    })
    .state('app.setplace', {
      url: '/setplace',
      views: {
        'menuContent': {
          templateUrl: 'pages/attendence/settingPlace.html',
          controller: 'SetPlaceCtrl'
        }
      }
    })

    .state('app.baidu', {
      url: '/baidu',
      views: {
        'menuContent': {
          templateUrl: 'pages/baidu/baidu.html',
          controller: 'BaiduCtrl'
        }
      }
    })
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/setplace');
});
