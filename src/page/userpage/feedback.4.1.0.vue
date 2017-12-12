<template>
  <div class="feedback">
    <div class="header">
      <lHeader :title="title"></lHeader>
    </div>
    <div class="content">
      <div class="main">
        <ul>
          <li class="li_item">
            <router-link to="/feedback">意见反馈</router-link>
            <i class="icon"></i>
          </li>
          <li class="li_item">
            <router-link to="/complaint">举报投诉</router-link>
            <i class="icon"></i>
          </li>
          <li class="li_item">
            <router-link to="/guide">新手指引</router-link>
            <i class="icon"></i>
          </li>
        </ul>
        <!--常见问题-->
        <div class="common-problem">
          <p class="common">常见问题</p>
          <ul>
            <li class="li_item">
              <router-link to="/fag">我的优惠券不见了</router-link>
            </li>
            <li class="li_item">
              <router-link to="/fag">优惠券是否可以叠加使用</router-link>
            </li>
            <li class="li_item">
              <router-link to="/fag">我所在城市能否下单</router-link>
            </li>
            <li class="li_item">
              <router-link to="/fag">选不了服务时间</router-link>
            </li>
            <li class="li_item">
              <router-link to="/fag">紧急单如何预约</router-link>
            </li>
            <li class="li_item">
              <router-link to="/fag">美业师是否有等级区分</router-link>
            </li>
            <li class="li_item">
              <router-link to="/fag">美业师使用的产品品牌</router-link>
            </li>
            <li class="li_item">
              <router-link to="/fag">订单服务能否提供发票</router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue';
import lHeader from '../../components/common/lHeader';
import { getFaqProblem } from '../../service/getData';
export default {
  name: 'feedback',
  data () {
    return {
      title: '帮助与反馈',

    }
  },
  created() {
    this.getFaqProblemList();
  },
  methods: {
    // 获取用户常见问题
    async getFaqProblemList() {
      let res = await getFaqProblem();
      console.log(res);
      /*if(){

      }*/
    }
  },
  components: {
    lHeader,
  },
}
</script>
<style lang="scss" scoped>
@import '../../assets/css/mixin.scss';
.feedback {
  @include wh(100%, 100%);
  .header{
    @include wh(100%,4rem);
    position: fixed;
    left: 0;
    top: 0;
    z-index: 1;
  }
  .content {
    @include wh(100%, 100%);
    background-color: #F0F0F0;
    padding-top: 5rem;
    .main {
      ul {
        padding-left: 2.5rem;
        background-color: #fff;
        li.li_item {
          position: relative;
          width: 100%;
          height: 4.4rem;
          line-height: 4.4rem;
          font-size: 1.5rem;
          color: #333;
          border-bottom: 0.05rem solid #ddd;
          cursor: pointer;
          &:nth-last-of-type(1) {
            border: 0;
          }
          a {
            display: block;
            @include wh(100%, 100%);
          }

          .icon {
            position: absolute;
            right: 1.5rem;
            top: 50%;
            -webkit-transform: translateY(-50%);
            transform: translateY(-50%);
            width: .7rem;
            height: 1.3rem;
            background-image: url(/static/icon/order/icon_next.png);
            background-size: 0.7rem,1.3rem;
            background-position: 50%;
            background-repeat: no-repeat;
          }
        }
      }
      /*常见问题*/
      .common-problem {
        .common {
          padding: 2rem 0 1.2rem 2.5rem;
          font-size: 1.5rem;
          color: #999;
          background-color: #F0F0F0;
          line-height: 1.6rem;
        }
      }
    }
  }
  
}
</style>