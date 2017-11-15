<template>
  <div class="home">
     <!-- :style="{'height': `${navHeight}rem`}" -->
    <div class="nav-header">
      <nav>
        <hHeader v-if="hideFooterHeader"></hHeader>
        <headerNav :style="{'padding-top': `${navTop}rem`}"></headerNav>
      </nav>
    </div>
    <router-view @showSign="showSignBox"></router-view>
    <!-- 签到窗口 -->
    <div class="sign_box" v-if="sign_state">
      <div class="mask">
        <div class="sign_tip">
          <div class="close_sign" @click="closeSign"></div>
          <img src="../../assets/image/icon/home/home_bg_sign01.png" alt="" v-if="!signed_in">
          <img src="../../assets/image/icon/home/home_bg_sign02.png" alt="" v-if="signed_in">
          <div class="sign_text">
            <p class="count" v-if="!signed_in">猫粮&nbsp;<span>+{{sign_number}}</span></p>
            <p class="con" :class="{'signed_con': signed_in}">已经连续签到{{signed_day}}天,累计获得猫粮{{catfood_total}}</p>
            <router-link to="/cat_food" class="cat_food">查看猫粮</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue';
import hHeader from './children/hHeader';
import headerNav from './children/headerNav'
import {getHomeSign} from '@/service/getData';
export default {
  name: 'home',
  data () {
    return {
      navTop: 0,
      /* navHeight: 8.8, */
      sign_state: false, // 默认不显示签到窗口
      signed_in: false, // 签到状态(是否已签到)
      sign_number: '2', // 签到猫粮增加数
      signed_day: '', // 累计签到天数
      catfood_total: '', // 累计猫粮总数
      hideFooterHeader: true
    }
  },
  created(){
    $(window).scrollTop(0);
    this.showHeaderFooter();
  },
  methods: {

    /* 签到 */
    async getSignState (){
      let res = await getHomeSign();
      if(res.status == "ok"){
        this.signed_day = res.data.count;
        this.catfood_total = res.data.ponits;
        if(res.code == "1"){ // 今日已签到
          this.signed_in = true;
        }else{ // 签到成功
          this.signed_in = false;
        }
      }
    },
    // 显示签到窗口
    showSignBox (){
      this.getSignState();
      this.sign_state = true;
    },
    // 关闭签到窗口
    closeSign (){
      this.sign_state = false;
    },
    showHeaderFooter(){
      let query = this.$route.query
      query = query ? query : {}
      if(query.app == 'ios' || query.app == 'android'){
        this.hideFooterHeader = false
        /* this.navHeight = 10.8 */
        this.navTop = 4.4
      }
    }
  },
  components: {
    hHeader,
    headerNav,
  }
}
</script>
<style lang="scss" scoped>
@import "../../assets/css/mixin.scss";
.home{
  width: 100%;
  height: 100%;
  min-width: 16rem;
  max-width: 37.5rem;
  background-color: #fff;
  .nav-header{
    height: 8.8rem;
    nav{
      width: 100%;
      position: fixed;
      z-index: 2;
    }
  }
  /* 签到窗口 */
  .sign_box{
    .mask{
      @include wh(100%,100%);
      background-color: rgba(0,0,0,0.3);
      position: fixed;
      top: 0;
      left: 0;
      z-index: 1000;
      .sign_tip{
        position: relative;
        width: 26rem;
        margin: 35% auto;
        .close_sign{
          position: absolute;
          top: -0.5rem;
          right: -0.5rem;
          @include wh(3rem,3rem);
        }
        img{
          width: 100%;
          vertical-align: top;
        }
        .sign_text{
          background-color: #fff;
          border-radius: 0 0 1.3rem 1.3rem;
          padding: 2rem;
          text-align: center;
          .count{
            @include sc(1.6rem,#e65058);
            line-height: 1.8rem;
            padding: 0.5rem 0 1rem;
            span{
              @include sc(2.1rem,#e65058);
            }
          }
          .con{
            @include sc(1.3rem,#666);
            line-height: 1.5rem;
            margin-bottom: 2rem;
          }
          .signed_con{
            @include sc(1.3rem,#000);
            margin-top: 2rem;
          }
          .cat_food{
            display: block;
            @include wh(13rem,2.8rem);
            @include sc(1.4rem,$bgWhite);
            text-align: center;
            line-height: 2.8rem;
            @include borderRadius(1.35rem);
            background-color: $themeRed;
            margin: 0 auto;
          }
        }
      }
    }
  }
}

</style>
