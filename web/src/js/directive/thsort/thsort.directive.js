/**
 * Created by xiangsong on 2017/4/23.
 */
angular.module('mainApp.directive')
    .controller('ThsortCtrl',['$scope',function ($scope) {
        console.log($scope.theadOptions);
        $scope.toggle =function (item) {
            if($scope.theadOptions.orderBy == item.column){
                $scope.theadOptions.asc = !$scope.theadOptions.asc;
            }else{

                $scope.theadOptions.asc = true ;
            }
            //当前的排序的是当前的点击
            $scope.theadOptions.orderBy =  item.column;
            $scope.onSortChange({
                orderBy:$scope.theadOptions.orderBy,
                asc:$scope.theadOptions.asc
            })
        }
    }]);
angular.module('mainApp.directive')
.directive('thSort',[function () {
    return{
        restrict:'A',
        scope:{
            theadOptions:'=',
            onSortChange:'&'
        },
        controller:'ThsortCtrl',
        templateUrl:'js/directive/thsort/thsort.template.html'
    };
}

])