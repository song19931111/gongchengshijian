/**
 * Created by xiangsong on 2017/4/9.
 */
angular.module("myApp", []).
controller("TreeController", ['$scope', function($scope) {
    var gtree = [
        {
            "id": "2",
            "name": "a1",
            "isOpen": true,
            "type": 1,
            "child": [
                {
                    "id": "3",
                    "name": "a2",
                    "isOpen": true,
                    "type": 1,
                    "child": [
                        {
                            "id": "4",
                            "name": "小王",
                            "isChecked": 1,
                            "isOpen": true,
                            "type": 2
                        },
                        {
                            "id": "5",
                            "name": "么么",
                            "isChecked": 0,
                            "isOpen": true,
                            "type": 2
                        },
                        {
                            "id": "6",
                            "name": "你爹",
                            "isChecked": 0,
                            "isOpen": true,
                            "type": 2
                        }
                    ],
                    "child_nums": 3,
                    "isChecked": 2
                }
            ],
            "child_nums": 1,
            "isChecked": 2
        },
        {
            "id": "9",
            "name": "b1",
            "isOpen": true,
            "type": 1,
            "child": [
                {
                    "id": "8",
                    "name": "b2",
                    "isOpen": true,
                    "type": 1,
                    "child": [
                        {
                            "id": "7",
                            "name": "ZXY",
                            "isChecked": 1,
                            "isOpen": true,
                            "type": 2
                        },
                        {
                            "id": "13",
                            "name": "丽丽",
                            "isChecked": 1,
                            "isOpen": true,
                            "type": 2
                        },
                        {
                            "id": "12",
                            "name": "啦啦啦",
                            "isChecked": 1,
                            "isOpen": true,
                            "type": 2
                        }
                    ],
                    "child_nums": 3,
                    "isChecked": 1
                }
            ],
            "child_nums": 1,
            "isChecked": 1
        },
        {
            "id": "14",
            "name": "c1",
            "isOpen": true,
            "type": 1,
            "child": {
                "isChecked": 0
            },
            "child_nums": 0
        },
        {
            "id": "69473",
            "name": "分组",
            "isOpen": true,
            "type": 1,
            "child": [
                {
                    "id": "15",
                    "name": "分组1",
                    "isOpen": true,
                    "type": 1,
                    "child": [
                        {
                            "id": "23",
                            "name": "测试柯",
                            "isChecked": 0,
                            "isOpen": true,
                            "type": 1,
                            "child": [
                                {
                                    "id": "16",
                                    "name": "测试柯",
                                    "isChecked": 0,
                                    "isOpen": true,
                                    "type": 2
                                }
                            ]
                        },
                        {
                            "id": "24",
                            "name": "美眉",
                            "isChecked": 0,
                            "isOpen": true,
                            "type": 1
                        }
                    ],
                    "child_nums": 2,
                    "isChecked": 0
                },
                {
                    "id": "26",
                    "name": "分组2",
                    "isOpen": true,
                    "type": 1,
                    "child": {
                        "isChecked": 0
                    },
                    "child_nums": 0
                }
            ],
            "child_nums": 2,
            "isChecked": 0
        }
    ];
    tree = [{'name' : "全部", "isRoot":true, "isOpen":true,"type" : 1,"child":gtree,"isChecked":"1","pathes":[]}];
    $scope.tree = tree;
    makeTree($scope.tree,1);

    console.log(tree)


    //工具函数
    /**
     * 展开关闭
     * @param  {object} data 当前节点数据
     */
    $scope.switchOper = function(data) {
        if(data.isOpen){
            data.isOpen=false;
        }else{
            data.isOpen=true;
        }
    };
    /**
     * 改变选择状态
     * @param  {object} data 当前节点数据
     */
    $scope.change = function(data,type){
        var istotal = 0;
        if(data.isChecked ==0){//非选择状态则全选(遇到有空分组则部分选择)
            if(data.blankChild){
                data.isChecked = 2;
            }else{
                data.isChecked = 1;
            }
            selectAll(data,1);
        }else{//全选状态或者部分全选则取消选择
            data.isChecked = 0;
            selectAll(data,0);
        }
        // console.log(data)
        checkParent(data);
    }
    /**
     * makeTree 加工树数据
     * @param  {object} tree 原始树结构
     * @param  {number} type 获取类型
     */
    function makeTree(tree,type){
        var len = tree.length,
            clen = 0,
            temp = null,
            path = '';
        for(var i=0;i<len;i++){
            if(tree[i].child instanceof Array){
                tree[i].parent ? path=tree[i].parent.path + '["child"]' + '['+i+']' : path='['+i+']';
                tree[i].path = path ;
                temp = tree[i].child;
                clen = temp.length;
                if(clen == 0){
                    tree[i].isLeaf = true;
                    if(tree[i].type == 1){
                        tree[i].isChecked = "none";//无人员分组
                        if(tree[i].parent)
                            tree[i].parent.blankChild = true;//是否含有空分组
                    }
                }
                for(var j=0; j<clen; j++){
                    temp[j].parent = tree[i];
                    // temp[j].path = temp[j].parent.path + 'child';
                    if(temp[j].isChecked==undefined){
                        temp[j].isChecked =0;
                    }
                    if(temp[j].isChecked == 2 && temp[j].parent.isRoot){//当子节点存在中间状态并且其父节点是根节点的时候
                        temp[j].parent.isChecked = 2;
                    }
                }
                makeTree(temp,type);
            }else{
                tree[i].parent ? path=tree[i].parent.path + '["child"]' + '['+i+']' : path='['+i+']';
                tree[i].path = path ;
                if(type == 1){
                    console.log(tree[0].pathes)
                    $scope.tree[0].pathes.push(tree[i].path);
                }else if(type == 2){
                    //如果是多棵树的时候绑定多个scope值用type区分
                }
                tree[i].child = [];
                tree[i].isLeaf = true;
                if(tree[i].type == 1){
                    tree[i].isChecked = "none";//无人员分组
                    if(tree[i].parent)
                        tree[i].parent.blankChild = true;//是否含有空分组
                }
            }
        }
    }
    // 选择父节点
    function checkParent(data){
        if(!data.parent) return;
        var len = data.parent.child.length,
            total = 0,
            have = 0,
            uncheck = 0;
        if(data.isChecked == 2){
            data.parent.isChecked = 2;
        }else{
            for(var i=0;i<len;i++){
                if(data.parent.child[i].isChecked == 1){
                    total++;
                }else if(data.parent.child[i].isChecked == 2){
                    have++;
                }
            }
            if(total == len){
                data.parent.isChecked = 1;
            }else if(total > 0){
                data.parent.isChecked = 2;
            }else if(total == 0){
                if(have>0){
                    data.parent.isChecked = 2;
                }else{
                    data.parent.isChecked = 0;
                }
            }
        }
        checkParent(data.parent);
    }
    /**
     * 选择所有子集
     */
    function selectAll(data, ischeck){
        for(var i=0;i<data.child.length;i++){
            if(data.child[i].isChecked!="none"){
                if(data.child[i].blankChild && ischeck){
                    data.child[i].isChecked = 2;
                }else{
                    data.child[i].isChecked = ischeck;
                }
            }
            if(data.child[i].child.length>0){
                selectAll(data.child[i], ischeck);
            }
        }
        // console.log(data.nodes)
    }
    /**
     * getSelctPersons 遍历所有人员挑出被选则的
     * @param  {string} rootKey    对象的名字
     * @param  {array}  pathes      人员路径数组
     * @return  {array}   persons   被选择的人员数组
     */
    function getSelctPersons(rootKey, pathes){
        var len = pathes.length,
            temp,
            persons = [];
        for(var i=0;i<len;i++){
            temp = eval(rootKey+pathes[i]);
            if(temp.isChecked == 1){
                persons.push({
                    id : temp.id,
                    name : temp.name,
                    department : temp.parent.id
                });
            }
        }
        return persons;
    }
    // getSelctPersons('$scope["tree"]', $scope.tree[0].pathes);//获取所有选择的人员
    /**
     * [removeParent 删除树中的递归访问 parent字段]
     * @param  {object} tree 处理过的树结构数据
     */
    function removeParent(tree){
        var len = tree.length;
        for(var i=0;i<len;i++){
            if(tree[i].parent){
                tree[i].parent = null;
            }
            removeParent(tree[i].child);
        }
    }
}]);