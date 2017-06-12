/**
 * Created by xiangsong on 2017/6/12.
 */
(function () {
  'use strict';
  angular.module('starter.services')
    .factory('TokenInterceptor',[function () {
      return {
        request: function(config){
          config.headers = config.headers || {};
          config.headers["Token"] = "123";

          return config;
        },
        responseError: function(response){
        }
      };
    }]);
})();
