<template>
    <div id="operate_left">
        <Checkbox v-model="selectAll" v-if="handleAlltypes" @click.prevent.native="chooseAll">全选</Checkbox>
        <Button v-for="(item, index) in handleAlltypes" class="batch-operation-btn"
            :key='"handleAlltypes"+index' @click.native="operationSelect('all', index)">{{item}}</Button>
    </div>
</template>
<script>
    export default {
        name: 'operate_left',
        props: {
            ownPage: {
                type: String,
                default: 'none'
            },
            handleAlltypes: {
                type: Array,
                default: function () { return null }
            }
        },
        data() {
            return {
                selectAll: false,
                pageName: this.ownPage
            }
        },
        created() {
            let self = this
            BUS.$on('isAllSelected', (data, pageName) => {
                if (pageName !== this.pageName) return
                self.selectAll = data
            })
        },
        methods: {
            chooseAll() {
               BUS.$emit('allSelect', !this.selectAll, this.pageName)
            },
            operationSelect (type, param) {
               BUS.$emit('operationSelect', type, param, this.pageName)
            }
        }
    }
</script>

<style lang="stylus">
    #operate_left
        float left
</style>
