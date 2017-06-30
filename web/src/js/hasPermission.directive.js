/**
 * Created by xiangsong on 2017/5/23.
 */
angular.module('mainApp').directive('hasPermission',['permissionService',function(permissionService) {
    return {
        scope:{
            url:'@'
        },
        link: function(scope, element, attrs) {
            if(!_.isString(attrs.hasPermission))
                throw "hasPermission value must be a string";
            var value = attrs.hasPermission.trim();
            //判断是否有权限
            var notPermissionFlag = value[0] === '!';
            if(notPermissionFlag) {
                value = value.slice(1).trim();
            }

            function toggleVisibilityBasedOnPermission() {
                var hasPermission = permissionService.isPermission(url,value);
                if(hasPermission && !notPermissionFlag || !hasPermission && !notPermissionFlag)
                    element.show();
                else
                    element.hide();
            }
            toggleVisibilityBasedOnPermission();
            scope.$on('permissionsChanged', toggleVisibilityBasedOnPermission);
        }
    };
}]);