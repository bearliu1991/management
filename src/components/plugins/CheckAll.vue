<template>
    <div>
        <div style="border-bottom: 1px solid #e9e9e9;padding-bottom:6px;margin-bottom:6px;">
        <Checkbox
            :indeterminate="indeterminate"
            :value="checkAll"
            :disabled="disableAll"
            @click.prevent.native="handleCheckAll">{{title}}</Checkbox>
    </div>
    <CheckboxGroup v-model="checkAllGroup" @on-change="checkAllGroupChange">
        <Checkbox v-for="(item, index) in checkItems" :key="index" :label="item.val" :disabled="disableAll">
            <div class="check-item-logo" v-if="item.avatar">
                <img :src="item.avatar"/>
            </div>
            {{item.title}}
        </Checkbox>
    </CheckboxGroup>
    </div>
</template>
<script>
    export default {
        name: "checkAll",
        props: {
            title: {
                type: String,
                default: '全选'
            },
            disableAll: {
                type: Boolean,
                default: false
            },
            checkItems: {
                type: Array,
                default() { return [] }
            }
        },
        data () {
            return {
                indeterminate: true,
                checkAll: false,
                checkAllGroup: []
            }
        },
        methods: {
            handleCheckAll () {
                if (this.indeterminate) {
                    this.checkAll = false;
                } else {
                    this.checkAll = !this.checkAll;
                }
                this.indeterminate = false;
                if (this.checkAll) {
                    this.checkAllGroup = this.checkItems.map(item => item.val)
                } else {
                    this.checkAllGroup = [];
                }
                this.$emit('checked', this.checkAllGroup)
            },
            checkAllGroupChange (data) {
                if (data.length === this.checkItems.length) {
                    this.indeterminate = false;
                    this.checkAll = true;
                } else if (data.length > 0) {
                    this.indeterminate = true;
                    this.checkAll = false;
                } else {
                    this.indeterminate = false;
                    this.checkAll = false;
                }
                this.$emit('checked', this.checkAllGroup)
            }
        }
    }
</script>
<style lang="stylus">
.check-item-logo
    display inline-block
    width 60px
    height 60px
    overflow hidden
    vertical-align middle
    img
        width 100%
</style>
