<template>
  <div class="no-order">
    <p>您没有相关的订单</p>
    <img src="/static/icon/order/indent_icon_null.png" alt="没有相关订单">
  </div>
</template>
<script>
export default {
  name: 'noOrder',
  data () {
    return {
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../../assets/css/mixin.scss';
.no-order{
  position: relative;
  @include bgColor(#fff);
  @include wh(100%,36.4rem);
  padding-top: 8.4rem;
  p{
    line-height: 36.4rem;
    @include sc(1.6rem,#999);
    text-align: center;
  }
  img{
    position: absolute;
    @include wh(12rem,12rem);
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
  }
}
</style>