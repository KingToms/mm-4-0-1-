<template>
  <div class="thanksgiving">
    <div class="bg" v-show="isbg"></div>
    <!--主体内容-->
    <section>
      <!--顶部banner-->
      <div class="banner">
        <img src="/static/topic/thanksgiving_2017/1.jpg" alt="">
        <img src="/static/topic/thanksgiving_2017/2.jpg" alt="">
      </div>
      <!--产品-->
      <div class="product">
        <img src="/static/topic/thanksgiving_2017/3.jpg" alt="">
        <a class="now-buy" href="javascript:void(0)" @click="addCart(1000508)"></a>
      </div>
      <div class="product">
        <img src="/static/topic/thanksgiving_2017/4.jpg" alt="">
        <a class="now-buy" href="javascript:void(0)" @click="addCart(1000107)"></a>
      </div>
      <div class="product">
        <img src="/static/topic/thanksgiving_2017/5.jpg" alt="">
        <a class="now-buy" href="javascript:void(0)" @click="addCart(1000373)"></a>
      </div>
      <div class="product">
        <img src="/static/topic/thanksgiving_2017/6.jpg" alt="">
        <a class="now-buy" href="javascript:void(0)" @click="addCart(1000205)"></a>
      </div>
      <!--服务细节-->
      <div class="product details">
        <img src="/static/topic/thanksgiving_2017/7.jpg" alt="">
      </div>
      <!--美丽知多点-->
      <div class="product details">
        <div class="look_more" @click="lookMore" v-if="learn_more"></div>
        <img src="/static/topic/thanksgiving_2017/8.jpg" alt="" v-if="learn_more">
        <img src="/static/topic/thanksgiving_2017/8_1.jpg" alt="" v-else>
      </div>
      <!--温馨提示-->
      <div class="product tips">
        <img src="/static/topic/thanksgiving_2017/9.jpg" alt="">
      </div>
    </section>
    <!--购物车-->
    <section>
      <div class="shop-cart" @click="showCart">
        <div class="cart"></div>
        <icon v-show="count >= 0" class="num">{{count}}</icon>
      </div>
    </section>
    <!--购物车列表-->
    <section>
      <shopping-cart class="bottom-cart" v-show="isbg" :topicCart="topicCart" :fromAd="from_ad" :discount="discount" :isDiscount="isDiscount" :isReduce="isReduce" :count="count" :totalPrice="totalPrice" :products="carts" @hiddenCart="hiddenCart" @delProducts="delProducts"></shopping-cart>
    </section>

    <!--分享信息-->
    <span id="differentShare" :data="JSON.stringify(shareData)" style="display: none"></span>
  </div>
</template>
<script>
import shoppingCart from "../children/shoppingCart.1";
import keyConf from "../../../common/keyConf";
import { userIsLogin, authToken } from "@/service/getData";
import { halloweenData } from "../data.config";
import { setStore, getStore, storage_custom } from "../../../common/store";
import common from "../../../common/common"
import { Toast } from 'mint-ui';
import '../../../../node_modules/mint-ui/lib/toast/style.css'
export default {
  name: "thanksgiving_2017",
  data () {
    return {
      plid: "", // 推广来源
      from_ad: "topic_thanksgiving2017", //专题来源
      isbg: false, //虚化背景
      count: 0, //购物车数量
      products: [],
      carts: [], // 购物车商品
      discount: 10, //折扣
      totalPrice: 0, //总价格
      topicCart: "thanksgivingCart", //购物车列表
      isDiscount: false, //不进行折扣
      isReduce: true, // 满减优惠（感恩节专题：满2件减50元）
      learn_more: true, //美丽知多点--查看更多

      shareData: { // APP分享
        title: '感谢努力变美的自己',
        desc: '爱自己要实在一些，俏猫美睫感恩节特惠专场在等你！',
        link: 'http://mm.qiaocat.com/topic-thanksgiving-2017',
        imgUrl: 'http://mm.qiaocat.com/static/topic/thanksgiving_2017/share.jpg'
      },
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
    /*加入购物车*/
    async addCart(proid) {
      let qm_cookie = $.cookie(keyConf.qm_cookie);
      let isLogin = await userIsLogin();
      if (!qm_cookie || isLogin.status == "error") {
        if (common.getQueryString("app") == "ios") {
          window.location.href = `/login/login?action=login`;
        }else if(common.getQueryString("app") == "android"){
          window.location.href = `/login?action=login`;
        } else {
          Toast({
            message: '未登录',
            duration: 1500,
            className: 'toast-tip'
          });
          let baseUrl = this.plid
            ? `/login?url=/topic-thanksgiving-2017?plid=${this.plid}`
            : `/login?url=/topic-thanksgiving-2017`;
          this.$router.push(baseUrl);
        }
      } else {
        this.carts = this.carts ? this.carts : [];
        this.addProducts(proid);
        setStore(this.topicCart, this.carts);
        // this.filterDiscount();
        console.log(this.discount);
        Toast({
          message: '加入购物车成功',
          duration: 1000,
          className: 'toast-tip'
        });
      }
    },
    /*删除商品*/
    delProducts(products) {
      this.totalPrice = 0;
      this.count = 0;
      this.carts = products;
      setStore(this.topicCart, this.carts);
      this.carts.forEach(item => {
        this.totalPrice += item.price * item.num;
        this.count += item.num * 1;
      });
      // this.filterDiscount();
    },
    /*购买多个重复商品*/
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
    /*显示购物车列表*/
    showCart() {
      this.isbg = true;
      // $(window).scrollTop(0);
      $("body").css("overflow", "hidden");
    },
    /*隐藏购物车列表*/
    hiddenCart() {
      this.countProducts();
      this.isbg = false;
      $("body").css("overflow", "auto");
    },
    /*购物车商品列表*/
    countProducts() {
      this.count = 0;
      this.totalPrice = 0;
      let store = getStore(this.topicCart);
      this.carts = store && store.length > 0 ? JSON.parse(store) : [];
      this.carts.forEach(item => {
        this.totalPrice += item.price * item.num;
        this.count += item.num * 1;
      });
    },
    /*打折*/
    filterDiscount() {
      if (this.count >= 2) {

      }
    },
    /*美丽知多点--查看更多*/
    lookMore() {
      this.learn_more = false;
    },
    /*判断APP客户端是否已登录*/
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

    /*微信分享*/
    shareWechat() {
      let _this = this;
      wx.ready(function() {
        _this.share_setup(
          "感谢努力变美的自己",
          "爱自己要实在一些，俏猫美睫感恩节特惠专场在等你！",
          "http://mm.qiaocat.com/topic-thanksgiving-2017",
          "http://mm.qiaocat.com/static/topic/thanksgiving_2017/share.jpg"
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
  },
  components: {
    shoppingCart,
  },
}
</script>
<style lang="scss" scoped>
.thanksgiving {
  overflow-y : auto;
  -webkit-overflow-scrolling : touch;
  /*虚化背景*/
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
  /*主体内容*/
    /*banner*/
  .banner {
    font-size: 0;
    img {
      font-size: 0;
      width: 100%;
    }
  }
    /*产品*/
  .product {
    position: relative;
    font-size: 0;
    img {
      font-size: 0;
      width: 100%;
    }
    a.now-buy {
      width: 40%;
      height: 9%;
      cursor: pointer;
    }
    &:nth-of-type(even) {
      a.now-buy {
        bottom: 9.2%;
        right: 13%;
      }
    }
    &:nth-of-type(odd) {
      a.now-buy {
        bottom: 9.8%;
        left: 11%;
      }
    }
  }
    /*美丽知多点*/
  .look_more {
    position: absolute;
    left: 10%;
    top: 68%;
    width: 80%;
    height: 4rem;
    cursor: pointer;
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
      background-image: url("/static/topic/thanksgiving_2017/shopping_car.png");
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
}
</style>