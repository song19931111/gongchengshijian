/**
 * Created by xiangsong on 2017/6/1.
 */

angular.module('starter.services')
  .factory('attendAjaxService',['BaseAjaxService','PAGE_SIZE','DOMAIN','$http',function (BaseAjaxService,PAGE_SIZE,DOMAIN,$http) {
    var service ={};
    service = Object.create(BaseAjaxService);
    service.moduleName = 'attend.json';
    //得到已经上完的课的信息
    service.getCompleteCourseInfo = function (index) {
      console.log(DOMAIN + this.moduleName);
      return $http({
        method:'GET'
        ,url:DOMAIN + this.moduleName
        // ,params:{
        //   pageSize:PAGE_SIZE
        //   ,pageIndex:index
        // }
      });
    };
    return service;
  }]);
