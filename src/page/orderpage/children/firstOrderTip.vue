<template>
<div class="first-order">
  <div class="content">
    <div class="top">
      <p>恭喜您获得一张</p>
      <p>价值<span class="price">{{jfk.amount}}</span>元的积分卡</p>
      <div class="img">
        <img src="../../../assets/image/icon/all/integral_card_bg.png" alt="">
        <p>{{jfk.amount}}<small>元</small></p>
      </div>
      <div class="card-info">
        <div class="cart-info-sub">
          <p>积分卡号：{{jfk.code}}</p>
          <p>兑换密码：{{jfk.password}}</p>
        </div>
      </div>
      
    </div>
    <ul class="bottom">
      <li><i class="icon">1</i><span>频幕截图</span></li>
      <li></li>
      <li><i class="icon">2</i><span>关注“俏猫商城”公众号</span></li>
      <li></li>
      <li><i class="icon">3</i><span>回复“积分兑换”，领取福利</span></li>
    </ul>
    <i class="close-icon" @click="closeTip"></i>
  </div>
</div>
</template>
<script>
export default {
  name: 'firstOrder',
  data () {
    return {
    }
  },
  props:{
    jfk: Object,
    default: {}
  },
  methods:{
    closeTip(){
      this.$emit('closeFirstOrder');
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../../assets/css/mixin.scss';
.first-order{
  position: fixed;
  top: 0;
  left: 0;
  @include wh(100%,100%);
  background-color: rgba(0, 0, 0, .5);
  z-index: 2;
  .content{
    position: absolute;
    margin: 20px 20px 0 0;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    @include wh(30rem, 40.6rem);
    background-color: #fff;
    border-radius: 1.25rem;
    i.close-icon{
      position: absolute;
      top: -8%;
      right: 0;
      @include wh(2rem, 2rem);
      @include bis('../../../assets/image/icon/all/close_icon_integral_card.png');
    }
    .top{
      border-top-left-radius:1.25rem;
      border-top-right-radius:1.25rem;
      padding-top: 1.5rem;
      @include bgColor(#ffedf1);
      p{
        text-align: center;
        @include sc(1.8rem, #333);
      }
      .price{
        color: $themeRed;
      }
      .img{
        position: relative;
        padding-top: 1.5rem;
        text-align: center;
        img{
          @include wh(19.9rem, 9.5rem);
        }
        p{
          position: absolute;
          top: 42%;
          left: 44%;
          @include sc(3.7rem, $themeRed);
          small{
            @include sc(1.8rem, $themeRed);
          }
        }
      }
      .card-info {
        padding: 1.5rem;
        .cart-info-sub{
          padding: 1rem 0 1rem 2rem;
          @include bgColor(#fff);
          p{
            text-align: left;
            @include sc(1.6rem, #333);
          }
        }
      }
    }
    .bottom{
      padding: 1rem 0 0 3rem;
      li{
        position: relative;
        margin-bottom: .2rem;
        i.icon{
          // position: absolute;
          display: inline-block;
          @include wh(2.4rem, 2.4rem);
          border-radius: 50%;
          @include bgColor(#fe674f);
          @include sc(1.4rem, #fff);
          text-align: center;
        }
        span{
          padding-left: 1.5rem;
          @include sc(1.5rem, #333);
        }

        &:nth-of-type(2),&:nth-of-type(4){
          margin-left: 1.2rem;
          border-left: .05rem solid #333;
          height: 1rem;
        }
      }
    }
  }
  
}
</style>