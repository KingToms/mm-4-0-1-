<template>
  <div class="login">
    <l-Header :channel="channel"></l-Header>
    <VAuthLogin ref="authLogin" v-show="method" :channel="channel"></VAuthLogin>
    <VPwdLogin v-show="!method" ref="pwdLogin" :channel="channel"></VPwdLogin>
    <div class="login-container">
      <input type="button" value="登录" @click="login">
    </div>
    <div class="tip clear">
      <div class="changeLogin">
        <span class="text" @click="changeLogin">{{changeText}}</span>
      </div>
      <div class="vertical-line" v-if="findText"></div>
      <div class="find">
        <router-link class="text" to="/findpwd">{{findText}}</router-link>
      </div>
    </div>
    <div class="login-WeChat">
      <!--<router-link :to="`/register?plid=${channel}&url=${$route.query.url}`" v-if="$route.query.url">一 注册 一</router-link>
      <router-link :to="`/register?plid=${channel}`" v-else>一 注册 一</router-link>-->
      <img src="../../assets/image/icon/login/login_icon_WeChat.png" alt="微信登录">
      微信登录
    </div>
    <div class="footer">
      <span class="out-text">“登录/注册”即代表同意
        <router-link to="/statement" class="text">《俏猫用户协议》</router-link>
      </span>
    </div>
    <toast ref="toast" :showText="showText"></toast>
    <!--<VFooter></VFooter>-->
  </div>
</template>
<script>
import toast from '@/components/common/toast'
// import VFooter from '@/components/common/footer'
import lHeader from './children/loginHeader'
import VAuthLogin from './children/authLogin'
import VPwdLogin from './children/pwdLogin'
import { getCode, authMobile, pwdlogin, authLogin } from '@/service/getData.js'

export default {
  name: 'login',
  data() {
    return {
      title: '',
      mobile: '',
      pwd: '',
      changeText: '账号密码登录', //切换后的文本
      findText: '', //忘记密码
      method: true, //切换登录方式
      loginWay: false,
      showText: '',
      channel: '',
    }
  },
  methods: {
    changeLogin() {
      this.method = !this.method
      this.changeText = this.method ? '账号密码登录' : '手机快捷登录'
      this.findText = this.method ? '' : '忘记密码'
      this.title = this.method ? '快捷登录' : '密码登录'
    },
    login() {
      if (this.method) {
        this.$refs.authLogin.$emit('codeLogin')
      } else {
        this.$refs.pwdLogin.$emit('pwdLogin')
      }
    },
    //通过正则匹配获取当前页面的url中的参数
    getUrlParam(url) {
      var pattern = /(\w+)=(\w+)/ig;//定义正则表达式 
      var parames = {};//定义参数对象 
      url.replace(pattern, function(a, b, c) { parames[b] = c; });
      return parames;
    }
  },
  created() {
    let parames = {};
    this.title = this.method ? '快捷登录' : '密码登录';
    if (this.$route.query.url) {
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
.login {
  position: relative;
  height: 100%;
  background-color: #fff;
  .login-container {
    @include wh(100%, 4.4rem);
    // padding: 0 1.5625rem;
    padding: 0 2.5rem;
    margin-top: 3rem;
    margin-bottom: 2rem;
    input[type=button] {
      @include wh(100%, 100%);
      background-color: $themeRed;
      font-size: 1.5rem;
      color: $bgWhite;
      letter-spacing: 2px;
      border-radius: .4rem;
    }
  }
  .tip {
    // padding: 0px 1.5625rem;
    padding: 0 2.5rem;
    text-align: center;
    font-size: 0;
    /*切换登录方式*/
    .changeLogin {
      display: inline-block;
      text-align: center;
      cursor: pointer;
    }
    /*短竖线*/
    .vertical-line {
      display: inline-block;
      margin: 0 1rem;
      width: 0.08rem;
      height: 1.1rem;
      border-right: 0.05rem solid #666;
      margin-top: -0.8rem;
      vertical-align: middle;
    }
    /*忘记密码*/
    .find {
      display: inline-block;
    }
    .text {
      color: #666;
      font-size: 1.2rem;
      letter-spacing: 1px;
    }
  }
  .login-WeChat {
    // position: absolute;
    // bottom: 15.3rem;
    padding: 28% 0 4%;
    width: 100%;
    text-align: center;
    line-height: 3rem;
    color: #999;
    cursor: pointer;
    img {
      width: 3rem;
      margin-right: 0.6rem;
      vertical-align: top;
    }
    a {
      font-size: 1.5rem;
      color: $themeRed;
    }
  }
  .footer {
    // position: absolute;
    width: 100%; // bottom: 4rem;
    text-align: center;
    .out-text {
      font-size: 1.2rem;
      color: #999;
      .text {
        // color: $themeRed;
        color: #999;
      }
    }
  }
}
</style>
