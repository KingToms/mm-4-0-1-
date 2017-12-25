<template>
  <div class="activity_box">
    <lHeader :title="title"></lHeader>
    <div class="message_text" v-if="hasMessage">
      <activityItem></activityItem>
      <activityItem></activityItem>
      <activityItem></activityItem>
    </div>
    <no-message v-if="!hasMessage"></no-message>
  </div>
</template>
<script>
import lHeader from "../../components/common/lHeader"
import activityItem from "./children/activityItem"
import noMessage from './children/noMessage'
export default {
  name: "activity",
  data () {
    return {
      title: '活动消息',
      hasMessage: true, //是否有消息
    };
  },
  methods: {
  },
  components: {
    lHeader,
    activityItem,
    noMessage,
  }
}
</script>
<style lang="scss" scoped>
@import '../../assets/css/mixin.scss';
.activity_box{
  background-color: #f3f3f3;
  @include wh(100%, 100%);
  .header{
    width: 100%;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 20;
  }
  .message_text{
    background-color: #f3f3f3;
    padding-top: 4rem;
    padding-bottom: 10rem;
  }
}
</style>