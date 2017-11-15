<template>
  <div class="coupon" :class="{'bg-white':isWhite}">
    <div class="coupong-header">
      <div class="header-nav">
        <div class="header">
          <div class="title">
            <h2>领券中心</h2>
          </div>
           <a class="back" href="javascript:void(0);" @click="$router.go(-1)" ></a> 
          <!-- <router-link class="back" to="$router.go(-1)" ></router-link> -->
          <!-- <icon class="share" @click="shawShow=true"></icon> -->
        </div>
        <div class="tab">
          <ul class="clear">
            <li class="left" @click="changeType(1)">
              <p :class="{'active': type === 1}">新人专属</p>
            </li>
            <li class="left" @click="changeType(2)">
              <p :class="{'active': type === 2}">化妆</p>
            </li>
            <li class="left" @click="changeType(3)">
              <p :class="{'active': type === 3}">美睫</p>
            </li>
            <li class="left" @click="changeType(4)">
              <p :class="{'active': type === 4}">纹绣</p>
            </li>
            <li class="left" @click="changeType(5)">
              <p :class="{'active': type === 5}">医美</p>
            </li>
            <li class="left" @click="changeType(6)">
              <p :class="{'active': type === 6}">培训</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="coupon-list page-loadmore-wrapper" id="couponList" :class="{'bg-white':isWhite}">
      <coupon-item :coupons="coupons"></coupon-item>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import share from '../detailpage/children/share'
import couponItem from './children/couponItem'
import {getCoupons} from '../../service/getData'
import common from '../../common/common'
import { Loadmore } from 'mint-ui'

Vue.component(Loadmore.name, Loadmore)

export default {
  name: 'coupon',
  data () {
    return {
      shawShow: false,
      isWhite: false,
      type: 1,
      coupons: [],
      // 加载更多
      wrapperHeight: 0,
      bottomText: '上拉加载更多',
      allUseLoad: false,
      bottomStatus: '',
      flag: true,
      // 数据请求参数
      pageNo: 1 , //页码
      pageSize: 10, //记录数
      total: 0 // 总记录
    }
  },
  components:{
    share,
    couponItem
  },
  created(){
    this.getCoupons()
    this.scroll()
  },
  methods: {
    async getCoupons(){
      this.flag = false
      let res = await getCoupons({type:this.type,page: this.pageNo,page_size: this.pageSize})
      if(res.status === 'ok'){
        this.flag = true
        this.total = res.data.count
        this.coupons = this.coupons.concat(res.data.result)
        this.isWhite = this.coupons.length === 0 ? true : false
      }else{
        this.flag = true
      }
    },
    share_hide(){
      this.shawShow = false
    },
    changeType(type){
      this.type = type
      this.coupons = []
      this.pageNo = 1
      $(window).scrollTop(0)
      this.getCoupons()
    },
    scroll(){
      let _this = this
      if(this.$route.path === '/coupon'){
        common.scroll(()=>{
          if(_this.flag && this.total!==this.coupons.length){
              _this.pageNo++
              _this.getCoupons()
            }
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../assets/css/mixin.scss';
.coupon{
  @include wh(100%,100%);
  background-color: #f3f3f3;
  &.bg-white{
    background-color: #fff;
  }
  >div.coupong-header{
    height: 8.4rem;
    .header-nav{
      position: fixed;
      z-index: 1;
      @include bgColor(#fff);
      width: 100%;
    }
    .header{
      @include wh(100%,4rem);
      position: relative;
      .title{
        @include wh(100%,4rem);
        // border-bottom: 1px solid #999;
        @include average(#999);
        line-height:4rem;
        text-align: center;
        h2{
          font-size: 1.8rem;
          color: #000;
          letter-spacing: 1px;
        }
      }
      .back{
        position: absolute;
        top: .7rem;
        left: .7rem;
        @include wh(2.4rem,2.4rem);
        background-image: url('../../assets/image/icon/login/nav_btn_return.png');
        background-repeat: no-repeat;
        background-position: center;
        background-size: 2.2rem 2.2rem;
      }
      .edit{
        position: absolute;
        top: .8rem;
        right: 1.5rem;
        @include sc(1.6rem,#000);
      }
      .share{
        position: absolute;
        right: .7rem;
        top: 50%;
        transform: translateY(-50%);
        @include wh(3.2rem,3.2rem);
        @include bgi_2('../../assets/image/icon/detail/details_btn_share02.png',3.2rem,3.2rem);
      }
    }
  }
  .coupon-list{
    &.bg-white{
      background-color: #fff;
    }
  }
  .tab{
    @include wh(100%,4.4rem);
    @include average(#ccc);
    padding-left: 1rem;
    ul.clear{
      width: 100%;
    }
    li{
      @include wh(16%,4.4rem);
      &:first-child{
        width: 17%;
      }
      line-height: 4rem;
      p{
        @include sc(1.4rem,#999);
        text-align: center;
        &.active{
          @include sc(1.4rem,$themeRed);
          border-bottom: .3rem solid $themeRed;
        }
      }
    }
    li:last-child{
      p{
        padding-right: 1rem;
      }
    }
  }
}
</style>