/**
 * Created by xiangsong on 2017/4/4.
 */
angular.module('mainApp')
    .factory('userAjaxService',['BaseAjaxService','PAGE_SIZE','DOMAIN','$http',function (BaseService,PAGE_SIZE,DOMAIN,$http) {
        var service ={};
        service = Object.create(BaseService);
        service.moduleName = 'user';
        // service.getByCategoryID = function (categoryID) {
        //
        // };
        //得到已经上完的课的信息
        service.addStudent = function (data) {
            return $http({
                method:'POST'
                ,url:DOMAIN + this.moduleName+"addStudent"
                ,
                data:angular.toJson(data)
            });
        };
        service.getByTel = function (telphone) {
            return $http({
                method:'GET'
                ,url:DOMAIN + this.moduleName+"getByTel"
                ,params:{
                    tel:telphone
                }
            });
        };
        service.getByTelAndPass = function (info) {
            return $http({
                method:'POST'
                ,url:DOMAIN + this.moduleName+"getByTelAndPass",
                data:angular.json(info)
            });
        };
        service.getAllColleageName = function () {
            return $http({
                method:'GET'
                ,url:DOMAIN + this.moduleName+"getAllColleageName",
            });
        };

        service.getColleageInfoByName =function (name) {
            return $http({
                method:'GET'
                ,url:DOMAIN + this.moduleName+"getColleageInfoByName"
                ,params:{
                    colleageName:name
                }
            });
        }
        service.getUserOtherInfo=function (id) {
            return $http({
                method:'GET'
                ,url:DOMAIN + this.moduleName+"getUserOtherInfoByUserId"
                ,params:{
                    userId:id
                }
            });
        }
        service.login = function (data) {
            return $http({
                method:'POST'
                ,url:DOMAIN+this.moduleName+'login',
                data:angular.toJson(data)
            });
        }
        return service;
    }]);