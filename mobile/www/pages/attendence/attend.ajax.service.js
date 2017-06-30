/**
 * Created by xiangsong on 2017/6/1.
 */

angular.module('starter.services')
  .factory('attendAjaxService',['BaseAjaxService','PAGE_SIZE','DOMAIN','$http',function (BaseAjaxService,PAGE_SIZE,DOMAIN,$http) {
    var service ={};
    service = Object.create(BaseAjaxService);
    service.moduleName = 'attend';



    service.studentAttend = function (info) {
      return $http({
        method:'POST'
        ,url:DOMAIN + this.moduleName+"getCourseInfoLate",
        data:angular.toJson(info)
      });
    }
    service.getDistributionAndTime = function (id) {
      return $http({
        method:'GET'
        ,url:DOMAIN + this.moduleName+"getDistributionAndTime",
        params:{"infoId":id}
      });
    }
    service.getStudentAttendInfo = function (id) {
      return $http({
        method:'GET'
        ,url:DOMAIN + this.moduleName+"getStudentAttendInfo",
        params:{"infoId":id}
      });
    }

    return service;
  }]);
