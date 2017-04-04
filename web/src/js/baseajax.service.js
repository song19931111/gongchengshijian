/**
 * Created by xiangsong on 2017/4/3.
 */
angular.module('mainApp')
    .constant('DOMAIN','test/');
angular.module('mainApp')
    .constant('PAGE_SIZE',20);
angular.module('mainApp')
    .factory('BaseAjaxService',['$http','PAGE_SIZE','DOMAIN',function ($http,PAGE_SIZE,DOMAIN) {
        //PAGE_SIZE = 30;
        var service ={};
        service.moduleName = '';
        service.getList = function (index) {
            console.log("getlist fun called");
            console.log(DOMAIN + this.moduleName);
            return $http({
                method:'GET'
                ,url:DOMAIN + this.moduleName
                // ,params:{
                //     pageSize:PAGE_SIZE
                //     ,pageIndex:index
                // }
            });
        };
        service.getAll = function() {
            return $http({
                method:'GET'
                ,url:DOMAIN + this.moduleName
            });
        };
        service.get = function (id) {
            return $http({
                method:'GET'
                ,url:DOMAIN + this.moduleName
                ,params:{
                    id:id
                }
            });
        };
        return service;
    }]);