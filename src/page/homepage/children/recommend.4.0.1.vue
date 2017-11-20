<template>
  <div class="main">
    <div style="background-color: #fff; padding-bottom: 1.5rem;">
      <!--顶部轮播-->
    <div class="swipe-wrapper" v-show="topCarousel">
      <mt-swipe>
        <mt-swipe-item v-for="(item,index) in resData.Shuffling" :key="index">
          <!-- :class="{imgshow: item.image.length > 0}" -->
          <a class="imgshow" target="_blank" :href="item.link">
            <img :src="item.image" alt="">
          </a>
        </mt-swipe-item>
      </mt-swipe>
    </div>
    <!--选项-->
    <div class="option_box">
      <div class="option">
        <router-link class="option_item"  v-for="(item, index) in resData.type_conf" :key="index" :to="`/home/makeup/${item.link}/${item.title}`">
            <img id="sign" :src="item.image">
            <!-- <img id="sign" src="../../../assets/image/icon/all/home_icon_classify01.png"> -->
            <p class="option_label">{{item.title}}</p>
        </router-link>
        <!-- <a href="/home/makeup/64" class="option_item">
            <img id="discount" src="../../../assets/image/icon/all/home_icon_classify02.png">
            <p class="option_label">美睫</p>
        </a>
        <a href="/home/makeup/128" class="option_item">
            <img id="invitation" src="../../../assets/image/icon/all/home_icon_classify03.png">
            <p class="option_label">半永久</p>
        </a>
        <a href="/home/medical" target="_blank" class="option_item">
            <img id="trial" src="../../../assets/image/icon/all/home_icon_classify04.png">
            <p class="option_label">医美</p>
        </a>
        <a href="/home/train" target="_blank" class="option_item">
            <img id="trial" src="../../../assets/image/icon/all/home_icon_classify05.png">
            <p class="option_label">培训</p>
        </a> -->
      </div>
    </div>
    </div>
    <!-- 广告图 -->
    <div class="adver" v-if="resData.Advert && resData.Advert.length > 0">
      <a :href="resData.Advert[0].link">
        <img :src="resData.Advert[0].image" alt="">
      </a>
    </div>
    <!-- 热卖排行 -->
    <div class="hot">
      <div class="title">
        <h1>热卖排行</h1>
        <p>
          <span>
            <div></div>
            <div></div>
          </span>
          这24小时大家都买什么 
          <span class="clear">
            <div class="right"></div>
            <div class="right"></div>
          </span>
        </p>
      </div>
      <div class="scroll">
        <div class="item-scroll">
          <span :style="{width:`${wStyle}px`}" v-for="(item,index) in resData.Hotlist" :key="index" @click="$router.push(`/detail/${item.product.id}`)">
            <div class="item" :style="{width:`${wStyle}px`}">
              <div class="img" :style="{backgroundImage:`url(${item.image})`}">
                <!-- <img :src="item.image" alt=""> -->
                <div class="collect">
                  <span class="icon">{{item.product && item.product.follow_count}}</span>
                </div>
              </div>
              <p class="item-name">
                {{item.product && item.product.name}}
              </p>
              <p class="item-price">
                <span class="price-normal">￥{{item.product && item.product.price}}</span>
                <del class="price-del">￥{{item.product && item.product.market_price}}</del>
              </p>
            </div>
          </span>
        </div>
      </div>
    </div>
    <!-- 人气美业师 -->
    <div class="mys">
      <div class="mys-title">
        人气美业师
        <router-link to="/stylist/fans" class="more-img"></router-link>
      </div>
      <div class="mys-item">
        <div class="mys-left" v-for="(item,index) in resData.Hot_sty" :key="index" @click="$router.push(`/detail/shopping/${item.stylist.id}`)">
          <div class="item-img">
            <img :src="item.image" alt="">
            <span class="mys-level">{{item.stylist && item.stylist.level_name}}</span>
          </div>
          <div class="item-text">
            <p class="name">{{item.stylist && item.stylist.store_name}}</p>
            <p class="categary">化妆/美睫/半永久</p>
          </div>
        </div>
      </div>
    </div>
    <more-tab :title="`推荐化妆`" :list="resData.type_1" :to="`/home/makeup/1`"></more-tab>
    <more-tab :title="`推荐美睫`" :list="resData.type_64" :to="`/home/makeup/64`"></more-tab>
    <more-tab :title="`推荐半永久`" :list="resData.type_128" :to="`/home/makeup/128`"></more-tab>
    <!-- 底部提示 -->
    <div class="footer-tip">
      <p>——&nbsp;&nbsp; 人家是有底线的 &nbsp;&nbsp; ——</p>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import { Swipe, SwipeItem } from "mint-ui";
import moreTab from './children/moreTab';
import "../../../../node_modules/mint-ui/lib/swipe/style.css";
import keyConf from "../../../common/keyConf";
import { getHomeRecommend } from "@/service/getData";
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
export default {
  name: "Recommend",
  data() {
    return {
      wStyle: 0, // 热卖
      resData:{
        Shuffling: [],  // banner轮播图
        Advert: [],  // 广告图
        Hotlist: [], // 热卖
        Hot_sty: [], // 人气美业师
        type_1: [],  // 推荐化妆
        type_64: [], // 推荐美睫
        type_128: [], // 推荐半永久
        type_conf: [] // 分类
      },
      topCarousel: [], // 顶部轮播图

    };
  },
  created() {
    this.wStyle = window.innerWidth / 3.2;
    this.getData();
    // this.topCarousel = [
    //   "/static/banner/4e01acda24283183edc141d617ab7e2b.jpg",
    //   "/static/banner/6c4f67571adca77e77fb796228e9660b.jpg",
    //   "/static/banner/e7336b05207ef88f971966a2dbe7c17b.jpg"
    // ];
    // this.getRecommendList();
  },
  methods: {
    async getData(){
      let res = await getHomeRecommend();
      this.resData.Shuffling = res.Shuffling.data;
      this.resData.Advert = res.Advert.data;
      this.resData.Hotlist = res.Hotlist.data;
      this.resData.Hot_sty = res.Hot_sty.data;
      this.resData.type_1 = res.type_1.data;
      this.resData.type_64 = res.type_64.data;
      this.resData.type_128 = res.type_128.data;
      this.resData.type_conf = res.type_conf.data;
    }
  },
  components: {moreTab},
  filters: {}
};
</script>
<style lang="scss" scoped>
@import "../../../assets/css/mixin.scss";
.main {
  // background-color: #fff;
  width: 100%;
  // margin-top: 8.9rem;
  .swipe-wrapper {
    width: 100%;
    height: 20rem;
    a.imgshow {
      display: block;
      width: 100%;
      min-height: 18rem;
    }
    img {
      width: 100%;
    }
  }
  .option_box {
    width: 100%;
    margin-top: 1.5rem;
    .option {
      display: flex;
      .option_item {
        flex: 1;
        text-align: center;
        font-size: 1.2rem;
        color: #000;
        img {
          width: 3.1rem;
        }
      }
    }
  }
  h3.title {
    font-size: 1.8rem;
    color: #000;
    text-align: center;
    letter-spacing: 0.4rem;
    height: 1.8rem;
    line-height: 1.8rem;
    margin-bottom: 1rem;
  }
  p.title_en {
    line-height: 1.3rem;
    height: 1.3rem;
    font-size: 1.6rem;
    text-align: center;
  }
  .footer-tip p {
    padding-top: 1.5rem;
    background-color: #f5f5f5;
    margin-bottom: 6rem;
    font-size: 1.4rem;
    color: #999;
    text-align: center;
  }
  .adver {
    // @include wh(100%, 11.5rem);
    margin-top: 1rem;
    padding: 0.5rem;
    background-color: #fff;
    box-sizing: content-box;
    img {
      width: 100%;
    }
  }
  .hot {
    background-color: #fff;
    margin-top: 1rem;
    padding-top: 2rem;
    .title {
      padding-bottom: 2rem;
      h1,
      p {
        text-align: center;
      }
      p {
        @include sc(1.2rem,#999);
        position: relative;
        span {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 2rem;
          text-align: right;
          &:nth-of-type(1) {
            right: 24%;
          }
          &:nth-of-type(2) {
            left: 24%;
          }
          div:nth-of-type(1) {
            width: 2rem;
            border: 0.05rem solid #999;
          }
          div:nth-of-type(2) {
            margin-top: 0.4rem;
            width: 1rem;
            border: 0.05rem solid #999;
          }
        }
      }
    }
    .scroll {
      overflow-x: auto;
      .item-scroll {
        white-space: nowrap;
        overflow-x: scroll;
        -webkit-overflow-scrolling: touch;
        span {
          position: relative;
          display: inline-block;
          &:nth-of-type(1) {
            padding-left: 0.5rem;
          }
          .item {
            padding: 0 0.5rem 1rem 0.5rem;
            .img {
              position: relative;
              background-size: cover;
              @include wh(10.8rem,10.8rem);
              background-repeat: no-repeat;
              img {
                width: 100%;
              }
              .collect{
                position: absolute;
                height: 1.5rem;
                top: .5rem;
                right: .5rem;
                line-height: 1.5rem;
                background: rgba(255, 255, 255, .5);
                // background-color: red;
                border-radius: 8px;
                span{
                  // padding: 0 1.3rem;
                  padding: 0 .6rem 0 2rem;
                  &:before{
                    position: absolute;
                    left: 16%;
                    top: 14%;
                    @include wh(1.1rem, .95rem);
                    background-image: url('../../../assets/image/icon/all/home_icon_like.png');
                    background-size: contain;
                    content:'';
                  }
                }
              }
            }
            .item-name{
              height: 5rem;
              width: 100%;
              padding: .9rem;
              text-align: center;
              white-space: normal;
              word-wrap: break-all;
              @include sc(1.2rem,#000);
            }
            .item-price{
              .price-normal{
                @include sc(1.4rem,$themeRed);
              }
              .price-del{
                @include sc(1.2rem,#999);
              }
            }
          }
        }
      }
    }
  }
  .mys{
    background-color: #fff;
    margin-top: 1rem;
    padding: 2rem 0 0 1.5rem;
    .mys-title{
      position: relative;
      height: 1.5rem;
      padding-left: 5rem;
      background-image: url('../../../assets/image/icon/all/home_hot_font.png');
      background-size: contain;
      background-repeat: no-repeat;
      font-size: 1.4rem;
      line-height: 1.4rem;
    }
    .mys-item{
      padding: 3.5rem 0 2rem 0;
      display: flex;
      div.mys-left,div.mys-right{
        display: flex;
        flex: 1;
        .item-img{
          position: relative;
          flex: 1;
          padding-bottom: 7rem;
          @include wh(6.5rem, 6.5rem);
          img{
            width: 100%;
            border-radius: 50%;
          }
          .mys-level{
            position: absolute;
            bottom: .8rem;
            left: 50%;
            transform: translateX(-50%);
            line-height: 1.3rem;
            @include sc(1.2rem, $bgWhite);
            @include wh(3.4rem, 1.3rem);
            @include bis('../../../assets/image/icon/all/product_bg_grade.png');
          }
        }
        .item-text{
          flex: 2;
          padding-left: .5rem;
          .name{
            padding-top: 1.1rem;
            @include sc(1.6rem, #000);
          }
          .categary{
            @include sc(1.2rem, #666);
          }
        }
      }
    }
  }
  .more-img{
    position: absolute;
    background-image: url('../../../assets/image/icon/all/home_icon_more.png');
    background-size: contain;
    background-repeat: no-repeat;
    right: 1.5rem;
    top: 50%;
    transform: translateY(-50%);
    @include wh(4.2rem, 1.15rem);
    padding: 1rem;
  }
}
</style>