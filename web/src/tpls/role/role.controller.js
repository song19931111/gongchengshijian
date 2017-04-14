
(function () {
    'use strict';
    angular.module('mainApp')
        .controller('RoleCtrl',['$scope','roleAjaxService','$uibModal','$state','LocalStorageServices',
            function ($scope,roleAjaxService,$uibModal,$state,LocalStorageServices) {
            var GetAllUser = function () {

                var postData = {
                    pageIndex: $scope.paginationConf.currentPage,
                    pageSize: $scope.paginationConf.itemsPerPage
                }
                //获取所有的用户
                roleAjaxService.getList($scope.currentPage).then(function (result) {
                    console.log("aaaaa"+$scope.roleList);
                    $scope.paginationConf.totalItems = result.data.total;
                    $scope.roleList = result.data.roleList;
                }).catch(function (data) {
                    console.log('error');
                });


            }
            //配置分页基本参数
            $scope.paginationConf = {
                currentPage: 1,
                totalItems: 8000,
                itemsPerPage: 15,
                pagesLength: 15,
                perPageOptions: [10, 20, 30, 40, 50]
            };
            /***************************************************************
             当页码和页面记录数发生变化时监控后台查询
             如果把currentPage和itemsPerPage分开监控的话则会触发两次后台事件。
             ***************************************************************/
            $scope.$watch('paginationConf.currentPage + paginationConf.itemsPerPage', GetAllUser);
            //对话框的打开方法


            ///////////////////////////////////////复选框Start//////////////////////////////////////////////
            $scope.selected = [];
            $scope.isSelected = function(id){
                return $scope.selected.indexOf(id)>=0;
            }
            var updateSelected = function(action,id){
                if(action == 'add' && $scope.selected.indexOf(id) == -1){
                    $scope.selected.push(id);

                }
                if(action == 'remove' && $scope.selected.indexOf(id)!=-1){
                    var idx = $scope.selected.indexOf(id);
                    $scope.selected.splice(idx,1);
                }
            }

            $scope.updateSelection = function($event, id){
                var checkbox = $event.target;
                var action = (checkbox.checked?'add':'remove');
                updateSelected(action,id);
            }

            ///////////////////////////////////////复选框End//////////////////////////////////////////////

            ///////////////////////////////////////新增用户//////////////////////////////////////////////
            $scope.add = function (item) {
                console.log("新增"+item);

            }
            ///////////////////////////////////////新增用户End//////////////////////////////////////////////




            ///////////////////////////////////////修改用户//////////////////////////////////////////////
            $scope.modify = function (item) {
                console.log("修改"+item);

            }
            ///////////////////////////////////////修改用户End//////////////////////////////////////////////

            ///////////////////////////////////////删除用户Start//////////////////////////////////////////////
            $scope.delete = function (){
                console.log("删除"+$scope.selected);

            }

            ///////////////////////////////////////删除用户End//////////////////////////////////////////////
            ///////////////////////////////////////对话框Start//////////////////////////////////////////////
            $scope.animationsEnabled = true;
            $scope.open = function (size,item) {
                //这里很关键,是打开模态框的过程
                var modalInstance = $uibModal.open({
                    animation: $scope.animationsEnabled,//打开时的动画开关
                    templateUrl: 'tpls/user/dialogcontent.html',//模态框的页面内容,这里的url是可以自己定义的,也就意味着什么都可以写
                    controller: 'ModalInstanceCtrl',//这是模态框的控制器,是用来控制模态框的
                    size: size,//模态框的大小尺寸
                    resolve: {//这是一个入参,这个很重要,它可以把主控制器中的参数传到模态框控制器中
                        items: function () {//items是一个回调函数
                            return item;//这个值会被模态框的控制器获取到
                        }
                    }
                });

                modalInstance.result.then(function (item) {//这是一个接收模态框返回值的函数
                    $scope.item = item;//模态框的返回值
                    if(item.type=="add"){
                        $scope.add(item);
                    }
                    if(item.type=="modify"){
                        $scope.modify(item);
                    }
                }, function () {
                    // $log.info('Modal dismissed at: ' + new Date());
                });

            };

            $scope.toSetAuthority = function (roleid) {
                $state.go('base.index.power',{id:roleid,isUser:false});
            };

            // $scope.jumpToUrl = function(path) {
            //
            //     $location.path(path);
            //     var curUrl = $location.absUrl();
            //     console.log(curUrl);
            //
            // };

            // $scope.$storage = $localStorage.$default({
            //     counter: 0
            // });

            $scope.toggleAnimation = function () {
                $scope.animationsEnabled = !$scope.animationsEnabled;//动画效果
            };
            ///////////////////////////////////////对话框End//////////////////////////////////////////////




        }])
        .controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, items) {
//这是模态框的控制器,记住$uibModalInstance这个是用来调用函数将模态框内的数据传到外层控制器中的,items则上面所说的入参函数,它可以获取到外层主控制器的参数
            $scope.item = items;//这里就可以去外层主控制器的数据了
            if($scope.item == 'none'){
                $scope.item = {"username":"","tel":'',"mail":"","type":"add"};
            }else{
                $scope.item['type'] ="modify";
            }

            $scope.ok = function () {
                //close函数是在模态框关闭后调用的函数,他会将这个参数传到主控制器的results函数中,作为回调值
                $uibModalInstance.close($scope.item);
            };

            $scope.cancel = function () {
                //dismiss也是在模态框关闭的时候进行调用,而它返回的是一个reason
                $uibModalInstance.dismiss('cancel');
            };
        })
        .factory('authService', authService);
    function authService($http, $log, $q, $localStorage, PermissionStore, ENV) {}
})()

