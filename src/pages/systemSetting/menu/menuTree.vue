<template>
    <div class="tree-part">
        <div class="operations">
            <Button type="primary" @click="addnewNode(currTreeNode, 1)">添加菜单</Button>
            <Button @click="modifyNode(currTreeNode, 1)">修改</Button>
            <Button @click="deleteNode(currTreeNode, 1)">删除</Button>
        </div>
        <Treelist root noBorder noTag noOperation
            :treeData="Data" 
            :sparkLine="sparkLine"
            @select="getCurTreeNode"></Treelist>
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
  export default {
    name: "treelist",
    components: {
        Modalfrom: () => import('@/components/syscomponents/modalValidateForm.vue')
    },
    props: {
        ownPage: {
            type: String,
            default: 'none'
        },
        filterItem: {
            type: Object,
            default: function() { return {} }
        }
    },
    data () {
        let self = this
        return {
            pageName: self.ownPage,
            sparkLine: {height: 10, width: 10, top: 11, left: -18},
            urls: {
                getList: self.Path.queryAuthMenuTreeBySubSystemAndBusiType,
                getItem: self.Path.getAuthMenuItemByMenuId,
                add: self.Path.saveOrUpdateAuthMenu,
                update: self.Path.saveOrUpdateAuthMenu,
                delete: self.Path.deletAuthMenu
            },
            refName:'',
            treeNodeData: [],
            currTreeNode: null,
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
                case 'modify':
                    this.modifyNode(param)
                    break;
                case 'delete':
                    this.deleteNode(param)
                    break;
            }
        },
        addnewNode(val, confirm) {
            // 添加新条目-1-打开弹窗
            if (confirm) {
                let title = '新建菜单';
                let menuParent = 0
                if (val) {
                    title = '新建子菜单';
                    menuParent = val.menuId;
                }
                this.setModal({
                    visible: true,
                    title: title,
                    type: 'add',
                    data: { menuParent: menuParent }
                    });
            } else {
                val.menuName = val.title
                delete val.title
                delete val.menuId
                this.$post(this.urls.add, val).then(res => {
                    this.setModal();
                    this.getTabeData();
                })
            }
        },
        modifyNode(val, confirm) {
            if (confirm) {
                if (!val) {
                    this.$Message.error('请选择要修改的菜单！');
                    return
                }
                this.setModal({
                    visible: true,
                    title: '修改',
                    type: 'modify',
                    data: val
                })
            } else {
                val.menuName = val.title
                delete val.title
                this.$post(this.urls.update, val).then(res => {
                    if (res.code === 1) {
                        this.setModal();
                        this.getTabeData();
                    }
                }).catch(err => {
                    console.log(err)
                })
            }
        },
        deleteNode(val, confirm) {
            if (confirm) {
                let _html = "<p>你确定要删除此菜单吗？</p>";
                let _enable = false;
                if (!val) {
                    _enable = true
                    _html = "<p>请选择要删除的菜单。</p>"
                } else if (val.children.length > 0) {
                    _enable = true
                    _html = "<p>此菜单中还有子菜单，不能删除！</p>"
                }
                this.confirm({
                    visible: true,
                    type: 'delete',
                    html: _html,
                    data: val,
                    enable: _enable
                })
            } else {
                this.$post(this.urls.delete, {
                    id: val.menuId
                }).then(res => {
                    this.$Message.info('删除成功！');
                    this.confirm();
                    this.currNodeId = null
                    this.deleteTreeDataNode(val)
                })
            }
        },
        getTreeData (arg) {
            // 获取列表
            let api = this.urls.getList;
            if (!api) return;
            let param = Object.assign({
                subSystem: 1,
                busiType: 1
                }, arg)
            this.$post(api, param).then(res => {
                try {
                    this.treeNodeData = this.transformData(res.data, 'subMenu')
                } catch (err) {
                    this.treeNodeData = []
                    console.log(err)
                }
            })
        },
        transformData(item, sub, reverse, rules) {
            let _rules = rules || {
                menuId: "menuId",
                menuLevel: "menuLevel",
                menuName: "title",
                menuOrder: "menuOrder",
                menuParent: "menuParent",
                menuPosition: "menuPosition",
                menuUrl: "menuUrl",
                subMenu: "children"
            }
            let data = this._transformData(item, _rules, reverse, sub)
            return data
        },
        getCurTreeNode(val) {
            this.currTreeNode = val
            let menuId = val.menuId
            BUS.$emit('treeNodeId', menuId)
        }
    }
}
</script>

<style lang="stylus">
.tree-part .operations
    background #f2f2f2
</style>
