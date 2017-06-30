/**
 * Created by xiangsong on 2017/5/23.
 */
angular.module('mainApp')
.factory('permissionService',['$rootScope','LocalStorageServices',function ($rootScope) {
    var self = this;
    var service = {};
    var permission = null;
    service.isSetPerssion = function () {
        if(permission == null){
            return false;
        }
        return true;
    }
    service.setPermission = function ( _permission ) {
        permission =  _permission;
        //$rootScope.$broadcast('permissionsChanged');
    }
    service.isPermission = function (menuId,powerType) {

        var isContainValue =  function (arr,value) {
            for(var i = 0;i<arr.length;i++){
                if(arr[i] == value){
                    return true ;
                }
            }
            return false ;
        }
        if(powerType =='add'){
            if(isContainValue(permission.addPower,menuId)){
                return true ;
            }
        }else if(powerType =='delete'){
            if(isContainValue(permission.deletePower,menuId)){
                return true ;
            }
        }else if(powerType =='modify'){
            if(isContainValue(permission.modifyPower,menuId)){
                return true ;
            }
        }else if(powerType =='select'){
            if(isContainValue(permission.selectPower,menuId)){
                return true ;
            }
        }else if(powerType == 'menu'){
            if(isContainValue(permission.menuPower,menuId)){
                return true ;
            }
        }
        return false;
    }
    return service ;
    
}])