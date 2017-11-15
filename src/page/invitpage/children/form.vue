<template>
<div class="invit-form">
  <p class="f14 first">邀请您使用俏猫</p>
  <p class="f14">体验上门化妆、医美及更多服务</p>
  <div class="form">
    <div class="phone">
      <input class="f15" type="number" v-model="phoneNum" placeholder="请输入手机号码">
      <input type="button" value="发送验证码">
    </div>
    <div class="vcode">
      <input class="f15" type="text" v-model="vcode" placeholder="请输入验证码">
    </div>
    <div class="btn">
      <div class="br">点击领取</div>
    </div>
  </div>
  <div class="footer">
    <span class="f14 color" @click="changePage">一 关于俏猫 一</span>
  </div>
</div>
</template>
<script>
export default {
  name: 'form',
  data () {
    return {
    }
  },
  methods: {
    changePage(){
      this.$emit('changePage')
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../../assets/css/mixin.scss';
.first{
    padding-top: 2rem;
  }
  .f14{
    text-align: center;
    @include sc(1.4rem,#000);
  }
  .form{
    padding: 8rem 1.5rem 5rem;
    .phone{
      input[type=number]{
        padding-left: 3rem;
        @include wh(65%,4.4rem);
        @include bgi_2('../../../assets/image/icon/login/icon_user.png',1.75rem,2rem,.8rem);
        border-bottom: .05rem solid #ccc;
      }
      input[type=button]{
        @include wh(33%,4.4rem);
        @include bgColor($lightYellow);
        border-radius: .4rem;
      }
    }
    .vcode{
      padding-top: 2rem;
      input[type=text]{
        padding-left: 3rem;
        @include wh(100%,4.4rem);
        @include bgi_2('../../../assets/image/icon/login/icon_code.png',1.75rem,2rem,.8rem);
        border-bottom: .05rem solid #ccc;
      }
    }
    .f15{
      @include sc(1.5rem,#000);
    }
    .br{
      border-radius: .4rem;
    }
    .btn{
      padding: 3rem 1.5rem 0;
      div{
        @include wh(100%,4.4rem);
        @include bgColor(#ffe500);
        @include sc(1.8rem,#000);
        text-align: center;
        line-height: 4.4rem;
      }
    }
  }
  .footer{
    text-align: center;
    .color{
      color: #666;
    }
  }
</style>