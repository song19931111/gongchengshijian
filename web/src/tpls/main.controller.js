/**
 * Created by Administrator on 2017/4/8.
 */
angular.module('mainApp')
    .controller('mainCtrl',['$scope',function ($scope) {
        angular.element().ready(function () {
            init_func();
            console.log("执行了init_fun");
        });
    }]);