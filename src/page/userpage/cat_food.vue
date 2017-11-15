<template>
  <div class="wallet">
    <div class="header" :class="{'list_title': accoun_more}">
      <div class="title">
        <h2>{{title}}</h2>
      </div>
      <a class="back" href="javascript:void(0);" @click="back"></a>
      <a class="cat-description" href="/catFoodDesc">猫粮说明</a>
    </div>
    <div class="content" v-if="!accoun_more">
      <div class="top">
        <div class="balance">
          <p class="count">{{catfood_total}}<span>个</span></p>
          <p class="text"></p>
        </div>
      </div>

      <div class="account_detail">
        <span class="icon01"></span>
        <div class="account">收入明细</div>
        <div class="more" @click="showList">
          查看更多
          <span class="icon02"></span>
        </div>
      </div>
      <div class="datails" id="details">
        <catfood-item v-for="(item,index) in filterCatfood" :key="index" v-if="index < 3" :list="item"></catfood-item>
      </div>
      
    </div>

    <section class="account_list" v-if="accoun_more">
      <!-- 无猫粮明细 -->
      <div class="no_list" v-if="filterCatfood.length <=0">
        <img src="/static/icon/ucenter/cat_icon_null.png" alt="">
        <p>您没有相关的猫粮</p>
      </div>
      <div class="list_cnt">
        <catfood-item v-for="(item,index) in filterCatfood" :key="index" :list="item"></catfood-item>
      </div>
    </section>
  </div>
</template>
<script>
// import loadmoreFooter from '../../components/common/loadmoreFooter'
import catfoodItem from "./children/catfood_item"
import {catfoodIntegral} from "@/service/getData"
import {getStore} from "../../common/store"
import common from '../../common/common'
export default {
  name: "wallet",
  data () {
    return {
      title: '猫粮',
      totalCount: '0', // 记录总条数
      catfood_total: '0', // 猫粮总额
      accoun_more: false, // 默认不显示明细
      filterCatfood: [], // 账户明细列表
      uInfoStorage: '', // localStore的用户信息
      pageNo: 1,
      psize: 20,
      flag: true,
    };
  },
  created (){
    // this.uInfoStorage = JSON.parse(getStore("uInfo"));
    // this.catfood_total = this.uInfoStorage.points ? this.uInfoStorage.points : 0;
    this.getCatfoodList();
    this.scroll();
  },
  methods: {
    /* 获取猫粮积分列表 */
    async getCatfoodList (){
      this.flag = false;
      let res = await catfoodIntegral({page: this.pageNo, psize: this.psize});
      if(res.status == "ok"){
        this.flag = true
        this.catfood_total = (res.data && res.data.sum) ? res.data.sum : '0';
        this.totalCount = res.data.count;
        this.filterCatfood = this.filterCatfood.concat(res.data.result);
        if(this.totalCount === this.filterCatfood.length){
          this.flag = false;
        }
      }
    },
    back (){
      if(this.title == "猫粮明细"){
        this.accoun_more = false;
        this.title = "猫粮";
      }else{
        this.$router.go(-1);
      }
    },
    /* 账户明细 */
    showList (){
      this.accoun_more = true;
      this.title = "猫粮明细";
    },
    scroll(){
      let _this = this
      if(this.$route.path === '/cat_food'){
        common.scroll(()=>{
          if(_this.flag){
              _this.pageNo++
              _this.getCatfoodList()
            }
        })
      }
    }
  },
  components: {
    catfoodItem,
    // loadmoreFooter
  }
}
</script>
<style lang="scss" scoped>
@import '../../assets/css/mixin.scss';
.wallet{
  @include wh(100%,100%);
  .header{
    z-index: 1;
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
    .title{
      @include wh(100%,4rem);
      line-height:4rem;
      text-align: center;
      h2{
        font-size: 1.8rem;
        color: #fff;
        letter-spacing: 1px;
      }
    }
    .back{
      position: absolute;
      top: .7rem;
      left: .7rem;
      @include wh(2.4rem,2.4rem);
      background-image: url('/static/icon/ucenter/nav_btn_return_white.png');
      background-repeat: no-repeat;
      background-position: center;
      background-size: 2.2rem 2.2rem;
    }
    .cat-description{
      position: absolute;
      top: .7rem;
      right: .7rem;
      @include sc(1.2rem,#fff);
    }
  }
  .list_title{
    position: fixed;
    background-color: #fff;
    border-bottom: 1px solid #ddd;
    h2{
      color: #000 !important;
    }
    .back{
      background-image: url('/static/icon/ucenter/nav_btn_return.png');
    }
  }
  .content{
    .top{
      @include wh(100%,21rem);
      @include bgi_2('/static/icon/ucenter/my_bg_top.png',100%,100%);
      .balance{
        padding-top: 4rem;
        text-align: center;
        .count{
          @include sc(3.5rem, $themeRed);
          padding: 3.8rem 0 2rem;
          line-height: 2.8rem;
          span{
            @include sc(1.8rem, $themeRed);
          }
        }
        .text{
          @include sc(1.4rem, #fff);
        }
      }
    }
    .account_detail{
      @include wh(100%,7rem);
      padding-bottom: 1rem;
      position: relative;
      background-color: #f3f3f3;
      .account{
        @include wh(100%,100%);
        @include sc(1.6rem,#000);
        line-height: 6rem;
        padding: 0 8.7rem 0 4.5rem;
        background-color: #fff;
      }
      .icon01{
        display: block;
        @include wh(2.2rem,2.2rem);
        position: absolute;
        top: 1.8rem;
        left: 1.5rem;
        @include bis("/static/icon/ucenter/cat_icon_account.png");
      }
      .more{
        position: absolute;
        top: 2rem;
        right: 1.5rem;
        @include sc(1.4rem,#666);
        line-height: 2.2rem;
        padding-right: 1.5rem;
        .icon02{
          display: inline-block;
          @include wh(0.7rem,1.3rem);
          position: absolute;
          top: 0.38rem;
          right: 0;
          @include bis("/static/icon/ucenter/icon_next.png");
        }
      }
    }
    .datails{
      padding-bottom: 8rem;
      .bill_box{
        background-color: #fff;
      }
    }
  }
  /* 账户明细 */
  .account_list{
    padding-top: 4rem;
    padding-bottom: 6rem;
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
  .list_cnt{
    padding-bottom: 2rem;
  }
}
</style>