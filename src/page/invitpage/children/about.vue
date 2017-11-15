<template>
<div class="about">
  <div class="logo">
    <img src="/static/icon/invit/invite_logo.png" alt="">
  </div>
  <div class="content f14" >
    俏猫隶属于广州俏猫电子商务有限公司，在俏猫平台上，
    您只要轻轻一点，专业的美业师会在您指定的时间来到您指定的任何地点，
    提供价钱透明公正、量身定制、专业贴心的高质量造型服务。
  </div>
  <div class="footer">
    <div>下载俏猫app</div>
  </div>
</div>
</template>
<script>
export default {
  name: 'about',
  data () {
    return {
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../../assets/css/mixin.scss';
.about{
  .logo{
    padding: 6rem 0 4.5rem;
    text-align: center;
    img{
      @include wh(10rem,4.1rem);
    }
  }
  .content{
    padding: 0 1.2rem;
  }
  .f14{
    @include sc(1.4rem,#000);
  }
  .footer{
    padding: 11rem 1.5rem 0;
    div{
      @include bgColor($lightYellow);
      border-radius: .4rem;
      @include sc(1.8rem,#000);
      @include wh(100%,4.4rem);
      text-align: center;
      line-height: 4.4rem;
    }
  }
}
</style>