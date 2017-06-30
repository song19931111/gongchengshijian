/**
 * Created by xiangsong on 2017/6/1.
 */

angular.module('starter.services')
  .factory('userAjaxService',['BaseAjaxService','PAGE_SIZE','DOMAIN','$http',function (BaseAjaxService,PAGE_SIZE,DOMAIN,$http) {
    var service ={};
    service = Object.create(BaseAjaxService);
    service.moduleName = "user";
    //得到已经上完的课的信息
    service.addStudent = function (data) {
      return $http({
        method:'POST'
        ,url:DOMAIN + this.moduleName+"/addStudent"
        ,
        data:angular.toJson(data)
      });
    };
    service.getByTel = function (info) {
      return $http({
        method:'POST'
        ,url:DOMAIN + this.moduleName+"/getByTel",
        data:angular.toJson(info)
      });
    };
    service.getByTelAndPass = function (info) {
      return $http({
        method:'POST'
        ,url:DOMAIN + this.moduleName+"/getByTelAndPass",
        data:angular.json(info)
      });
    };
    service.getColleageName = function () {
      return $http({
        method:'GET'
        ,url:DOMAIN + this.moduleName+"/getColleageName",
      });
    };

    service.getColleageInfoByName =function (name) {
      return $http({
        method:'GET'
        ,url:DOMAIN + this.moduleName+"/getColleageInfoByName"
        ,params:{
          colleageName:name
        }
      });
    }


    return service;
  }]);
