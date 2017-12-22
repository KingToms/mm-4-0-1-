<template>
  <div class="feedback">
    <div class="header">
      <div class="title">
        <h2>{{title}}</h2>
      </div>
      <a class="back" href="javascript:void(0);" @click="goBack"></a>
    </div>
    <div class="content">
      <div class="main" v-if="this.page == 'help'">
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
        <div class="common-problem" v-if="fagProblem">
          <p class="common">常见问题</p>
          <ul>
            <li class="li_item" v-for="(item, index) in fagProblem" :key="index" @click="chooseFaq('faq','常见问题',item)">
              {{item.title}}
            </li>
          </ul>
        </div>
      </div>
      <div class="faq_detail" v-if="this.page == 'faq' && problem">
        <p class="title">{{problem.title}}</p>
        <div class="faq_item" v-show="problem.content" v-for="(item, index) in problem.content" :key="index">
          <p class="question">Q{{index + 1}}：{{item.questions}}</p>
          <p class="answer">
            A{{index + 1}}：{{item.Answer}}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue';
import { getFaqProblem } from '../../service/getData';
export default {
  name: 'feedback',
  data() {
    return {
      title: '帮助与反馈',
      page: 'help', // 默认：帮助与反馈页面
      fagProblem: [], // 常见问题
      problem: '', // 查看的问题
    }
  },
  created() {
    this.getFaqProblemList();
  },
  methods: {
    // 获取用户常见问题
    async getFaqProblemList() {
      let res = await getFaqProblem();
      if (res.status == "ok") {
        this.fagProblem = res.data;
        // console.log(this.fagProblem);
      }
    },
    // 查看常见问题--详情
    chooseFaq(page, title, item) {
      this.page = page;
      this.title = title;
      this.problem = item;
    },
    // 返回
    goBack() {
      if (this.page == 'help') {
        this.$router.go(-1);
        return
      } else if (this.page == 'faq') {
        this.page = 'help';
        this.title = '帮助与反馈';
      }
    },
  },
  components: {

  },
}
</script>
<style lang="scss" scoped>
@import '../../assets/css/mixin.scss';
.feedback {
  @include wh(100%, 100%); // 标题
  .header {
    @include wh(100%, 4rem);
    @include bgColor(#fff);
    position: fixed;
    left: 0;
    top: 0;
    z-index: 1;
    .title {
      @include wh(100%, 4rem);
      @include average(#999);
      line-height: 4rem;
      text-align: center;
      h2 {
        font-size: 1.8rem;
        color: #000;
        letter-spacing: 1px;
      }
    }
    .back {
      position: absolute;
      top: .7rem;
      left: .7rem;
      @include wh(2.4rem, 2.4rem);
      background-image: url('../../assets/image/icon/login/nav_btn_return.png');
      background-repeat: no-repeat;
      background-position: center;
      background-size: 2.2rem 2.2rem;
    }
  } // 主体内容
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
            background-size: 0.7rem, 1.3rem;
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
    } // 常见问题--详情
    .faq_detail {
      min-height: 100%;
      background-color: #fff;
      padding-bottom: 6rem;
      p.title {
        text-align: center;
        padding: 2.2rem 0 0;
        font-size: 2rem;
      }
      .faq_item {
        padding: 0 1.5rem;
        p {
          &.question {
            padding: 2.2rem 0 1.2rem;
            line-height: 2rem;
            font-size: 1.4rem;
            color: #EC413E;
          }
          &.answer {
            text-align: left;
            font-size: 1.4rem;
            color: #666;
          }
        }
      }
    }
  }
}
</style>