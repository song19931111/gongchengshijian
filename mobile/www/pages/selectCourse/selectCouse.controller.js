(function () {
    'use strict';
    angular.module('starter.controllers')
        .controller('selectCourseCtrl', ['$scope','courseAjaxService','$cordovaToast','$ionicHistory', function ($scope,courseAjaxService,$cordovaToast,$ionicHistory) {

          //获取比当前日期晚,并没有选的课程列表:

          courseAjaxService.getInfoByProfessionName().success(function (data,status,headers,config) {
            $scope.courseList =data;
          }).error(function (data,status,headers,config) {
            $cordovaToast.showShortTop("选课成功");
          })

          $scope.courseList =[
            {
              cId:"1",
              courseName:"语文",
              teacherName:"哈哈",
              startTime:"2016-6-7",
              endTime:"2016-7-7",
              period:32
            },
            {
              cId:"2",
              courseName:"语文1",
              teacherName:"哈哈",
              startTime:"2016-6-7",
              endTime:"2016-7-7",
              period:32
            },
            {
              cId:"3",
              courseName:"语文2",
              teacherName:"哈哈",
              startTime:"2016-6-7",
              endTime:"2016-7-7",
              period:32
            },
            {
              cId:"4",
              courseName:"语文3",
              teacherName:"哈哈",
              startTime:"2016-6-7",
              endTime:"2016-7 -7",
              period:32
            }
          ]


          $scope.selectItem = function (index) {
            var checkbox_array  = document.getElementsByName("singerCheckbox");
            var checkbox = checkbox_array[index];
            checkbox.checked = !checkbox.checked;
            var action = (checkbox.checked?'add':'remove');
            updateSelected(action,index);
          }
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
          $scope.confirm = function () {
            //提交选课信息:
            var cIdList = [];
            for(var i = 0;i<$scope.selected.length;i++){
              cIdList.push($scope.courseList[$scope.selected[i]].cId);
            }
            if($scope.selected.length > 0){
                //console.log(cIdList);
              //console.log(angular.toJson(cIdList));
              courseAjaxService.addSelectedCourse(cIdList).success(function (data,status,headers,config) {
                  if(data.error == "none"){
                    $cordovaToast.showShortTop("选课成功");
                    $ionicHistory.goBack();
                  }
              }).error(function (data,status,headers,config) {
                $cordovaToast.showShortTop("提交失败");
                $ionicHistory.goBack();
              })
            }
          }

        }])

})()
