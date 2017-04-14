/**
 * Created by xiangsong on 2017/4/10.
 */
angular.module('mainApp')
    .factory('BaseinfoAttendAjaxService',['BaseAjaxService',function (BaseService) {
        var service ={};
        service = Object.create(BaseService);
        service.moduleName = 'baseinfo.json';
        service.getByCategoryID = function (categoryID) {

        };
        return service;
    }]);