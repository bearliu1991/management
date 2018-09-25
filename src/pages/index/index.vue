<template>
  <div class="main-content height-full">
    <div class="header">
        <sysheader></sysheader>
    </div>
    <div class="ykt-menu height-full" ref="yktmenu">
        <Menu class="ykt-menu-body" :accordion="true">
            <Submenu v-for="(item, index) in menulist" :name="index" :key="index">
                <template slot="title">
                    <span v-if="!item.submenu">
                        <router-link :to="{ name: item.name }" class="nav-link"><img class="menu-icon" :src="item.icon">{{ item.title }}</router-link>
                    </span>
                    <span v-else class="submenu-title">
                        <img class="menu-icon" :src="item.icon">{{ item.title }}
                    </span>
                </template>
                <MenuItem  v-for="(subitem, subindex) in item.submenu" class='ykt-submenu'
                    :name="index + '-' + subindex" :key="index + '-' + subindex">
                    <router-link :to="{ name: subitem.name }" class="nav-link">{{ subitem.title }}</router-link>
                </MenuItem>
            </Submenu>
        </Menu>
    </div>
    <div class="view-content height-full">
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
    </div>
  </div>
</template>

<script>
import sysheader from './header.vue'
  export default {
    name: "sysettingIndex",
    components: {
        sysheader
    },
    data () {
      return {
        menulist: []
      }
    },
    created () {
        this.setMenu()
    },
    mounted() {
        this.setMenuHeight();
    },
    methods: {
        setMenu() {
            this.menulist = [
                {
                    menu: '概况',
                    name: 'overview',
                    title: '概况',
                    icon: '../../../static/menu-icons/overview.png'
                },
                {
                    menu: '企业管理',
                    name: 'company',
                    title: '企业管理',
                    icon: '../../../static/menu-icons/compangy-icon.png'
                },
                {
                    menu: '用户管理',
                    name: 'userManagement',
                    title: '用户管理',
                    icon: '../../../static/menu-icons/customer.png'
                },
                {
                    menu: '公众号管理',
                    name: 'public',
                    title: '公众号管理',
                    icon: '../../../static/menu-icons/publicNum.png'
                },
                {
                    menu: '坐席管理',
                    name: 'seat',
                    title: '坐席管理',
                    icon: '../../../static/menu-icons/seat.png'
                },
                {
                    menu: '套餐管理',
                    name: 'package',
                    title: '套餐管理',
                    icon: '../../../static/menu-icons/package.png'
                },
                {
                    menu: '运营管理',
                    name: 'company',
                    title: '运营管理',
                    icon: '../../../static/menu-icons/operation.png'
                },
                {
                    menu: '消息通知',
                    name: 'company',
                    title: '消息通知',
                    icon: '../../../static/menu-icons/message.png'
                },
                {
                    menu: '系统管理',
                    name: 'sys',
                    title: '系统管理',
                    icon: '../../../static/menu-icons/system.png',
                    submenu: [
                        { name: 'menu', title: '菜单管理' },
                        { name: 'authority', title: '权限管理' },
                        { name: 'role', title: '角色管理' },
                        { name: 'dataLib', title: '数据字典' },
                        { name: 'system', title: '系统配置' },
                        { name: 'dataLibDefine', title: '定义字典' },
                        { name: 'sensitive', title: '敏感词管理' },
                        { name: 'setmeal', title: '套餐' },
                        { name: 'status', title: '状态配置' },
                        { name: 'service', title: '服务配置' },
                        { name: 'job', title: '定时任务' },
                        { name: 'configID', title: '身份定义' },
                        { name: 'anticheat', title: '防作弊刷票' },
                        { name: 'appconfig', title: 'APP配置' },
                        { name: 'sysmsg', title: '系统消息' },
                        { name: 'version', title: '系统版本' }
                    ]
                }
            ];
        },
        setMenuHeight() {
            // this.$refs['yktmenu'].style.minHeight = (window.screen.height - 64) + 'px'
        }
    }
  }
</script>

<style lang="stylus">
@import '~@/assets/css/customerVar.styl'
body, html
    height 100%
.main-content
    padding-top: ykt_header_height
.header
    position: fixed
    top: 0
    left: 0
    width: 100%
    z-index 999
.ykt-menu
    float left
    width 190px
    overflow-x hidden
    overflow-y auto
    background ykt_color4
    .ykt-menu-body
        width 200px
        background-color ykt_color4
    .ivu-menu-vertical.ivu-menu-light:after
        content: '';
        display: block;
        width: 0px;
        height: 100%;
        background: #dddee1;
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        z-index: 1;
    .ivu-menu-vertical .ivu-menu-submenu-title:hover
        background: ykt_color4
    .ivu-menu-vertical .ivu-menu-item:hover
        background: ykt_color4
    .submenu-title,a.nav-link
        display inline-block
        width 110px
        color ykt_color2
        .menu-icon
            vertical-align middle
            margin-right 5px
        &.router-link-active
            color #ffffff
    a.nav-link:hover
        color #ffffff
    li.ykt-submenu
        padding 8px 24px
    .ivu-menu-light.ivu-menu-vertical .ivu-menu-item-active:not(.ivu-menu-submenu)
        border-right: 2px solid transparent
.view-content
    margin-left: 190px
</style>
