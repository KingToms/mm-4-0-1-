<template>
  <div class="halloween">
    <div class="bg" v-show="isbg"></div>
    <section>
      <div class="first"><img :src="require('./img/halloween-1.jpg')" alt=""></div>
      <div class="first"><img src="./img/halloween-2.jpg" alt=""></div>
      <!-- 简单特效妆 -->
      <div class="first">
        <img src="./img/halloween-3.jpg" alt="">
        <a class="ah-3" href="javascript:void(0)" @click="addCart(1000540)"></a>
        <a class="ah-3" href="javascript:void(0)" @click="addCart(1000541)"></a>
        <a class="ah-3" href="javascript:void(0)" @click="addCart(1000542)"></a>
        <a class="ah-3" href="javascript:void(0)" @click="addCart(1000539)"></a>
      </div>
      <!-- 普通特效装 -->
      <div class="first"><img src="./img/halloween-4.jpg" alt=""></div>
      <div class="first">
        <img src="./img/halloween-5.jpg" alt="">
        <a class="ah-5" href="javascript:void(0)" @click="addCart(1000543)"></a>
        <a class="ah-5" href="javascript:void(0)" @click="addCart(1000544)"></a>
        <a class="ah-5" href="javascript:void(0)" @click="addCart(1000545)"></a>
      </div>
      <!-- 高级定制特效妆 -->
      <div class="first">
        <img src="./img/halloween-6.jpg" alt="">
        <a class="ah-6" href="javascript:void(0)" @click="addCart(1000546)"></a>
        <a class="ah-6" href="javascript:void(0)" @click="addCart(1000547)"></a>
      </div>
      <div class="first">
        <img src="./img/halloween-7.jpg" alt="">
        <a class="ah-7" href="javascript:void(0)" @click="addCart(1000548)"></a>
      </div>
      <div class="first"><img src="./img/halloween-8.jpg" alt=""></div>
      <div class="first"><img src="./img/halloween-9.jpg" alt=""></div>
      <div class="first">
        <img src="./img/halloween-10.jpg" alt="">
        <a class="ah-10" href="javascript:void(0)" @click="addCart(1000549)"></a>
      </div>
      <div class="first"><img src="./img/halloween-11.jpg" alt=""></div>
      <div class="first"><img src="./img/halloween-12.jpg" alt=""></div>
    </section>
    <section>
      <div class="shop-cart" @click="showCart">
        <div class="cart"></div>
        <icon v-show="count > 0" class="num">{{count}}</icon>
      </div>
    </section>
    <section>
      <div class="toast">加入购物车成功~</div>
    </section>
    <section>
      <shopping-cart :topicCart="topicCart" :fromAd="from_ad" :discount="discount" :isDiscount="isDiscount" :count="count" :totalPrice="totalPrice" :products="carts" @hiddenCart="hiddenCart" @delProducts="delProducts" class="bottom-cart" v-show="isbg"></shopping-cart>
    </section>
  </div>
</template>
<script>
// import shoppingCart from "../children/shoppingCart";
import shoppingCart from "../children/shoppingCart.1";
import keyConf from "../../../common/keyConf";
import { userIsLogin, authToken } from "@/service/getData";
import { halloweenData } from "../data.config";
import { setStore, getStore, storage_custom } from "../../../common/store";
import common from "../../../common/common";
export default {
  name: "halloween",
  data() {
    return {
      products: [],
      carts: [], // 购物车商品
      discountConst: { 1: 10, 2: 9, 3: 8, 4: 7, 10: 6 },
      discount: 10, // 折扣
      totalPrice: 0, // 总价格
      topicCart: "halloweenCart", // 购物车列表
      isDiscount: true, // 是否进行折扣
      isbg: false,
      count: 0, // 商品数量
      plid: "", // 推广来源
      from_ad: "topic_halloween2017", //专题来源
    };
  },
  created() {
    // this.authUser();
    this.setStorage();
    this.plid = common.getQueryString("plid")
      ? common.getQueryString("plid")
      : "";
    this.products = halloweenData;
    this.countProducts();
    this.filterDiscount();
    this.shareWechat();
  },
  components: {
    shoppingCart
  },
  methods: {
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
            ? `/login?url=/topic-halloween?plid=${this.plid}`
            : `/login?url=/topic-halloween`;
          this.$router.push(baseUrl);
        }
      } else {
        this.carts = this.carts ? this.carts : [];
        this.addProducts(proid);
        setStore(this.topicCart, this.carts);
        this.filterDiscount();
        console.log(this.discount);
        this.toast();
      }
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
      this.filterDiscount();
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
    showCart() {
      this.isbg = true;
      // $(window).scrollTop(0);
      $("body").css("overflow", "hidden");
    },
    hiddenCart() {
      this.countProducts();
      this.isbg = false;
      $("body").css("overflow", "auto");
    },
    filterDiscount() {
      if (this.count === 10) {
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
          "【万圣节】 你“妆”够了吗",
          "上【俏猫】预约化妆服务，将美进行到底,搞怪也要美美哒~",
          "http://mm.qiaocat.com/topic-halloween",
          "http://mm.qiaocat.com/static/topic/halloween/share.jpg"
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
          ? $.cookie(keyConf.qm_cookie, res.data.id, {expires:1, path: '/'})
          : $.cookie(keyConf.qm_cookie, "");
      }
    },
    async setStorage() {
      let datetime = common.getQueryString("datetime");
      let app = common.getQueryString("app");
      if (datetime && app) {
        let res = await authToken({ token: datetime });
        res.status === "ok"
          ? $.cookie(keyConf.qm_cookie, res.data.id, {expires:1, path: '/'})
          : $.cookie(keyConf.qm_cookie, "");
        storage_custom.set(keyConf.token, datetime);
      } else if (!datetime && app) {
        storage_custom.set(keyConf.token, "");
        $.cookie(keyConf.qm_cookie, "");
      }
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
    }
  }
};
</script>
<style lang="scss" scoped>
.halloween {
  .bg {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 1;
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
    background: rgba(250, 245, 245, 0.5);
    border-radius: 0.5rem;
    text-align: center;
    line-height: 5rem;
    color: #fff;
  }
  .bottom-cart {
    position: fixed;
    bottom: 0;
    left: 0;
    height: 32.7rem;
    width: 100%;
    background-color: #fff;
    z-index: 2;
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
    height: 4%;
    &:nth-of-type(1) {
      top: 50.3%;
      left: 10.2%;
    }
    &:nth-of-type(2) {
      top: 50.3%;
      right: 11%;
    }
    &:nth-of-type(3) {
      bottom: 6.5%;
      left: 10.2%;
    }
    &:nth-of-type(4) {
      bottom: 6.5%;
      right: 11%;
    }
  }
  .ah-5 {
    height: 5.4%;
    &:nth-of-type(1) {
      width: 38.5%;
      top: 43.9%;
      left: 29%;
    }
    &:nth-of-type(2) {
      height: 5.2%;
      bottom: 6.1%;
      left: 10.2%;
    }
    &:nth-of-type(3) {
      height: 5.2%;
      bottom: 6.1%;
      right: 10%;
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
  .shop-cart {
    position: fixed;
    width: 5.7rem;
    height: 5.2rem;
    right: 2.7rem;
    bottom: 4rem;
    .cart {
      width: 100%;
      height: 100%;
      background-image: url("./img/shop-cart.png");
      background-size: contain;
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