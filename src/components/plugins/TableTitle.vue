<template>
    <div class="table-title">
        {{tableTitle}}
    </div>
</template>
<script>
    export default{
        name: 'table_title',
        data() {
            return {
                selectAll: false,
                addItemBtn: false
            }
        },
        props: {
            tableTitle: {
                type: String,
                default: "列表管理"
            },
            configBtns: {
                type: Array,
                default: function () { return [] }
            },
            btnName: {
                type: String,
                default: "添加"
            }
        },
        methods: {}
    }
</script>
