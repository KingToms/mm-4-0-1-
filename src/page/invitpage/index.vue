<template>
<div class="invit">
  <l-header :title="title"></l-header>
  <ul class="invit-list" v-show="false">
    <li>
      <p class="f14">已成功邀请 苏丽娜</p>
      <p>2017-8-21 13:57:29</p>
      <div class="f14">+ 100元</div>
    </li>
    <li>
      <p class="f14">已成功邀请 苏丽娜</p>
      <p>2017-8-21 13:57:29</p>
      <div class="f14">+ 50元</div>
    </li>
    <li>
      <p class="f14">已成功邀请 苏丽娜</p>
      <p>2017-8-21 13:57:29</p>
      <div class="f14">+ 100元</div>
    </li>
  </ul>
  <div class="no-invit">
    <div class="tip">
      <img src="/static/icon/invit/invite_icon_null.png" alt="">
    </div>
    <p class="f14">您还未成功邀请任何好友，赶快邀请好友，</p>
    <p class="f14">赚取邀请好友现金奖励吧</p>
    <div class="btn">
      <div @click="$router.push('/inviteuser')">邀请好友</div>
    </div>
  </div>
</div>
</template>
<script>
import lHeader from '../../components/common/lHeader'
export default {
  name: 'invitation',
  data () {
    return {
      title: '邀请好友'
    }
  },
  components:{
    lHeader
  }
}
</script>
<style lang="scss" scoped>
@import '../../assets/css/mixin.scss';
.f14{
  @include sc(1.4rem,#000);
}
.invit-list{
  position: relative;
  padding-left: 1.5rem;
  li{
    padding: 2rem 0 1.6rem;
    @include average(#ccc);
    p:nth-of-type(2){
      padding-top: .4rem;
      @include sc(1.1rem,#666);
    }
    div{
      position: absolute;
      top: 0;
      right: 1.5rem;
      line-height: 8rem;
      text-align: center;
      @include wh(9rem,8rem);
      @include bgi_2('/static/icon/invit/invite_bg_coupon.png',9rem,8rem);
    }
  }
}
.no-invit{
  .tip{
    padding:13rem 0 2rem;
    text-align: center; 
    img{
      @include wh(12rem,12rem);
    }
  }
  p{
    text-align: center;
    color: #666;
  }
  .btn{
    padding: 4rem 1.5rem 0;
    div{
      @include wh(100%,4.4rem);
      @include bgColor($lightYellow);
      border-radius: .4rem;
      text-align: center;
      line-height: 4.4rem;
      @include sc(1.6rem,#000);
    }
  }
}
</style>