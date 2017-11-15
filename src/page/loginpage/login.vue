<template>
	<div class="login">
    <l-Header :title="title"></l-Header>
    <VAuthLogin ref="authLogin" v-show="method" :channel="channel"></VAuthLogin>
    <VPwdLogin v-show="!method" ref="pwdLogin" :channel="channel"></VPwdLogin>
    <div class="login-container">
      <input type="button" value="登录" @click="login">
    </div>
    <div class="tip clear">
      <div class="find">
        <router-link class="text" to="/findpwd">{{findText}}</router-link>
      </div>
      <div class="changeLogin">
        <span class="text" @click="changeLogin">{{changeText}}</span>
      </div>
    </div>
    <div class="register">
      <router-link :to="`/register?plid=${channel}`">一 注册 一</router-link>
    </div>
    <div class="footer">
      <span class="out-text">登录/注册即表示您同意<router-link to="/statement" class="text">《俏猫用户协议》</router-link></span>
    </div>
    <toast ref="toast" :showText="showText"></toast>
    <!--<VFooter></VFooter>-->
	</div>
</template>
<script>
import toast from '@/components/common/toast'
// import VFooter from '@/components/common/footer'
import lHeader from '../../components/common/lHeader'
import VAuthLogin from './children/authLogin'
import VPwdLogin from './children/pwdLogin'
import {getCode, authMobile, pwdlogin, authLogin} from '@/service/getData.js'

export default {
  name: 'login',
  data () {
    return {
      title: '',
      mobile: '',
      pwd: '',
      changeText: '切换密码登录', //切换后的文本
      findText: '', //忘记密码
      method: true, //切换登录方式
      loginWay: false,
      showText: '',
      channel: ''
    }
  },
  methods: {
    changeLogin () {
      this.method = !this.method
      this.changeText = this.method? '切换密码登录':'切换快捷登录'
      this.findText = this.method? '':'忘记密码'
      this.title = this.method? '快捷登录':'密码登录'
    },
    login () {
      if(this.method){
        this.$refs.authLogin.$emit('codeLogin')
      }else{
        this.$refs.pwdLogin.$emit('pwdLogin')
      }
    },
    //通过正则匹配获取当前页面的url中的参数
    getUrlParam(url){
      var pattern = /(\w+)=(\w+)/ig;//定义正则表达式 
      var parames = {};//定义参数对象 
      url.replace(pattern, function(a, b, c){parames[b] = c;});
      return parames;
    }
  },
  created () {
    let parames = {};
    this.title = this.method? '快捷登录':'密码登录';
    if(this.$route.query.url){
      parames = this.getUrlParam(this.$route.query.url);
      this.channel = parames['plid'];
    }
  },
  components: {
    lHeader,
    VAuthLogin,
    VPwdLogin,
    // VFooter,
    toast
  }
}
</script>
<style lang="scss" scoped>
@import '../../assets/css/mixin.scss';
  .login{
    position: relative;
    height: 100%;
    background-color: #fff;
    .login-container{
      @include wh(100%,4.4rem);
      padding: 0 1.5625rem;
      margin-bottom: 1.25rem;
      input[type=button]{
        @include wh(100%,100%);
        background-color: $themeRed;
        font-size: 1.5rem;
        color: $bgWhite;
        letter-spacing: 2px;
        border-radius: .4rem;
      }
    }
    .tip{
      padding: 0px 1.5625rem;
      .find{
        float: left;
      }
      .changeLogin{
        float: right;
        text-align: right;
      }
      .text{
          color: $themeRed;
          font-size: 1.2rem;
          letter-spacing: 1px;
        }
    }
    .register{
      // position: absolute;
      padding-top: 14rem;
      width: 100%;
      // bottom: 15.3rem;
      text-align: center;
      a{
      font-size: 1.5rem;
      color: $themeRed;
      }
    }
    .footer{
      // position: absolute;
      width: 100%;
      // bottom: 4rem;
      text-align: center;
      .out-text{
        font-size: 1.2rem;
        color: #999;
        .text{
          color: $themeRed;
        }
      }
    }
  }
</style>
