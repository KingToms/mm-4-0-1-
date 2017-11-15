<template>
  <div class="invite-user">
    <div class="header">
      <div class="title">
        <h2>{{title}}</h2>
      </div>
      <a class="back" href="javascript:void(0);" @click="back" ></a>
    </div>
    <div v-show="isInvit">
      <div class="logo">
        <img src="/static/icon/invit/invite_logo.png" alt="">
      </div>
      <div class="coupon">
        <span>50<small class="f20">元</small></span>
      </div>
      <!-- <invit-form @changePage="changePage"></invit-form> -->
      <invit-result></invit-result>
    </div>
    <about v-show="!isInvit"></about>
  </div>
</template>
<script>
import about from './children/about'
import invitForm from './children/form'
import invitResult from './children/result'
export default {
  name: 'inviteUser',
  data () {
    return {
      isInvit: true,
      title: '俏猫新人邀请'
    }
  },
  components:{
    about,
    invitForm,
    invitResult
  },
  methods: {
    back(){
      if(this.isInvit)
        this.$router.push('/')
      else{
        this.isInvit = !this.isInvit
        this.title = '俏猫新人邀请'
      }
    },
    changePage(){
      this.isInvit=false
      this.title = '关于俏猫'
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../assets/css/mixin.scss';
.header{
  @include bgColor(#fff);
  position: relative;
  .title{
    @include wh(100%,4rem);
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
    @include bgi_2('../../assets/image/icon/login/nav_btn_return.png',2.2rem,2.2rem);
  }
}
.invite-user{
  .logo{
    padding: 4rem 0;
    text-align: center;
    img{
      @include wh(10rem,4.1rem);
    }
  }
  .coupon{
    position: relative;
    height: 6.8rem;
    span{
      position: absolute;
      @include wh(15.3rem,6.8rem);
      @include bgi_2('/static/icon/invit/invite_bg_coupon_wechat.png',15.3rem,6.8rem);
      left: 50%;
      transform: translateX(-50%);
      @include sc(3.2rem,#000);
      text-align: center;
      line-height: 6.8rem;
      .f20{
        @include sc(2rem,#000);
      }
    }
  }
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
        @include bgi_2('../../assets/image/icon/login/icon_user.png',1.75rem,2rem,.8rem);
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
        @include bgi_2('../../assets/image/icon/login/icon_code.png',1.75rem,2rem,.8rem);
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
        @include bgColor($lightYellow);
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
}
</style>