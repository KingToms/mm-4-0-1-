<template>
  <div class="double-eleven">
    <div class="bg" v-show="isbg"></div>
    <section>
      <!--顶部banner-->
      <div class="banner">
        <img src="/static/topic/doubleEleven_1111/1111-1.jpg" alt="">
      </div>
      <!--双11惊喜1-->
      <div class="surprise surprise01">
        <img src="/static/topic/doubleEleven_1111/1111-2.jpg" alt="">
        <a class="coupon" href="javascript:void(0)" @click="getCoupon(1000230)"></a>
        <a class="coupon" href="javascript:void(0)" @click="getCoupon(1000231)"></a>
        <a class="coupon" href="javascript:void(0)" @click="getCoupon(1000232)"></a>
      </div>
      <!--双11惊喜2-->
      <div class="surprise surprise02">
        <img src="/static/topic/doubleEleven_1111/1111-3.jpg" alt="">
        <img src="/static/topic/doubleEleven_1111/1111-4.jpg" alt="">
        <a class="now-buy" href="javascript:void(0)" @click="addCart(1000167)"></a>
        <a class="now-buy" href="javascript:void(0)" @click="addCart(1000205)"></a>
      </div>
      <!--双11惊喜3-->
      <div class="surprise surprise03">
        <img src="/static/topic/doubleEleven_1111/1111-5.jpg" alt="">
        <img src="/static/topic/doubleEleven_1111/1111-6.jpg" alt="">
        <img src="/static/topic/doubleEleven_1111/1111-7.jpg" alt="">
        <a class="now-buy" href="javascript:void(0)" @click="addCart(1000290)"></a>
        <a class="now-buy" href="javascript:void(0)" @click="addCart(1000352)"></a>
        <a class="now-buy" href="javascript:void(0)" @click="addCart(1000025)"></a>
        <a class="now-buy" href="javascript:void(0)" @click="addCart(1000045)"></a>
        <a class="now-buy" href="javascript:void(0)" @click="addCart(1000367)"></a>
        <a class="now-buy" href="javascript:void(0)" @click="addCart(1000370)"></a>
        <a class="now-buy" href="javascript:void(0)" @click="addCart(1000030)"></a>
        <a class="now-buy" href="javascript:void(0)" @click="addCart(1000050)"></a>
      </div>
      <!--定制美睫-->
      <div class="module-box eyelash">
        <img src="/static/topic/doubleEleven_1111/1111-8.jpg" alt="">
        <img src="/static/topic/doubleEleven_1111/1111-9.jpg" alt="">
        <a class="now-buy" href="javascript:void(0)" @click="addCart(1000107)"></a>
        <a class="now-buy" href="javascript:void(0)" @click="addCart(1000337)"></a>
        <a class="now-buy" href="javascript:void(0)" @click="addCart(1000206)"></a>
        <a class="now-buy" href="javascript:void(0)" @click="addCart(1000141)"></a>
        <a class="now-buy" href="javascript:void(0)" @click="addCart(1000109)"></a>
        <a class="now-buy" href="javascript:void(0)" @click="addCart(1000115)"></a>
        <a class="now-buy" href="javascript:void(0)" @click="addCart(1000373)"></a>
        <a class="now-buy" href="javascript:void(0)" @click="addCart(1000519)"></a>
      </div>
      <!--半永久.眼.眉.唇-->
      <div class="module-box semi-permanent">
        <img src="/static/topic/doubleEleven_1111/1111-10.jpg" alt="">
        <img src="/static/topic/doubleEleven_1111/1111-11.jpg" alt="">
        <a class="now-buy" href="javascript:void(0)" @click="addCart(1000348)"></a>
        <a class="now-buy" href="javascript:void(0)" @click="addCart(1000197)"></a>
        <a class="now-buy" href="javascript:void(0)" @click="addCart(1000201)"></a>
        <a class="now-buy" href="javascript:void(0)" @click="addCart(1000268)"></a>
      </div>
      <!--温馨提示-->
      <div class="module-box tips">
        <img src="/static/topic/doubleEleven_1111/1111-12.jpg" alt="">
      </div>
    </section>
    <!--购物车-->
    <section>
      <div class="shop-cart" @click="showCart">
        <div class="cart"></div>
        <icon v-show="count >= 0" class="num">{{count}}</icon>
      </div>
    </section>
    <!--提示-->
    <section>
      <div class="toast">加入购物车成功~</div>
    </section>
    <!--购物车列表-->
    <section>
      <shopping-cart class="bottom-cart" v-show="isbg" :topicCart="topicCart" :fromAd="from_ad" :discount="discount" :isDiscount="isDiscount" :count="count" :totalPrice="totalPrice" :products="carts" @delProducts="delProducts" @hiddenCart="hiddenCart"></shopping-cart>
    </section>
  </div>
</template>
<script>
import shoppingCart from "../children/shoppingCart.1";
import keyConf from "../../../common/keyConf";
import { userIsLogin, authToken, getCenterCoupons } from "@/service/getData";
import { halloweenData } from "../data.config";
import { setStore, getStore, storage_custom } from "../../../common/store";
import common from "../../../common/common";
import { Toast } from 'mint-ui';
import '../../../../node_modules/mint-ui/lib/toast/style.css'
export default {
  name: "doubleEleven",
  data () {
    return {
      isbg: false, //虚化背景
      count: 0, //购物车数量
      products: [],
      carts: [], //购物车商品
      discount: 10, //折扣
      totalPrice: 0, //总价格
      topicCart: "doubleElevenCart", //购物车列表
      isDiscount: false, //是否进行折扣
      plid: "", //推广来源
      from_ad: "topic_doubleEleven2017", //专题来源
    };
  },
  created() {
    this.setStorage();
    this.plid = common.getQueryString("plid") ? common.getQueryString("plid") : "";
    this.products = halloweenData;
    this.countProducts();
    this.shareWechat();
  },
  methods: {
    // 领取优惠券
    async getCoupon(couponID) {
      let qm_cookie = $.cookie(keyConf.qm_cookie);
      let isLogin = await userIsLogin();
      if (!qm_cookie || isLogin.status == "error") {
        if (
          common.getQueryString("app") == "ios" ||
          common.getQueryString("app") == "android"
        ) {
          window.location.href = `/login?action=login`;
        } else {
          // alert("未登录");
          Toast({
            message: "未登录",
            duration: 1000,
            className: 'toast-tip'
          });
          let baseUrl = this.plid
            ? `/login?url=/topic-double-eleven?plid=${this.plid}`
            : `/login?url=/topic-double-eleven`;
          this.$router.push(baseUrl);
        }
      } else {
        let res = await getCenterCoupons({ coupon_id: couponID });
        if (res.status === "ok") {
          // alert("领取成功");
          Toast({
            message: "领取成功",
            duration: 1000,
            className: 'toast-tip'
          });
        } else {
          if(res.msg.indexOf("所领取的优惠券已经上限了") > -1){
            // alert("您已领取过优惠券~");
            Toast({
              message: "您已领取过优惠券~",
              duration: 1000,
              className: 'toast-tip'
            });
          }else{
            // alert(res.msg);
            Toast({
              message: res.msg,
              duration: 1000,
              className: 'toast-tip'
            });
          }
        }
      }
    },
    // 添加到购物车
    async addCart(proid) {
      let qm_cookie = $.cookie(keyConf.qm_cookie);
      let isLogin = await userIsLogin();
      if (!qm_cookie || isLogin.status == "error") {
        if (
          common.getQueryString("app") == "ios" ||
          common.getQueryString("app") == "android"
        ) {
          window.location.href = `/login?action=login`;
        } else {
          // alert("未登录");
          Toast({
            message: "未登录",
            duration: 1000,
            className: 'toast-tip'
          });
          let baseUrl = this.plid
            ? `/login?url=/topic-double-eleven?plid=${this.plid}`
            : `/login?url=/topic-double-eleven`;
          this.$router.push(baseUrl);
        }
      } else {
        this.carts = this.carts ? this.carts : [];
        this.addProducts(proid);
        setStore(this.topicCart, this.carts);
        console.log(this.discount);
        this.toast();
      }
    },
    // 删除商品
    delProducts(products) {
      this.totalPrice = 0;
      this.count = 0;
      this.carts = products;
      setStore(this.topicCart, this.carts);
      this.carts.forEach(item => {
        this.totalPrice += item.price * item.num;
        this.count += item.num * 1;
      });
    },
    // 购买多个重复商品
    addProducts(proid) {
      let index = 0;
      let length = this.carts.length;
      for (index; index < this.carts.length; index++) {
        if (this.carts[index].id == proid) {
          this.carts[index].num = this.carts[index].num - 0 + 1;
          break;
        }
      }
      if (index == length) {
        this.carts.push({
          id: this.products[proid].id,
          name: this.products[proid].name,
          price: this.products[proid].price,
          img: this.products[proid].img,
          num: 1
        });
      }
      this.totalPrice = this.totalPrice - 0 + (this.products[proid].price - 0);
      this.count++;
    },

    // 显示购物车
    showCart() {
      this.isbg = true;
      // $(window).scrollTop(0);
      $("body").css("overflow", "hidden");
    },
    // 隐藏购物车
    hiddenCart() {
      this.countProducts();
      this.isbg = false;
      $("body").css("overflow", "auto");
    },
    //弹框提示
    toast() {
      $(".toast").fadeIn(500, function() {
        setTimeout(function() {
          $(".toast").fadeOut(500);
        }, 2000);
      });
    },
    //微信分享
    shareWechat(){
      let _this = this;
      wx.ready(function () {
          _this.share_setup(
            '双11|美妆狂欢夜',
            '【俏猫】特大福利派送第一波来啦！上门化妆、美睫精致款促销价98元，数量有限，先到先得。仙女们千万别错过哦~',
            'http://mm.qiaocat.com/topic-double-eleven',
            'http://mm.qiaocat.com/static/topic/doubleEleven_1111/share.jpg'
          );
      });
    },
    share_setup(title, desc, link, imgUrl) {
      wx.onMenuShareAppMessage({
        title: title,
        desc: desc,
        link: link,
        imgUrl: imgUrl,
        success: function(res) {
          console.log(1, res);
        },
        error: function(err) {
          console.log(1, err);
        }
      });
      wx.onMenuShareTimeline({
        title: title,
        link: link,
        imgUrl: imgUrl,
        success: function(res) {
          //todo
          console.log(2, res);
        },
        error: function(err) {
          console.log(2, err);
        }
      });
    },

    async authUser() {
      let token = storage_custom.get(keyConf.token);
      if (token) {
        let res = await authToken({ token: token });
        res.status === "ok"
          ? $.cookie(keyConf.qm_cookie, res.data.id)
          : $.cookie(keyConf.qm_cookie, "");
      }
    },
    // 客户端是否已登录
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
    // 购物车商品列表
    countProducts() {
      this.count = 0;
      this.totalPrice = 0;
      let store = getStore(this.topicCart);
      this.carts = store && store.length > 0 ? JSON.parse(store) : [];
      this.carts.forEach(item => {
        this.totalPrice += item.price * item.num;
        this.count += item.num * 1;
      });
    }
  },
  components: {
    shoppingCart,
  }
}
</script>
<style lang="scss" scoped>
.double-eleven {
  .bg {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 1;
  }
  a {
    display: block;
    position: absolute;
  }
  .banner {
    font-size: 0;
    img {
      font-size: 0;
      width: 100%;
    }
  }
  /*惊喜1、2、3*/
  .surprise {
    position: relative;
    cursor: pointer;
    img {
      font-size: 0;
      width: 100%;
    }
  }
  /*惊喜1*/
  .surprise01 {
    .coupon {
      width: 30%;
      height: 38%;
      cursor: pointer;
      &:nth-of-type(1) {
        top: 54.5%;
        left: 1%;
      }
      &:nth-of-type(2) {
        top: 54.5%;
        left: 33%;
      }
      &:nth-of-type(3) {
        top: 54.5%;
        right: 5%;
      }
    }
  }
  /*惊喜2*/
  .surprise02 {
    .now-buy {
      width: 32%;
      height: 6%;
      &:nth-of-type(1) {
        top: 43.5%;
        right: 14%;
      }
      &:nth-of-type(2) {
        bottom: 12.5%;
        left: 13%;
      }
    }
  }
  /*惊喜3*/
  .surprise03 {
    .now-buy {
      width: 28%;
      height: 3%;
      &:nth-of-type(odd) {
        left: 12%;
      }
      &:nth-of-type(even) {
        right: 12%;
      }
      &:nth-of-type(1) {
        top: 31%;
      }
      &:nth-of-type(2) {
        top: 31%;
      }
      &:nth-of-type(3) {
        top: 52.4%;
      }
      &:nth-of-type(4) {
        top: 52.4%;
      }
      &:nth-of-type(5) {
        top: 74%;
      }
      &:nth-of-type(6) {
        top: 74%;
      }
      &:nth-of-type(7) {
        bottom: 1.2%;
      }
      &:nth-of-type(8) {
        bottom: 1.2%;
      }
    }
  }
  /*模块*/
  .module-box {
    position: relative;
    cursor: pointer;
    img {
      font-size: 0;
      width: 100%;
    }
  }
  /*定制美睫*/
  .eyelash {
    .now-buy {
      width: 28%;
      height: 3%;
      &:nth-of-type(odd) {
        left: 11.2%;
      }
      &:nth-of-type(even) {
        right: 11.2%;
      }
      &:nth-of-type(1) {
        top: 24.6%;
      }
      &:nth-of-type(2) {
        top: 24.6%;
      }
      &:nth-of-type(3) {
        top: 48%;
      }
      &:nth-of-type(4) {
        top: 48%;
      }
      &:nth-of-type(5) {
        top: 71.6%;
      }
      &:nth-of-type(6) {
        top: 71.6%;
      }
      &:nth-of-type(7) {
        bottom: 1.8%;
      }
      &:nth-of-type(8) {
        bottom: 1.8%;
      }
    }
  }
  /*半永久*/
  .semi-permanent {
    .now-buy {
      width: 28%;
      height: 5%;
      &:nth-of-type(odd) {
        left: 11.2%;
      }
      &:nth-of-type(even) {
        right: 11.2%;
      }
      &:nth-of-type(1) {
        top: 45%;
      }
      &:nth-of-type(2) {
        top: 45%;
      }
      &:nth-of-type(3) {
        bottom: 6.5%;
      }
      &:nth-of-type(4) {
        bottom: 6.5%;
      }
    }
  }
  /*购物车*/
  .shop-cart {
    cursor: pointer;
    position: fixed;
    width: 5.2rem;
    height: 5.2rem;
    right: 2.7rem;
    bottom: 4rem;
    .cart {
      width: 100%;
      height: 100%;
      background-image: url("/static/topic/doubleEleven_1111/shop_cart/shopping_car.png");
      background-size: contain;
    }
    .num {
      position: absolute;
      right: 0;
      top: 0;
      width: 2rem;
      height: 2rem;
      line-height: 2rem;
      border-radius: 2rem;
      background-color: #e70034;
      color: #fff;
      text-align: center;
      vertical-align: middle;
    }
  }
  /*购物车列表*/
  .bottom-cart {
    position: fixed;
    bottom: 0;
    left: 0;
    height: 32.7rem;
    width: 100%;
    background-color: #fff;
    z-index: 2;
  }
  /*添加购物车提示*/
  .toast {
    position: fixed;
    display: none;
    top: 40%;
    left: 50%;
    transform: translateX(-50%);
    width: 16rem;
    height: 5rem;
    font-size: 1.6rem;
    background: rgba(0, 0, 0, 0.7);
    border-radius: 0.5rem;
    text-align: center;
    line-height: 5rem;
    color: #fff;
  }
}
</style>