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
    this.getCRMQuery();
    this.setStorage(); 
  },
  methods: {
    // app登录验证
    async setStorage() {
      let datetime = common.getQueryString("datetime");
      let app = common.getQueryString("app");
      if (datetime && app) {
        let res = await authToken({ token: datetime });
        res.status === "ok"
          ? $.cookie(keyConf.qm_cookie, res.data.id)
          : $.cookie(keyConf.qm_cookie, "");
        storage_custom.set(keyConf.token, datetime);
      } else if (!datetime && app) {
        storage_custom.set(keyConf.token, "");
        $.cookie(keyConf.qm_cookie, "");
      }
    },
    // crm登录验证
    async getCRMQuery(){
      console.log('test');
      let uid = common.getQueryString("uid");
      let code = common.getQueryString("code");
      if(uid && code){
        let res = await authCRMToken({uid: uid, code: code});
        if(res.status == 'ok') $.cookie(keyConf.qm_cookie, uid);
        // res.status == 'ok' ? $.cookie(keyConf.qm_cookie, uid) : $.cookie(keyConf.qm_cookie, "");
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
