<template>
    <ScrollBar class="scroll-part" @dropLoading="getData" style="height: 299px" v-if="show">
        <ul>
            <li v-for="(item, index) in List" :key="index" class="scroll-part-list" @click="getItemKey(item.itemKey)">
                {{item.itemKey}}
            </li>
            <li v-if="loading" class="scroll-part-list">加载中... </li>
            <li v-if="more" class="scroll-part-list">更多</li>
            <li class="scroll-part-list"></li>
        </ul>
    </ScrollBar>
</template>

<script>
  export default {
    name: "libitemkey",
    components: {
        
    },
    props: {

    },
    data () {
        let self = this
        return {
            urls: {
                getList: self.Path.queryTItemDefineByPager
            },
            list: [],
            offset: 0,
            limit: 10,
            loading: false,
            more: true,
            itemKey: null,
            show: false
        }
    },
    computed: {
        List() {
            return this.list
        }
    },
    created() {
        this.getData()
        BUS.$on('showItemkeyScroll', (param) => { this.show = param} )
    },
    methods:{
        getData() {
            if (this.loading || !this.more) return
            this.loading = true
            this.$post(this.urls.getList, {
                offset: this.offset,
                limit: this.limit,
                itemKey: this.itemKey
            }).then(res => {
                try {
                    let list = this.list
                    res.data.records.forEach(item => {
                        list.push(this.transformData(item))
                    });
                    console.log(list)
                    this.$set(this, "list", list)
                } catch (err) {
                    this.list = []
                    console.log(err)
                }
                this.offset += this.limit
                this.loading = false
                if (res.data.totalCount <= this.offset) this.more = false
            })
        },
        transformData(item, reverse, rules) {
            let _rules = rules || {
                itemKey: "itemKey",
                itemKeyDesc: "itemKeyDesc",
                itemPk: "itemPk"
            }
            let data = this._transformData(item, _rules, reverse, 'null')
            return data
        },
        getItemKey(val) {
            BUS.$emit('getItemKey', val)
        }
    }
}
</script>

<style lang="stylus">
.scroll-part
    position absolute !important
    height 299px
    width 100%
    left 0
    top 50px
    background #fff
    border-radius 5px
    box-shadow 0px 0px 6px #666
    z-index 1000
    .scroll-part-list
        cursor pointer
        height 30px
        line-height 30px
        padding 5px 10px
        .demo-spin-icon-load{
            animation: ani-demo-spin 1s linear infinite;
        }
</style>