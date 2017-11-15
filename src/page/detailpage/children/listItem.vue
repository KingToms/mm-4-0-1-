<template>
  <div class="look_item">
    <a :href=" stylist_id ? `/detail/${list.id}?stylist_id=${stylist_id}` : `/detail/${list.id}`">
      <div class="look_part">
        <div class="item_img">
           <!--<img v-lazy="list.images ? list.images : '../../../assets/image/img/detail/square_default_bg.jpg'" >-->
          <div class="img_box" :style="{backgroundImage : 'url('+myimgs+')'}">
            <a :href=" stylist_id ? `/detail/${list.id}?stylist_id=${stylist_id}` : `/detail/${list.id}`">
               <img src="../../../assets/image/icon/detail/square_default_bg.jpg">
              <!--<img :src="myimgs">-->
            </a>
          </div>
        </div>
        <p class="pro_desc">
          <span>{{list.name}}</span>
        </p>
        <p class="price">
          <span class="discount_price">￥{{list.price}}</span>
          <span class="original_price">￥{{list.market_price}}</span>
          <span class="follow">{{list.product_favorite_count}}</span>
        </p>
      </div>
    </a>
  </div>
</template>
<script>
import Vue from 'vue';
import { Lazyload } from 'mint-ui';
Vue.use(Lazyload);
export default {
  name: "listItem",
  data() {
    return {
      myimgs: "",
      stylist_id: null
    };
  },
  props: ["list"],
  methods: {
  },
  created() {
    this.stylist_id = this.$route.params.shopid ? this.$route.params.shopid : '';
    if (!this.list.images) {
      this.myimgs = "";
    } else {
      if (this.list.images.indexOf("http") != -1) {
        this.myimgs = this.list.images;
      } else {
        this.myimgs = "http://pic.qiaocat.com/upload/" + this.list.images;
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import "../../../assets/css/mixin.scss";
.look_item {
  float: left;
  padding: 2rem 0 1.6rem 0;
  border-bottom: 1px solid #ddd;
  width: 50%;
  text-align: center;
  a {
    display: block;
    .look_part {
      .item_img {
        display: inline-block;
        width: 100%;
        .img_box {
          width: calc(100% - 1rem);
          float: left;
          border-radius: 0.4rem;
          background-color: #f3f3f3;
          background-position: center;
          background-size: cover;
          img {
            display: block;
            width: 100%;
            opacity: 0;
            @include borderRadius(0.4rem);
          }
        }
      }
      .pro_desc {
        // text-align: left;
        text-align: center;
        padding-right: 1rem;
        height: 3rem;
        line-height: 1.5rem;
        font-size: 1.4rem;
        color: #000;
        margin-top: 0.5rem;
      }
      .price {
        position: relative;
        @include wh(100%, 1.5rem);
        margin-top: 0.5rem;
        .discount_price {
          margin-right: 1rem;
          font-size: 1.4rem;
          color: $themeRed;
          line-height: 2rem;
          height: 3.8rem;
        }
        .original_price {
          font-size: 1.2rem;
          color: #999;
          text-decoration: line-through;
        }
        .follow{
          display: inline-block;
          margin-left: 1rem;
          padding-left: 2rem;
          @include bgi_2('../../../assets/image/icon/home/product_icon_collect.png',1.1rem,1.1rem,6px,3px);
        }
      }
    }
  }
}
</style>
