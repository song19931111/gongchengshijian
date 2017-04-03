/**
 * Created by xiangsong on 2017/4/3.
 */
(function () {
    'use strict';
    angular.module('mainApp')
        .controller('UserCtrl',['$scope','BaseAjaxService','$uibModal',function ($scope,BaseAjaxService,$uibModal) {
            var GetAllUser = function () {

                var postData = {
                    pageIndex: $scope.paginationConf.currentPage,
                    pageSize: $scope.paginationConf.itemsPerPage
                }

                BaseAjaxService.getList(1).then(function (result) {
                        console.log(result);
                    console.log(result.data.total);
                         $scope.paginationConf.totalItems = result.data.total;
                         $scope.userList = result.data.userList;
                }).catch(function (data) {
                    console.log('error');
                });
                // BusinessService.list(postData).success(function (response) {
                //     $scope.paginationConf.totalItems = response.count;
                //     $scope.persons = response.items;
                // });

            }
            //配置分页基本参数
            $scope.paginationConf = {
                currentPage: 1,
                itemsPerPage: 5,
                perPageOptions: [10, 20, 30, 40, 50]
            };
            /***************************************************************
             当页码和页面记录数发生变化时监控后台查询
             如果把currentPage和itemsPerPage分开监控的话则会触发两次后台事件。
             ***************************************************************/
            $scope.$watch('paginationConf.currentPage + paginationConf.itemsPerPage', GetAllUser);
            //对话框的打开方法

            $scope.items = ['item1', 'item2', 'item3'];

            $scope.animationsEnabled = true;
            $scope.open = function (size) {
                //这里很关键,是打开模态框的过程
                var modalInstance = $uibModal.open({
                    animation: $scope.animationsEnabled,//打开时的动画开关
                    templateUrl: 'tpls/user/dialogcontent.html',//模态框的页面内容,这里的url是可以自己定义的,也就意味着什么都可以写
                    controller: 'ModalInstanceCtrl',//这是模态框的控制器,是用来控制模态框的
                    size: size,//模态框的大小尺寸
                    resolve: {//这是一个入参,这个很重要,它可以把主控制器中的参数传到模态框控制器中
                        items: function () {//items是一个回调函数
                            return $scope.items;//这个值会被模态框的控制器获取到
                        }
                    }
                });

                modalInstance.result.then(function (selectedItem) {//这是一个接收模态框返回值的函数
                    $scope.selected = selectedItem;//模态框的返回值
                }, function () {
                   // $log.info('Modal dismissed at: ' + new Date());
                });

            };

            $scope.toggleAnimation = function () {
                $scope.animationsEnabled = !$scope.animationsEnabled;//动画效果
            };




        }])
        .controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, items) {
//这是模态框的控制器,记住$uibModalInstance这个是用来调用函数将模态框内的数据传到外层控制器中的,items则上面所说的入参函数,它可以获取到外层主控制器的参数
        $scope.items = items;//这里就可以去外层主控制器的数据了
        $scope.selected = {
            item: $scope.items[0]
        };

        $scope.ok = function () {
            //close函数是在模态框关闭后调用的函数,他会将这个参数传到主控制器的results函数中,作为回调值
            $uibModalInstance.close($scope.selected.item);
        };

        $scope.cancel = function () {
            //dismiss也是在模态框关闭的时候进行调用,而它返回的是一个reason
            $uibModalInstance.dismiss('cancel');
        };
    })
})()

