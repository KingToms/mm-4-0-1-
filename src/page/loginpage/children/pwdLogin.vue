<template>
  <div class="pwdLogin">
    <div class="mobile">
      <input type="tel" name="mobile" class="tel" v-model="mobile" autocomplete="off" placeholder="请输入手机号码" @focus="setIcomShowTel" @blur="setIconHide">
      <i class="icon-delete" v-show="iconShow=='tel'" @click="resetText('tel')"></i>
    </div>
    <div class="pwd">
      <input type="password" class="password" name="pwd" v-model="pwd" placeholder="请输入您的密码"   @focus="setIcomShowPwd"   @blur="setIconHide">
      <i class="icon-delete"  v-show="iconShow=='password'" @click="resetText('password')"></i> 
    </div>
    <alert-tip :alertText="alertText" v-if="alertShow"  @closeTip="closeTip"></alert-tip>
  </div>
</template>
<script>
import alertTip from '../../../components/common/alertTip'
import {pwdlogin} from '../../../service/getData.js'
import {setStore} from '../../../common/store.js'
import keyConf from '../../../common/keyConf.js'
export default {
  name: 'pwdLogin',
  data () {
    return {
      mobile: '',
      pwd: '',
      iconShow: '',
      alertShow: false,
      alertText: ''
    }
  },
  props:['channel','from'],
  components:{
    alertTip
  },
  created () {
    this.$on('pwdLogin',this.pwdLogin)
  },
  methods: {
    async pwdLogin (){
      let res = await pwdlogin({mobile: String.trim(this.mobile), password: this.pwd, plid: this.channel, from: this.from})
      if(res.status == 'ok'){
        $.cookie(keyConf.qm_cookie, this.mobile,{expires:1, path: '/'})
        setStore(keyConf.userMoile, this.mobile)
        if(this.$route.query.url){
          this.$router.push(this.$route.query.url)
        }else{
          this.$router.push('/usercenter')
        }
      }else{
        alert(res.msg)
      }
    },
    resetText (_self) {
      let $input = $(this.$el.querySelector('.'+_self))
      $input.val('')
       if($input.prop('type')==='tel'){
         this.mobile=''
       }else{
         this.pwd=''
       }
    },
    closeTip () {
      this.alertShow = false
    },
    setIcomShowTel (){
      let self = this
      setTimeout(function() {
        self.iconShow = 'tel'
      }, 300)
    },
    setIcomShowPwd (){
      let self = this
      setTimeout(function() {
        self.iconShow = 'password'
      }, 300)
    },
    setIconHide () {
      let self = this;
      setTimeout(function() {
        self.iconShow = ''
      }, 300);
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../../assets/css/mixin.scss';

.pwdLogin{
  width: 100%;
  overflow: hidden;
  margin-top: 3rem;
  .mobile{
    input[type=tel]{
      background-image: url('../../../assets/image/icon/login/icon_user.png');
    }
  }
  .pwd{
    input[type=password]{
      background-image: url('../../../assets/image/icon/login/icon_password.png');
    }
  }
  .mobile,.pwd{
    position: relative;
    width: 100%;
    padding: 0px 1.5625rem;
    box-sizing: border-box;
    margin-bottom:2.75rem;
    input[type=tel],input[type=password]{
      @include wh(100%,4.4rem);
      padding-left:3.75rem;
      font-size: 1.5rem;
      letter-spacing: 2px;
      color: #000;
      // background-color: #F5F5F5;
      border-bottom: 1px solid #999;
      // @include border_2(#999);
      background-size: 1.7rem 1.9rem;
      background-position:1.2rem 1.25rem;
      background-repeat: no-repeat;
    }
    i.icon-delete{
      position: absolute;
      top: 1.5rem;
      right: 1.5rem;
      @include wh(1.4rem,1.4rem);
      background-image: url('../../../assets/image/icon/login/icon_delete.png');
      background-size: 1.4rem 1.4rem;
    }
  }
}
</style>
