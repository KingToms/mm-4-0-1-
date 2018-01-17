<template>
  <section class="systemMsg">
    <p class="time">{{time}}</p>
    <div class="msg_box">
      <h3 class="title" v-if="isSystemMsg">{{sys_title}}</h3>
      <h3 class="title" v-else>{{order_info.msg}}</h3>
      <div class="content_box">
        <div class="img" :style="{backgroundImage : 'url('+ msg_img +')'}"></div>
        <div class="text">
          <!--优惠券消息-->
          <p class="tipText" v-if="isSystemMsg">{{tip_text}}</p>
          <!--订单消息-->
          <div class="orderText" v-else>
            <p class="title">{{order_info.description}}</p>
            <p class="price">
              <span class="discount_price">￥{{order_info.price}}</span>
              <span class="original_price">￥{{order_info.market_price}}</span>
            </p>
            <p class="order_num">订单号：{{order_info.sn}}</p>
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
      sys_title: '优惠券过期提醒',
      time: '2016-12-15 08:00',
      msg_img: '../../../../static/image/message/search_pic03.png',
      tip_text: '您有1张价值100元的优惠券，将于2017年08月31日到期，请及时使用。',
      order_info: {
        msg: '美业师已出发', // 订单消息
        description: '新人面试妆', // 产品描述
        price: '178', // 原价
        market_price: '198', // 价格
        sn: '4444400000', // 订单号
      },
    };
  },
  props: {
    isSystemMsg:{
      default: false, // 默认是系统消息
      type: Boolean
    },
  },
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
        // @include bis("../../../../static/image/message/search_pic03.png");
        background-repeat: no-repeat;
        background-size: 100% 100%;
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