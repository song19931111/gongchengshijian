/**
 * Created by xiangsong on 2017/4/4.
 */
angular.module('mainApp')
    .factory('roleAjaxService',['BaseAjaxService','PAGE_SIZE','DOMAIN','$http',function (BaseService,PAGE_SIZE,DOMAIN,$http){
        var service ={};
        service = Object.create(BaseService);
        service.moduleName = 'role';
        service.addRolePower = function (data) {
            return $http({
                method:'POST'
                ,url:DOMAIN + this.moduleName+"addRolePower",
                data:angular.toJson(data)
            })
        }


        return service;
    }]);