<template>
  <div class="app">
    <transition name="router-fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import keyConf from './common/keyConf.js';
import { storage_custom } from './common/store.js';
import common from './common/common.js';
import { authToken, authCRMToken } from './service/getData';
export default {
  name: 'app',
  data () {
    return {}
  },
  created(){
    let url = this.$route.fullPath;
    if(url.indexOf('datetime') > -1 && url.indexOf('app') > -1){
      this.setStorage(); 
    }
  },
  methods: {
    // app登录验证
    async setStorage() {
      console.log('正式的。。。。执行否？');
      let datetime = common.getQueryString("datetime");
      let app = common.getQueryString("app");
      console.log('datetime',datetime);
      console.log('app',app);
      if (datetime && app) {
        let res = await authToken({ token: datetime });
        res.status === "ok"
          ? $.cookie(keyConf.qm_cookie, res.data.id, {expires:1, path: '/'})
          : $.cookie(keyConf.qm_cookie, "",{expires:1, path: '/'});
        storage_custom.set(keyConf.token, datetime);
      } else {
        storage_custom.set(keyConf.token, "");
        $.cookie(keyConf.qm_cookie, "",{expires:1, path: '/'});
      }
    }
  }
}
</script>

<style lang="scss">
@import './assets/css/common.scss';
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
