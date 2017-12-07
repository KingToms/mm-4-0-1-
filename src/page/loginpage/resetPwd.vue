<template>
  <div class="reset-pwd">
    <l-Header></l-Header>
    <div class="password">
      <div class="pwd">
        <input type="password" name="pwd" v-model="pwd" placeholder="输入新密码" @blur="authPwd">
      </div>
      <div class="pwd">
        <input type="password" name="pwd" v-model="repwd" placeholder="确认新密码" @blur="confirmPwd">
      </div>
    </div>
    <div class="confirm">
      <input type="button" value="确认提交" @click="resetPwd">
    </div>
    <!-- <alert-tip :alertText="alertText" v-if="show"  @closeTip="closeTip"></alert-tip> -->
    <!-- <toast :showText="showText" ref="toast"></toast> -->
  </div>
</template>
<script>
import lHeader from './children/loginHeader'
import alertTip from '../../components/common/alertTip'
import toast from '../../components/common/toast'
import {getStore} from '../../common/store.js'
import keyConf from '../../common/keyConf.js'
import {resetPwd} from '../../service/getData.js'
export default {
  name: 'resetPwd',
  data () {
    return {
      title: '重置密码',
      pwd: '',
      repwd: '',
      alertText: '两次输入密码不一致',
      showText: '密码修改成功',
      show: false
    }
  },
  components: {
    lHeader,
    alertTip,
    toast
  },
  methods: {
    authPwd () {
      if(this.pwd.length < 6 || this.pwd.length > 20)
        alert('密码长度必须在6到20之间')
      
    },
    confirmPwd () {
      if(this.pwd !== this.repwd){
        // this.show = true
        alert('密码不一致');
      }
    },
    async resetPwd () {
      let mobile = getStore(keyConf.userMobile)
      let res = await resetPwd({mobile: mobile, pwd: this.pwd})
      if(res.code === 200){
        this.$refs.toast.$emit('closeToast')
      }
    },
    closeTip () {
      this.show = false
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../assets/css/mixin.scss';
.reset-pwd{
  .password{
    width: 100%;
    overflow: hidden;
    margin-top: 3rem;
    .pwd{
      width: 100%;
      padding: 0px 1.5625rem;
      box-sizing: border-box;
      margin-bottom:2.75rem;
      input[type=password]{
        @include wh(100%,4.4rem);
        padding-left:4.75rem;
        font-size: 1.5rem;
        letter-spacing: 2px;
        color: #999;
        // background-color: #F5F5F5;
        border-bottom: 1px solid #999;
        // @include border_2(#999);
        background-size: 1.7rem 1.9rem;
        background-position:1.2rem 1.25rem;
        background-repeat: no-repeat;
      }
    }
    .pwd{
      input[type=password]{
        background-image: url('../../assets/image/icon/login/icon_password.png');
      }
    }
  }
  .confirm{
    @include wh(100%,4.4rem);
    padding: 0 1.5625rem;
    margin-bottom: 1.25rem;
    input[type=button]{
      @include wh(100%,100%);
      background-color: #ffe500;
      font-size: 1.5rem;
      color: #000;
      letter-spacing: 2px;
      border-radius: .25rem;
    }
  }
}
</style>