/**
 * Created by xiangsong on 2017/4/3.
 */
angular.module('mainApp')
    .constant('DOMAIN','http://192.168.0.13:8080/Attendance/');
angular.module('mainApp')
    .constant('PAGE_SIZE',10);
angular.module('mainApp')
    .factory('BaseAjaxService',['$http','PAGE_SIZE','DOMAIN',function ($http,PAGE_SIZE,DOMAIN) {
        //PAGE_SIZE = 30;
        var service ={};
        //模块名:
        service.moduleName = '';
        service.getList = function (index) {
            console.log(DOMAIN + this.moduleName);
            return $http({
                method:'GET'
                ,url:'test/role.json'
                ,params:{
                    pageSize:PAGE_SIZE
                    ,pageIndex:index
                }
            });
        };
        service.getAll = function() {
            return $http({
                method:'GET'
                ,url:DOMAIN + this.moduleName+'getAll'
            });
        };
        service.getById = function (id) {
            return $http({
                method:'GET'
                ,url:DOMAIN + this.moduleName+'getById'
                ,params:{
                    id:id
                }
            });
        };
        service.add = function (data) {
            return $http({
                method:'POST'
                ,url:DOMAIN + this.moduleName+"add"
                ,
                data:angular.toJson(data)
            });
        };
        service.modify = function (data) {
            return $http({
                method:'POST'
                ,url:DOMAIN + this.moduleName+"modify",
                    data:angular.toJson(data),
            });
        };
        service.delete = function (ids) {
            return $http({
                method:'POST'
                ,url:DOMAIN + this.moduleName+"delete"
                ,data:angular.toJson(ids),
            });
        };
        return service;
    }]);
