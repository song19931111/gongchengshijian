/**
 * Created by xiangsong on 2017/6/12.
 */
(function () {
  'use strict';
  angular.module('starter.services')
    .factory('TokenInterceptor',['LocalStorageServices',function (LocalStorageServices) {
      return {
        request: function(config){
          config.headers = config.headers || {};
          console.log(config);
          //config.headers["Token"] = LocalStorageServices.get("Token","0");
          if(config.url =='http://sms.market.alicloudapi.com/singleSendSms'){
            return config;
          }
          config.headers["token"] = LocalStorageServices.get("token","0");
          return config;
        },
        responseError: function(response){
        }
      };
    }]);
})();
