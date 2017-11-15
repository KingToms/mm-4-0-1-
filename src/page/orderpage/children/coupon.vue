<template>
  <div class="confirmOrder-coupon">
    <div class="coupon-title">
      <ul class="clear">
        <li class="left"><span :class="{'bottom': isUse}" @click="isUse=true">可用优惠券({{coupon.useCoupon.length}})</span></li>
        <li class="left"><span :class="{'bottom': !isUse}" @click="isUse=false">不可用优惠券({{coupon.unUseCoupon.length}})</span></li>
      </ul>
    </div>
    <div class="coupon-list">
      <div class="use-coupon" v-show="isUse">
        <div class="coupon-detail clear" v-for="(item,index) in coupon.useCoupon" :key="index" @click="chooseCoupon(item.sn,item.amount)">
          <div class="left">
            <p>满{{item.base_amount}}可用</p>
            <p>￥<span>{{item.amount}}</span></p>
          </div>
          <div class="right">
            <div class="coupon-info">
              <p>{{item.note}}</p>
              <p>{{ item.des && item.des.length > 0 ? item.des : (item.store_id==0?'通用券' : item.des)}}</p>
              <div class="dashed"></div>
              <div class="coupon-date">
                <p>有效期至{{item.end_time}}</p>
                <i :class="{'icon':item.sn == sn}"></i>
              </div>
              <i v-if="item.store_id>0" class="icon"></i>
            </div>
          </div>
        </div>
        <div class="tip" v-if="coupon.useCoupon.length === 0 ? true : false">
          <img src="/static/icon/order/coupon_icon_null.png">
          <p>您没有相关的优惠券</p>
        </div>
      </div>
      <div class="unUse-coupon" v-show="!isUse">
        <div class="coupon-detail clear" v-for="(item,index) in coupon.unUseCoupon" :key="index">
          <div class="left">
            <p>满{{item.base_amount}}可用</p>
            <p>￥<span>{{item.amount}}</span></p>
          </div>
          <div class="right">
            <div class="coupon-info">
              <p>{{item.note}}</p>
              <p>{{ item.des && item.des.length > 0 ? item.des : (item.store_id==0?'通用券' : item.des)}}</p>
              <div class="dashed"></div>
              <div class="coupon-date">
                <p>有效期至{{item.end_time}}</p>
                <i :class="{'icon':item.sn == sn}"></i>
              </div>
              <i v-if="item.store_id>0" class="icon"></i>
            </div>
          </div>
        </div>
        <div class="tip" v-if="coupon.unUseCoupon.length === 0 ? true : false">
          <img src="/static/icon/order/coupon_icon_null.png">
          <p>您没有相关的优惠券</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import {getCouponList} from '../../../service/getData'
import {mapState,mapMutations} from 'vuex'
export default {
  name: 'coupon',
  data () {
    return {
      isUse: true,
      sn: ''
    }
  },
  created () {
    // this.getCouponList()
  },
  computed:{
    ...mapState(['confirmOrder'])
  },
  props:{
    coupon:{
      type: Array
    }
  },
  methods: {
    ...mapMutations(['SET_CONFIRMORDER']),
    chooseCoupon (sn,amount){
      // if(this.couponId === couponId){
      //   this.couponId = 0
      //   return
      // }
      this.sn = sn
      this.confirmOrder.amount = amount
      this.confirmOrder.sn = sn
      this.SET_CONFIRMORDER(this.confirmOrder)
      this.$emit('closeAppoint')
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../../assets/css/mixin.scss';
.confirmOrder-coupon{
  background-color: #f3f3f3;
  .coupon-title{
    @include wh(100%, 3.8rem);
    @include bgColor(#fff);
    ul.clear{
      border-bottom: .05rem solid #ccc;
      li.left{
        position: relative;
        @include wh(50%,3.8rem);
        span{
          position: absolute;
          width: 11.8rem;
          height: 4rem;
          text-align: center;
          line-height: 4rem;
          // top: 50%;
          left: 50%;
          transform: translateX(-50%);
          &.bottom{
            border-bottom: .3rem solid #e70034;
            color: #e70034 !important;
          }
        }
        &:first-child{
          span{
            @include sc(1.4rem,#000);
          }
        }
        &:last-child{
          span{
            @include sc(1.4rem,#999);
          }
        }
      }
    }
  }
  .coupon-list{
    @include wh(100%,100%);
    .use-coupon,.unUse-coupon{
      overflow: hidden;
      .coupon-detail{
         margin: 1.5rem 1.5rem 0 1.5rem;
        .left{
          position: relative;
          @include wh(32%,12rem);
          @include bgi_2('/static/icon/order/coupon_bg_number01.png'
          ,12rem,12rem,center,center,no-repeat);
          line-height: 5rem;
          text-align: center;
          p:last-child{
            position: absolute;
            top: 40%;
            left: 50%;
            transform: translate(-50%,-50%);
            @include sc(2rem,#fff);
            span{
              @include sc(3.5rem,#fff);
            }
          }
          p:first-child{
            margin-top: 6.5rem;
            line-height: 2rem;
            @include sc(1.1rem,#fff);
          }
        }
        .right{
          padding-left: 1.5rem;
          background-color: #fff;
          @include wh(68%,12rem);
          .coupon-info{
            position: relative;
            letter-spacing: 1px;
            .dashed{
              height: 2rem;
              line-height: 2rem;
              border-bottom: .05rem dashed #ccc;
            }
            p:first-child{
              height: 3rem;
              line-height: 5rem;
              @include sc(1.6rem,#000);
            }
            p:nth-of-type(2){
              height: 2rem;
              line-height: 4rem;
              @include sc(1.2rem,#666);
            }
            div.coupon-date{
              position: relative;
              p{
                @include sc(1.1rem,#999);
              }
              i.icon{
                position: absolute;
                top: 1rem;
                right: .8rem;
                @include wh(2.2rem,2.2rem);
                @include bgi_2('/static/icon/order/btn_choose_sel.png',2.2rem,2.2rem);
              }
            }
            i.icon{
              position: absolute;
              @include wh(5.9rem,2rem);
              top: 0px;
              right: 0px;
              @include bgi_2('/static/icon/order/coupon_icon_label.png',5.9rem,2rem);
            }
          }
        }
      }
    }
    .unUse-coupon{
      .coupon-detail{
        .left{
          @include bgi_2('/static/icon/order/coupon_bg_number02.png',12rem,12rem);
        }
        .color-gray{
          color: #999 !important;
        }
      }
    }
    .tip{
      position: fixed;
      top: 50%;
      transform: translateY(-50%);
      width: 100%;
      text-align: center;
      padding: 0 1.5rem;
      img{
        @include wh(12rem,12rem);
      }
      p{
        @include sc(1.4rem,#666);
        text-align: center;
      }
      a{
        div{
          margin-top: 4rem;
          @include wh(100%,4.4rem);
          @include bgColor($themeRed);
          @include sc(1.4rem,$bgWhite);
          line-height: 4.4rem;
          border-radius: .4rem;
        }
        
      }
    }
  }
}
</style>