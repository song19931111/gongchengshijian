/**
 * Created by xiangsong on 2017/4/14.
 */
/**
 *
 */
angular.module('mainApp')
    .factory('dictAjaxService',['BaseAjaxService',function (BaseService) {
        var service ={};
        service = Object.create(BaseService);
        service.moduleName = 'dict.json';
        return service;
    }]);/**
 * Created by xiangsong on 2017/4/4.
 */
