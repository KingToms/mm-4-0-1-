<template>
  <section class="follow_box">
    <div class="header">
      <div class="foods following">
        <span :class="{'active': (tab_index == 1)}" @click="selectType('1')">关注商品</span>
      </div>
      <div class="shop following">
        <span :class="{'active': (tab_index == 2)}" @click="selectType('2')">关注店铺</span>
      </div>
      <div class="go_back" @click="back">
        <img src="/static/icon/ucenter/nav_btn_return.png" alt="">
      </div>
    </div>
    <div class="content">
      <!-- 关注商品 -->
      <div class="foods_con clear" v-if="tab_index == 1">
        <!-- 无关注商品 -->
        <div class="no_list" v-if="product_list.length == 0">
          <img src="/static/icon/ucenter/product_icon_null.png" alt="">
          <p>您没有关注相关商品</p>
        </div>
        <!-- 关注商品列表 -->
        <ListItem v-for="(item,index) in product_list" :key="index" :list="item"></ListItem>
      </div>
      <!-- 关注店铺 -->
      <div class="shop_con clear" v-if="tab_index == 2">
        <!-- 无关注店铺 -->
        <div class="no_list" v-if="shop_list.length == 0">
          <img src="/static/icon/ucenter/shop_icon_null.png" alt="">
          <p>您没有关注相关店铺</p>
        </div>
        <!-- 关注店铺列表 -->
        <ShopItem v-for="(item,index) in shop_list" :key="index" :list="item"></ShopItem>
      </div>

    </div>
  </section>
</template>
<script>
import Vue from 'vue';
import ListItem from '../../page/homepage/children/children/listItem'
import ShopItem from './children/shop_item'
import {followProduct,followShop} from '@/service/getData'
import common from '../../common/common'
export default {
  name: "follow",
  data () {
    return {
      tab_index: '',
      product_list: [], //关注商品列表
      shop_list: [], //关注店铺列表

      flag: true,
      pageNo: 1 , //关注商品页码
      pageSize: 10, //关注商品每页展示数目
      count_page: '', // 关注商品数据总数
      
      flag1: true,
      pageNo1: 1 , //关注商品页码
      pageSize1: 10, //关注店铺每页展示数目
      count_page1: '', // 关注店铺数据总数
    };
  },
  created (){
    this.papeSelect();
    this.scroll();
    this.shopScroll();
  },
  methods: {
    back (){
      this.$router.go(-1);
    },
    /* 显示关注商品或关注店铺 */
    papeSelect (){
      if(this.$route.query.id == "foods"){ // 关注商品
        this.tab_index = 1;
        this.getFollowProdut();
      }else{ // 关注店铺
        this.tab_index = 2;
        this.getFollowShop();
      }
    },
    /* 选择关注商品,还是店铺 */
    selectType (index){
      this.tab_index = index;
      if(this.tab_index == 1){ // 点击关注商品
        if(this.product_list.length <=0){ // 若未渲染 关注商品列表
          this.getFollowProdut(); // 显示关注商品列表
        }
      }else{ // 点击关注店铺
        if(this.shop_list.length <=0){ // 若未渲染 关注店铺列表
          this.getFollowShop(); // 显示关注商品列表
        }
      }
    },
    /* 获取关注商品的列表 */
    async getFollowProdut(){
      this.flag = false;
      let res = await followProduct({page: this.pageNo, page_size: this.pageSize});
      if(res.status == "ok"){
        this.flag = true;
        this.count_page = (res.data.count % this.pageSize) == 0 ? parseInt(res.data.count / this.pageSize) : parseInt(res.data.count / this.pageSize + 1);
        this.product_list = this.product_list.concat(res.data.result);
      }else{
        this.flag = false;
      }
    },
    /* 获取关注店铺的列表 */
    async getFollowShop(){
      this.flag1 = false;
      let resList = await followShop({page: this.pageNo1, page_size: this.pageSize1});
      if(resList.status == "ok"){
        this.flag1 = true;
        this.count_page1 = (resList.data.count % this.pageSize1) == 0 ? parseInt(resList.data.count / this.pageSize1) : parseInt(resList.data.count / this.pageSize1 + 1);
        this.shop_list = this.shop_list.concat(resList.data.result);
      }else{
        this.flag1 = false;
      }
    },
    /*滚动上拉刷新关注商品*/
    scroll (){
      let _this = this;
      if(this.$route.path.indexOf("/follow") > -1){
        common.scroll(()=>{
          if(_this.flag){
            if(_this.pageNo > _this.count_page){
              return false;
            }
            _this.pageNo++;
            _this.getFollowProdut();
          }
        });
      }
    },
    /*滚动上拉刷新关注店铺*/
    shopScroll (){
      let _this = this;
      if(this.$route.path.indexOf("/follow") > -1){
        common.scroll(()=>{
          if(_this.flag1){
            if(_this.pageNo1 > _this.count_page1){
              return false;
            }
            _this.pageNo1++;
            _this.getFollowShop();
          }
        });
      }
    }
  },
  components: {
    ListItem,
    ShopItem,
  },
}
</script>
<style lang="scss" scoped>
@import "../../assets/css/mixin.scss";
.header{
  z-index: 1;
  position: fixed;
  top: 0;
  left: 0;
  @include wh(100%,4rem);
  line-height: 4rem;
  background-color: #fff;
  border-bottom: 1px solid #ddd;
  display: flex;
  .following{
    flex: 1;
    span.active{
      position: relative;
      // color: #000;
      color: $themeRed;
      &::before{
        position: absolute;
        left: 0;
        bottom: 0;
        content: "";
        display: block;
        width: 100%;
        height: 0.3rem;
        background-color: $themeRed;
      }
    }
  }
  .foods{
    text-align: right;
    span{
      display: inline-block;
      height: 100%;
      @include sc(1.6rem,#999);
      margin-right: 2.4rem;
    }
  }
  .shop{
    text-align: left;
    span{
      display: inline-block;
      height: 100%;
      @include sc(1.6rem,#999);
      margin-left: 2.4rem;
    }
  }
  .go_back{
    @include wh(4rem,100%);
    position: absolute;
    top: 0;
    left: 0;
    text-align: center;
    img{
      @include wh(2rem,2rem);
      vertical-align: middle;
    }
  }
}
.content{
  margin: 4rem 0 8rem;
  /* 关注商品 */
  .foods_con{
    padding-left: 1rem;
  }
  /* 关注店铺 */
  /* 无账户明细提醒 */
  .no_list{
    position: fixed;
    top: 40%;
    left: 50%;
    transform: translate(-50%,-50%);
    text-align: center;
    img{
      @include wh(12rem, 12rem);
    }
    p{
      @include sc(1.6rem, #999);
      text-align: center;
    }
  }
}
</style>