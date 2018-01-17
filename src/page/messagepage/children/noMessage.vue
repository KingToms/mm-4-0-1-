<template>
  <div class="no-message">
    <img src="/static/image/message/info_icon_null.png" alt="没有相关消息">
    <p>您没有相关的消息</p>
  </div>
</template>
<script>
export default {
  name: 'noMessage',
  data () {
    return {
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../../assets/css/mixin.scss';
.no-message{
  @include bgColor(#fff);
  @include wh(100%,100%);
  margin-top: 4rem;
  padding-top: 10rem;
  text-align: center;
  p{
    @include sc(1.6rem,#999);
    text-align: center;
  }
  img{
    @include wh(12rem,12rem);
    margin-left: 1.8rem;
  }
}
</style>