<template>
  <div class="footer">
    <div class="weui-tab">
      <div class="weui-tab__panel">

      </div>
      <div class="weui-tabbar" id="tabbar">
         <!--:class="{'weui-bar__item_on':active('/home')}"-->
          <router-link to="/" class="weui-tabbar__item" @click.native="changeStatus('#home','/static/icon/footer/1_sel.png')">
              <img id="home" v-bind:src="path=='/' || path.toLowerCase().indexOf('home')<0 ? '/static/icon/footer/1_nor.png' : '/static/icon/footer/1_sel.png'" alt="" class="weui-tabbar__icon">
              <p class="weui-tabbar__label">首页</p>
          </router-link>
           <!--:class="{'weui-bar__item_on':active('/categary')}"-->
          <!-- <router-link to="/categary" class="weui-tabbar__item" @click.native="changeStatus('#categary','/static/icon/footer/2_sel.png')">
              <img id="categary" v-bind:src="path.toLowerCase().indexOf('categary')<0 ? '/static/icon/footer/2_nor.png' : '/static/icon/footer/2_sel.png'" alt="" class="weui-tabbar__icon">
              <p class="weui-tabbar__label">分类</p>
          </router-link> -->
          <!--:class="{'weui-bar__item_on':active('/find')}"-->
          <router-link to="/discovery" class="weui-tabbar__item" @click.native="changeStatus('#find','/static/icon/footer/3_sel.png')">
              <img id="find" v-bind:src="path.toLowerCase().indexOf('discovery')<0 ? '/static/icon/footer/3_nor.png' : '/static/icon/footer/3_sel.png'" alt="" class="weui-tabbar__icon">
              <p class="weui-tabbar__label">发现</p>
          </router-link>
           <!--:class="{'weui-bar__item_on':active('/order')}"-->
          <router-link to="/orderlist" class="weui-tabbar__item" @click.native="changeStatus('#order','/static/icon/footer/4_sel.png')">
              <img id="order" v-bind:src="path.toLowerCase().indexOf('order')<0 ? '/static/icon/footer/4_nor.png' : '/static/icon/footer/4_sel.png'" alt="" class="weui-tabbar__icon">
              <p class="weui-tabbar__label">订单</p>
          </router-link>
           <!--:class="{'weui-bar__item_on':active('/userCenter')}"-->
          <router-link to="/usercenter" class="weui-tabbar__item" @click.native="changeStatus('#usercenter','/static/icon/footer/5_sel.png')">
              <img id="usercenter" v-bind:src="path.toLowerCase().indexOf('usercenter')<0 ? '/static/icon/footer/5_nor.png' : '/static/icon/footer/5_sel.png'" alt="" class="weui-tabbar__icon">
              <p class="weui-tabbar__label">我的俏猫</p>
          </router-link>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
export default {
  name: 'footer',
  data () {
    return {
      path: '',
      tabbar: Object
    }
  },
  created (){
    this.path = this.$route.path
  },
  mounted () {
    this.tabbar = this.$el.querySelector("#tabbar")
  },
  methods: {
    linkTo (url) {
      this.$router.push(url)
    },
    active (url) {
      return this.path.includes(url)
    },
    changeStatus (selector, iconUrl){
      $(this.tabbar).find("img").each(function(index, item){
        console.log()
        let imgUrl = $(this).prop('src')
        let num = imgUrl.substr(imgUrl.indexOf('_')-1,1)
        $(this).prop('src', `/static/icon/footer/${num}_nor.png`)
      })
      this.$el.querySelector(selector).src = iconUrl
    }
  },
  watch: {
    selected: function (val, oldVal) {
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../assets/css/mixin.scss';
.footer{
  @include wh(100%,50px);
  position: fixed;
  bottom: 0px;
  left: 0px;
}
.weui-tabbar__item .weui-tabbar__label{
  color: #000;
}
</style>
