<template>
  <div class="cancel-order">
    <div class="fixed">
      <div class="header">
        <div class="title">
          <h2>{{title}}</h2>
        </div>
        <a class="back" href="javascript:void(0);" @click="back" ></a>
      </div>
    </div>
    <div v-show="!isRule">
      <div class="refound-rule">
        退款规则
        <a href="javascript:void(0);" @click="isRule=true"></a>
      </div>
      <div class="cancel-reason">
        <ul>
          <li>取消原因</li>
          <li v-for="(item,index) in reasons" :key="index" @click="choose=index">
            {{item}}
            <icon :class="{'choose':choose===index}"></icon>
          </li>
          
        </ul>
      </div>
      <div class="refound-btn">
        <p v-show="isRefound" @click="cancelOrder">申请退款</p>
        <p v-show="!isRefound" @click="cancelOrder">确定</p>
      </div>
    </div>
    <div class="rule" v-show="isRule">
      <ul>
        <li>
          <p class="title">1.在指定服务时间24小时内之前取消订单:</p>
          <p class="explain">全额退款，优惠券以及积分全部返还</p>
        </li>
        <li>
          <p class="title">2.在指定服务时间3小时之前取消订单:</p>
          <p class="explain">需扣除实际支付金额的50%，作为违约金，优惠券以及积分全部返还</p>
        </li>
        <li>
          <p class="title">3.在指定服务时间3小时之内取消订单:</p>
          <p class="explain">需扣除全款作为违约金，且优惠券不返还，积分全部返还</p>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import {getOrder,cancelOrder} from '../../service/getData'
export default {
  name: 'cancelOrder',
  data () {
    return {
      title: '取消订单',
      choose: 0,
      isRule: false,
      ordersn: '',
      order:{},
      isRefound: false,
      reasons:[
        '计划有变，不需要服务',
        '想换服务时间/地址',
        '想更换美业师',
        '与美业师沟通不畅',
        '美业师爽约，没有来服务',
        '美业师迟到30分钟以上，不等了',
        '其他'
      ]
    }
  },
  created () {
    this.ordersn = this.$route.params.ordersn
    this.getOrder()
  },
  methods: {
    back(){
      if(this.isRule){
        this.isRule = false
      }else{
        this.$router.go(-1)
      }
    },
    async getOrder (){
      let res = await getOrder({order_sn:this.ordersn})
      if(res.status === 'ok'){
        this.order = res.data[0]
        this.isRefound = this.order.order_status !== 0
      }else{
        alert(res.msg)
      }
    },
    async cancelOrder(){
      let res = await cancelOrder({order_sn:this.ordersn,type:'user',reason:this.reasons[this.choose]})
      if(res.status==='ok'){
        alert('订单取消成功')
        this.$router.push({name:'ordermanage'})
      }else{
        alert(res.msg)
      }
    },
    async refound(){

    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../assets/css/mixin.scss';
.cancel-order{
  >div{
    overflow: hidden;
    @include bgColor(#f3f3f3);
  }
  .fixed{
    @include wh(100%,4rem);
  }
  .header{
    position: fixed;
    @include wh(100%,4rem);
    @include bgColor(#fff);
    z-index: 1;
    // position: relative;
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
  .refound-rule{
    position: relative;
    margin-top: 1rem;
    margin-bottom: 1rem;
    @include bgColor(#fff);
    @include sc(1.6rem,#333);
    height: 5rem;
    line-height: 5rem;
    padding-left: 1.5rem;
    a{
      position: absolute;
      @include wh(1.1rem,1.1rem);
      padding: 1.1rem;
      right: 1.5rem;
      top: 50%;
      transform: translateY(-50%);
      @include bgi_2('/static/icon/order/indent_icon_name.png',1.1rem,1.1rem);
    }
  }
  .cancel-reason{
    position: relative;
    @include bgColor(#fff);
    ul{
      padding-left: 1.5rem;
      li{
        line-height: 5rem;
        @include wh(100%,5rem);
        @include average(#ccc);
        @include sc(1.4rem,#000);
        &:not(:first-child){
          padding-left: 3.2rem;
        }
        icon{
          position: absolute;
          @include wh(2.2rem,2.2rem);
          @include bgi_2('/static/icon/order/btn_choose_nor.png',2.2rem,2.2rem);
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          &.choose{
            @include bgi_2('/static/icon/order/btn_choose_sel.png',2.2rem,2.2rem);
          }
        }
      }
    }
  }
  .refound-btn{
    @include bgColor(#fff);
    padding:5.8rem 1.5rem 3rem;
    p{
      @include wh(100%,4.4rem);
      @include bgColor($themeRed);
      @include sc(1.8rem,$bgWhite);
      text-align: center;
      line-height: 4.4rem;
      border-radius: .4rem;
    }
  }
  .rule{
    @include bgColor(#fff);
    padding:2.05rem 0 0 1.5rem;
    li{
      padding-right: 1rem;
      p{
        line-height: 2rem;
        @include sc(1.4rem,#000);
        &:first-child{
          line-height: 3.9rem;
          font-weight: 600;
        }
        &:last-child{
          padding-left: 1.2rem;
        }
      }
    }
  }
}
</style>