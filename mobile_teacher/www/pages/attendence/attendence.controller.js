(function () {
        'use strict';
        angular.module('starter.controllers')
            .controller('AttendCtrl',['$scope','$ionicPopup','$ionicLoading','$state','$ionicHistory','attendAjaxService','courseAjaxService','$interval','$rootScope','$cordovaToast','$filter',function ($scope,$ionicPopup,$ionicLoading,$state,$ionicHistory,attendAjaxService,courseAjaxService,$interval,$rootScope,$cordovaToast,$filter) {
              //日期选择器：

              var disabledDates = [
                new Date(1437719836326),
                new Date(),
                new Date(2015, 7, 10), //months are 0-based, this is August, 10th!
                new Date('Wednesday, August 12, 2015'), //Works with any valid Date formats like long format
                new Date("08-14-2015"), //Short format
                new Date(1439676000000) //UNIX format
              ];
          //方便的年月日设置方式


              var weekDaysList = ["日", "一", "二", "三", "四", "五", "六"];
              //默认值：["S", "M", "T", "W", "T", "F", "S"];
              var monthList = ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"];
              //默认值：["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

          //日期选择后的回调函数
              var datePickerCallbacks = function (val) {
                if (typeof (val) === 'undefined') {
                } else {
                  //利用日期选择器
                  //console.log('Selected date is : ',$filter('date')(val,$scope.datepickerObjectEnd.dateFormat));
                  $scope.datepickerObjectEnd.inputDate = val;  //这行官网没有，不设置 的话，选中日期不能回填到页面。
                  var setDate = $filter('date')(val,$scope.datepickerObjectEnd.dateFormat);

                  //发送请求获取选中日期该教师的所有课程:
                  // courseAjaxService.getCourseInfoByDayAndTid(setDate).success(function (data,status,headers,config) {
                  //   $scope.courseInfoList = data;
                  // }).error(function (data,status,headers,config) {
                  //
                  // })
                }
              };
//主体对象
              $scope.datepickerObjectEnd = {
                titleLabel: '选择日期',  //可选
                todayLabel: '今天',  //可选
                closeLabel: '关闭',  //可选
                setLabel: '设置',  //可选
                setButtonType: 'button-assertive',  //可选
                todayButtonType: 'button-assertive',  //可选
                closeButtonType: 'button-assertive',  //可选
                inputDate: new Date(),  //可选，输入值
                mondayFirst: true,  //可选,星期一开头
                disabledDates: disabledDates, //可选
                weekDaysList: weekDaysList, //可选
                monthList: monthList, //可选
                templateType: 'popup', //可选i.e.的模式 modal or popup(兼容模式？)
                showTodayButton: 'true', //可选
                modalHeaderColor: 'bar-positive', //可选
                modalFooterColor: 'bar-positive', //可选
                from: new Date(2008, 8, 2), //可选
                to: new Date(2030, 8, 25),  //可选
                callback: function (val) {  //Mandatory
                  datePickerCallbacks(val);
                },
                dateFormat: 'yyyy-MM-dd', //可选
                closeOnSelect: true, //可选,设置选择日期后是否要关掉界面。呵呵，原本是false。
              };


              //下载有几牌，几列:
              $scope.imgArrSeatSrc = ['pages/attendence/img/offseat.png','pages/attendence/img/seat.png'];

                //从服务端获得该教师当天的课程信息
              $scope.courseInfoList =
              [
                {
                  infoId:1,
                  courseName:"工程实践",
                  isSetInfo:true,
                  seatRowCount:3,
                  seatDistribution:"000000000000000",
                },
                {
                  infoId:2,
                  courseName:"工程实践2",
                  isSetInfo:false,
                  seatRowCount:2,
                  seatDistribution:"0000000000",
                },

              ];


              $scope.attendDetail = {
                info:""
              };
              $scope.changeCourse = function () {
                $scope.rowCount =  $scope.attendDetail.info.seatRowCount;
                $scope.colCount =  $scope.attendDetail.info.seatDistribution.length/$scope.attendDetail.info.seatRowCount;

                // attendAjaxService.getStudentAttendInfo($scope.attendDetail.info.infoId).success(function () {
                //   $scope.studentAttendInfoList = data;
                // }).error(function () {
                //   $cordovaToast.showShortTop("网络错误");
                // })


                //获取学生的信息
                $scope.studentAttendInfoList  =[
                  {
                    infoId:1,
                    sId:2,
                    userName:"学生1",
                    isAttend:1,
                    isLate:0,
                    attendPosition:0
                  },
                  {
                    infoId:1,
                    sId:2,
                    userName:"学生2",
                    isAttend:1,
                    isLate:1,
                    attendPosition:1
                  },
                  {
                    infoId:1,
                    sId:2,
                    userName:"学生3",
                    isAttend:1,
                    isLate:1,
                    attendPosition:2
                  },
                  {
                    infoId:1,
                    sId:2,
                    userName:"学生4",
                    isAttend:1,
                    isLate:0,
                    attendPosition:3
                  },
                  {
                    infoId:1,
                    sId:2,
                    userName:"学生5",
                    isAttend:1,
                    isLate:0,
                    attendPosition:4
                  },
                  {
                    infoId:1,
                    sId:2,
                    userName:"学生6",
                    isAttend:1,
                    isLate:0,
                    attendPosition:5
                  },
                  {
                    infoId:1,
                    sId:2,
                    userName:"哈哈7",
                    isAttend:1,
                    isLate:0,
                    attendPosition:6
                  },
                  {
                    infoId:1,
                    sId:2,
                    userName:"哈哈8",
                    isAttend:1,
                    isLate:0,
                    attendPosition:7
                  },
                  {
                    infoId:1,
                    sId:2,
                    userName:"哈哈9",
                    isAttend:1,
                    isLate:0,
                    attendPosition:8
                  },
                  {
                    infoId:1,
                    sId:2,
                    userName:"哈哈10",
                    isAttend:1,
                    isLate:0,
                    attendPosition:9
                  }

                ];

                $scope.arrSeat = []; //用于维护座位的显示
                //$scope.arrSeat =[$scope.rowCount,$scope.colCount];
                var totalSeat = $scope.attendDetail.info.seatDistribution.length;
                var col  =  totalSeat/parseInt($scope.attendDetail.info.seatRowCount);
                var row = parseInt($scope.attendDetail.info.seatRowCount);

                $scope.arrSeat =[];
                //初始化arrSeat
                for(var i = 0 ;i<row ;i++){
                  $scope.arrSeat.push([]);
                  for(var j=0;j<col;j++){
                    $scope.arrSeat[i].push({"isAttend":0});
                  }
                }
                var rowCount  = $scope.attendDetail.info.seatRowCount; //总共的行数
                var colCount  = $scope.attendDetail.info.seatDistribution.length/rowCount;
                // console.log(null=="");
                for(var i=0;i<$scope.studentAttendInfoList.length;i++){
                  if($scope.studentAttendInfoList[i].isAttend == 0 || $scope.studentAttendInfoList[i].attendPosition === ""||$scope.studentAttendInfoList[i].attendPosition == -1){
                    //console.log($scope.studentAttendInfoList[i].isAttend==0,$scope.studentAttendInfoList[i].attendPosition=="");
                    continue ;
                  }
                  var rowIndex,colIndex;
                  var test = $scope.studentAttendInfoList[i].attendPosition;
                  rowIndex  = Math.floor(($scope.studentAttendInfoList[i].attendPosition/colCount));
                  colIndex  = $scope.studentAttendInfoList[i].attendPosition%colCount;
                  $scope.arrSeat[rowIndex][colIndex] = $scope.studentAttendInfoList[i];
                  if($scope.studentAttendInfoList[i].isLate == 1 ){
                    $scope.studentAttendInfoList[i]['isLateText'] ="已迟到";
                  }else{
                    $scope.studentAttendInfoList[i]['isLateText'] ="未迟到";
                  }
                }

              //  console.log($scope.arrSeat);



              }

              $scope.attendInfo = {
                place:"",
                longitude:"",
                latitude:"",
                selectedRow:"",
                selectedCol:"",
                positionIndex:"",

              };


              $scope.getAndSetStudentInfo =function (item) {
                if(item.isAttend ==false){
                  $cordovaToast.showShortTop("该位置没有学生签到");
                  return ;
                }
                //console.log(item);
                $scope.selectedStudentInfo = item;
                $scope.teacherSetting = {
                  cancelAttend:false,
                  setLate:false,
                  setNoLate:false,
                  isSetFlag:false
                };
                if(item.isLate == 1){
                  $scope.teacherSetting.setLate = true;
                  $scope.teacherSetting.setNoLate = false;
                }else{
                  $scope.teacherSetting.setLate = false;
                  $scope.teacherSetting.setNoLate = true;
                }
///////////////////////
                $scope.setLate = function (flag) {
                  $scope.teacherSetting.isSetFlag  =true;
                  if(flag ==  1 ){
                    $scope.teacherSetting.setNoLate = !$scope.teacherSetting.setNoLate;
                  }else{
                    $scope.teacherSetting.setLate = !$scope.teacherSetting.setLate;
                  }

                }


                $ionicPopup.show({
                  title: '查看设置学生签到',
                  scope: $scope,
                  templateUrl: 'pages/attendence/attendInfoTpl.html',
                  buttons: [{
                    text: '取消',
                    type: 'button-energized button-outline',
                    onTap: function (e) {
                      //e.preventDefault();
                    }
                  },
                    {
                      text: '确定',
                      type: 'button-energized',
                      onTap: function (e) {
                        $ionicLoading.show({
                          template:'<ion-spinner icon="ios" class="light"></ion-spinner>正在设置中.......'
                          //template:'数据加载中，请稍后.......'
                        });
                        try {
                          console.log($scope.teacherSetting.isSetFlag);
                          if($scope.teacherSetting.isSetFlag){
                            var postData = {
                              isLate:"",
                              isAttend:"",
                              sId:"",
                              infoId:"",
                              attendPosition:"",
                            };
                            postData.isLate = $scope.teacherSetting.setLate==true?1:0;
                            postData.infoId = $scope.selectedStudentInfo.infoId;
                            postData.isAttend =  $scope.teacherSetting.cancelAttend==true?0:1;
                            postData.sId = $scope.selectedStudentInfo.sId;
                            if(postData.isAttend == 0){
                              postData['attendPosition'] = -1;
                            }
                            attendAjaxService.setStudentAttendByTeacher(postData).success(function (data,status,headers,config) {
                                if(data.error == "none"){
                                  $cordovaToast.showShortTop("设置成功");
                                }else{
                                  $cordovaToast.showShortTop(data.error);
                                }
                            }).error(function (data,status,headers,config) {
                              $cordovaToast.showShortTop("网络连接错误");
                            })
                            console.log(postData);
                          }

                          // if($scope.product.Supplier.Name!=null || $scope.product.Supplier.Name!=undefined || $scope.product.Supplier.Name!="")
                          //   $scope.product1.SupplierName = $scope.product.Supplier.Name;
                          // else{
                          //   $ionicPopup.alert({
                          //     title:'提示' ,
                          //     template:'供货商不能为空',
                          //     okText:'确定',
                          //     okType:'button-energized button-block'
                          //   });
                          // }
                        }
                        catch (e) {

                        }
                        $ionicLoading.hide();
                        //return $scope.data.response;
                      }
                    }]
                });
              }




            }])

})()
