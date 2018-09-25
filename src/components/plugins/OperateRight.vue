<template>
    <div id="operate_right">
        <div class="right">
            <Dropdown trigger="custom" :visible="visible" placement="bottom-end">
                <Icon @click="openDropdown" type="ios-gear-outline"></Icon>
                <DropdownMenu slot="list" @mouseleave.native="closeDropdown">
                    <DropdownItem>选择项目</DropdownItem>
                    <DropdownItem v-for="(item, index) in Columns" v-if="item.title" :key="index">
                        <Checkbox v-model="item.show" @on-change="setting">{{item.title}}</Checkbox>
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </div>
        <div class="right"><Icon type="share"></Icon></div>
        <div class="right"><Icon @click="exportData(1)" type="ios-printer-outline"></Icon></div>
    </div>
</template>
<script>
    export default {
        name: 'operate_left',
        data() {
            return {
                visible: false,
                initcolumns: this.columns
            }
        },
        props: {
            handleAlltypes: {
                type: Array,
                default: function () { return [] }
            },
            columns: {
                type: Array,
                default: function () { return [] }
            }
        },
        computed: {
            Columns() {
                let columns = this.deepcopy(this.initcolumns)
                columns.forEach(item => { item.show = true })
                return columns
            }
        },
        methods: {
            exportData (type) {
                // 导出表单数据
                if (type === 1) {
                    BUS.$emit('exportCsv', {
                        filename: 'The original data'
                    }, this.pageName)
                } else if (type === 2) {
                   BUS.$emit('exportCsv', {
                        filename: 'Sorting and filtering data',
                        original: false
                    }, this.pageName)
                } else if (type === 3) {
                   BUS.$emit('exportCsv', {
                        filename: 'Custom data',
                        columns: this.columns8.filter((col, index) => index < 4),
                        data: this.data7.filter((data, index) => index < 4)
                    }, this.pageName)
                }
            },
            openDropdown () {
                this.visible = !this.visible
            },
            closeDropdown ($event) {
                this.visible = false
            },
            setting () {
                // 配置要列选项
                let arr = []
                this.Columns.forEach((item, index) => {
                    item.show && arr.push(item)
                })
                BUS.$emit('setColumn', arr, this.pageName)
            }
        }
    }
</script>

<style lang="stylus">
    #operate_right
        float right
</style>
