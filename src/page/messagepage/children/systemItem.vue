<template>
  <section class="systemMsg">
    <p class="time">2016-12-15 08:00</p>
    <div class="msg_box">
      <h3 class="title">优惠券过期提醒</h3>
      <div class="content_box">
        <div class="img"></div>
        <div class="text">
          <p class="tipText" v-if="msgState">您有1张价值100元的优惠券，将于2017年08月31日到期，请及时使用。</p>
          <div class="orderText" v-if="!msgState">
            <p class="title">新人面试妆</p>
            <p class="price">
              <span class="discount_price">￥178</span>
              <span class="original_price">￥198</span>
            </p>
            <p class="order_num">订单号：4444400000</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  name: "systemItem",
  data () {
    return {
    };
  },
  props: ['msgState'],
  methods: {
  }
}
</script>
<style lang="scss" scoped>
@import '../../../assets/css/mixin.scss';
.systemMsg{
  margin-top: 2.8rem;
  p.time{
    @include wh(100%,1rem);
    @include sc(1.1rem, #999);
    text-align: center;
    line-height: 1rem;
  }
  .msg_box{
    @include borderRadius(0.4rem);
    margin-top: 1.2rem;
    background-color: #fff;
    padding: 1.7rem 1rem 1.5rem;
    h3.title{
      @include sc(1.7rem,#333);
      line-height: 1.8rem;
    }
    .content_box{
      width: 100%;
      position: relative;
      margin-top: 1.2rem;
      .img{
        @include wh(6.6rem,6.6rem);
        @include bis("../../../../static/image/message/search_pic03.png");
        background-color: #ddd;
        position: absolute;
        left: 0;
        top: 0;
      }
      .text{
        width: 100%;
        min-height: 6.6rem;
        padding-left: 7.4rem;
        padding-top: 0.6rem;
        p.tipText{
          @include sc(1.3rem,#666);
        }
        .orderText{
          .title{
            @include sc(1.3rem,#333);
          }
          .price{
            margin-left: -0.3rem;
            .discount_price{
              margin-right: 1rem;
              font-size: 1.3rem;
              color: #333;
            }
            .original_price{
              font-size: 1.1rem;
              color: #999;
              text-decoration: line-through;
            }
          }
        }
      }
    }
  }
}
</style>