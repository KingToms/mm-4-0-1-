<template>
  <div class="bingding">
    <l-Header :title="title" :regShow="regShow"></l-Header>
    <div class="authLogin">
      <div class="title-box">
        <p class="title">您的微信账号 {{weChatName}} 通过验证</p>
        <p class="tips">绑定手机号码，可同步第三方账号与手机号信息。</p>
      </div>
      <div class="mobile">
        <div class="input-mobile">
          <input type="tel" name="mobile" class="tel" maxlength="11" v-model="mobile" placeholder="请输入手机号" autocomplete="off" @focus="setIconShow('tel')" @blur="setIconHide">
          <i class="icon-delete" v-show="iconShow=='tel'" @click="resetText('tel')"></i>
        </div>
        <div class="btn">
          <input type="button" value="获取验证码" @click="sendCode" id="sendCode">
        </div>
      </div>
      <div class="code">
        <input type="number" v-model="code" class="number" name="code" placeholder="请输入验证码" autocomplete="off" @focus="setIconShow('number')"  @blur="setIconHide">
        <i class="icon-delete" v-show="iconShow=='number'" @click="resetText('number')"></i> 
      </div>
    </div>
    <div class="login-container">
      <input type="button" value="绑定手机号" @click="codeLogin">
    </div>
  </div>
</template>
<script>
import lHeader from './children/loginHeader'
import {getCode,authLogin,WechatCode,WechatLogin} from '../../service/getData.js'
import common from '../../common/common.js'
import {setStore,getStore} from '../../common/store.js'
import keyConf from '../../common/keyConf.js'
export default {
  name: "Binding",
  data () {
    return {
      title: '绑定手机号',
      regShow: false,
      weChatName: '', // 微信号--名称

      countdown: 60,
      mobile: '',
      code: '',
      plid: '', //推广链接表ID
      iconShow: '',
      _self: this,
    };
  },
  created() {
    this.weChatName = getStore('WeChatNickname');
    if (this.$route.query.code) { // 已微信授权
      this.WechatLogin(this.$route.query.code); // 微信登录
    }
  },
  methods: {
    // 发送验证码
    async sendCode () {
      if(this.mobile.length<11){
        alert('手机格式不正确')
        return
      }
      this.countdown = 60
      common.settime($(this.$el.querySelector("#sendCode")),this.countdown)
      let res = await getCode({mobile: this.mobile, type: 1})
      if(res.status != 'ok'){
        alert(res.msg)
      }
    },
    // 验证码登录
    async codeLogin () {
      this.plid = common.getQueryString("plid") ? common.getQueryString("plid") : "";
      let result = await authLogin({mobile: this.mobile,code: this.code, plid: this.plid})
      if(result.status == 'ok'){
        $.cookie(keyConf.qm_cookie, this.mobile, {expires:1, path: '/'})
        setStore(keyConf.userMoile, this.mobile)
        /*微信登录*/
        this.funGetWechatCode();
      }else{
        alert(result.msg)
      }
    },
    // 清空输入内容
    resetText (_self) {
      let $input = $(this.$el.querySelector('.'+_self))
      $input.val('')
       if($input.prop('type')==='tel'){
         this.mobile=''
       }else{
         this.code=''
       }
    },
    // 显示对应的清空按钮
    setIconShow(choose){
      let self = this
      setTimeout(function() {
        self.iconShow = choose
      }, 300)
    },
    // 隐藏对应的清空按钮
    setIconHide () {
      let self = this;
      setTimeout(function() {
        self.iconShow = ''
      }, 300)
    },

    // 获取微信客户端code
    async funGetWechatCode () {
      // 获取微信code
      let res = await WechatCode({redirectURI: location.href});
      if (res.status === 'ok') {
        let code = this.$route.query.code || '';
        if (code){ // 微信授权成功
          alert(code);
          this.WechatLogin(code);
        }else {
          alert(res.url);
          location.href = res.url;
        }
        
      }
    },
    // 微信客户端code登录
    async WechatLogin (code) {
      let res = await WechatLogin({code: code, type: 'bind'});
      if(res.status == 'ok'){ // 微信登录成功
        console.log('微信登录成功:',res);
        if(this.$route.query.url){
          this.$router.push(this.$route.query.url)
        }else{
          this.$router.push('/usercenter')
        }
      }else {
        alert(res.msg);
      }
    },
  },
  components: {
    lHeader,
  },
}
</script>
<style lang="scss" scoped>
@import '../../assets/css/mixin.scss';
.bingding {
  .authLogin{
    width: 100%;
    overflow: hidden;
    // margin-top: 3rem;
    .title-box {
      margin-top: 2.5rem;
      padding: 0 2.5rem;
      .title {
        line-height: 1.8rem;
        font-size: 1.5rem;
        color: #000;
        padding-bottom: 1.2rem;
      }
      .tips {
        line-height: 1.2rem;
        font-size: 1.2rem;
        color: #999;
      }
    }
    .mobile{
      position: relative;
      padding: 0 2.5rem;
      .help.is-danger{
        font-size:.75rem;
        color: #f00;
      }
      .input-mobile{
        // padding-right: 40%;
        input.tel {
          padding-right: 40%;
        }
        .icon-delete{
          top: 1.2rem;
          right: 40%;
        }
      }
      
      input[type=tel],input[type=tel]:-webkit-autofill{
        @include wh(100%, 5rem);
        // background-image: url('../../assets/image/icon/login/icon_user.png');
      }
      input[type=button]{
        position: absolute;
        top: 0;
        right: 2.5rem;
        @include wh(30%, 5rem);
        background-color: transparent;
        text-align: center;
        font-size: 1.5rem;
        font-weight: 300;
        letter-spacing: 1px;
        border-radius: 0.4rem;
        color: #666;
      }
    }
    .code{
      padding: 0 2.5rem;
      input[type=number]{
        @include wh(100%, 5rem);
        // background-image: url('../../assets/image/icon/login/icon_code.png');
      }
      .icon-delete{
        top: 1.2rem;
        right: 2.5rem;
      }
      
    }
    .mobile,.code{
      width: 100%;
      box-sizing: border-box;
      margin-top: 1.2rem;
      input[type=tel],input[type=number]{
        box-sizing: border-box;
        // padding-left: 3.75rem;
        font-size: 1.5rem;
        letter-spacing: 1px;
        color: #000;
        border-bottom: 1px solid #999;
        background-size: 1.7rem 1.9rem;
        background-position:1.2rem 1.25rem;
        background-repeat: no-repeat;
      }
    }
    .input-mobile,.code{
      position: relative;
      box-sizing: border-box;
      .icon-delete{
        position: absolute;
        @include wh(0.8rem,0.8rem);
        margin: 0.7rem;
        background-image: url('../../assets/image/icon/login/icon_delete.png');
        background-size: 0.8rem 0.8rem;
      }
    }
  }

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
}

</style>