<template>
<div class="index">
  <transition name="router-fade" mode="out-in">
    <router-view></router-view>
  </transition>
  <VFooter v-if="hideFooterHeader"></VFooter>
</div>
</template>
<script>
import VFooter from '../components/common/footer'
export default {
  name: 'index',
  data () {
    return {
      hideFooterHeader:true
    }
  },
  created () {
    this.showHeaderFooter()
  },
  methods:{
    showHeaderFooter(){
      let query = this.$route.query
      query = query ? query : {}
      if(query.app == 'ios' || query.app == 'android'){
        this.hideFooterHeader = false
      }
    }
  },
  components: {
    VFooter
  }
}
</script>
<style lang="scss" scoped>
.app{
  height: 100%;
}
.router-fade-enter-active, .router-fade-leave-active {
	  	transition: opacity .3s;
	}
.router-fade-enter, .router-fade-leave-active {
    opacity: 0;
}
</style>