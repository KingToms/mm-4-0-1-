<template>
  <div class="pay-success">
    <div class="icon">
      <img src="/static/icon/order/pay_icon_fish.png" alt="支付成功" title="支付成功">
      <p>支付成功</p>
      <p>商家将在上班时间30分钟之内处理您的订单，</p>
      <p>服务人员在上门之前将会和您联系，请保持手机畅通</p>
    </div>
    <div class="order-detail">
      <div class="btn" @click="$router.push({name:'orderDetail',params:{ordersn:$route.params.ordersn}})">查看订单</div>
    </div>
  </div>
</template>
<script>
import { orderJPush } from '../../../service/getData';
export default {
  name: 'paySuccess',
  data () {
    return {
      sn: this.$route.params.ordersn
    }
  },
  created(){
    this.orderJPush();
  },
  methods: {
    async orderJPush(){
      await orderJPush ({sn:this.sn});
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../../assets/css/mixin.scss';
.pay-success{
  @include bgColor(#fff);
  div.icon{
    padding-top: 5rem;
    text-align: center;
    img{
      @include wh(6rem,6rem);
    }
    p{
      @include sc(1.4rem,#666);
      letter-spacing: 1px;
    }
    p:nth-of-type(1){
      @include sc(1.6rem,#000);
    }
    p:nth-of-type(2){
      margin-top: 2rem;
    }
  }
  div.order-detail{
    padding: 5rem 5.2rem 8rem;
    div.btn{
      @include wh(100%,3.4rem);
      @include bgColor($themeRed);
      border-radius: .4rem;
      @include sc(1.4rem,$bgWhite);
      text-align: center;
      line-height: 3.4rem;
    }
  }
}
</style>