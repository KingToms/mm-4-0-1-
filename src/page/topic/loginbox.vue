<template>
  <transition name="fade">
    <section class="cd-user-modal" v-if="isShow" @click.self="isShow = false">
      <div class="cd-user-modal-container">
        <ul class="cd-switcher">
          <li><a class="title" href="#0">快捷登录</a></li>
          <!--<li><a href="#0">注册新用户</a></li>-->
          <img class="close-box" @click="loginboxHide" src="../../assets/image/icon/login/cash_icon_close.png" alt="">
        </ul>

        <!-- 登录表单 -->
        <div id="cd-login">
          <form class="cd-form">
            <div class="mobile">
              <div class="input-mobile">
                <input type="tel" class="tel" v-model="mobile" @focus="setIconShow('tel')" @blur="setIconHide" placeholder="请输入手机号码" autocomplete="off" maxlength="11">
                <i class="icon-delete" v-show="iconShow=='tel'" @click="resetText('tel')"></i>
              </div>
            </div>

            <div class="code">
              <input type="number" v-model="code" class="number" name="code" @focus="setIconShow('number')" @blur="setIconHide" placeholder="请输入验证码" autocomplete="off" maxlength="6">
              <i class="icon-delete" v-show="iconShow=='number'" @click="resetText('number')"></i>
              <div class="btn">
                <input type="button" value="发送验证码" @click="sendCode" id="sendCode">
              </div>
            </div>
          </form>
        </div> 

        <!-- 注册表单 -->
        <!--<div id="cd-signup">
          <form class="cd-form">
          </form>
        </div>-->
        <div class="login-container">
          <input type="button" value="登录" @click="codeLogin">
        </div>

      </div>
    </section>
  </transition>
</template>
<script>
import { Toast } from 'mint-ui';
import '../../../node_modules/mint-ui/lib/toast/style.css'
import {getCode,authLogin} from '../../service/getData.js'
import common from '../../common/common.js'
import {setStore} from '../../common/store.js'
import keyConf from '../../common/keyConf.js'
export default {
  name: "loginbox",
  data () {
    return {
      countdown: 60,
      mobile: '',
      code: '',
      plid: '', //推广链接表ID
      iconShow: '',
      isShow: true,
    };
  },
  methods: {
    // 获取短信验证码
    async sendCode () {
      if(this.mobile.length < 11){
        alert('手机格式不正确');
        return
      }
      this.countdown = 60
      common.settime($(this.$el.querySelector("#sendCode")),this.countdown);
      let res = await getCode({mobile: this.mobile, type: 1})
      if(res.status != 'ok'){
        alert(res.msg);
      }
    },

    // 验证码登录
    async codeLogin () {
      this.plid = common.getQueryString("plid") ? common.getQueryString("plid") : "";
      let result = await authLogin({mobile: this.mobile,code: this.code,plid: this.plid})
      if(result.status == 'ok'){
        $.cookie(keyConf.qm_cookie, this.mobile, {expires:1, path: '/'})
        setStore(keyConf.userMoile, this.mobile)
        
        Toast({
          message: result.msg,
          duration: 700,
          className: 'toast-tip'
        });
        // 隐藏弹框
        let self = this;
        setTimeout(function(){
          self.isShow = false;
        },1200);
      }else{
        alert(result.msg);
      }
    },

    // 显示删除按钮
    setIconShow(choose){
      let self = this
      setTimeout(function() {
        self.iconShow = choose;
      }, 300)
    },
    // 隐藏删除按钮
    setIconHide () {
      let self = this;
      setTimeout(function() {
        self.iconShow = '';
      }, 300)
    },
    // 点击删除按钮，清空输入内容
    resetText (_self) {
      let $input = $(this.$el.querySelector('.'+_self))
      $input.val('')
       if($input.prop('type')==='tel'){
         this.mobile=''
       }else{
         this.code=''
       }
    },

    // 隐藏弹框
    loginboxHide () {
      this.isShow = false;
    },
  },
  components: {
  },
}
</script>
<style lang="scss" scoped>
@import '../../assets/css/mixin.scss';
.cd-user-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(52, 54, 66, 0.7);
  z-index: 3;
  overflow-y: auto;
  opacity: 1;
  -webkit-transition: opacity 0.3s 0, visibility 0 0.3s;
  -moz-transition: opacity 0.3s 0, visibility 0 0.3s;
  transition: opacity 0.3s 0, visibility 0 0.3s;
  .cd-user-modal-container {
    margin: 0 auto;
    margin-top: 36%;
    padding-bottom: 3rem;
    width: 80%;
    border-radius: 0.8rem;
    background-color: #fff;
    .cd-switcher {
      width: 100%;
      height: 4rem;
      position: relative;
      line-height: 4rem;
      text-align: center;
      border-bottom: .05rem solid #ddd;
      li {
        text-align: center;
        .title {
          font-size: 1.8rem;
          color: #000;
          letter-spacing: 1px;
        }
      }
      .close-box {
        display: block;
        position: absolute;
        top: 0;
        right: 0;
        @include wh(2rem,2rem);
        padding: 1rem;
        cursor: pointer;
      }
    }
    #cd-login {
      width: 100%;
      padding-top: 1.8rem;
      .mobile{
        width: 100%;
        margin-bottom: 2.5rem;
        position: relative;
        padding: 0px 1.2rem;
        .input-mobile{
          .icon-delete{
            top: 1.5rem;
            right: 1rem;
          }
        }
        
        input[type=tel],input[type=tel]:-webkit-autofill{
          @include wh(100%,4.4rem);
          background-image: url('../../assets/image/icon/login/icon_user.png');
        }
      }
      .code{
        padding: 0px 1.2rem;
        padding-right: 40%;
        input[type=number]{
          @include wh(100%,4.4rem);
          background-image: url('../../assets/image/icon/login/icon_code.png');
        }
        .icon-delete{
          top: 1.5rem;
          right: 41%;
        }
        input[type=button]{
          position: absolute;
          top: 0.5rem;
          right: 1rem;
          padding: 0 0.4rem;
          width: 34%;
          height: 3.5rem;
          background-color: $themeRed;
          text-align: center;
          font-size: 1.5rem;
          font-weight: 300;
          letter-spacing: 1px;
          border-radius: 4rem;
          color: $bgWhite;
          cursor: pointer;
        }
        
      }
      .mobile,.code{
        width: 100%;
        margin-bottom: 2rem;
        input[type=tel],input[type=number]{
          padding-left: 2.8rem;
          font-size: 1.5rem;
          letter-spacing: 1px;
          color: #000;
          border-bottom: 1px solid #999;
          background-size: 1.7rem 1.9rem;
          background-position: 0.5rem 1.25rem;
          background-repeat: no-repeat;
        }
      }
      .input-mobile,.code{
        position: relative;
        .icon-delete{
          position: absolute;
          @include wh(1.4rem,1.4rem);
          background-image: url('../../assets/image/icon/login/icon_delete.png');
          background-size: 1.4rem 1.4rem;
        }
      }
    }
    /*登录*/
    .login-container {
      width: 100%;
      height: 4.4rem;
      line-height: 4.4rem;
      padding: 0 1.5625rem;
      input {
        cursor: pointer;
        width: 100%;
        height: 4.4rem;
        background-color: $themeRed;
        font-size: 1.5rem;
        color: #fff;
        letter-spacing: 2px;
        border-radius: 4rem;
      }
    }
  }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */ {
  opacity: 0
}
</style>