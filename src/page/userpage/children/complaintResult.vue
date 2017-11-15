<template>
  <div class="complaint-result">
    <img src="/static/icon/order/pay_icon_fish.png" alt="">
    <p>提交成功</p>
    <p>你的投诉已提交成功，</p>
    <p>俏猫客服会在24小时内处理您的投诉。</p>
    <div class="backTo">
      <div class="btn" @click="$router.push('/')">返回首页</div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'complaintResult',
  data () {
    return {
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../../assets/css/mixin.scss';
.complaint-result{
    // @include bgColor(#fff);
    background-color: #fff !important;
    padding-top: 5rem;
    text-align: center;
    img{
      @include wh(6rem,6rem);
    }
    p{
      &:nth-of-type(1){
        @include sc(1.8rem,#000);
      }
      &:nth-of-type(2){
        padding-top: 1rem;
      }
      &:nth-of-type(2),&:nth-of-type(3){
        @include sc(1.4rem,#666);
      }
    }
    .backTo{
      padding: 5rem 5rem 0;
      .btn{
        @include wh(100%,3.4rem);
        @include bgColor($themeRed);
        @include sc(1.4rem,#000);
        line-height: 3.4rem;
        border-radius: .4rem;
      }
    }
  }
</style>