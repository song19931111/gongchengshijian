/**
 * Created by xiangsong on 2017/6/8.
 */
angular.module('starter.services')
  .factory('courseAjaxService',['BaseAjaxService','PAGE_SIZE','DOMAIN','$http',function (BaseAjaxService,PAGE_SIZE,DOMAIN,$http) {
    var service = {};
    service = Object.create(BaseAjaxService);
    service.moduleName = "course";
    service.getInfoByProfessionName =function (name) {
      return $http({
        method:'GET'
        ,url:DOMAIN + this.moduleName+"/getInfoByProfessionName"
      });
    }
    service.addSelectedCourse =function (cIdList) {
      return $http({
        method:'POST'
        ,url:DOMAIN + this.moduleName+"/addSelectedCourse"
        ,data:angular.toJson(cIdList)
      });
    }
    //得到已经上完的课的信息
    service.getCompleteCourseInfo = function (index) {
      return $http({
        method:'GET'
        ,url:DOMAIN + this.moduleName
        ,params:{
          pageSize:PAGE_SIZE
          ,pageIndex:index
        }
      });
    };
    service.getCourseInfoLate = function () {
      //得到该生距离当前时间最近一门课的信息
      return $http({
        method:'GET'
        ,url:DOMAIN + this.moduleName+"/getCourseInfoLate"
      });
    }

    return service;
  }])
