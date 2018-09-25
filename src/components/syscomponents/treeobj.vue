<template>
    <ul>
        <li class="owly-parent-node"
            v-for="(item, index) in treeData" :key="index" v-if="item"
            :class="{'owly-node-has-border' : item.subTree,
                    'owly-last-node': treeData.length <= (index + 1),
                    'owly-tree-root': root
                    }">
            <div @hover="handleHover" @click.stop="getCurrentNode(item, index, true)" class="owly-title"
                :class="{'owly-select' : index === currNodeIndex}">
                <span v-if="item.subTree"
                    class="display-children-node" :class="{'owly-child-node-opened' : index === item.showIndex}"
                    @click.stop="showChildrenNode(item, index)"></span>
                <span v-else class="no-child-node"></span>
                <span class="owly-title-text">{{item.a}} {{item.num}}----{{item.total}}</span>
                <div class="owly-title-bg"></div>
            </div>
            <ul v-show="index === item.showIndex" v-if="item.subTree" class="owly-child-node"  >
                <!-- <component :is="item.subTree ? 'TreeList' : ''" :treeData="item.subTree"></component> -->
                <TreeList 
                :treeData="item.subTree"
                @totalNum="countNum"
                @select="getCurrentNode"></TreeList>
            </ul>
        </li>
    </ul>
</template>

<script>

export default {
    components: {
        TreeList: () => import('./treeobj.vue')
    },
    props: {
        treeData: {
            type: Array,
            default() { return [] }
        },
        root: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            currNode: this.treeData,
            showChildren: false,
            currNodeIndex: null,
            showTitleBg: 'none', 
            currentTotal: 0
        }
    },
    computed: {
        CurrentTotal() {
            let total = 0
            this.currNode(item => { total += item.total})
            this.$emit('total', total)
            return total
        }
    },
    created() {},
    mounted() {},
    methods: {
        getCurrentNode(item, index, flag) {
            this.currNodeIndex = index;
            document.querySelectorAll(".owly-title").forEach(element => {
                element.className = 'owly-title'
            });
            this.$emit('select', item)
        },
        showChildrenNode(item, index) {
            item.showIndex === index ? this.$set(item, "showIndex", -1) : this.$set(item, "showIndex", index)
            this.showChildren = !this.showChildren
        },
        handleHover() {

        },
        countNum() {

        }
    }
}
</script>

<style lang="stylus">
owly-tree-title-height = 40px
owly-border-before-left = 9px
owly-title-before-left = -30px
owly-title-before-top = 11px
owly-title-after-left = -26px
owly-title-after-top = 18px
owly-nochild-before-left = -29px
owly-nochild-before-top = -6px

owly-parent-node-bg = rgb(237,239,240)
hover-color = #12afff
selected-color = #12aeef
line-color = #12afff
.owly-parent-node
    padding-left 30px
    font-size 14px
    background-color owly-parent-node-bg
.owly-current-node, .owly-node-has-border
    position relative
.owly-title
    position relative
    z-index 101
    height owly-tree-title-height
    line-height owly-tree-title-height
    .owly-title-bg
        display none
        position absolute
        top 5px
        left -3px
        z-index -1
        height 30px
        width 100%
    .owly-title-text
        display inline-block
.owly-title:hover
    color #ffffff
    .owly-title-bg
        display block
        background hover-color
.owly-select
    color #ffffff
    .owly-title-bg
        display block
        background selected-color
.owly-node-has-border:before
    display block
    position absolute
    left owly-border-before-left
    top -10px
    z-index 100
    width 1px
    height 100%
    content ''
    border-left 1px solid line-color
.owly-last-node:before
    height 24px
.owly-tree-root:before
    border-left 1px solid rgba(0,0,0,0)
.display-children-node
    cursor pointer
    &:before
        display block
        position absolute
        left owly-title-before-left
        top owly-title-before-top
        width 16px
        height 16px
        content ''
        background url('~@/assets/img/icons/plus.png') no-repeat
        background-position 2px 1px
        background-color owly-parent-node-bg
        z-index 200
    &:after
        display block
        position absolute
        content ''
        width 20px
        height 1px
        left owly-title-after-left
        top owly-title-after-top
        border-top 1px solid line-color
        z-index 100
.owly-child-node-opened.display-children-node:before
    background url('~@/assets/img/icons/minus.png') no-repeat
    background-position 2px 1px
    background-color: rgb(237,239,240);
.no-child-node
    &:before
        display block
        position absolute
        z-index 100
        left owly-nochild-before-left
        top owly-nochild-before-top
        width 17px
        height 27px
        content ''
        border 1px solid line-color
        border-top none
        border-right none

</style>
