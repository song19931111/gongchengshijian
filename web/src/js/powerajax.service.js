/**
 * Created by xiangsong on 2017/4/4.
 */
angular.module('mainApp')
    .factory('powerAjaxService',['BaseAjaxService',function (BaseService) {
        var service ={};
        service = Object.create(BaseService);
        service.moduleName = 'power.json';
        service.getByCategoryID = function (categoryID) {

        };
        return service;
    }]);