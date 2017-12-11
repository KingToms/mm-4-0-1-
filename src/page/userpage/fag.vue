<template>
  <div class="fag-box">
    <div class="header">
      <lHeader :title="title"></lHeader>
    </div>
    <div class="content">
      <p class="title">如何投诉</p>
      <p class="tip-content">
        个人中心-帮助与反馈-举报投诉，选择投诉分类即可。
        其他投诉方式：拨打 4008335138 转5，或邮件至qctousu@lansee.net
      </p>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import lHeader from '../../components/common/lHeader'
export default {
  name: "commonProblem",
  data () {
    return {
       title: '常见问题',
    };
  },
  methods: {
  },
  components: {
    lHeader,
  },
}
</script>
<style lang="scss" scoped>
@import '../../assets/css/mixin.scss';
.fag-box {
  .header{
    @include wh(100%,4rem);
    position: fixed;
    left: 0;
    top: 0;
    z-index: 1;
  }
  .content {
    padding-top: 5rem;
    background-color: #f0f0f0;
    text-align: center;
    p {
      padding: 0 2.5rem;
      background-color: #fff;
      &.title {
        padding: 2.2rem 0 1.5rem;
        line-height: 2rem;
        font-size: 2rem;
        color: #333;
      }
      &.tip-content {
        text-align: left;
        font-size: 1.4rem;
        color: #666;
      }
    }
  }
}
</style>