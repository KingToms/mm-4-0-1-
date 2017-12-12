<template>
  <div class="shopping-cart">
    <div class="title">
      <h1>购物车</h1>
      <span class="icon" @click="closeCart"></span>
    </div>
    <div class="product-list">
      <ul v-if="products.length>0">
        <li v-for="(item, index) in products" :key="index">
          <div class="text-info">
            <div class="price">
              <p>{{item.name}}</p>
              <div class="price-product-cal">
                <span class="price">￥{{item.price}}</span>
                  <span class="reduce" @click="delProductByOne(item.id)"></span>
                  <span class="num">{{item.num}}</span>
                  <span class="add"  @click="addProductByOne(item.id)"></span>
              </div>
            </div>
            <span class="delete" @click="delProduct(item.id)"></span>
          </div>
          <img v-bind="{src:item.img}" alt="">
        </li>
      </ul>
      <div class="text" v-else>购物车为空，快去加入商品吧~</div>
    </div>
    <div class="bottom-total">
      <div class="tip" v-if="count <= 10 && isDiscount">{{count}}人团购享受{{discount}}折</div>
      <div class="tip" :style="{ lineHeight: '1.8rem' }" v-if="count > 10 && isDiscount">10人以上团购享受4折，<br>
        有特殊需求请致电小助理： <a href="tel:13632246144">136-3224-6144</a>
      </div>
      <div class="tip_reduce" v-if="isReduce">任意两款一起下单立减50元</div>
      <div class="total">
        <span class="f18">合计:</span>
        <span class="f18" v-if="!isReduce">￥{{ isDiscount ? totalPrice * discount / 10 : totalPrice}}</span>
        <span class="f18" v-if="isReduce">￥{{ count >=2 ? (totalPrice - 50) : totalPrice}}</span>
        <del v-if="isDiscount">￥{{totalPrice}}</del>
        <span class="f_reduce" v-if="isReduce && count >=2">(已减50元)</span>
        <span class="btn-order" @click="order">马上下单</span>
      </div>
    </div>
  </div>
</template>
<script>
import { userIsLogin } from "@/service/getData";
import { setStore, getStore, storage_custom } from "../../../../common/store";
import common from '../../../../common/common';
import keyConf from "../../../../common/keyConf";
import { Toast } from 'mint-ui';
import '../../../../../node_modules/mint-ui/lib/toast/style.css';
export default {
  name: "shoopingCart",
  data() {
    return {
      total: 0,
      num: 0,
      discountConst01: { 1: 10, 2: 9, 3: 8, 4: 7, 10: 4 },
    };
  },
  props: {
    products:{
      default: [],
      type: Array
    },
    totalPrice: {
      default: 0,
      type: Number
    },
    discount: {
      default: 10,
      type: Number
    },
    count: {
      default: 0,
      type: Number
    },
    allProducts: {
      default: [],
      type: Array
    },
    isDiscount:{
      default: false,
      type: Boolean
    },
    topicCart: {
      default: '',
      type: String
    },
    fromAd: {
      default: '',
      type: String
    },
    plid: {
      default: '',
      type: String
    },
    isReduce: {
      default: false,
      type: Boolean
    }
  },
  methods: {
    closeCart() {
      this.$emit("hiddenCart");
    },
    delProduct(proid) {
      let index = 0;
      for (index; index < this.products.length; index++) {
        if (this.products[index].id == proid) {
          this.count = this.count - this.products[index].num;
          this.totalPrice = this.totalPrice - this.products[index].price * this.products[index].num;
          break;
        }
      }
      this.products = this.products.filter(item => item.id != proid);
      this.$emit("delProducts", this.products);
      if(this.isDiscount) this.filterDiscount01();
      // setStore(this.topicCart, this.products);
    },
    delProductByOne(proid) {
      for (let index = this.products.length - 1; index >= 0; index--) {
        if (this.products[index].id == proid) {
          this.totalPrice = this.totalPrice - this.products[index].price;
          this.products[index].num - 1 == 0
            ? this.products.splice(index, 1)
            : this.products[index].num--;
          break;
        }
      }
      this.count--;
      this.$emit("delProducts", this.products);
      if(this.isDiscount) this.filterDiscount01();
      console.log("this.count:",this.count,";isReduce:",this.isReduce);
      // setStore(this.topicCart, this.products);
    },
    addProductByOne(proid) {
      this.addProducts(proid);
      if(this.isDiscount) this.filterDiscount01();
    },
    addProducts(proid) {
      let index = 0;
      let length = this.products.length;
      for (index; index < this.products.length; index++) {
        if (this.products[index].id == proid) {
          this.products[index].num = this.products[index].num - 0 + 1;
          this.totalPrice = this.totalPrice - 0 + (this.products[index].price - 0);
          break;
        }
      }
      this.count++;
      this.$emit("delProducts", this.products);
      // setStore(this.topicCart, this.products);
    },
    order() {
      if (this.count < 1) {
        // alert("先去添加商品吧~");
        Toast({
          message: '先去添加商品吧~',
          duration: 1000,
          className: 'toast-tip'
        });
        return;
      }
      // 判断是否登录才能下单
      let qm_cookie = $.cookie(keyConf.qm_cookie);
      // let isLogin = await userIsLogin();
      if (!qm_cookie && (common.getQueryString("app") == 'ios' || common.getQueryString("app") == 'android')){
        window.location.href = `/login?action=login`;
        return;
      }

      this.$emit("hiddenCart");
      let proids = "";
      this.products.forEach(item => {
        let index = 0;
        for (let index = 0; index < item.num; index++) {
          proids += item.id + ",";
        }
      });

      this.$router.push({
        name: "topicOrder",
        params: { id: proids.substr(0, proids.length - 1) },
        query: { from_ad: this.fromAd, plid: this.plid }
      });
    },
    filterDiscount01() {
      if (this.count >= 10) {
        this.discount = this.discountConst01[10];
      } else if (this.count < 10 && this.count >= 4) {
        this.discount = this.discountConst01[4];
      } else if (this.count < 4 && this.count >= 3) {
        this.discount = this.discountConst01[3];
      } else if (this.count === 2) {
        this.discount = this.discountConst01[2];
      } else if (this.count === 1) {
        this.discount = this.discountConst01[1];
      }else{
        this.discount = 10;
      }
    },
  }
};
</script>
<style lang="scss" scoped>
@import "../../../../assets/css/mixin.scss";
.shopping-cart {
  .title {
    height: 5rem;
    line-height: 5rem;
    position: relative;
    h1 {
      text-align: center;
      font-size: 2rem;
      color: #000;
    }
    span.icon {
      position: absolute;
      top: 0;
      right: 0;
      width: 2.95rem;
      height: 2.9rem;
      background-image: url("/static/topic/halloween/mask_delete01.png");
      background-size: contain;
    }
  }
  .bottom-total {
    // padding-left: 1.5rem;
    position: fixed;
    width: 100%;
    bottom: 0;
    .tip {
      // @include average(#ccc);
      padding-left: 1.5rem;
      min-height: 2.4rem;
      font-size: 1.2rem;
      color: #999;
      line-height: 2.4rem;
      background-color: #eee;
      a {
        font-size: 1.2rem;
        color: #999;
      }
    }
    // 满减优惠
    .tip_reduce {
      padding-left: 1.5rem;
      height: 3rem;
      font-size: 1.3rem;
      color: #333;
      line-height: 3rem;
      background-color: #e2e2e2;
    }
    .total {
      position: relative;
      border-top: 0.05rem solid #ccc;
      padding-left: 1rem;
      line-height: 5.1rem;
      .f18 {
        @include sc(1.8rem,
        #be0407);
      }
      span:nth-of-type(2) {
        padding-left: 0.5rem;
      }
      del:nth-of-type(1) {
        padding-left: 0.5rem;
        @include sc(1.5rem,
        #999);
      }
      // 满减优惠：已减50元
      span.f_reduce {
        font-size: 1.4rem;
        color: #999;
      }
      span.btn-order {
        position: absolute;
        right: 0;
        // width: 13.5rem;
        width: 40%;
        height: 5.1rem;
        background-color: #be0407;
        @include sc(2rem,
        #fff);
        text-align: center;
      }
    }
  }
  .product-list {
    overflow-y: auto;
    height: 20rem; // background-color: #999;
    ul {
      padding-left: 1.5rem;
      li {
        position: relative;
        @include average(#ccc);
        height: 10rem;
        img {
          position: absolute;
          @include wh(7rem,
          7rem);
          top: 50%;
          transform: translateY(-50%);
        }
        .text-info {
          position: relative;
          padding: 2rem 0 0 8.5rem;
          .price {
            @include sc(1.5rem,
            #333);
          }
          .price-product-cal {
            position: relative;
            span.price {
              display: inline-block;
              padding-top: 1rem;
              color: #be0407;
            }
            span.reduce,
            span.add {
              position: absolute;
              top: 1rem;
              @include wh(2.2rem,2.2rem);
            }
            span.reduce {
              left: 7rem;
              background-image: url("/static/topic/halloween/btn_-subtract.jpg");
              background-size: contain;
            }
            span.add {
              left: 14rem;
              background-image: url("/static/topic/halloween/btn_add.jpg");
              background-size: contain;
            }
            span.num {
              position: absolute;
              top: 1rem;
              left: 11rem;
            }
          }
          .delete {
            position: absolute;
            right: 1.6rem;
            top: 50%;
            transform: translateY(-50%);
            background-image: url("/static/topic/halloween/mask_delete02.png");
            background-size: contain;
            @include wh(1.95rem,
            2.35rem);
          }
        }
      }
    }
    .text {
      @include wh(100%,
      100%);
      @include sc(2rem,
      #666);
      text-align: center;
      padding-top: 7rem;
    }
  }
}
</style>