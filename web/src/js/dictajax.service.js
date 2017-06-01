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

        service.getDetailList = function(id,_pageSize,_pageIndex) {
            return $http({
                method:'GET'
                ,url:DOMAIN + this.moduleName+"/getDetailList",
                params:{
                    id:id,
                    pageSize:_pageSize,
                    pageIndex:_pageIndex
                }
            });
        };
        service.getDetailList = function(id,_pageSize,_pageIndex) {
            return $http({
                method:'GET'
                ,url:DOMAIN + this.moduleName+"/getDetailList",
                params:{
                    id:id,
                    pageSize:_pageSize,
                    pageIndex:_pageIndex
                }
            });
        };
        service.addDetail = function (data) {
            return $http({
                method:'POST'
                ,url:DOMAIN + this.moduleName+"/addDetail"
                ,
                data:angular.toJson(data)
            });
        };
        service.modifyDetail = function (data) {
            return $http({
                method:'POST'
                ,url:DOMAIN + this.moduleName+"/modifyDetail"
                ,params:{
                    data:data
                }
            });
        };
        service.deleteDetail = function (ids) {
            return $http({
                method:'POST'
                ,url:DOMAIN + this.moduleName+"/deleteDetail"
                ,params:{
                    ids:ids
                }
            });
        };

        return service;
    }]);/**
 * Created by xiangsong on 2017/4/4.
 */
