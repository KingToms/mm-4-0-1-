<template>
  <div class="no-result">
    <div class="center">
      <img src="/static/image/search/search_pic01.png" alt="">
      <p>找不到你想要的内容，换关键字试试</p>
    </div>
  </div>
</template>
<script>
export default {
  name: 'noResult',
  data () {
    return {
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../../assets/css/mixin.scss';
.no-result{
  background-color: #F5F5F5;
  width: 100%;
  .center{
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    width: 100%;
    text-align: center;
    img{
      @include wh(16.2rem, 9.65rem);
    }
    p{
      padding-top: 2.5rem;
      font-size: 1.4rem;
      color: #666;
    }
  }
}
</style>
