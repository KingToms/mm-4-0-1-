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
@import '../../assets/css/mixin.scss';
.header{
  @include bgColor(#fff);
  position: relative;
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
    background-image: url('../../assets/image/icon/login/nav_btn_return_old.png');
    background-repeat: no-repeat;
    background-position: center;
    background-size: 2.2rem 2.2rem;
  }
}
</style>