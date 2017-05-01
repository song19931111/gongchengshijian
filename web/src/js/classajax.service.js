
angular.module('mainApp')
    .factory('classAjaxService',['BaseAjaxService',function (BaseService) {
        var service ={};
        service = Object.create(BaseService);
        service.moduleName = 'class.json';
        service.getByCategoryID = function (categoryID) {

        };
        return service;
    }]);/**
 * Created by 77178 on 2017/4/14.
 */
