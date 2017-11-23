<template>
<div class="index">
  <transition name="router-fade" mode="out-in">
    <router-view></router-view>
  </transition>
  <VFooter v-if="hideFooterHeader"></VFooter>
</div>
</template>
<script>
import VFooter from '../components/common/footer';
import keyConf from '../common/keyConf';
import { storage_custom } from '../common/store.js';
import common from '../common/common.js';
import { authCRMToken } from '../service/getData';
export default {
  name: 'index',
  data () {
    return {
      hideFooterHeader:true
    }
  },
  created () {
    
    this.showHeaderFooter();
  },
  mounted(){
    let uid = common.getQueryString("uid");
    let code = common.getQueryString("code");
    if(uid && code){
      this.getCRMQuery();
    }
  },
  mounted(){
    this.getCRMQuery();
  },
  methods:{
    showHeaderFooter(){
      let query = this.$route.query
      query = query ? query : {}
      if(query.app == 'ios' || query.app == 'android'){
        this.hideFooterHeader = false
      }
    },
    // crm登录验证
    async getCRMQuery(){
      let uid = common.getQueryString("uid");
      let code = common.getQueryString("code");
      if(uid && code){
        let res = await authCRMToken({uid: uid, code: code});
        if(res.status == 'ok') $.cookie(keyConf.qm_cookie, uid, {expires:1, path: '/'});
        // res.status == 'ok' ? $.cookie(keyConf.qm_cookie, uid) : $.cookie(keyConf.qm_cookie, "");
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