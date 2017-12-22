<template>
  <div class="home">
     <!-- :style="{'height': `${navHeight}rem`}" -->
    <div class="nav-header">
      <nav>
        <hHeader v-if="hideFooterHeader"></hHeader>
        <!-- <headerNav :style="{'padding-top': `${navTop}rem`}"></headerNav> -->
      </nav>
    </div>
    <router-view @showSign="showSignBox" @showAdvert="showAdvertBox"></router-view>
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
    <!-- 广告窗口 -->
    <div class="sign_box" v-if="advertInfo.state">
      <div class="mask">
        <div class="sign_tip">
          <a class="advert_link" target="_blank" :href="advertInfo.link"><img class="advert_img" :src="advertInfo.img" alt=""></a>
          <div class="close_advert" @click="closeAdvert">
            <img src="../../assets/image/icon/home/home_icons_close.png" alt="关闭">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue';
import hHeader from './children/hHeader';
// import headerNav from './children/headerNav'
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
      hideFooterHeader: true,
      advertInfo: {
        state: false, // 显示广告
        link: '', // 广告链接
        img: '', // 广告图片
      },
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
    // 页面跳转类型（轮播图/广告图：专题、店铺、产品）
    linkType(item,tab) {
      if(item.ad_type == '1'){ // 专题链接
        this.advertInfo.link = item.link;
      }else if(item.ad_type == '2'){ // 店铺链接
        // this.advertInfo.link = `/stylist/${tab}/${item.link}`
        this.advertInfo.link = "/detail/shopping/" + item.link;
      }else if(item.ad_type == '3'){ // 产品链接
        this.advertInfo.link = "/detail/" + item.link;
      }
      // location.href = this.advertInfo.link;
    },
    // 显示广告窗口
    showAdvertBox (home_tc){
      console.log("home_tc:",home_tc);
      if(home_tc && home_tc.length > 0){
        this.advertInfo.img = home_tc[0].image ? home_tc[0].image : '';
        this.linkType(home_tc[0]);
        this.advertInfo.state = true;
      }
    },
    // 关闭广告窗口
    closeAdvert (){
      this.advertInfo.state = false;
    },
    showHeaderFooter(){
      let query = this.$route.query
      query = query ? query : {}
      if(query.app == 'ios' || query.app == 'android'){
        this.hideFooterHeader = false
        /* this.navHeight = 10.8 */
        this.navTop = 4.4
      }
    },
  },
  components: {
    hHeader,
    // headerNav,
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
  background-color: #f5f5f5;
  // background-color: #fff;
  .nav-header{
    height: 4.4rem;
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
        width: 24rem;
        // max-height: 50%;
        margin: 8rem auto 0;
        border-radius: 1rem;
        .close_sign{
          position: absolute;
          top: -0.5rem;
          right: -0.5rem;
          @include wh(3rem,3rem);
          cursor: pointer;
        }
        // 广告链接
        .advert_link {
          display: block;
        }
        // 关闭广告弹窗
        .close_advert {
          position: absolute;
          bottom: -8rem;
          left: 40%;
          @include wh(5rem,5rem);
          cursor: pointer;
        }
        img{
          width: 100%;
          vertical-align: top;
        }
        img.advert_img {
          border-radius: 1rem;
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
