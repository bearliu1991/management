<template>
    <div class="height-full">
        <div class="table">
            <TableTitle tableTitle="菜单管理"></TableTitle>
            <div class="table-content">
                <FiltersInline ownPage="treeList" :filterItem="filterItem" ref="filters" class="tree-filter"></FiltersInline>
                <div class="tree-wrapper">
                    <div class="menu-tree">
                        <Menutree ownPage="treeList" @getCurrentMenuId="getCurrentMenuId"></Menutree>
                    </div>
                    <div class="menu-table">
                        <MenuTable class="tree-item-table" slot="tree-table" :menuId="currNodeId"></MenuTable>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import PageConfig from './pageConfig.js'
import MenuTable from './menuTable.vue'
import Menutree from './menuTree.vue'

  export default {
    name: "menuTable",
    components: {
        Menutree,
        MenuTable,
        Modalfrom: () => import('@/components/syscomponents/modalValidateForm.vue')
    },
    data () {
        return {
            pageName: 'menu',
            PageConfig: this.deepcopy(PageConfig),
            filterItem: {},
            currNodeId: null
        }
    },
    created() {
        this.$set(this.filterItem, 'filters', this.PageConfig.filtersTree);
    },
    methods: {
        getCurrentMenuId(id) {
            console.log(id)
        }
    }
}
</script>
<style lang="stylus">

</style>
