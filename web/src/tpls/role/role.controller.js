
(function () {
    'use strict';
    angular.module('mainApp')
        .controller('RoleCtrl',['$scope','roleAjaxService','$uibModal','$state','LocalStorageServices',
            function ($scope,roleAjaxService,$uibModal,$state,LocalStorageServices) {
            var GetAllRole = function () {

                var postData = {
                    pageIndex: $scope.paginationConf.currentPage,
                    pageSize: $scope.paginationConf.itemsPerPage
                }
                //获取所有的权限信息
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
            $scope.$watch('paginationConf.currentPage + paginationConf.itemsPerPage', GetAllRole);
            //对话框的打开方法


            ///////////////////////////////////////复选框Start//////////////////////////////////////////////
            $scope.selected = [];
            $scope.isSelected = function(id){
                return $scope.selected.indexOf(id)>=0;
            }
            var updateSelected = function(action,id){
                if(action == 'add' && $scope.selected.indexOf(id) == -1){
                    $scope.selected.push(id);

                }i
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

            ///////////////////////////////////////新增角色//////////////////////////////////////////////
            $scope.add = function (item) {
                console.log(item);
                roleAjaxService.add(item).then(function (result) {
                    if(result.data.error =="none"){
                        alert("新增角色成功");
                    }else{
                        alert(result.data.error);
                    }
                }).catch(function (result) {
                    alert("新增角色失败");
                })

            }
            ///////////////////////////////////////新增角色End//////////////////////////////////////////////




            ///////////////////////////////////////修改角色//////////////////////////////////////////////
            $scope.modify = function (item) {
                console.log(item);
                roleAjaxService.modify(item).then(function (result) {
                    if(result.data.error =="none"){
                        GetAllRole();
                        alert("修改角色成功");
                    }else{
                        alert(result.data.error);
                    }
                }).catch(function (result) {
                    alert("修改角色失败");
                });
            }
            ///////////////////////////////////////修改用户End//////////////////////////////////////////////

            ///////////////////////////////////////删除用户Start//////////////////////////////////////////////
            $scope.delete = function (){
                console.log("删除"+$scope.selected);
                roleAjaxService.delete($scope.selected).then(function (result) {
                    if(result.data.error=="none"){
                        GetAllRole();
                        alert("删除成功");

                    }
                }).catch(function (result) {
                    alert("删除失败");
                })

            }

            ///////////////////////////////////////删除用户End//////////////////////////////////////////////
                //提交修改的权限信息
                var  modifyRolePowerInfo =function (item) {
                    var postInfo={type:"",menuIdList:[],roleId:""};
                   // a = {type:"select","menuIdList":["1","2","3","4","5"],roleId:1};
                    postInfo.type = item.type;
                    postInfo.menuIdList = postInfo.selectedMenuId;
                    postInfo.roleId = item.roleId;
                    roleAjaxService.addRolePower(postInfo).then(function (result) {
                        if(result.data.error=="none"){
                            GetAllRole();
                            alert("修改权限成功");

                        }else{
                            alert(result.data.error);
                        }
                    }).catch(function (result) {
                        alert("修改权限失败");
                    })
                }
            ///////////////////////////////////////对话框Start//////////////////////////////////////////////
            $scope.animationsEnabled = true;
            $scope.open = function (size,item) {
                //这里很关键,是打开模态框的过程
                var modalInstance = $uibModal.open({
                    animation: $scope.animationsEnabled,//打开时的动画开关
                    templateUrl: 'tpls/role/dialogcontent.html',//模态框的页面内容,这里的url是可以自己定义的,也就意味着什么都可以写
                    controller: 'ModalInstanceRoleCtrl',//这是模态框的控制器,是用来控制模态框的
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
            //菜单对话框的打开：
                $scope.openMenuTree = function (size,item,type) {
                    //这里很关键,是打开模态框的过程
                    var modalMenuInstance = $uibModal.open({
                        animation: $scope.animationsEnabled,//打开时的动画开关
                        templateUrl: 'tpls/role/menu.dialog.html',//模态框的页面内容,这里的url是可以自己定义的,也就意味着什么都可以写
                        controller: 'ModalInstanceTreeCtrl',//这是模态框的控制器,是用来控制模态框的
                        size: size,//模态框的大小尺寸
                        resolve: {//这是一个入参,这个很重要,它可以把主控制器中的参数传到模态框控制器中
                            items: function () {//items是一个回调函数
                                item["type"] = type;
                                return item;//这个值会被模态框的控制器获取到
                            }
                        }
                    });

                    modalMenuInstance.result.then(function (item) {//这是一个接收模态框返回值的函数
                        $scope.item = item;//模态框的返回值
                        //console.log(item);
                      modifyRolePowerInfo($scope.item);
                        //
                    }, function () {
                        // $log.info('Modal dismissed at: ' + new Date());
                    });

                };

            $scope.toggleAnimation = function () {
                $scope.animationsEnabled = !$scope.animationsEnabled;//动画效果
            };
            ///////////////////////////////////////对话框End//////////////////////////////////////////////

        }])





        .controller('ModalInstanceRoleCtrl', function ($scope, $uibModalInstance,items) {
//这是模态框的控制器,记住$uibModalInstance这个是用来调用函数将模态框内的数据传到外层控制器中的,items则上面所说的入参函数,它可以获取到外层主控制器的参数
            $scope.item = angular.copy(items);//这里就可以去外层主控制器的数据了
            if($scope.item == 'none'){
                $scope.item = {"roleName":"","type":"add"};
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
        .controller('ModalInstanceTreeCtrl', function ($scope,LocalStorageServices, $uibModalInstance,items) {
            var self = this;
            $scope.items = items;
            var power = [];
            //获取菜单列表
            if( items.type == "add"){
                $scope.title = '增加权限';
                power = items.addPower;
            } else if( items.type =="delete" ){
                $scope.title = '删除权限';
                power = items.addPower;
            }else if(items.type =="modify"){
                $scope.title = '修改权限';
                power = items.modifyPower;
            }else if(items.type =="select"){
                $scope.title ="查询权限";
                power = items.selectPower;
            }else{
                $scope.title ="菜单权限";
                power = items.menuPower;
            }
            //生成树：
            function generateTree(fatherList) {
                for(var i = 0 ; i<fatherList.length; i++){
                    if(fatherList[i].children != ""){
                        //添加所有的children节点
                        for(var j = 0;j<fatherList[i].children.length;j++){
                            //判断这个menuID 是否在用户的菜单列表中:
                            $scope.model.jsTreeData.push({"id":fatherList[i].children[j].menuId,"parent":fatherList[i].menuId,
                                "text":fatherList[i].children[j].menuName,
                                state: { opened: true,selected:false}
                            })
                        }
                        generateTree(fatherList[i].children);
                    }
                }
            }

            //菜单管理
            $scope.init = function () {

                $scope.model = $scope.model || {};
                $scope.model.jsTreeData = [
                ];
                var menuList =LocalStorageServices.get('menulist');
                //为所有的根节点添加：
                for(var i = 0 ; i<menuList.length;i++){
                    $scope.model.jsTreeData.push({"id":menuList[i].menuId,"parent":"#",
                        "text":menuList[i].menuName, state: { opened: true,selected:false}
                    })
                }
                generateTree(menuList);

                for(var i=  0;i<power.length;i++){
                  for(var j=0;j<$scope.model.jsTreeData.length;j++){
                      if( power[i] == $scope.model.jsTreeData[j].id ){
                          $scope.model.jsTreeData[j].state.selected = true;
                      }
                  }
                }


                $scope.treeConfig = {
                    plugins:["checkbox"]
                };

                $scope.treeInstance = self;
               // $scope.items['selectedMenuId'] = $scope.treeInstance.jstree(true).select_node([1,2,3]);
            }

            $scope.createNodeCB = function(e,item) {
               console.log('create_node called');
            };
            $scope.ok = function () {
                //close函数是在模态框关闭后调用的函数,他会将这个参数传到主控制器的results函数中,作为回调值

                $scope.items['selectedMenuId'] = $scope.treeInstance.jstree(true).get_selected();
             //   console.log($scope.items['selectedMenuId']);
                $uibModalInstance.close($scope.items);
            };

            $scope.cancel = function () {
                //$scope.items['selectedMenuId'] = $scope.treeInstance.jstree(true).select_node([1,2,3]);
                //dismiss也是在模态框关闭的时候进行调用,而它返回的是一个reason
                $uibModalInstance.dismiss('cancel');
            };
            $scope.init();
            //$scope.items['selectedMenuId'] = $scope.treeInstance.jstree(true).get_selected();
            $scope.load = function() {
                $scope.items['selectedMenuId'] = $scope.treeInstance.jstree(true).get_selected();
                alert('code here');
            }
            $scope.$on('$viewContentLoaded', function(){
                //console.log("123213");
                $scope.items['selectedMenuId'] = $scope.treeInstance.jstree(true).get_selected();
            });


        })
    //     .factory('authService', authService);
    // function authService($http, $log, $q, $localStorage, PermissionStore, ENV) {}
})()

