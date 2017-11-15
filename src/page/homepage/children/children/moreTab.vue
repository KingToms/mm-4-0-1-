<template>
<div class="more-tab">
  <div class="title">
    {{title}}
    <router-link :to="to" class="more-img"></router-link>
  </div>
  <div class="items">
    <div class="item" v-for="(item,index) in list" :key="index" @click="$router.push(`/detail/${item.product.id}`)">
      <div class="item-img">
        <img :src="item.product && item.product.thumb" alt="">
        <div class="collect">
          <span class="icon">{{item.product && item.product.follow_count}}</span>
        </div>
      </div>
      <div class="item-text">{{item.product && item.product.name}}</div>
      <p class="item-price">
        <span class="price">￥{{item.product && item.product.price}}</span>
        <del class="price-del">￥{{item.product && item.product.market_price}}</del>
      </p>
    </div>
  </div>
</div>
</template>
<script>
export default {
  name: "moreTab",
  data() {
    return {};
  },
  props: {
    title: {
      type: String,
      default: "推荐化妆"
    },
    list: {
      type: Array,
      default: []
    },
    to:{
      type: String,
      default: '/'
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../../../assets/css/mixin.scss";
.more-tab {
  background-color: #fff;
  margin-top: 1rem;
  padding: 2rem 0 0 1.5rem;
  .title {
    position: relative;
    font-size: 1.7rem;
    line-height: 1.4rem;
    padding-bottom: 1.5rem;
    .more-img {
      position: absolute;
      background-image: url("../../../../assets/image/icon/all/home_icon_more.png");
      background-size: contain;
      background-repeat: no-repeat;
      right: 1.5rem;
      top: 32%;
      transform: translateY(-50%);
      @include wh(4.2rem, 1.15rem);
      padding: 1rem;
    }
  }
  .items {
    display: flex;
    .item {
      flex: 1;
      .item-img {
        position: relative;
        @include wh(10.8rem, 10.8rem);
        img {
          width: 100%;
        }
        .collect {
          position: absolute;
          height: 1.5rem;
          top: 0.5rem;
          right: 0.5rem;
          line-height: 1.5rem;
          background: rgba(255, 255, 255, .5);
          border-radius: 8px;
          span {
            padding: 0 0.6rem 0 2rem;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            &:before {
              position: absolute;
              left: 16%;
              top: 14%;
              @include wh(1.1rem, 0.95rem);
              background-image: url("../../../../assets/image/icon/all/home_icon_like.png");
              background-size: contain;
              content: "";
            }
          }
        }
      }
      .item-text {
        height: 5rem;
        text-align: center;
        padding: 1rem 0.3rem 0;
        @include sc(1.2rem, $bgBlack);
      }
      .item-price {
        text-align: center;
        .price {
          @include sc(1.4rem, $themeRed);
        }
        .price-del {
          @include sc(1.2rem, #999);
        }
      }
    }
  }
}
</style>