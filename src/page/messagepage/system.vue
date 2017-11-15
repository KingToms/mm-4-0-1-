<template>
  <div class="system_box">
    <lHeader :title="title"></lHeader>
    <div class="message_text" v-if="hasMessage">
      <systemItem :msgState="msgState"></systemItem>
      <systemItem :msgState="msgState"></systemItem>
      <systemItem :msgState="!msgState"></systemItem>
    </div>
    <no-message v-if="!hasMessage"></no-message>
  </div>
</template>
<script>
import lHeader from '../../components/common/lHeader'
import systemItem from './children/systemItem'
import noMessage from './children/noMessage'
export default {
  name: "system",
  data () {
    return {
      title: '系统消息',
      hasMessage: true, //是否有系统消息
      msgState: true, // 是否是优惠券消息,还是订单消息
    };
  },
  methods: {
  },
  components: {
    lHeader,
    systemItem,
    noMessage,
  }
}
</script>
<style lang="scss" scoped>
@import '../../assets/css/mixin.scss';
.system_box{
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
    padding: 4rem 1.5rem 10rem;
  }
}
</style>