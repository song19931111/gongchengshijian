/**
 * Created by xiangsong on 2017/4/3.
 */
(function () {
    'use strict';
    angular.module('mainApp')
        .controller('UserCtrl',['$scope','userAjaxService','$uibModal','$state','$ngBootbox','roleAjaxService',function ($scope,userAjaxService,$uibModal,$state,$ngBootbox,roleAjaxService) {

            $scope.onSortChange = function(orderBy,asc){
                console.log(orderBy,asc);
                $scope.orderName = orderBy;
                $scope.isAsc = asc;
            }
            $scope.theadOptions  ={
            columns:[{
                thName:'用户名',
                column:'user.userid',
                sort:true
                },{
                thName:'手机号',
                column:'user.tel',
                sort:true
            },{
                thName:'邮箱',
                column:'user.mail',
                sort:true
            },{
                thName:'创建者',
                column:'user.createpeople',
                sort:true
            },{
                thName:'创建时间',
                column:'user.createtime',
                sort:true
            },{
                thName:'修改者',
                column:'user.modifypeople',
                sort:true
            },{
                thName:'修改时间',
                column:'user.modifytime',
                sort:true
            }

            ],
            orderBy:'user.userid',
            asc:true

        };

            var GetAllUser = function () {

                var postData = {
                    pageIndex: $scope.paginationConf.currentPage,
                    pageSize: $scope.paginationConf.itemsPerPage
                }
                //获取所有的用户
                userAjaxService.getList($scope.paginationConf.currentPage).then(function (result) {
                        console.log(result);
                    console.log(result.data.total);
                         $scope.paginationConf.totalItems = result.data.total;
                         $scope.userList = result.data.userList;
                }).catch(function (data) {
                    alert("网络错误");
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


            ///////////////////////////////////////设置权限//////////////////////////////////////////////

            $scope.setPower = function (userid) {

               // $state.go('base.index.power',{id:userid,isUser:true});

            }


            ///////////////////////////////////////新增用户//////////////////////////////////////////////
            $scope.add = function (item) {
                //console.log("新增"+item);
                userAjaxService.add(item).then(function (result) {
                    if(result.data.error == "none"){
                        GetAllUser();
                        alert("添加成功");

                    }else{
                        alert(result.data.error);
                    }
                }).catch(function (result) {
                    alert("添加失败");
                })

            }
            ///////////////////////////////////////新增用户End//////////////////////////////////////////////




            ///////////////////////////////////////修改用户//////////////////////////////////////////////
            $scope.modify = function (item) {
               // console.log("修改"+item);
                userAjaxService.modify(item).then(function (result) {
                    if(result.data.error=="none"){
                        GetAllUser();
                        alert("修改成功");
                    }else{
                        alert(result.data.error);
                    }
                }).catch(function (result) {
                    alert("修改失败");
                })

            }
            ///////////////////////////////////////修改用户End//////////////////////////////////////////////

            ///////////////////////////////////////删除用户Start//////////////////////////////////////////////
            $scope.delete = function (){
                console.log("删除"+$scope.selected);
              //  $ngBootbox.addLocale()
                $ngBootbox.confirm('确认要删除吗?')
                    .then(function() {
                       // console.log('Confirmed!');
                            userAjaxService.delete($scope.selected).then(function (result) {
                                if(result.data.error == "none"){
                                    GetAllUser();
                                    alert("删除成功");
                                }else{
                                    alert(result.data.error);
                                }
                            }).catch(function (result) {
                                alert("删除失败");
                            })
                    }, function() {
                        //console.log('Confirm dismissed!');
                    });

            }

            ///////////////////////////////////////删除用户End//////////////////////////////////////////////
            ///////////////////////////////////////对话框Start//////////////////////////////////////////////
            $scope.animationsEnabled = true;
            $scope.open = function (size,item) {
                //这里很关键,是打开模态框的过程
                var modalInstance = $uibModal.open({
                    animation: $scope.animationsEnabled,//打开时的动画开关
                    templateUrl: 'tpls/user/dialogcontent.html',//模态框的页面内容,这里的url是可以自己定义的,也就意味着什么都可以写
                    controller: 'ModalInstanceCtrlUser',//这是模态框的控制器,是用来控制模态框的
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

            $scope.toggleAnimation = function () {
                $scope.animationsEnabled = !$scope.animationsEnabled;//动画效果
            };
            ///////////////////////////////////////对话框End//////////////////////////////////////////////




        }])
        .controller('ModalInstanceCtrlUser', function ($scope,$uibModalInstance,userAjaxService,roleAjaxService,items) {
//这是模态框的控制器,记住$uibModalInstance这个是用来调用函数将模态框内的数据传到外层控制器中的,items则上面所说的入参函数,它可以获取到外层主控制器的参数
        $scope.item =  angular.copy(items);//这里就可以去外层主控制器的数据了
        var $ctrl = this;
           //要用深复制
            $scope.colleageInfo="";
            $scope.colleageList=[];
            $scope.roleItem={"info":""};
            $scope.classList = "";
            $scope.classItem={"info":""};
            $scope.selectedColleageInfo ={"info":""};

            if($scope.item == 'none'){
                //如果是新增用户
                roleAjaxService.getAll().then(function (result) {
                    $scope.rolelist = result.data.rolelist;
                        userAjaxService.getAllColleageName().then(function (result) {
                            $scope.colleageList  =result.data.colleagelist;
                            initData();
                        }).catch(function (result) {
                            alert("获取学院信息失败");
                        })
                    }).catch(function (result) {
                    alert("获取角色名失败");
                })

            }else{
                //如果是修改用户:
                userAjaxService.getUserOtherInfo($scope.item.userId).then(function (result) {
                    //获取用户的其他信息:
                    var userId = $scope.item.userId;
                    $scope.item = result.data.userInfo;
                    $scope.item.tel = parseInt($scope.item.tel);
                    $scope.item['userId']=userId;
                    $scope.item['password']="";
                    if(isEmptyObject(result.data)){
                        alert("获取用户信息失败");
                        return;
                    }
                    //获取角色列表

                    roleAjaxService.getAll().then(function (result) {
                        $scope.rolelist = result.data.rolelist;
                        //获取学校列表
                        if($scope.item.colleageName==""){
                            //管理员没有学校列表
                            return ;
                        }
                        userAjaxService.getAllColleageName().then(function (result) {
                            $scope.colleageList  =result.data.colleagelist;
                            //获取学院信息详细列表：
                            userAjaxService.getColleageInfoByName($scope.item.colleageName).then(function(result){
                                $scope.colleageInfo = result.data.colleageinfo;
                                $scope.item['type']="modify";
                                initData();
                            }).catch(function(result){
                                alert("请求学院专业列表失败");
                            });
                        }).catch(function (data) {
                            alert("获取学院信息失败 ");
                        })

                        }).catch(function (data) {
                            alert("获取角色失败");
                        })
                    }).catch(function (result) {
                    alert("获取用户详细信息失败");
                    })

            }


            var initData = function () {
                if($scope.item == 'none'){
                    $scope.title = "新增用户";
                    $scope.item = {"username":"","tel":'',"mail":"","type":"add"};
                }else{
                    // $scope.colleageInfo =[
                    //     {"professionName":"数学与计算机","classList":[{"classId":1,"name":"计算机技术1班"},{"classId":2,"name":"计算机技术2班"}]},
                    //     {"professionName":"英语","classList":[{"classId":3,"name":"英语1班"},{"classId":4,"name":"英语2班"}]}
                    // ]
                    //$scope.rolelist = [{"roleId":1,"roleName":"教师"},{"roleId":2,"roleName":"管理员"}];
                    $scope.title = "修改用户";
                    $scope.item['type'] ="modify";
                    //$scope.item['colleageName']="福州大学";
                    //判断角色是第几项:
                    var roleIndex = -1 ;
                    for(var i=0;i<$scope.rolelist.length;i++){
                        if($scope.item.roleId == $scope.rolelist[i].roleId){
                            roleIndex = i ;
                        }
                    }
                    //判断学校是第几项:
                    var colleageIndex =  -1;
                    for(var i=0;i<$scope.colleageList;i++){
                        if($scope.item.colleageName == $scope.colleageList[i]){
                            colleageIndex =  i;
                        }
                    }
                    var professionIndex = -1 ;
                    //判断学院信息是第几项:
                    for(var i=0;i<$scope.colleageInfo.length;i++){
                        if($scope.item.professionName == $scope.colleageInfo[i].professionName){
                            professionIndex = i;
                        }
                    }
                    //判断班级是第几项:
                    var classIndex = -1 ;
                    for(var i=0;i<$scope.colleageInfo[professionIndex].classList.length;i++){
                        if($scope.item.classId == $scope.colleageInfo[professionIndex].classList[i].calssID){
                            classIndex = i ;
                        }
                    }
                    $scope.roleItem.info =$scope.rolelist[roleIndex];
                    $scope.selectedColleageInfo.info =  $scope.colleageInfo[professionIndex];
                    $scope.classList = $scope.selectedColleageInfo.info.classList;
                    $scope.classItem.info = $scope.selectedColleageInfo.info.classList[classIndex];
                }
            }





          //  $scope.rolelist = [{"roleId":1,"roleName":"教师"},{"roleId":2,"roleName":"管理员"}];
            //$scope.item['colleageName']="福州大学";
          //  请求学校列表
          //   userAjaxService.getColleageName().then(function (result) {
          //       $scope.colleageList  =result.data;
          //   }).catch(function (data) {
          //       alert("请求学院列表失败");
          //   })
          //   roleAjaxService.getAll().then(function (result) {
          //
          //   }).catch(function (data) {
          //       alert("获取角色列表失败 ");
          //   })

            //学校 学院 班级 ngChange

            $scope.changeColleage =function () {
                $scope.classItem={"info":""};

                // $scope.colleageInfo =[
                //     {"professionName":"数学与计算机","classList":[{"classId":1,"name":"计算机技术1班"},{"classId":2,"name":"计算机技术2班"}]},
                //     {"professionName":"英语","classList":[{"classId":3,"name":"英语1班"},{"classId":4,"name":"英语2班"}]}
                // ]
                userAjaxService.getColleageInfoByName($scope.item.colleageName).then(function(result){
                    $scope.colleageInfo = result.data.colleageinfo;
                }).catch(function(result){
                    //请求学院专业列表
                    alert("请求学院专业列表失败");
                });
            }
            $scope.changeProfession =function () {
                // console.log($scope.selectedColleageInfo);
                $scope.classList =  $scope.selectedColleageInfo.info.classList;
                $scope.item.professionName = $scope.selectedColleageInfo.info.professionName;

            }

            $scope.changeClass =function () {
                if($scope.classItem.info==""){
                    return ;
                }
                $scope.item.classId = $scope.classItem.info.classId;
                //console.log($scope.item);
            }






                $scope.ok = function () {
                    $scope.item.roleId = $scope.roleItem.info.roleId;
                console.log($scope.item);
            //close函数是在模态框关闭后调用的函数,他会将这个参数传到主控制器的results函数中,作为回调值
            $uibModalInstance.close($scope.item);
        };

        $scope.cancel = function () {
            //dismiss也是在模态框关闭的时候进行调用,而它返回的是一个reason
            $uibModalInstance.dismiss('cancel');
        };
    })
})()

