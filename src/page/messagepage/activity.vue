<template>
  <div class="activity_box">
    <lHeader :title="title"></lHeader>
    <div class="message_text">
      <activityItem></activityItem>
      <activityItem></activityItem>
      <activityItem></activityItem>
      <activityItem></activityItem>
      <activityItem></activityItem>
    </div>
  </div>
</template>
<script>
import lHeader from "../../components/common/lHeader"
import activityItem from "./children/activityItem"
export default {
  name: "activity",
  data () {
    return {
      title: '活动消息',
    };
  },
  methods: {
  },
  components: {
    lHeader,
    activityItem,
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