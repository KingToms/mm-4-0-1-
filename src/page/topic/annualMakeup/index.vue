<template>
  <div class="annual-makeup">
    <div class="bg" v-show="isbg"></div>
    <section>
      <div class="banner">
        <img src="/static/topic/annualMakeup/annual_topic_01.jpg" alt="">
        <img src="/static/topic/annualMakeup/annual_topic_02.jpg" alt="">
      </div>
      <div class="product pro_01">
        <img src="/static/topic/annualMakeup/annual_topic_03.jpg" alt="年会清新仙女装">
        <img src="/static/topic/annualMakeup/annual_topic_04.jpg" alt="年会清新仙女装">
        <a class="now-buy" href="javascript:void(0)" @click="addCart(1000893)"></a>
      </div>
      <div class="product pro_02">
        <img src="/static/topic/annualMakeup/annual_topic_05.jpg" alt="年会御姐气场妆">
        <a class="now-buy" href="javascript:void(0)" @click="addCart(1000894)"></a>
      </div>
      <div class="product pro_03">
        <img src="/static/topic/annualMakeup/annual_topic_06.jpg" alt="年会俊朗绅士妆">
        <a class="now-buy" href="javascript:void(0)" @click="addCart(1000895)"></a>
      </div>
      <div class="tips">
        <img src="/static/topic/annualMakeup/annual_topic_07_new.jpg" alt="一起来更优惠">
        <img src="/static/topic/annualMakeup/annual_topic_08.jpg" alt="更多惊喜">
        <img src="/static/topic/annualMakeup/annual_topic_09.jpg" alt="为什么要化年会妆">
        <img src="/static/topic/annualMakeup/annual_topic_10.jpg" alt="专业保障">
        <img src="/static/topic/annualMakeup/annual_topic_11.jpg" alt="服务流程">
        <img src="/static/topic/annualMakeup/annual_topic_12.jpg" alt="温馨提示">
      </div>

      <!--分享信息-->
      <span id="differentShare" :data="JSON.stringify(shareData)" style="display: none"></span>
    </section>
    <!--购物车-->
    <section>
      <div class="shop-cart" @click="showCart">
        <div class="cart"></div>
        <icon v-show="count > 0" class="num">{{count}}</icon>
      </div>
    </section>
    <!--提示-->
    <section>
      <div class="toast">加入购物车成功~</div>
    </section>
    <!--购物车列表-->
    <section>
      <shopping-cart :topicCart="topicCart" :plid="plid" :fromAd="from_ad" :discount="discount" :isDiscount="isDiscount" :count="count" :totalPrice="totalPrice" :products="carts" @hiddenCart="hiddenCart" @delProducts="delProducts" class="bottom-cart" v-show="isbg"></shopping-cart>
    </section>
  </div>
</template>
<script>
import shoppingCart from "./children/shoppingCart.2";
import keyConf from "../../../common/keyConf";
import { userIsLogin, authToken } from "@/service/getData";
import { halloweenData } from "../data.config";
import { setStore, getStore, storage_custom } from "../../../common/store";
import common from "../../../common/common";
export default {
  name: "annualMaketup",
  data () {
    return {
      products: [],
      carts: [], // 购物车商品
      discountConst: { 1: 10, 2: 9, 3: 8, 4: 7, 10: 4 },
      discount: 10, // 折扣
      totalPrice: 0, // 总价格
      topicCart: "annualMakeupCart", // 购物车列表
      isDiscount: true, // 是否进行折扣
      isbg: false,
      count: 0, // 商品数量
      plid: "", // 推广来源
      from_ad: "topic_annualmakeup2017", //专题来源

      shareData: { // APP分享
        title: '俏猫|年会妆定制',
        desc: '俏猫3周年，全场7折更实惠！忙了一年，是时候在年会上耀眼全场了！俏猫上门化妆还你好气色，面色红润有光泽~',
        link: 'http://mm.qiaocat.com/topic-annual-makeup?plid=94',
        imgUrl: 'http://mm.qiaocat.com/static/topic/annualMakeup/share.jpg'
      },
    };
  },
  created (){
    this.plid = common.getQueryString("plid") ? common.getQueryString("plid") : "";
    this.products = halloweenData;
    this.countProducts();
    this.filterDiscount();
    this.shareWechat();
  },
  methods: {
    /*添加到购物车*/
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
          alert("未登录");
          let baseUrl = this.plid
            ? `/login?url=/topic-annual-makeup?plid=${this.plid}`
            : `/login?url=/topic-annual-makeup`;
          this.$router.push(baseUrl);
        }
      } else {
        this.carts = this.carts ? this.carts : [];
        this.addProducts(proid);
        setStore(this.topicCart, this.carts);
        this.filterDiscount();
        this.toast();
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
      this.filterDiscount();
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
    /*显示购物车*/
    showCart() {
      this.isbg = true;
      // $(window).scrollTop(0);
      $("body").css("overflow", "hidden");
    },
    /*隐藏购物车*/
    hiddenCart() {
      this.countProducts();
      this.isbg = false;
      $("body").css("overflow", "auto");
    },
    /*专题打折*/
    filterDiscount() {
      if (this.count >= 10) {
        this.discount = this.discountConst[10];
      } else if (this.count < 10 && this.count >= 4) {
        this.discount = this.discountConst[4];
      } else if (this.count < 4 && this.count >= 3) {
        this.discount = this.discountConst[3];
      } else if (this.count === 2) {
        this.discount = this.discountConst[2];
      } else if (this.count === 1) {
        this.discount = this.discountConst[1];
      }else{
        this.discount = 10;
      }
      console.log("this.discount:",this.discount);
    },
    /*弹框提示*/
    toast() {
      $(".toast").fadeIn(500, function() {
        setTimeout(function() {
          $(".toast").fadeOut(500);
        }, 2000);
      });
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

    /*微信分享*/
    shareWechat() {
      let _this = this;
      wx.ready(function() {
        _this.share_setup(
          "俏猫|年会妆定制",
          "俏猫3周年，全场7折更实惠！忙了一年，是时候在年会上耀眼全场了！俏猫上门化妆还你好气色，面色红润有光泽~",
          "http://mm.qiaocat.com/topic-annual-makeup?plid=94",
          "http://mm.qiaocat.com/static/topic/annualMakeup/share.jpg"
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
.annual-makeup {
  a {
    display: block;
    position: absolute;
  }
  .banner,.product,.tips {
    position: relative;
    font-size: 0;
    img {
      font-size: 0;
      width: 100%;
    }
  }
  .product {
    .now-buy {
      width: 48%;
      height: 4%;
      bottom: 1.5%;
      left: 26%;
      cursor: pointer;
    }
  }
  .pro_02 {
    .now-buy {
      bottom: 2.5%;
    }
  }
  .pro_03 {
    .now-buy {
      bottom: 4.2%;
    }
  }
  

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