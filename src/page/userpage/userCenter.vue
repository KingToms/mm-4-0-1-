<template>
  <div class="userCenter">
    <header>
      <div class="set-info">
        <router-link to="/setting"><icon class="setting"></icon></router-link>
        <!-- <router-link to="/messageCenter"><icon class="info" :class="{'after': hasMessage}"></icon></router-link> -->
      </div>
      <div class="uinfo">
        <router-link to="/profile">
          <img :src="uinfo.avatar ? uinfo.avatar:'/static/icon/ucenter/data_photo_default.png'" alt="">
          <p class="phone">{{uinfo.nick}}</p>
        </router-link>
      </div>
    </header>
    <content>
      <section class="money">
        <ul class="clear">
          <li class="left">
            <router-link to="/cat_food">
              <p>{{uinfo.points?uinfo.points:0}}</p>
              <p>猫粮</p>
            </router-link>
          </li>
          <li class="left">
            <router-link to="/mycoupon">
              <p>{{uinfo.coupon_count}}</p>
              <p>优惠券</p>
            </router-link>
          </li>
          <li class="left">
            <router-link to="/wallet">
              <p>{{uinfo.balance}}元</p>
              <p>我的钱包</p>
            </router-link>
          </li>
        </ul>
      </section>
      <section class="split-line"></section>
      <section class="other-module other-module-sub">
        <ul class="clear">
          <li class="left">
            <a href="javascript:void(0);" @click="showSignBox">
              <p><img src="/static/icon/ucenter/top01.png" alt=""></p>
              <p>签到</p>
            </a>
          </li>
          <li class="left">
            <div class="follow_foods" @click="toFollow('foods')">
              <p>{{uinfo.product_count}}</p>
              <p>关注商品</p>
            </div>
          </li>
          <li class="left">
            <div class="follow_shop" @click="toFollow('shop')">
              <p>{{uinfo.stylist_count}}</p>
              <p>关注店铺</p>
            </div>
          </li>
          <li class="left">
            <router-link to="/footerhis">
              <p>{{uinfo.footprint_count}}</p>
              <p>我的足迹</p>
            </router-link>
          </li>
          <li class="left">
            <router-link to="/coupon">
              <p><img src="/static/icon/ucenter/top02.png" alt=""></p>
              <p>优惠券中心</p>
            </router-link>
          </li>
          <li class="left">
            <router-link to="/usercenter/com_address">
              <p><img src="/static/icon/ucenter/my_icon_address.png" alt=""></p>
              <p>常用地址</p>
            </router-link>
          </li>
          <li class="left">
            <a href="tel:4008335138">
              <p><img src="/static/icon/ucenter/my_icon_service.png" alt=""></p>
              <p>俏猫客服</p>
            </a>
          </li>
          <li class="left">
            <router-link to="/feedback">
              <p><img src="/static/icon/ucenter/my_icon_feedback.png" alt=""></p>
              <!--<p>意见反馈</p>-->
              <p>帮助反馈</p>
            </router-link>
          </li>
        </ul>
      </section>
      <section class="split-line"></section>
      <section>
        <!--为你推荐-->
        <div class="tuijian">
          <p><span>为你推荐</span></p>
          <i></i>
          <h4>RECOMMND</h4>
          <div class="pro_box">
            <listItem v-for="(item,index) in commend" :key="index" :list="item"></listItem>
          </div>
        </div>
      </section>

      <!-- 常用地址 -->
      <v-address ref="commonAddress" v-if="show_address"></v-address>

    </content>
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
import VFooter from "../../components/common/footer";
import { getUserInfo, Reccommend, getHomeSign } from "../../service/getData.js";
import listItem from "../detailpage/children/listItem";
import keyConf from "../../common/keyConf";
import { setStore } from "../../common/store";
export default {
  name: "userCenter",
  data() {
    return {
      hasMessage: true,
      uinfo: {},
      commend: [], //推荐
      sign_state: false, // 默认不显示签到窗口
      signed_in: false, // 签到状态(是否已签到)
      sign_number: '2', // 签到猫粮增加数
      signed_day: '', // 累计签到天数
      catfood_total: '', // 累计猫粮总数
    };
  },
  created() {
    this.getUserInfo();
    this.getReccommend();
  },
  components: {
    VFooter,
    listItem
  },
  methods: {
    async getUserInfo() {
      let res = await getUserInfo();
      if (res.status === "ok") {
        this.uinfo = res.data;
        setStore(keyConf.uInfo, this.uinfo);
      } else alert("数据获取异常,请刷新重试");
    },
    async getReccommend() {
      let res = await Reccommend({});
      if (res.status === "ok") this.commend = res.data;
      // console.log(res);
    },
    async getSignState() {
      let res = await getHomeSign();
      if (res.status == "ok") {
        this.signed_day = res.data.count;
        this.catfood_total = res.data.ponits;
        if (res.code == "1") {
          // 今日已签到
          this.signed_in = true;
        } else {
          // 签到成功
          this.signed_in = false;
        }
      }
    },
    // 跳转到关注商品/店铺
    toFollow(type) {
      this.$router.push({ path: `/follow?id=${type}` });
    },
    showSignTip() {},
    // 显示签到窗口
    showSignBox() {
      this.getSignState();
      this.sign_state = true;
    },
    // 关闭签到窗口
    closeSign() {
      this.sign_state = false;
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../assets/css/mixin.scss";
.userCenter {
  @include wh(100%,100%);
  header {
    @include wh(100%,21rem);
    @include bgi_2("/static/icon/ucenter/my_bg_top.png",100%,100%);
    .set-info {
      position: relative;
      @include wh(100%,4rem);
      icon {
        position: absolute;
        @include wh(2.3rem,2.3rem);
        top: 1rem;
        padding: 0.5rem;
      }
      .setting {
        @include bgi_2("/static/icon/ucenter/my_btn_set.png",2.3rem,2.3rem);
        left: 1rem;
      }
      .info {
        @include bgi_2("/static/icon/ucenter/my_btn_info_nor.png",2.3rem,2.3rem);
        right: 1.5rem;
        &.after {
          &::after {
            position: absolute;
            content: "";
            top: 0.5rem;
            right: 0.5rem;
            @include wh(0.8rem,0.8rem);
            @include bgColor(#e65058);
            border-radius: 50%;
          }
        }
      }
    }
    .uinfo {
      padding-top: 2.4rem;
      text-align: center;
      img {
        @include wh(8rem,8rem);
        border-radius: 50%;
      }
      p.phone {
        @include sc(1.6rem,#fff);
        line-height: 3rem;
      }
    }
  }
  content {
    section.money,
    section.other-module {
      li {
        width: 33.3%;
        text-align: center;
        p {
          @include sc(1.6rem,#000);

          &:first-child {
            line-height: 8rem;
            height: 4rem;
          }
          &:last-child {
            line-height: 5rem;
            font-size: 1.3rem;
          }
          img {
            @include wh(2.7rem,2.7rem);
          }
        }
      }
    }
    section.money {
      li a p:nth-of-type(1) {
        @include sc(1.6rem,#000);
      }
    }
    section.split-line {
      @include wh(100%,1rem);
      @include bgColor(#f3f3f3);
    }
    section.other-module {
      li {
        width: 25%;
      }
    }
    /*为你推荐*/
    .tuijian {
      text-align: center;
      background-color: #fff;
      margin-top: 1rem;
      padding: 2.4rem 0;
      div {
        background-color: #fff;
        overflow: hidden;
        padding-bottom: 2rem;
      }
      h4 {
        @include sc(1.6rem,#000);
      }
      i {
        display: block;
        width: 2rem;
        height: 0.3rem;
        background-color: #000;
        margin: 1rem auto;
      }
      p {
        margin-bottom: 1.5rem;
        span {
          position: relative;
          @include sc(1.6rem,#000);
          &:before,
          &:after {
            content: "";
            position: absolute;
            width: 13.7rem;
            border-bottom: 1px solid #000;
            top: 1.1rem;
          }
          &:before {
            left: -15.5rem;
          }
          &:after {
            right: -15.5rem;
          }
        }
      }
      .product {
        margin-bottom: 1rem;
      }
      img {
        width: 100%;
      }
      /*推荐产品列表*/
      .pro_box {
        padding-left: 1rem;
      }
    }
  }
  /* 签到窗口 */
  .sign_box {
    .mask {
      @include wh(100%,100%);
      background-color: rgba(0, 0, 0, 0.3);
      position: fixed;
      top: 0;
      left: 0;
      z-index: 1000;
      .sign_tip {
        position: relative;
        width: 26rem;
        margin: 35% auto;
        .close_sign {
          position: absolute;
          top: -0.5rem;
          right: -0.5rem;
          @include wh(3rem,3rem);
        }
        img {
          width: 100%;
          vertical-align: top;
        }
        .sign_text {
          background-color: #fff;
          border-radius: 0 0 1.3rem 1.3rem;
          padding: 2rem;
          text-align: center;
          .count {
            @include sc(1.6rem,#e65058);
            line-height: 1.8rem;
            padding: 0.5rem 0 1rem;
            span {
              @include sc(2.1rem,#e65058);
            }
          }
          .con {
            @include sc(1.3rem,#666);
            line-height: 1.5rem;
            margin-bottom: 2rem;
          }
          .signed_con {
            @include sc(1.3rem,#000);
            margin-top: 2rem;
          }
          .cat_food {
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