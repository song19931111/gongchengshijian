/**
 * Created by xiangsong on 2017/6/12.
 */
(function () {
  'use strict';
  angular.module('starter.services')
    .factory('TokenInterceptor',[function () {
      return {
        request: function(config){
          if(config.url =='http://sms.market.alicloudapi.com/singleSendSms'){
            return config;
          }
          config.headers = config.headers || {};
          console.log(config);
          config.headers["Token"] = "123";
          return config;

        }
      };
    }]);
})();
