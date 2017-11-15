<template>
<div class="invit-result">
  <p class="f14 first">您好，俏猫新朋友</p>
  <p class="f14">13569425120</p>
  <p class="tip">马上分享赚取50元奖励吧！</p>
  <div class="btn">
    <div class="share f18 br">分享给好友</div>
    <div class="downLoad f18 br">下载俏猫APP</div>
  </div>
</div>
</template>
<script>
export default {
  name: 'result',
  data () {
    return {
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../../assets/css/mixin.scss';
.invit-result{
  .first{
    padding-top: 2rem;
  }
  .f14{
    text-align: center;
    @include sc(1.4rem,#000);
  }
  .tip{
    padding: 10rem 0 3rem;
    text-align: center;
    @include sc(1.6rem,#000);
  }
  .btn{
    padding: 0 1.5rem;
    overflow: hidden;
    .f18{
      text-align: center;
      line-height: 4.4rem;
      @include sc(1.8rem,#000);
    }
    .br{
      border-radius: .4rem;
    }
    .share{
      @include wh(100%,4.4rem);
      @include bgColor($lightYellow);
      margin-bottom: 2rem;
    }
    .downLoad{
      @include wh(100%,4.4rem);
      @include bgColor($bodyBg);
    }
  }
}
</style>