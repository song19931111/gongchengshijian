/**
 * Created by xiangsong on 2017/4/3.
 */
angular.module('starter.services')
    .constant('DOMAIN','test/');
angular.module('starter.services')
    .constant('PAGE_SIZE',5);
angular.module('starter.services')
    .factory('BaseAjaxService',['$http','PAGE_SIZE','DOMAIN',function ($http,PAGE_SIZE,DOMAIN) {
        //PAGE_SIZE = 30;
        var service ={};
        //模块名:
        service.moduleName = '';
        service.getList = function (index) {
            console.log(DOMAIN + this.moduleName);
            return $http({
                method:'GET'
                ,url:DOMAIN + this.moduleName
                ,params:{
                    pageSize:PAGE_SIZE
                    ,pageIndex:index
                }
            });
        };
        service.getAll = function() {
            return $http({
                method:'GET'
                ,url:DOMAIN + this.moduleName+'/getAll'
            });
        };
        service.get = function (id) {
            return $http({
                method:'GET'
                ,url:DOMAIN + this.moduleName+'/getById'
                ,params:{
                    id:id
                }
            });
        };
        service.add = function (data) {
            return $http({
                method:'POST'
                ,url:DOMAIN + this.moduleName+"/add"
                ,
                data:angular.toJson(data)
            });
        };
        service.modify = function (data) {
            return $http({
                method:'POST'
                ,url:DOMAIN + this.moduleName+"/modify"
                ,params:{
                    data:data
                }
            });
        };
        service.delete = function (ids) {
            return $http({
                method:'POST'
                ,url:DOMAIN + this.moduleName+"/delete"
                ,params:{
                    ids:ids
                }
            });
        };
        return service;
    }]);
