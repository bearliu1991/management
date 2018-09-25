<template>
  <div id="app" >
    <transition name="fade">
      <router-view/>
    </transition>
  </div>
</template>

<script>
  export default {
    name: 'App',
    data () {
      return {}
    },
    created () {
      console.log('app created')
      this.poperClose()
    },
    methods: {
      poperClose() {
        document.querySelectorAll('.ivu-poptip-popper').forEach(item => {
          item.onmouseout = () => this.bodyClick()
        })
      }
    }
  }
</script>

<style lang="stylus">
  #app
    height 100%
</style>
