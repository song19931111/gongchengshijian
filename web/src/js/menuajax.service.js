/**
 * Created by xiangsong on 2017/4/4.
 */
angular.module('mainApp')
    .factory('menuAjaxService',['BaseAjaxService',function (BaseService) {
        var service ={};
        service = Object.create(BaseService);
        service.moduleName = 'menu.json';
        return service;
    }]);/**
 * Created by xiangsong on 2017/4/4.
 */
