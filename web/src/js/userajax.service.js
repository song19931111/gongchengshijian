/**
 * Created by xiangsong on 2017/4/4.
 */
angular.module('mainApp')
    .factory('userAjaxService',['BaseAjaxService',function (BaseService) {
        var service ={};
        service = Object.create(BaseService);
        service.moduleName = 'user.json';
        service.getByCategoryID = function (categoryID) {

        };
        return service;
    }]);