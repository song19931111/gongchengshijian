/**
 * Created by xiangsong on 2017/4/4.
 */
angular.module('mainApp')
    .factory('roleAjaxService',['BaseAjaxService',function (BaseService) {
        var service ={};
        service = Object.create(BaseService);
        service.moduleName = 'role.json';
        service.getByCategoryID = function (categoryID) {

        };
        return service;
    }]);