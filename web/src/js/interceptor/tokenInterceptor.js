/**
 * Created by xiangsong on 2017/6/12.
 */
(function () {
  'use strict';
  angular.module('mainApp')
    .factory('TokenInterceptor',['LocalStorageServices',function (LocalStorageServices) {
      return {
        request: function(config){
          config.headers = config.headers || {};
          console.log(config);
          config.headers["Token"] = LocalStorageServices.get("token","0");

          return config;
        },
        responseError: function(response){
        }
      };
    }]);
})();
