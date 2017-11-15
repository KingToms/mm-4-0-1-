<template>
  <div class="cn" @click.self="coupon_close">
    <div class="content">
      <p class="topTitle">领取优惠券</p>
      <div class="close" @click="coupon_close">
        <img src="../../../../src/assets/image/icon/detail/details_btn_close.png" alt="">
      </div>
      <div class="coupons">
        <div class="coupon" v-for="(item,index) in coupon" :key="index">
          <div class="discount">
            <p class="price">￥<span>{{parseInt(item.coupon_amount)}}</span></p>
            <p class="condition">满{{item.base_amount}}可用</p>
          </div>
          <div class="scope">
            <div class="note">
              <p class="title">{{item.name}}</p>
              <p class="shop">{{item.description}}</p>
              <p class="period">有限期至{{item.end_time.substring(0,10)}}</p>
            </div>
          </div>
          <div class="receive" @click="receiveCoupon($event)">领取</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'coupon',
    data () {
      return {
        receiveState: false,
        selectItem: '',
      }
    },
    props: ["coupon"],
    created (){
    },
    methods: {
      // 关闭优惠券窗口
      coupon_close (){
        this.$emit('coupon_hide');
      },
      // 点击领取优惠券
      receiveCoupon (e){
        e.target.className = "receive received";
        e.target.innerText = "已领取";
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../../../src/assets/css/mixin.scss';
  .cn{
    @include wh(100%,100%);
    position: fixed;
    z-index: 6;
    top:0;
    left: 0;
    background-color: rgba(0,0,0,.5);
    .content{
      @include wh(100%,40rem);
      position: absolute;
      bottom: 0;
      left: 0;
      background-color: #F9F9F9;
      .close{
        position: absolute;
        top: 2.1rem;
        right: 1.5rem;
        cursor: pointer;
        @include wh(2.2rem,2.2rem);
        img{
          width: 100%;
        }
      }
      p.topTitle{
        text-align: center;
        @include sc(1.8rem,#000);
        margin: 1.8rem 0;
      }
      .coupons{
        height: 32rem;
        overflow-y: scroll;
        -webkit-overflow-scrolling: touch;
        margin: 2rem 1.5rem;
        box-sizing: border-box;
        .coupon{
          position: relative;
          margin-bottom: 1.6rem;
          background-color: #fff;
          width: 100%;
          min-height: 9.1rem;
          .discount{
            position: absolute;
            top: 0;
            left: 0;
            width: 11rem;
            // min-height: 9.1rem;
            height: 100%;
            @include bis("../../../assets/image/img/detail/details_bg_coupon_big.png");
            text-align: center;
            .price{
              @include sc(2rem,#000);
              height: 3rem;
              line-height: 3rem;
              margin: 2.2rem 0 0.5rem;
              span{
                font-size: 2rem;
              }
            }
            .condition{
              @include sc(1.1rem,#000);
            }
          }
          .scope{
            width: 100%;
            min-height: 9.1rem;
            padding: 1rem 7.4rem 1rem 12rem;
            .title{
              @include sc(1.5rem, #000);
              line-height: 1.2em;
            }
            .shop{
              margin-top: 0.5rem;
              @include sc(1.2rem, #666);
              line-height: 1.2rem;
            }
            .period{
              margin-top: 0.5rem;
              @include sc(1.1rem, #999);
              line-height: 1rem;
            }
          }
          .receive{
            position: absolute;
            top: 50%;
            right: 1rem;
            margin-top: -1.4rem;
            line-height: 2.8rem;
            @include wh(6.4rem,2.8rem);
            @include sc(1.4rem,#000);
            @include borderRadius(0.4rem);
            background-color: #ffe500;
            text-align: center;
          }
          .received{
            background-color: #f3f3f3;
            color: #999;
          }
          &:last-child{
            margin-bottom: 5rem;
          }
        }
      }
    }
  }
</style>