<template>
  <div class="coupon-item" :class="{'bg-white':coupons.length==0}">
    <div class="item clear" v-for="(item,index) in coupons" :key="index">
      <div class="shop-info left">
        <p class="title">
          <span>{{item.real_name?item.real_name:'俏猫自营'}}</span>
          <span v-if="item.stylist_id">{{level[item.level?item.level:0]}}</span>
        </p>
        <div class="decription">
          <div class="text">
            <p class="description">{{item.description}}</p>
            <p>满{{item.base_amount}}可用</p>
          </div>
          <img :src="item.store_id > 0?'/static/icon/coupon/coupon_icon_user.png':'/static/icon/coupon/coupon_icon_user02.png'" alt="">
        </div>
      </div>
      <div class="coupon-info right">
        <p><span class="price-icon">￥</span>{{formatPrice(item.coupon_amount)}}</p>
        <p :id="`get_${item.id}`" v-show="true" @click="getCoupon(item.id)">立即领取</p>
        <p :id="`make_${item.id}`" v-show="false" @click="useCoupon(item.store_id)">去使用</p>
        <p>已抢{{couponPercen(item.send_count,item.total_count)}}</p>
      </div>
      <!-- <div class="aready-get" v-if="areadyGet(item.id)"></div> -->
    </div>
  </div>
</template>
<script>
import keyConf from '../../../common/keyConf.js'
import {getCenterCoupons} from '../../../service/getData'
export default {
  name: 'couponItem',
  data () {
    return {
      areadyCoupons:[],
      level:['见习','新晋','专业','高级','首席','明星'],
      used: false
    }
  },
  props:['coupons'],
  methods:{
    async getCoupon(couponId){
      let qm_cookie = $.cookie(keyConf.qm_cookie)
      console.log(qm_cookie)
      if(!qm_cookie){
        alert('未登录')
        this.$router.push(`/login?url=/coupon`)
      }else{
        let res = await getCenterCoupons({coupon_id: couponId})
        if(res.status === 'ok'){
          alert('领取成功')
          $(`#get_${couponId}`).hide()
          $(`#make_${couponId}`).show()
          return
        }
        else if(res.code == 1){
          alert(res.msg);
          $(`#get_${couponId}`).hide()
          $(`#make_${couponId}`).show()
          return
        }
      }
    },
    useCoupon(storeId){
      if(storeId > 0)
        this.$router.push({name:'shopping',params:{shopid:storeId}})
      else 
        this.$router.push('/')
    },
    formatPrice(price){
      return price.substr(0,price.indexOf('.'))
    },
    areadyGet(couponId){
      return this.areadyCoupons.includes(couponId)
    },
    couponPercen(send_coupon,total_count){
      if(send_coupon===total_count)
        return `98%`
      else{
        /* let percen = send_coupon/total_count * 100

        let pointIndex = (percen+'').indexOf('.') > -1 ? (percen+'').indexOf('.') : ''
        percen = (percen+'').substr(0,pointIndex>-1?(percen+'').indexOf('.'):'') */
         
        return (Math.round(send_coupon / total_count * 10000) / 100.00 + '%')
      }
        
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../../assets/css/mixin.scss';
    
.coupon-item{
  @include bgColor(#f3f3f3);
  &.bg-white{
    @include bgColor(#fff);
  }
  padding: 1.5rem;
  .item{
    position: relative;
    @include bgColor(#fff);
    .aready-get{
      position: absolute;
      top: 50%;
      right: 22%;
      transform: translateY(-50%);
      @include wh(7.5rem,4.5rem);
      @include bgi_2('/static/icon/coupon/coupon_msg_receive.png',7.5rem,4.5rem);
    }
    &:not(:first-child){
      margin-top: 1.5rem;
    }
    .shop-info{
      width: 67%;
      padding-left: 1.5rem;
      .title{
        padding-top: 1.2rem;
        padding-bottom: 1rem;
        span{
          position: relative;
          &:first-child{
            @include sc(1.3rem,#000);
            padding-right: .7rem;
          }
          &:nth-of-type(2){
            position: absolute;
            @include wh(6.4rem,2rem);
            padding-left: 1.5rem;
            // @include bgColor(#000);
            @include bgi_2('/static/icon/coupon/product_bg_grade.png',5rem,1.6rem);
            @include sc(1rem,#ffcc00);
            border-radius: .4rem;
            line-height: 2.2rem;
            text-align: center;
          }
        }
      }
      .decription{
        position: relative;
        .text{
          padding-left: 6.5rem;
          p{
            &:first-child{
              // line-height: 4rem;
              // height: 3rem;
              @include sc(1.6rem,#000);
            }
            &:last-child{
              line-height: 3rem;
              height: 3rem;
              @include sc(1.2rem,#999);
            }
          }
          .description{
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
        img{
          position: absolute;
          @include wh(5.5rem,5.5rem);
          top: 0;
          left: 0;
        }
      }
    }
    .coupon-info{
      box-sizing: border-box;
      @include wh(32%,12rem);
      @include bgi_2('/static/icon/coupon/coupon_bg_number.png',12rem,12rem);
      padding-top: 1.7rem;
      text-align: center;
      p{
        &:first-child{
          @include sc(3.2rem,$bgWhite);
          .price-icon{
            // font-size: 1.2rem;
            @include sc(2.2rem,$bgWhite);
          }
        }
        &:nth-of-type(2),&:nth-of-type(3){
          @include wh(8rem,2.4rem);
          @include bgColor(#fff);
          @include sc(1.3rem,#000);
          margin-left: 50%;
          transform: translateX(-50%);
          border-radius: 1.5rem;
          line-height: 2.4rem;
        }
        &:last-child{
          padding-top: .2rem;
          @include sc(1.2rem,$bgWhite);
        }
      }
    }
  }
}
</style>