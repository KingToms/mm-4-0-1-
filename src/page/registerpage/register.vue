<template>
  <div class="register">
   <l-Header :regShow="regShow"></l-Header>
   <div class="content">
     <div class="title-box">
        <p class="title">注册账号</p>
     </div>
     <ul>
       <li>
         <div>
           <i></i>
           <input type="tel" placeholder="请输入手机号" class="mobile tel" maxlength="11" v-model="mobile"  @blur="setIconHide" @focus="setIconShow('tel')">
           <b class="icon-delete" v-show="iconShow=='tel'" @click="resetText('tel')"></b>
         </div>
         <input type="button" value="获取验证码" class="qcord" @click="sendCode" id="sendCode">
       </li>
       <li>
         <i></i>
         <input type="number" placeholder="请输入验证码" v-model="code" class="number" name="code" @focus="setIconShow('number')" @blur="setIconHide">
         <b class="icon-delete" v-show="iconShow=='number'" @click="resetText('number')"></b>
       </li>
       <li>
         <i></i>
         <input type="password" placeholder="请设置6位密码" class="password" v-model="pwd" @focus="setIconShow('password')" @blur="setIconHide">
         <b class="icon-delete" v-show="iconShow=='password'" @click="resetText('password')"></b>
       </li>
     </ul>
     <button class="submit" @click="register">注册</button>
     <div class="login-box">
       <router-link :to="`/login?plid=${$route.query.plid}&url=${$route.query.url}`" class="login" v-if="$route.query.url">马上登录</router-link>
       <router-link to="/login" class="login" v-else>马上登录</router-link>
     </div>
     <div class="login-WeChat">
       <span @click="funGetWechatCode">
        <img src="../../assets/image/icon/login/login_icon_WeChat.png" alt="微信登录">
        微信登录
       </span>
     </div>
     <div class="footer">
       <span class="out-text">“登录/注册”即代表同意
         <router-link to="/statement" class="text">《俏猫用户协议》</router-link>
       </span>
     </div>
   </div>
    <!-- <toast ref="toast"  :showText="showText"></toast> -->
    <!-- <alert-tip v-if="showAlert" :showHide="showAlert" @closeTip="closeTip" :alertText="alertText"></alert-tip> -->
  </div>
</template>
<script>
  import alertTip from '@/components/common/alertTip'
  import toast from '@/components/common/toast'
  import lHeader from '../loginpage/children/loginHeader.vue'
  import common from '../../common/common'
  import keyConf from '../../common/keyConf'
  import { setStore } from '../../common/store'
  import {getCode, authMobile, register, WechatCode, WechatLogin} from '@/service/getData.js'
  export default {
    name: 'register',
    data () {
      return {
        countdown: 60,
        mobile: '',
        pwd: '',
        code: '',
        plid: '', //推广链接表ID
        showAlert: false, //显示提示组件
        alertText: null, //提示的内容
        showText: null,
        title: "注册",
        regShow: false, // 顶部标题栏不显示“注册”按钮
        isDelete: '',
        iconShow: '',
        _self: this,
      }
    },
    created() {
      if (this.$route.query.code) { // 已微信授权
        alert("有code");
        this.WechatLogin(this.$route.query.code); // 微信登录
      }
    },
    methods: {
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
      async authMobile (){
        let result = await authMobile(this.mobile)
        if(result.status != 'ok') {
          this.showAlert = true
          this.alertText = result.msg
        }
      },
      async register () {
        if(!/^1[34578]\d{9}$/.test(this.mobile)){
          alert('手机号码不正确');
          return
        }
        if(this.code.length == 0){
          alert('验证码不能为空');
          return
        }

        if(this.pwd.length<6){
          alert('密码长度不能小于6位');
          return
        }
        /*if(!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,15}$/.test(this.pwd)){
          alert('请设置正确密码（最少6位，数字+字母）');
          return
        }*/

        this.plid = common.getQueryString("plid") ? common.getQueryString("plid") : "";
        let result = await register({mobile: this.mobile, password: this.pwd, code: this.code,from: 3,plid: this.plid})

        if(result.status == 'ok'){
          alert('注册成功')
          if(this.$route.query.url){ // 一般从专题进来，返回原来的入口页面
            this.$router.push(this.$route.query.url)
          }else{
            this.$router.push('/login')
          }
        }
        else
          alert(result.msg)
      },
      closeTip(){
        this.showAlert = false
      },
      resetText (_self) {
        let $input = $(document.querySelector('.'+_self));
        $input.val('');
        self.iconShow = '';
        if($input.prop('type')==='tel'){
          this.mobile=''
        }else if($input.prop('type')==='number'){
          this.code=''
        }else{
          this.pwd=''
        }
      },
      setIconShow (_choose){
        let self = this
        setTimeout(function() {
          self.iconShow = _choose
        }, 300)
      },
      setIconHide () {
        let self = this;
        setTimeout(function() {
          self.iconShow = ''
        }, 300)
      },

      // 获取微信客户端code
      async funGetWechatCode () {
        // 获取微信codeURL
        let res = await WechatCode({redirectURI: location.href});
        alert(location.href);
        if (res.status === 'ok') {
          // 判断url是否有code
          let code = this.$route.query.code || '';
          if (code){
            // 微信尝试授权
            alert("授权成功：",res.url);
            this.WechatLogin(code);
          }else {
            // 微信登录，获取微信code
            alert("未授权：",res.url);
            location.href = res.url;
          }
          
        }
      },
      // 微信客户端code登录
      async WechatLogin (code) {
        let res = await WechatLogin({code: code});
        if(res.status == 'ok'){ // 微信登录成功
          $.cookie(keyConf.qm_cookie, res.data.mobile,{expires:1, path: '/'})
          setStore(keyConf.userMoile, res.data.mobile)
          alert(this.$route.query.url);
          if(this.$route.query.url){
            this.$router.push(this.$route.query.url)
          }else{
            //this.$router.push('/usercenter')
          }
        }else if(res.status == 'error' && res.code == '1'){ // 跳到绑定手机号
          console.log('未绑定手机号：',res);
          setStore('WeChatNickname', res.data.nickname);
          let targetUrl = this.$route.query.url ? `/binding?plid=${this.plid}&url=${this.$route.query.url}` : `/binding?plid=${this.plid}`;
          this.$router.push(targetUrl);
        }else {
          alert(res.msg);
        }
      },

    },
    components: {
      alertTip,
      lHeader,
      toast

    }
  }
</script>
<style lang="scss" scoped>
  @import '../../assets/css/mixin.scss';
  .register{
    max-width: 37.5rem;
    height: 100%;
    margin:0 auto;
    .content{
      padding:0 2.5rem;
      .title-box {
        margin-top: 2rem;
        .title {
          line-height: 2.4rem;
          font-size: 2.4rem;
          color: #000;
          padding-bottom: 0.3rem;
        }
      }
    }
    @include bgColor(#fff);
    input{
      outline: 0 none;
      border: 0 none;
      font-size: 1.5rem;
      height: 100%;
      width: 100%;
      // padding-left: 4rem;
      border-bottom: 1px solid #999;
    }
    li{
      width: 100%;
      height: 5rem;
      margin-top: 1.2rem;
      position: relative;
      div{
        position: relative;
        // width: 65%;
        width: 100%;
        float: left;
        height: 5rem;
        input {
          padding-right: 40%;
        }
        .icon-delete{
          right: 40%;
        }
      }
      i{
        position: absolute;
        width: 2rem;
        height: 2.3rem;
        left: 0.9rem;
        top: 1.2rem;
      }
      .icon-delete{
        position: absolute;
        @include wh(0.8rem,0.8rem);
        margin: 0.7rem;
        background-image: url('../../assets/image/icon/login/icon_delete.png');
        background-size: 0.8rem 0.8rem;
        top: 1.5rem;
        right: 1rem;
      }
    }
    ul{
      // margin-top:3rem;
      li:first-child>div>i{
        // background: url("../../assets/image/icon/login/icon_user.png") no-repeat center;
        background-size: cover;
      }
      li:nth-child(2)>i{
        // background: url("../../assets/image/icon/login/icon_code.png") no-repeat center;
        background-size: cover;
      }
      li:nth-child(3)>i{
        // background: url("../../assets/image/icon/login/icon_password.png") no-repeat center;
        background-size: cover;
      }
      li:first-child{
        .qcord{
          width: 40%;
          // float: right;
          // @include bgColor($themeRed);
          position: absolute;
          top: 0;
          right: 0;
          border-bottom: 0 none;
          text-align: center;
          background-color: transparent;
          padding: 0;
          @include borderRadius(0.5rem);
          color: #666;
          cursor: pointer;
        }
      }
    }
    /*注册*/
    .submit{
      margin-top: 3rem;
      margin-bottom: 2rem;
      display:block;
      @include wh(100%, 4.4rem);
      @include bgColor($themeRed);
      @include borderRadius(0.4rem);
      font-size: 1.5rem;
      color: $bgWhite;
      cursor: pointer;
    }
    /*马上登陆*/
    .login-box {
      padding: 0 2.5rem;
      text-align: center;
      font-size: 0;
      padding-bottom: 28%;
      .login {
        color: #666;
        font-size: 1.2rem;
        letter-spacing: 1px;
      }
    }
    .login-WeChat {
      width: 100%;
      text-align: center;
      line-height: 3rem;
      color: #999;
      img {
        width: 3rem;
        margin-right: 0.6rem;
        vertical-align: top;
      }
      a,span {
        display: inline-block;
        font-size: 1.2rem;
        color: #999;
        line-height: 2.5rem;
        cursor: pointer;
      }
    }
    .footer {
      // position: absolute;
      // bottom: 4rem;
      width: 100%;
      text-align: center;
      padding-top: 4%;
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
