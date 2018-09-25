<template>
    <div class="tree-part">
        <div class="lib-filter-operations">
            <Row :gutter="20">
                <Col span="18"><Input v-model="itemKey" placeholder="搜索字典值"
                    @keyup.native.enter="getTreeData"
                    @click.native="showScroll"></Input></Col>
                <Col span="6"><Button class="create-lib-node" @click="addnewNode('new', 1)">+</Button></Col>
            </Row>
            <ScrollMore></ScrollMore>
        </div>
        <div class="lib-title">
            <h2>字典值</h2>
        </div>
        <Treelist root noBorder noTag
            :treeData="Data" 
            :sparkLine="sparkLine"
            :operations="treeOperations"
            @select="treeOpetions"></Treelist>
        <Modalfrom ref="modal"
            :formItems="formItems"
            @success="submitData"
            :title="modalTitle"
            :type="modalType"></Modalfrom>
        <Confirm ref="confirm" @success="submitData"></Confirm>
    </div>
</template>

<script>
import PageConfig from './pageConfig.js'
import ScrollMore from './scrollMore'
  export default {
    name: "treelist",
    components: {
        ScrollMore,
        Modalfrom: () => import('@/components/syscomponents/modalValidateForm.vue')
    },
    props: {
        filterItem: {
            type: Object,
            default: function() { return {} }
        }
    },
    data () {
        let self = this
        return {
            pageName: "libtree",
            sparkLine: {height: 10, width: 10, top: 11, left: -18},
            urls: {
                getList: self.Path.loadTConfigListTree,
                add: self.Path.addTItemValue,
                addChild: self.Path.addTItemValue,
                update: self.Path.updateTItemDefine,
                delete: self.Path.deleteTItemValue
            },
            treeOperations: [
                { title: '添加', type: "addChild" },
                { title: '修改', type: "modify" },
                { title: '删除', type: "delete" }
            ],
            itemKey: null,
            refName:'',
            treeNodeData: [],
            PageConfig: self.deepcopy(PageConfig),
            formItems: [],
            modalTitle: '',
            modalType: ''
        }
    },
    created() {
        BUS.$on('filter', (param, pageName) => {
            if (pageName !== this.pageName) return
            this.getTreeData(param)
        })
        BUS.$on('getItemKey', val => {
            this.itemKey = val
            this.getTreeData()
        })
        this.refName = "tree" + Date.now();
        this.getTreeData()
    },
    computed:{
        Data () {
            return this.sortTreeData(this.treeNodeData)
        }
    },
    methods:{
        sortTreeData (arr) {
            arr.sort((item1, item2) => { return item1.menuOrder - item2.menuOrder })
            arr.forEach(item => {
                if (Array.isArray(item.children)) {
                    this.sortTreeData(item.children)
                }
            });
            return arr
        },
        submitData (param, type) {
            switch (type) {
                case 'add':
                    this.addnewNode(param)
                    break;                    
                case 'addChild':
                    this.addTreeNode(param)
                    break;
                case 'modify':
                    this.modifyTreeNode(param, true)
                    break;
                case 'delete':
                    this.deleteTreeNode(param)
                    break;
            }
        },
        treeOpetions(val, type) {
            if (type === 'addChild') {
                this.addTreeNode(val, true)
            } else if (type === 'modify') {
                this.modifyTreeNode(val, true)
            } else if (type === 'delete') {
                this.deleteTreeNode(val, true)
            } else {
                BUS.$emit('dataLibTree', val)
            }
        },
        addTreeNode(val, confirm) {
            if (confirm) {
                let title = '添加字典';
                this.setModalOpen({
                    visible: true,
                    title: title,
                    type: 'addChild',
                    data: {itemPv: val.currentNode.itemPv },
                    initFormItems: [
                            { label: '字典父键值：', prop: 'itemPv'},
                            { label: '字典值：', prop: 'itemValue' },
                            { label: '字典键值：', prop: 'itemKey' }
                        ]
                    });
            } else {
                val.menuName = val.title
                delete val.title
                delete val.menuId
                this.$post(this.urls.add, val).then(res => {
                    this.setModalOpen();
                    this.getTabeData();
                })
            }

            // let childNode = {
            //         title: 'new',
            //         order: -1
            //     }
            // let currentChildren = val.currentNode.children || []
            // currentChildren.push(childNode)
            // this.$root.Bus.$emit('apartProcess', 'addApart', this.currVal)
            // this.$set(val.currentNode, 'children', currentChildren)
        },
        modifyTreeNode(val, confirm) {
            if (confirm) {
                let title = '修改字典';
                this.setModalOpen({
                    visible: true,
                    title: title,
                    type: 'modify',
                    data: { itemPv: val.currentNode.itemPv,
                            itemValue: val.currentNode.itemValue,
                            itemKey: val.currentNode.itemKey},
                    initFormItems: [
                            { label: '字典父键值：', prop: 'itemKey'},
                            { label: '字典值：', prop: 'itemValue' },
                            { label: '字典键值：', prop: 'itemKey' }
                        ]
                    });
            } else {
                val.menuName = val.title
                delete val.title
                delete val.menuId
                this.$post(this.urls.add, val).then(res => {
                    this.setModalOpen();
                    this.getTabeData();
                })
            }
        },
        deleteTreeNode(val, confirm) {            
            if (confirm) {
                let currNode = val.currentNode
                let _html = "<p>你确定要删除此菜单吗？</p>";
                let _enable = false;
                if (!currNode) {
                    _enable = true
                    _html = "<p>请选择要删除的菜单。</p>"
                } else if (currNode.children.length > 0) {
                    _enable = true
                    _html = "<p>当前字典值有下级或字典子值，无法删除，请先删除下级值或字典子值！</p>"
                }
                this.confirm({
                    visible: true,
                    type: 'delete',
                    html: _html,
                    data: currNode,
                    enable: _enable
                })
            } else {
                let currNode = val.currentNode
                this.$post(this.urls.delete, {
                    id: currNode.itemKey
                }).then(res => {
                    this.$Message.info('删除成功！');
                    this.confirm();                    
                    let currIndex = val.currentIndex
                    val.parentNode.splice(currIndex, 1)
                })
            }
        },
        addnewNode(val, confirm) {
            if (confirm) {
                let title = '添加字典';
                this.setModalOpen({
                    visible: true,
                    title: title,
                    type: 'add',
                    initFormItems: [
                            { label: '字典值：', prop: 'itemValue' },
                            { label: '字典键值：', prop: 'itemKey' }
                        ]
                    });
            } else {
                val.menuName = val.title
                delete val.title
                delete val.menuId
                this.$post(this.urls.add, val).then(res => {
                    this.setModalOpen();
                    this.getTabeData();
                })
            }
        },
        getTreeData() {
            // 获取列表
            let api = this.urls.getList;
            if (!api) return;
            let param = { itemKey: this.itemKey }
            this.$post(api, param).then(res => {
                try {
                    this.treeNodeData = this.transformData(res.data, 'subTreeList')
                } catch (err) {
                    this.treeNodeData = []
                    console.log(err)
                }
                BUS.$emit('showItemkeyScroll', false)
            })
        },
        transformData(item, sub, reverse, rules) {
            let _rules = rules || {
                "itemKey": "itemKey",
                "itemValue": "itemValue",
                "itemName": "title",
                "itemPv": "itemPv",
                "itemIdx": "order",
                "itemJson": "itemJson",
                "itemHtml": 'itemHtml',
                "subTreeList": "children"
            }
            let data = this._transformData(item, _rules, reverse, sub)
            return data
        },
        showScroll() {
            BUS.$emit('showItemkeyScroll', true)
        }
    }
}
</script>

<style lang="stylus">
@import '~@/assets/css/customerVar.styl'
.menu-tree 
    .tree-part 
        .lib-filter-operations
            position relative
            border-bottom 1px solid ykt-border-color1
            padding 10px
            background #f2f2f2
            .create-lib-node
                color #12aeef
                font-size 34px
                font-weight 800
                height 32px
                line-height 16px
        .lib-title
            height 40px
            line-height 40px
            text-indent 40px
            border-bottom 1px solid ykt-border-color1
            background #f2f2f2
</style>