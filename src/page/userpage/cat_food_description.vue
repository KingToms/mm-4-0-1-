<template>
  <div class="cat-foot-description">
    <div class="header" v-if="invoked">
      <l-header :title="title"></l-header>
    </div>
    <content>
      <p>如何使用</p>
      <p>适用范围</p>
      <p>
        1、猫粮仅可在俏猫使用，如用户帐号暂停使用，则俏猫将取消该用户帐号内猫粮相关使用权益。
      </p>
      <p>2、猫粮可直接用于支付俏猫订单。</p>
      <p>3、猫粮查询：您可以在“我的俏猫-猫粮”中可查询到您的猫粮详细情况。</p>
      <p>猫粮有效期说明</p>
      <p>1、用户获得但未使用的猫粮，将在下一个自然年底过期，俏猫将定期对过期猫粮进行作废处理。例2016年12月31日将清空2015年度客户获得但未使用的猫粮。</p>
      <p>2、使用猫粮支付的商品发生退货时，如猫粮退回时已过有效期，则直接进行作废处理，不再返回。</p>
      <p>下单时使用</p>
      <p>1、10猫粮抵扣1人民币，每单最多用猫粮抵扣订单金额的50%</p>
      <p>2、消费时可使用猫粮的数量是100的整数倍，如100、200、300等猫粮数</p>
      <p>3、如果拥有的猫粮数小于100个，则不可在结算页或收银台使用猫粮支付。</p>
    </content>
  </div>
</template>
<script>
import lHeader from '../../components/common/lHeader'
export default {
  name: 'cat_foot_description',
  data () {
    return {
      title: '猫粮使用帮助',
      invoked: true, // 页面是否被ios、android调用，调用则为false
    }
  },
  created (){
    this.isInvoked();
  },
  methods: {
    /*当前页面是否被ios或者android调用webview,若调用,则隐藏返回按钮*/
    isInvoked (){
      let query = this.$route.query
      query = query ? query : {}
      if(query.app == 'ios' || query.app == 'android'){ // IOS、Android端不弹框
        this.invoked = false;
      }
    },

  },
  components:{
    lHeader
  }
}
</script>
<style lang="scss" scoped>
.cat-foot-description{
  .header{
    position: fixed;
    width: 100%;
    height: 4rem;
  }
  p{
    padding: 2rem 1.5rem 0;
    &:first-child{
      padding: 6rem 1.5rem 0;
    }
    font-size: 1.3rem;
    color: #000;
  }
}
</style>