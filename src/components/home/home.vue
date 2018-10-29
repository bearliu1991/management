<template>
  <div id="home">
    <div class="layout">
      <Layout>
        <Header id="header">
          我是header
        </Header>
        <Layout>
          <Sider hide-trigger :style="{background: '#fff'}">
            <Menu active-name="1-2" theme="light" width="auto" :open-names="['1']">
              <Submenu name="1">
                <template slot="title">
                  <Icon type="ios-navigate"></Icon>
                  Item 1
                </template>
                <MenuItem name="1-1">Option 1</MenuItem>
                <MenuItem name="1-2">Option 2</MenuItem>
                <MenuItem name="1-3">Option 3</MenuItem>
              </Submenu>
              <Submenu name="2">
                <template slot="title">
                  <Icon type="ios-keypad"></Icon>
                  Item 2
                </template>
                <MenuItem name="2-1">Option 1</MenuItem>
                <MenuItem name="2-2">Option 2</MenuItem>
              </Submenu>
              <Submenu name="3">
                <template slot="title">
                  <Icon type="ios-analytics"></Icon>
                  Item 3
                </template>
                <MenuItem name="3-1">Option 1</MenuItem>
                <MenuItem name="3-2">Option 2</MenuItem>
              </Submenu>
            </Menu>
          </Sider>
          <Layout :style="{padding: '0 24px 24px'}">
            我是右边内容
          </Layout>
        </Layout>
      </Layout>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'home',
    data () {
      return {}
    },
    methods: {}
  }
</script>

<style lang="stylus" scoped>
  @import '../../assets/css/index.styl'
  #home
    .layout
      border: 1px solid #d7dde4
      background: #f5f7f9
      position: relative
      border-radius: 4px
      overflow: hidden
      padding-top:64px
      #header
        color: #ffffff
        position:absolute
        top:0
        right:0
        left:0
        ft(30px)
      .layout-logo
        width: 100px
        background: #5b6270
        border-radius: 3px
        float: left
        position: relative
        top: 15px
        left: 20px
        .layout-nav
          width: 420px
          margin: 0 auto
          margin-right: 20px
</style>
