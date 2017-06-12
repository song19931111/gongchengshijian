(function () {
    'use strict';
    angular.module('starter.controllers')
        .controller('findAttendCtrl', ['$scope','$timeout','courseAjaxService','$ionicLoading','PAGE_SIZE', function ($scope,$timeout,courseAjaxService,$ionicLoading,PAGE_SIZE) {
          $scope.hasMore = true ;
          $scope.pageIndex = 0;
          $scope.imgSrc =['pages/attendence/img/offattend.png','pages/attendence/img/onattend.png']
          $scope.courseInfo = [];
          //请求第一页数据:
          $ionicLoading.show({
            template:'<span style="text-align:right;"><ion-spinner icon="ios" class="light"></ion-spinner>正在获取位置，请稍后.......</span>'
            //template:'数据加载中，请稍后.......'
          });
          courseAjaxService.getCompleteCourseInfo($scope.pageIndex).then(function (result) {
            //获得数据
            var total =result.data.total;
            $scope.courseInfo = result.data.rows;
            $scope.pageIndex +=1 ;
            //判断有几页:
            if(total%PAGE_SIZE != 0){
            $scope.pageCount  = total/PAGE_SIZE + 1 ;
            }else{
              $scope.pageCount  = total/PAGE_SIZE;
            }
            $ionicLoading.hide();
          }).catch(function (error) {
            alert("网络错误");
            $ionicLoading.hide();
          })

          $scope.loadMore = function () {

              // $scope.$broadcast('scroll.refreshComplete');
              // $scope.$broadcast('scroll.infiniteScrollComplete');
            courseAjaxService.getCompleteCourseInfo($scope.pageIndex).then(function (result) {
              $scope.pageIndex+=1;
              $scope.courseInfo = $scope.courseInfo.concat(result.data.rows);
              if($scope.pageIndex>=$scope.pageCount){
                $scope.hasMore = false ;
                $scope.$broadcast('scroll.infiniteScrollComplete');
              }
            }).catch(function (error) {
              alert("网络错误");
            })

          }
        }])

})()
