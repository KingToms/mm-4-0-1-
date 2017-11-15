<template>
  <div class="payment">
    <div class="header">
      <div class="title">
        <h2>{{title}}</h2>
      </div>
      <a class="back" href="javascript:void(0);" @click="back" ></a>
      <span class="edit" @click="editAddress" v-if="this.page == 'address'" v-show="addressEditing">编辑</span>
    </div>
    <section class="content">
      <p>支付金额</p>
      <p><span>￥</span>{{order.need_to_pay}}</p>
      <div class="count-down">
        <i class="icon"></i>
        <span class="timer">请在{{timeDown}}完成支付</span>
      </div>
    </section>
    <section class="pay-method clear">
      <div class="left">
        <i class="icon"></i>
        <i class="icon" v-if="!weChat"></i>
      </div>
      <ul class="right">
        <li @click="payMethod='wechat'">
          <p>微信支付</p>
          <i class="icon" :class="{'bgi':payMethod == 'wechat'}"></i>
        </li>
        <li @click="payMethod='alipay.mobile'" v-if="!weChat">
          <p>支付宝支付</p>
          <i class="icon" :class="{'bgi':payMethod == 'alipay.mobile'}"></i>
        </li>
      </ul>
    </section>
    <section class="confirm-pay">
      <input type="button" class="btn" value="确认支付" @click="payment" :disabled="time_server <= 0" :class="{'gray':time_server <= 0}"/>
    </section>
  </div>
</template>
<script>
import common from '../../common/common'
import {getStore} from '../../common/store'
import keyConf from '../../common/keyConf'
import {getOrder} from '../../service/getData'
export default {
  name: 'payment',
  data () {
    return {
      title: '支付订单',
      weChat: false,
      ordersn: '',
      payMethod: 'wechat',
      timeDown: '',
      order: {},
      time_server: 0
    }
  },
  created () {
    this.isWechat()
    this.ordersn = this.$route.params.orderid;
    this.getOrder();
  },
  methods: {
    async getOrder(){
      let res = await getOrder({order_sn:this.ordersn})
      if(res.status === 'ok'){
        this.order = res.data[0]
        /* if(this.order.pay_status == 2){
          
        } */
        this.getOrderCreateTime()
        
      }
    },
    countDown(time){
      console.log(time)
      common.countDown(time,(munite,second) => {
        this.timeDown = `${munite}:${second}`
      })
    },
    getOrderCreateTime () {
      let time = this.order.created_at
      time = time ? time : ''
      this.createTime = common.getDate(time)
      this.createTime.setMinutes(this.createTime.getMinutes()+30)
      let now = (new Date()).getTime()
      
      this.time_server = this.createTime - now
      this.countDown(this.time_server)
    },
    payment () {
      let hostname = window.location.origin
      let payurl = ''
      if(hostname.indexOf('192.168')>-1 || hostname.indexOf('test') > -1 || hostname.indexOf('tmp') > -1){
        payurl = keyConf.payUrl.test
      }else{
        payurl = keyConf.payUrl.master
      }
      
      if(this.$route.query.dressparty && this.$route.query.dressparty == '1' || this.$route.query.dressparty == '10'){ // 万圣节“鬼混夜”专题1元、10元
        window.location.href=`${payurl}/payment/order/${this.ordersn}?
        gateway=${this.payMethod}
        &nick=qiaocat
        &fallback=${hostname}/topic-dressparty/lineup/${this.ordersn}/${this.$route.query.dressparty}
        &failback=${hostname}/topic-dressparty`
      }else if(this.$route.query.dressparty && this.$route.query.dressparty == '0.01'){ // 万圣节“鬼混夜”专题0.01元
        window.location.href=`${payurl}/payment/order/${this.ordersn}?
        gateway=${this.payMethod}
        &nick=qiaocat
        &fallback=${hostname}/topic-makeup001/lineup001/${this.ordersn}/001
        &failback=${hostname}/topic-makeup001`
      }else{
        window.location.href=`${payurl}/payment/order/${this.ordersn}?
        gateway=${this.payMethod}
        &nick=qiaocat
        &fallback=${hostname}/payresult/success/${this.ordersn}
        &failback=${hostname}/payresult/exception/${this.ordersn}`
      }
      // window.location.href=`http://crm.qiaocatcrm.com/payment/order/${this.orderid}?gateway=${this.payMethod}&nick=qiaocat`
      // this.$router.push('/payresult/success')
    },
    back() {
      if(this.$route.query.dressparty && this.$route.query.dressparty !== '0'){ // 万圣节“鬼混夜”专题
        this.$router.go(-1);
      }else {
        this.$router.push('/orderlist');
      }
    },
    isWechat(){
      let ua = navigator.userAgent.toLowerCase();  
      if(ua.match(/MicroMessenger/i)=="micromessenger") {  
          this.weChat = true  
      } else {  
          this.weChat = false 
      }  
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../assets/css/mixin.scss';
.payment{
  .header{
    @include bgColor(#fff);
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
  }
  .content{
    p:first-child{
      @include wh(100%,6.4rem);
      @include sc(1.6rem,#e65058);
      text-align: center;
      line-height: 10.4rem;
      letter-spacing: 1px;
    }
    p:nth-of-type(2){
      @include sc(3rem,#e65058);
      text-align: center;
      letter-spacing: 1px;
      span{
         @include sc(2rem,#e65058);
      }
    }
  }
  .count-down{
    text-align: center;
    
    i.icon{
      display: inline-block;
      @include wh(1.7rem,1.7rem);
      vertical-align: middle;
      @include bgi_2('/static/icon/order/pay_icon_deadline.png',1.7rem,1.7rem);
    }
    span{
      @include sc(1.3rem,#666);
      line-height: 7rem;
    }
  }
  .pay-method{
    margin-top: 7rem;
    div.left{
      position: relative;
      @include bgColor(#fff);
      i.icon{
        position: absolute;
        @include wh(3.6rem,3.6rem);
        left: 1.5rem;
      }
      i.icon:first-child{
        top: 1rem;
        @include bgi_2('/static/icon/order/pay_icon_pay01.png',
          3.6rem,3.6rem);
        
      }
      i.icon:nth-of-type(2){
        top: 6.6rem;
        @include bgi_2('/static/icon/order/pay_icon_pay02.png',
          3.6rem,3.6rem);
      }
    }
    ul.right{
      width: 100%;
      padding-left:6.7rem; 
      li{
        position: relative;
        @include wh(100%,5.5rem);
        // @include average(#ccc);
        border-bottom: .05rem solid #ccc;
        &:first-child{
          border-top: .05rem solid #ccc;
        }
        i.icon{
          @include bgi_2('/static/icon/order/btn_choose_nor.png',2.2rem,2.2rem);
          &.bgi{
            @include bgi_2('/static/icon/order/btn_choose_sel.png',
              2.2rem,2.2rem);
          }
        }
        p{
          line-height: 5.5rem;
          @include sc(1.6rem,#333);
        }
        i.icon{
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          right: 1.5rem;
          @include wh(2.2rem,2.2rem);
        }
      }
    }
  }
  .confirm-pay{
    position: fixed;
    width: 100%;
    bottom: 2rem;
    @media (-webkit-min-device-pixel-ratio:2){
      bottom: 4rem;
    }
    padding: 0 1.5rem;
    .btn{
      @include wh(100%, 4.4rem);
      @include bgColor(#e70034);
      border-radius: .4rem;
      @include sc(1.8rem, $bgWhite);
      line-height: 4.4rem;
      text-align: center;
      &.gray{
        background-color: #d1d1d1;
      }
    }
  }
}
</style>