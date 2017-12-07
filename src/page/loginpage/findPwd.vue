<template>
  <div class="find-pwd">
    <l-Header :title="title" :regShow="regShow"></l-Header>
    <!--<auth-Login v-show="!show"></auth-Login>-->
     <!--v-show="!show"-->
    <div class="authLogin" v-show="!show">
      <div class="title-box">
        <p class="title">忘记密码</p>
      </div>
      <div class="mobile">
        <div class="input-mobile">
          <input type="tel" name="mobile" class="tel" v-model="mobile" placeholder="请输入手机号" autocomplete="off" @focus="setIconShow('tel')" @blur="setIconHide">
          <i class="icon-delete" v-show="iconShow=='tel'" @click="resetText('.tel')"></i>
          <!--@focus="isDelete=!isDelete" @blur="isDelete=!isDelete" :class="{'delete':isDelete}"-->
        </div>
        <!--数据验证-->
        <!-- v-validate="'required|mobile'" :class="{'input': true, 'is-danger': errors.has('mobile') }" 
        <span v-show="errors.has('mobile')" class="help is-danger">{{ errors.first('mobile') }}</span>-->
        <div class="btn">
          <input type="button" value="获取验证码" @click="sendCode" id="sendCode">
        </div>
      </div>
      <div class="code">
        <input type="number" v-model="code" class="number" name="code" placeholder="请输入验证码" autocomplete="off" @focus="setIconShow('number')"  @blur="setIconHide">
        <i class="icon-delete" v-show="iconShow=='number'" @click="resetText('.number')"></i> 
      </div>
      <div class="find-container">
        <input type="button" value="下一步" @click="nextStep">
      </div>
  </div>
    <!--重置密码  v-show="show"-->
    <div class="reset-pwd" v-show="show">
      <div class="title-box">
        <p class="title">设置密码</p>
      </div>
      <div class="password">
        <div class="pwd">
          <input type="password" name="pwd" class="newpwd" v-model="pwd" placeholder="请设置新密码（最少6位,数字+字母）" @focus="setIconShow('newpwd')" @blur="setIconHide">
          <i class="icon-delete" v-show="iconShow=='newpwd'" @click="resetText('input.newpwd')"></i>
        </div>
        <div class="pwd">
          <input type="password" name="pwd" class="repwd" v-model="repwd" placeholder="请确认新密码" @focus="setIconShow('repwd')" @blur="confirmPwd">
          <i class="icon-delete" v-show="iconShow=='repwd'" @click="resetText('input.repwd')"></i>
        </div>
      </div>
      <div class="confirm">
        <input type="button" value="确定" @click="resetPwd">
      </div>
    </div>
    <alert-tip :alertText="alertText" v-if="alertShow"  @closeTip="closeTip"></alert-tip>
    <toast :showText="showText" ref="toast"></toast>
  </div>
</template>
<script>
import lHeader from './children/loginHeader'
import alertTip from '../../components/common/alertTip'
// import authLogin from './children/authLogin'
import common from '../../common/common.js'
import {getCode,authCode,resetPwd} from '../../service/getData.js'
export default {
  name: 'findPwd',
  data () {
    return {
      mobile: '',
      code: '',
      pwd: '',
      repwd: '',
      // title: '忘记密码',
      alertText: '',
      showText: '密码修改成功',
      show: false,
      iconShow:false,
      isCompare: false,
      alertShow: false,
      regShow: false,
    }
  },
  props:{
    title:{
      default: '',
      type: String
    }
  },
  components: {
    lHeader,
    alertTip
  },
  methods: {
    async sendCode (){
      if(this.mobile.length < 11){
        alert('手机格式不正确');
        return
      }

      this.countdown=60
      common.settime($(this.$el.querySelector("#sendCode")),this.countdown)
      let res
      try {
        res = await getCode({mobile: this.mobile})
        // alert(res)
      } catch (err) {
        alert(err)
      }
      this.alertText=res.msg
      this.alertShow = true
    },
    async authCode(){
      let res = await authCode({mobile:this.mobile,code:this.code})
      if(res.status === 'ok'){
        this.show=true
      }else{
        alert(res.msg)
      }
    },
    async resetPwd () {
      let res = await resetPwd({mobile: this.mobile, pass_1: this.pwd, pass_2: this.repwd})
      if(res.status === 'ok'){
        alert(res.msg)
        this.$router.push({name:'login'})
      }else{
        alert(res.msg)
      }
      
    },
    nextStep (){
      this.authCode()
    },
    confirmPwd () {
      if(this.pwd !== this.repwd){
        this.alertText='两次密码不一致'
        this.alertShow = true
      }
      
      this.setIconHide()
    },
    
    closeTip () {
      this.alertShow = false
    },
    resetText (_self) {
      let $input = $(this.$el.querySelector(_self))
      console.log($input)
      console.log($input.hasClass('newpwd'))
      $input.val('')
       if($input.prop('type')==='tel'){
         this.mobile = ''
       }else if($input.prop('type')==='number'){
         this.code = ''
       }else if($input.prop('type')==='password' && $input.hasClass('newpwd')){
         this.pwd = ''
       }else{
         this.repwd = ''
       }
    },
    setIconShow (choose){
      let self = this
      setTimeout(function() {
        self.iconShow = choose
      }, 300)
    },
    setIconHide () {
      let self = this;
      setTimeout(function() {
        self.iconShow = ''
      }, 300)
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../assets/css/mixin.scss';
.find-pwd{
  position: relative;
  height: 100%;
  .find-container{
    @include wh(100%, 4.4rem);
    padding: 0 2.5rem;
    margin-top: 3rem;
    cursor: pointer;
    input[type=button]{
      @include wh(100%,100%);
      background-color: $themeRed;
      font-size: 1.5rem;
      color: $bgWhite;
      letter-spacing: 2px;
      border-radius: .25rem;
    }
  }
  .authLogin{
    width: 100%;
    overflow: hidden;
    // margin-top: 3rem;
    .title-box {
      margin-top: 2rem;
      padding: 0 2.5rem;
      .title {
        line-height: 2.4rem;
        font-size: 2.4rem;
        color: #000;
        padding-bottom: 0.3rem;
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
          top: 1.5rem;
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
      padding: 0px 2.5rem;
      input[type=number]{
        @include wh(100%, 5rem);
        // background-image: url('../../assets/image/icon/login/icon_code.png');
      }
      .icon-delete{
        top: 1.5rem;
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
        color: $bgBlack;
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
  .reset-pwd{
    .title-box {
      margin-top: 2rem;
      padding: 0 2.5rem;
      .title {
        line-height: 2.4rem;
        font-size: 2.4rem;
        color: #000;
        padding-bottom: 0.3rem;
      }
    }
    .password{
      width: 100%;
      overflow: hidden;
      // margin-top: 3rem;
      .pwd{
        width: 100%;
        padding: 0px 2.5rem;
        box-sizing: border-box;
        margin-top: 1.2rem;
        input[type=password]{
          @include wh(100%, 5rem);
          // padding-left: 4.75rem;
          font-size: 1.5rem;
          letter-spacing: 2px;
          color: #999;
          border-bottom: 1px solid #999;
          background-size: 1.7rem 1.9rem;
          background-position:1.2rem 1.25rem;
          background-repeat: no-repeat;
        }
      }
      .pwd{
        position: relative;
        box-sizing: border-box;
      .icon-delete{
        position: absolute;
        top: 1.5rem;
        right: 2.5rem;
        @include wh(0.8rem,0.8rem);
        margin: 0.7rem;
        background-image: url('../../assets/image/icon/login/icon_delete.png');
        background-size: 0.8rem 0.8rem;
      }
      }
      .pwd{
        input[type=password]{
          // background-image: url('../../assets/image/icon/login/icon_password.png');
        }
      }
    }
    .confirm{
      @include wh(100%, 4.4rem);
      padding: 0 2.5rem;
      margin-top: 3rem;
      input[type=button]{
        @include wh(100%,100%);
        background-color: $themeRed;
        font-size: 1.5rem;
        color: $bgWhite;
        letter-spacing: 2px;
        border-radius: .25rem;
      }
    }
  }
}
</style>