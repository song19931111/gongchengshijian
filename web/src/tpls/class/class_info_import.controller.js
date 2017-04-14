/**
 * Created by xiangsong on 2017/4/12.
 */
/**
 */
(function () {
    'use strict';
    angular.module('mainApp')
        .controller('ClassInfoImportCtrl',['$scope','FileUploader',function ($scope,FileUploader) {
            $scope.uploadStatus =  false; //定义两个上传后返回的状态，成功获失败
            var uploader = $scope.uploader = new FileUploader({
                url: 'upload.php',
                queueLimit: 1,     //文件个数
                removeAfterUpload: true   //上传后删除文件
            });

            $scope.clearItems = function(){    //重新选择文件时，清空队列，达到覆盖文件的效果
                uploader.clearQueue();
            }

            uploader.onAfterAddingFile = function(fileItem) {
                $scope.fileItem = fileItem._file;    //添加文件之后，把文件信息赋给scope
            };

            uploader.onSuccessItem = function(fileItem, response, status, headers) {
                $scope.uploadStatus = true;   //上传成功则把状态改为true
            };

            $scope.UploadFile = function(){
                uploader.uploadAll();
                if(status) {
                }
            };
            $scope.showFile={
                showFileString:''
            };
            $scope.fileChange=function (ele) {
                if(ele){
                    //console.log(ele.files[0].name);
                    $scope.showFile.showFileString=ele.files[0].name;
                    $scope.$apply();
                }
                else{
                    $scope.showFile.showFileString="";
                }
            };

            $scope.showFile={
                showFileString:''
            };
            $scope.fileChange=function (ele) {
                if(ele){
                    //console.log(ele.files[0].name);
                    $scope.showFile.showFileString=ele.files[0].name;
                    $scope.$apply();
                }
                else{
                    $scope.showFile.showFileString="";
                }
            };

        }])

})()/**
 * Created by xiangsong on 2017/4/12.
 */
