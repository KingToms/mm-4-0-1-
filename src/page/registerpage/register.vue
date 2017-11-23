<template>
  <div class="register">
    <l-Header :title="title"></l-Header>
   <div class="content">
     <ul>
       <li>
         <div>
           <i></i>
           <input type="tel" placeholder="请输入手机号码" class="mobile tel" v-model="mobile"  @blur="setIconHide"  @focus="setIconShow('tel')">
           <b class="icon-delete" v-show="iconShow=='tel'" @click="resetText('tel')"></b>
         </div>
         <input type="button" value="发送验证码" class="qcord" @click="sendCode" id="sendCode">
       </li>
       <li>
         <i></i>
         <input type="number" placeholder="请输入验证码"  v-model="code" class="number" name="code" @focus="setIconShow('number')" @blur="setIconHide">
         <b class="icon-delete" v-show="iconShow=='number'" @click="resetText('number')"></b>
       </li>
       <li>
         <i></i>
         <input type="password" placeholder="请设置登录密码" class="password" v-model="pwd" @focus="setIconShow('password')" @blur="setIconHide">
         <b class="icon-delete" v-show="iconShow=='password'" @click="resetText('password')"></b>
       </li>
     </ul>
     <button class="submit" @click="register">注册</button>
     <router-link to="/login" class="login">马上登录</router-link>
     <p class="agree">"登录/注册"即表示您同意 <router-link to="/statement">《俏猫用户协议》</router-link></p>
   </div>
    <!-- <toast ref="toast"  :showText="showText"></toast> -->
    <!-- <alert-tip v-if="showAlert" :showHide="showAlert" @closeTip="closeTip" :alertText="alertText"></alert-tip> -->
  </div>
</template>
<script>
  import alertTip from '@/components/common/alertTip'
  import toast from '@/components/common/toast'
  import lHeader from '../../components/common/lHeader'
  import common from '../../common/common'
  import {getCode, authMobile, register} from '@/service/getData.js'
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
        title:"注册",
        isDelete: '',
        iconShow: '',
        _self: this
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
      }
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
      padding:0 2.5rem ;
    }
    @include bgColor(#fff);
    input{
      outline: 0 none;
      border: 0 none;
      font-size: 1.5rem;
      height: 100%;
      width: 100%;
      /*line-height: 4.4rem;*/
      padding-left: 4rem;
      border-bottom: 1px solid #999;
    }
    li{
      width: 100%;
      height: 4.4rem;
      margin-bottom:2rem;
      position: relative;
      div{
        position: relative;
        width: 65%;
        float: left;
        height: 4.4rem;
        .icon-delete{
          right: 0rem;
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
        @include wh(1.4rem,1.4rem);
        background-image: url('../../assets/image/icon/login/icon_delete.png');
        background-size: 1.4rem 1.4rem;
        top: 1.5rem;
        right: 1rem;
      }
    }
    ul{
      margin-top:3rem;
      li:first-child>div>i{
        background: url("../../assets/image/icon/login/icon_user.png") no-repeat center;
        background-size: cover;
      }
      li:nth-child(2)>i{
        background: url("../../assets/image/icon/login/icon_code.png") no-repeat center;
        background-size: cover;
      }
      li:nth-child(3)>i{
        background: url("../../assets/image/icon/login/icon_password.png") no-repeat center;
        background-size: cover;
      }
      li:first-child{
        .qcord{
          width: 33%;
          float: right;
          border-bottom: 0 none;
          text-align: center;
          @include bgColor($themeRed);
          padding: 0;
          @include borderRadius(0.5rem);
          color: #fff;
        }
      }
    }

    .submit{
      display:block;
      @include wh(100%,4.4rem);
      @include bgColor($themeRed);
      @include borderRadius(0.7rem);
      font-size: 1.5rem;
      color: $bgWhite;
    }
    .login{
      float: right;
      font-size: 1.2rem;
      margin-top:2rem;
      color:#ff3d00;
    }
    .agree{
      font-size: 1.2rem;
      color: #999;
      padding:14rem 0 2rem;
      text-align: center;
      a{
        color:#ff3d00;
      }
    }

  }
</style>
