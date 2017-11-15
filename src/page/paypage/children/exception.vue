<template>
  <div class="pay-exception">
    <div class="icon">
      <img src="/static/icon/order/pay_icon_failure.png" alt="支付成功" title="支付成功">
      <p>支付失败</p>
      <p>您的订单支付失败了</p>
      <p>请点击“继续支付”重新完成支付</p>
    </div>
    <div class="order-detail">
      <ul class="clear">
        <li class="left" @click="$router.push({name:'payment',params:{orderid:$route.params.ordersn}})">继续支付</li>
        <li class="right" @click="$router.push({name:'orderDetail',params:{ordersn:$route.params.ordersn}})">查看订单</li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: 'payException',
  data () {
    return {
      
    }
  },
  methods: {
    payment () {
      let hostname = window.location.hostname
      let payurl = ''
      if(hostname.indexOf('192.168')>-1 || hostname.indexOf('test') > -1){
        payurl = keyConf.payUrl.test
      }else{
        payurl = keyConf.payUrl.master
      }
      window.location.href=`${payurl}/payment/order/${this.orderid}?
      gateway=${this.payMethod}
      &nick=qiaocat
      &fallback=${hostname}/payresult/success/${this.orderid}
      &failback=${hostname}/payresult/exception/${this.orderid}`
      // window.location.href=`http://crm.qiaocatcrm.com/payment/order/${this.orderid}?gateway=${this.payMethod}&nick=qiaocat`
      // this.$router.push('/payresult/success')
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../../assets/css/mixin.scss';
.pay-exception{
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
    ul.clear{
      li.left,li.right{
        @include wh(45%, 3.4rem);
        @include sc(1.4rem,#000);
        text-align: center;
        line-height: 3.4rem;
        border-radius: .4rem;
        &:first-child{
          @include bgColor($themeRed);
          color: $bgWhite;
        }
      }
      li.right{
        @include bgColor(#f2f3f3)
      }
    }
  }
}
</style>