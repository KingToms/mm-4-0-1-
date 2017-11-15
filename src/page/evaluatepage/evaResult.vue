<template>
  <div class="eva-result">
    <div class="header">
      <div class="title">
        <h2>感谢评价</h2>
      </div>
      <!-- <a class="back" href="javascript:void(0);" @click="back" ></a> -->
      <router-link class="back" to="/orderlist" ></router-link>
      <span class="edit" @click="editAddress" v-if="this.page == 'address'" v-show="addressEditing">编辑</span>
    </div>
    <div class="content">
       <div class="image">
         <img src="/static/icon/order/pay_icon_fish.png" alt="">
         <p>感谢评价</p>
         <p>您每一个字都是我们进步的动力~</p>
       </div>
       <div class="btn">
         <router-link to="/orderlist">
           <div >返回订单</div>
         </router-link>
       </div>
    </div>
    <div class="split-line"></div>
    <div class="tuijian" v-if="!hasOrder">
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
  name: 'evaResult',
  data () {
    return {
      commend: []
    }
  },
  created(){
    this.getReccommend()
  },
  methods: {
    async getReccommend(){
      let res = await Reccommend({})
      if(res.status === 'ok')
        this.commend = res.data
    }
  },
  components:{
    listItem
  }
}
</script>
<style lang="scss" scoped>
@import '../../assets/css/mixin.scss';
.eva-result{
  .header{
    position: fixed;
    @include bgColor(#fff);
    @include wh(100%,4rem);
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
    margin-bottom: 8rem;
    .image{
      padding-top: 9rem;
      margin-bottom: 3rem;
      img{
        @include wh(6rem,6rem);
        margin-left: 50%;
        transform: translateX(-50%);
      }
      p{
        text-align: center;
        line-height: 3.8rem;
        &:nth-of-type(1){
          @include sc(1.8rem,#000);
        }
        &:last-child{
          @include sc(1.4rem,#666);
        }
      }
    }
    .btn{
      // padding-top: 5rem;
      @include wh(100%,4.4rem);
      padding: 0 1.5rem;
      div{
        @include wh(100%,4.4rem);
        @include sc(1.4rem,#000);
        @include bgColor(#ffe500);
        line-height: 4.4rem;
        text-align: center;
      }
    }
  }
  .split-line{
      @include wh(100%,1rem);
      @include bgColor(#f3f3f3);
    }
  /*为你推荐*/
  .tuijian{
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