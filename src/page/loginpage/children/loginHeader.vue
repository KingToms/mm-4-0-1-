<template>
  <div class="header">
    <div class="title">
      <h2>{{title}}</h2>
    </div>
    <a class="back" href="javascript:void(0);" @click="$router.go(-1)" ></a>
  </div>
</template>
<script>
export default {
  /*name: 'VHeader',
  data () {
    return {
    }
  },*/
  props:["title"]
}
</script>
<style lang="scss" scoped>
@import '../../../assets/css/mixin.scss';
.header{
  @include bgColor(#fff);
  position: relative;
  .title{
    @include wh(100%,4.4rem);
    @include average(#999);
    line-height: 4.4rem;
    text-align: center;
    h2{
      font-size: 1.8rem;
      color: #000;
      letter-spacing: 1px;
    }
  }
  .back{
    position: absolute;
    top: 1.5rem;
    left: 1.5rem;
    @include wh(1.7rem,1.7rem);
    background-image: url('../../../assets/image/icon/login/nav_btn_return.png');
    background-repeat: no-repeat;
    background-position: center;
    background-size: 2.2rem 2.2rem;
    cursor: pointer;
  }
}
</style>