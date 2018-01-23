<template>
<div class="makeupBride">
    <div class="bg" v-show="isbg"></div>
    <section>
      <div class="first"><img src="./img/1.jpg" alt=""></div>
      <div class="first"><img src="./img/2.jpg" alt=""></div>
      <div class="first"><img src="./img/3.jpg" alt=""></div>
    </section>
    <div style="width:100%;height:51.6rem" @touchstart="touchstart">
      <!-- 配置slider组件 -->
      <slider ref="slider" :pages="pages" :sliderinit="sliderinit" @slide='slide' @tap='onTap' @init='onInit'>
          <!-- 设置loading,可自定义 -->
          <!-- <div slot="loading">loading...</div> -->
      </slider>
    </div>
    <section>
      <div class="bottom-panel">
        <div class="line left"></div>
        <div class="bgc">
          <div :class="{ 'active': currentPage == 0}"></div>
          <div :class="{ 'active': currentPage == 1}"></div>
          <div :class="{ 'active': currentPage == 2}"></div>
          <div :class="{ 'active': currentPage == 3}"></div>
        </div>
        <div class="line right"></div>
        <div class="top-panel">
          <div class="formart">
            <div class="content" :class="{ 'active': currentPage == 0}" @click="turnTo(0)">
              <div><span>HOT</span>热门</div>
              <div>定制妆容</div>
            </div>
            <div class="content" :class="{ 'active': currentPage == 1}" @click="turnTo(1)">
              <div>欧式</div>
              <div>摩登复古</div>
            </div>
            <div class="content" :class="{ 'active': currentPage == 2}" @click="turnTo(2)">
              <div>中式</div>
              <div>端庄大方</div>
            </div>
            <div class="content" :class="{ 'active': currentPage == 3}" @click="turnTo(3)">
              <div>韩式</div>
              <div>清新时尚</div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section>
      <div class="first"><img src="./img/5.jpg" alt=""></div>
      <div class="first">
        <img src="./img/6.jpg" alt="">
        <a class="ah-5" href="javascript:void(0)" @click="addCart(1000959)"></a>
        <a class="ah-5" href="javascript:void(0)" @click="addCart(1000960)"></a>
        <a class="ah-5" href="javascript:void(0)" @click="addCart(1000961)"></a>
        <a class="telService" href="tel:400-8335-138"></a>
      </div>
      <div class="first">
        <img src="./img/7.jpg" alt="">
        <a class="ah-3" href="javascript:void(0)" @click="addCart(1000307)"></a>
        <a class="ah-3" href="javascript:void(0)" @click="addCart(1000962)"></a>
        <a class="ah-3" href="javascript:void(0)" @click="addCart(1000963)"></a>
      </div>
      <div class="first"><img src="./img/8.jpg" alt=""></div>
    </section>
    <section>
      <div class="shop-cart" @click="showCart">
        <div class="cart"></div>
        <icon  class="num">{{count}}</icon>
      </div>
    </section>
    <section>
      <div class="toast">加入购物车成功~</div>
    </section>
    <section>
      <shopping-cart :isAddBuy="isAddBuy" :addBuyIds="addBuyIds" :topicCart="topicCart" :fromAd="from_ad" :discount="discount" :isDiscount="isDiscount" :count="count" :totalPrice="totalPrice" :products="carts" @hiddenCart="hiddenCart" @delProducts="delProducts" class="bottom-cart" v-show="isbg"></shopping-cart>
    </section>
</div>
</template>
<script>
import slider from "vue-concise-slider";
import shoppingCart from "../children/shoppingCart.1";
import keyConf from "../../../common/keyConf";
import { halloweenData } from "../data.config";
import { userIsLogin, authToken } from "@/service/getData";
import { setStore, getStore, storage_custom } from "../../../common/store";
import common from "../../../common/common";
export default {
  name: "makeupBride",
  data() {
    return {
      isbg: false,
      // 轮播图插件
      pages: [
        {
          html:
            '<img class="img" src="/static/topic/bride_2018_festival/4_1.jpg" alt="">'
        },
        {
          html:
            '<img class="img" src="/static/topic/bride_2018_festival/4_2.jpg" alt="">'
        },
        {
          html:
            '<img class="img" src="/static/topic/bride_2018_festival/4_3.jpg" alt="">'
        },
        {
          html:
            '<img class="img" src="/static/topic/bride_2018_festival/4_4.jpg" alt="">'
        }
      ],
      sliderinit: {
        currentPage: 0,
        autoplay: 4000,
        loop: true,
        duration: 300
      },
      currentPage: 0,
      products: [],
      carts: [], // 购物车商品
      totalPrice: 0, // 总价格
      topicCart: "makeupbride_2018_festivalCart", // 购物车列表
      isDiscount: false, // 是否进行折扣
      isAddBuy: true, // 是否有加拍规则
      addBuyIds: [1000307, 1000962, 1000963], // 加拍的商品
      count: 0, // 商品数量
      plid: "", // 推广来源
      from_ad: "topic_makeupbride_2018_festival" //专题来源
    };
  },
  created(){
    this.shareWechat();
  },
  mounted() {
    this.products = halloweenData;
    this.countProducts();
    
  },
  components: {
    shoppingCart,
    slider
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    }
  },
  methods: {
    async setStorage() {
      let datetime = common.getQueryString("datetime");
      let app = common.getQueryString("app");
      if (datetime && app) {
        let res = await authToken({ token: datetime });
        res.status === "ok"
          ? $.cookie(keyConf.qm_cookie, res.data.id, { expires: 1, path: "/" })
          : $.cookie(keyConf.qm_cookie, "");
        storage_custom.set(keyConf.token, datetime);
      } else if (!datetime && app) {
        storage_custom.set(keyConf.token, "");
        $.cookie(keyConf.qm_cookie, "");
      }
    },
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
            ? `/login?url=/topic-makeupbride?plid=${this.plid}`
            : `/login?url=/topic-makeupbride`;
          this.$router.push(baseUrl);
        }
      } else {
        this.carts = this.carts ? this.carts : [];
        this.addProducts(proid);
        setStore(this.topicCart, this.carts);
        // this.filterDiscount();
        // console.log(this.discount);
        this.toast();
      }
    },
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
    touchstart(data){
      console.log(data)
    },
    turnTo (num) {
      // 传递事件 vue 2.0 传递事件修改了，好的写法应该直接写在空vue类中
      // console.log(this)
      this.$refs.slider.$emit('slideTo', num)
      this.currentPage = num == 4 ? 0 : num;
    },
    // Listener event
    slide(data) {
      this.currentPage = data.currentPage == 4 ? 0 : data.currentPage;
    },
    onTap(data) {
      console.log(data);
    },
    onInit(data) {
      console.log(data);
    },
    showCart() {
      this.isbg = true;
      $("body").css("overflow", "hidden");
    },
    hiddenCart() {
      this.countProducts();
      this.isbg = false;
      $("body").css("overflow", "auto");
    },
    toast() {
      $(".toast").fadeIn(500, function() {
        setTimeout(function() {
          $(".toast").fadeOut(500);
        }, 2000);
      });
    },
    shareWechat() {
      let _this = this;
      wx.ready(function() {
        // if (window.location.href.indexOf('/topic-halloween') > -1) {
        _this.share_setup(
          "俏猫 | 新娘跟妆服务",
          "新娘早妆、半天跟妆、全天跟妆，俏猫上门轻松帮您搞定。快来定制新娘妆，做完美新娘！",
          "http://mm.qiaocat.com/topic-makeupbride",
          "http://mm.qiaocat.com/static/topic/bride_2018_festival/share.jpg"
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
    }
  }
};
</script>
<style lang="scss">
.makeupBride {
  .bottom-panel {
    width: 100%;
    padding: 0 3rem;
    position: relative;
    .line {
      border: 0.05rem solid #000;
      width: 3rem;
      position: absolute;
      top: 50%;
      &.left {
        left: 0;
      }
      &.right {
        right: 0;
      }
    }
    .bgc {
      width: 100%;
      display: flex;
      div{
        margin: 2.25rem 0;
        height: 4.5rem;
        flex: 1;
        background-color: #cddcff;
        margin-left: 2px;
        &.active{
          background-color: #89a5e4;
        }
      }
    }
    .top-panel{
      position: absolute;
      width: 100%;
      top: 20%;
      left: 0;
      .formart{
        padding: 0 3.5rem 0 2rem;
        display: flex;
        >div{
          flex: 1;
          margin-left: -1px;
          height: 4.5rem;
          background-color: #fff;
          border: .05rem solid #759cf2;
          text-align: center;
          padding-top: 3px;
          font-size: 1.3rem;
          div{
            color: #759cf2;
          }
          span{
            padding: .2rem;
            margin-right: .2rem;
            background-color: #ecc3f1;
            border: .01rem solid #000;
            font-size: 1.2rem;
          }
          &.active{
            background-color: #abc5ff;
            div{
              color: #fff;
            }
          }
        }
      }
    }
  }
  .slider-item > .img {
    height: 52.6rem !important;
    width: 100%;
  }
  .swipe-wrapper {
    width: 100%;
    height: 51.6rem;
  }
  .telService {
    width: 16%;
    height: 10.2%;
    border-radius: 50%;
    bottom: 8%;
    right: 9.3%;
    // background-color: #e70034;
  }
  .bg {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 9999;
  }
  .toast {
    position: fixed;
    display: none;
    top: 40%;
    left: 50%;
    transform: translateX(-50%);
    width: 16rem;
    height: 5rem;
    font-size: 1.6rem;
    background: rgba(0, 0, 0, 0.4);
    border-radius: 0.5rem;
    text-align: center;
    line-height: 5rem;
    color: #fff;
  }
  .first {
    position: relative; // margin-top: -10px;
    font-size: 0;
    margin-top: -5px;
    img {
      font-size: 0;
      width: 100%;
    }
  }
  a {
    position: absolute;
    width: 31.3%; // background-color: #fff;
  }
  .ah-3 {
    height: 4.5%;
    // background-color: #e70034;
    &:nth-of-type(1) {
      top: 31.5%;
      right: 14.9%;
    }
    &:nth-of-type(2) {
      top: 59%;
      left: 11%;
    }
    &:nth-of-type(3) {
      bottom: 8.5%;
      right: 15%;
    }
  }
  .ah-5 {
    height: 5.5%;
    right: 11%;
    // background-color: #e70034;
    &:nth-of-type(1) {
      width: 31.6%;
      top: 21.9%;
    }
    &:nth-of-type(2) {
      top: 43.4%;
    }
    &:nth-of-type(3) {
      bottom: 29.1%;
    }
  }
  .ah-6 {
    height: 6.5%;
    width: 31.2%;
    bottom: 5.9%;
    &:nth-of-type(1) {
      left: 10.4%;
    }
    &:nth-of-type(2) {
      right: 11%;
    }
  }
  .ah-7 {
    height: 7.5%;
    width: 38%;
    bottom: 34.2%;
    left: 30%;
  }
  .ah-10 {
    height: 10.2%;
    width: 43%;
    bottom: 13%;
    left: 28.3%;
  }
  .bottom-cart {
    position: fixed;
    bottom: 0;
    left: 0;
    height: 32.7rem;
    width: 100%;
    background-color: #fff;
    z-index: 9999;
  }
  .shop-cart {
    position: fixed;
    width: 5.7rem;
    height: 5.2rem;
    right: 2.7rem;
    bottom: 4rem;
    z-index: 9998;
    .cart {
      width: 100%;
      height: 100%;
      background-image: url("./img/car/shopping_car.png");
      background-size: contain;
      background-repeat: no-repeat;
    }
    .num {
      position: absolute;
      right: 0;
      top: 0;
      width: 2rem;
      height: 2rem;
      border-radius: 1rem;
      background-color: #e70034;
      color: #fff;
      text-align: center;
      vertical-align: middle;
    }
  }
}
</style>