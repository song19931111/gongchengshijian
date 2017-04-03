/**
 * Created by xiangsong on 2017/4/4.
 */
angular.module('mainApp')
    .directive('myDialog',[function () {
        return{
            restrict:'AE',
            transclude:true,
            replace:true,
            template:'<div class="modal" tabindex="-1" role="dialog">\
                    <div class="modal-dialog" role="document">\
                        <div class="modal-content">\
                        <div class="modal-header">\
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>\
                <h4 class="modal-title">Modal title</h4>\
                </div>\
                <div class="modal-body" ng-transclude>\
                </div>\
                <div class="modal-footer">\
                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>\
                    <button type="button" class="btn btn-primary" ng-click="fun()">Save changes</button>\
                </div>\
                </div>\
                </div>\
                </div>',
            scope:{
                fun:'&',
                url:'@'
            },
            controller:function ($scope,$element,$attrs){
//                        $ionicPopup.show({
//                                    title:'对话框',
//                                    templateUrl:$scope.url,
//                                    buttons:[
//                                        {text:'取消',
//                                            type:"button-default button-energized"},
//                                        {text:'确认',
//                                            type:"button-positive button-energized",
//                                            onTap:$scope.fun
//                                        }
//                                    ]
//                        }
//                        )
            }
        };
    }])