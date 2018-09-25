<template>
    <div class="height-full lib-data">
        <!-- <filterTable
            ref='filtertable'
            tableTitle="数据字典"
            btnName="创建数据字典"
            :columns = 'columns'
            :filterItem= 'filterItem'
            :urls = 'urls'
            :data = 'tabledata'
            :handleAlltypes= handleAlltypes
            @tableHandle = "tableHandle"
            ></filterTable>
            <Modalfrom ref="modal"
                :formItems= "formItems"
                @success= "submitData"
                :title= "modalTitle"
                :type= "modalType"></Modalfrom> -->
        <div class="table">
            <TableTitle tableTitle="数据字典"></TableTitle>
            <div class="table-content">
                <div class="tree-wrapper">
                    <div class="menu-tree">
                        <Libtree></Libtree>
                    </div>
                    <div class="menu-table">
                        <Libtable class="tree-item-table" slot="tree-table"></Libtable>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Columns from './columns.js'
import PageConfig from './pageConfig.js'
import Libtree from './libtree.vue'
import Libtable from './libtable.vue'
  export default {
    name: "datalib",
    components: {
        Libtree,
        Libtable
    },
    data () {
        let self = this;
        return {
            pageName: 'datalib'
        }
    },
}
</script>
<style lang="stylus">
.lib-data .tree-wrapper
    padding-top 10px
</style>
