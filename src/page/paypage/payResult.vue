<template>
  <div class="pay-result">
    <div class="header">
      <div class="title">
        <h2>支付订单</h2>
      </div>
      <a class="back" href="javascript:void(0);" @click="back" ></a>
      <span class="edit" @click="editAddress" v-if="this.page == 'address'" v-show="addressEditing">编辑</span>
    </div>
    <router-view></router-view>
    <div class="recommend">
      <p><span>为你推荐</span></p>
      <i></i>
      <h4>RECOMMND</h4>
      <div class="pro_box">
        <listItem v-for="(item,index) in commend" :key="index" :list="item"></listItem>
      </div>
    </div>
  </div>
</template>
<script>
import listItem from '../detailpage/children/listItem'
import {Reccommend} from '../../service/getData'
export default {
  name: 'payResult',
  data () {
    return {
      commend: []
    }
  },
  created(){
    this.getReccommend()
  },
  components:{
    listItem
  },
  methods: {
    back(){
      this.$router.push('/orderlist')
    },
    async getReccommend(){
      let res = await Reccommend({})
      if(res.status === 'ok')
        this.commend = res.data
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../assets/css/mixin.scss';
 .pay-result{
   @include bgColor(#f3f3f3);
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
  .recommend{
    text-align: center;
      background-color: #fff;
      margin-top:1rem;
      padding: 2.4rem 0;
      div{
        background-color: #fff;
        overflow: hidden;
        padding-bottom:2rem;
      }
      h4{
        @include sc(1.6rem,#000)
      }
      i{
        display: block;
        width: 2rem;
        height: 0.3rem;
        background-color: #000;
        margin:1rem auto;
      }
      p{
        margin-bottom:1.5rem ;
        span{
          position: relative;
          @include sc(1.6rem,#000);
          &:before,&:after{
            content: "";
            position: absolute;
            width: 13.7rem;
            border-bottom: 1px solid #000;
            top: 1.1rem;
          }
          &:before{
            left: -15.5rem;
          }
          &:after{
            right: -15.5rem;
          }
        }
      }
      .product{
        margin-bottom:1rem;
      }
      img{
        width: 100%;
      }
      /*推荐产品列表*/
      .pro_box{
        padding-left: 1rem;
      }
  }
 }
  
</style>