/**
 * Created by Administrator on 2016/10/22 0022.
 */
(function () {
  'use strict';
  angular.module('starter.services')
    .factory('LocalStorageServices',[function () {
      var service={};
      service.get=function (key,defaultValue) {
        var temp=localStorage.getItem(key);
        var value;

        try{
          value=angular.fromJson(temp);
        }
        catch(error){
          value=null;
        }
        if(!value && defaultValue){
          value=defaultValue;
        }
        return value;
      };
      service.update=function (key,value) {
        if(value){
          localStorage.setItem(key,angular.toJson(value));
        }
      };
      service.delete=function (key) {
        if(key){
          localStorage.removeItem(key);
        }
      };
      return service;
    }]);
})();
