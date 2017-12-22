<template>
  <div class="gift-box">
    <section class="receive-box" v-if="!receive_state">
      <!--顶部bannar-->
      <div class="banner">
        <img src="/static/topic/inviteNewUser_2017/invite2_01.jpg" alt="俏猫新人，免费领好礼">
      </div>
      <!--礼品区-->
      <div class="gift-box">
        <div class="gift">
          <img src="/static/topic/inviteNewUser_2017/invite2_02.jpg" alt="玛丽黛佳轻雾感口红">
          <div class="receive" @click="receiveGift('1')"></div>
        </div>
        <div class="gift">
          <img src="/static/topic/inviteNewUser_2017/invite2_03.jpg" alt="柚子舍柚稚园多肽修护原液">
          <div class="receive" @click="receiveGift('2')"></div>
        </div>
        <div class="gift">
          <img src="/static/topic/inviteNewUser_2017/invite2_04.jpg" alt="PBA妆前乳">
          <div class="receive" @click="receiveGift('3')"></div>
        </div>
      </div>
      <!--领取流程-->
      <div class="process">
        <div class="rule-btn" @click="showRule"></div>
        <img src="/static/topic/inviteNewUser_2017/invite2_05.jpg" alt="如何免费领">
        <img src="/static/topic/inviteNewUser_2017/invite2_06.jpg" alt="">
      </div>
      <!--热销推荐-->
      <div class="recommend">
        <img class="top" src="/static/topic/inviteNewUser_2017/invite2_07.jpg" alt="">
      </div>

      <!--活动规则-->
      <div class="activity-rule" v-if="ruleState">
        <div class="rule-box">
          <img class="close" src="/static/topic/inviteNewUser_2017/icon_shut.png" @click="closeRule" alt="关闭">
          <img class="rule_img" src="/static/topic/inviteNewUser_2017/invite2_rule.png" alt="">
        </div>
      </div>
      <!--弹出层登录-->
      <transition name="fade">
        <section class="cd-user-modal" v-if="isShow">
          <div class="cd-user-modal-container">
            <ul class="cd-switcher">
              <!--<li><a class="title" href="#0">快捷登录</a></li>-->
              <img class="close-box" @click="loginboxHide" src="/static/topic/giftGiving_1111/icon_shut.png" alt="">
            </ul>

            <!-- 登录表单 -->
            <div class="login-box">
              <div id="cd-login">
                <form class="cd-form">
                  <div class="mobile">
                    <div class="input-mobile">
                      <input type="tel" class="tel" v-model="mobile" @focus="setIconShow('tel')" @blur="setIconHide" placeholder="请输入手机号码" autofocus autocomplete="off" maxlength="11">
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
              <div class="login-container">
                <input :class="{'logining': login_state}" type="button" v-model="login_con" @click="codeLogin">
              </div>
            </div>
            <div class="get-process">
              <img src="/static/topic/inviteNewUser_2017/invite2_process.png" alt="">
            </div>
          </div>
        </section>
      </transition>
    </section>
    <section class="result-box" v-if="receive_state">
      <div class="notapp-box">
        <div class="content">
          <div class="first-box" v-if="first_state">
            <p>- 领取成功 -</p>
            <p>
              {{pro_name}}
              <span class="txt_bg" v-show="pro_name"></span>
            </p>
          </div>
          <div class="notfirst" v-else>
            <p>你已经领取过了</p>
            <p>
              赶快下单带回家吧
              <span class="notfirst_bg"></span>
            </p>
          </div>
        </div>
        <div class="pro_img">
          <img v-if="pro_id == '1'" src="/static/topic/inviteNewUser_2017/invte2_succeed1.png" alt="">
          <img v-if="pro_id == '2'" src="/static/topic/inviteNewUser_2017/invte2_succeed2.png" alt="">
          <img v-if="pro_id == '3'" src="/static/topic/inviteNewUser_2017/invte2_succeed3.png" alt="">
        </div>
        <p class="tip_txt">下单满39元，即可包邮到家，7天内有效。</p>
        <a class="link-to" href="http://a.app.qq.com/o/simple.jsp?pkgname=com.qiaocat.app&fromcase=40002">立即查看</a>
        <div class="process_box">
          <img src="/static/topic/inviteNewUser_2017/invite2_porcess2.png" alt="流程">
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import keyConf from "../../../common/keyConf";
import common from "../../../common/common";
import { Toast } from 'mint-ui';
import '../../../../node_modules/mint-ui/lib/toast/style.css'
import { setStore } from "../../../common/store";
import { getCode, authLogin, userIsLogin, getFreeGift, Reccommend } from "@/service/getData";
export default {
  name: "FreeGifts",
  data () {
    return {
      receive_state: false, // 领取结果显示(true: 领取结果页面)
      first_state: false, // 第一次领取
      pro_id: '', // 礼品
      pro_name: '玛丽黛佳 轻雾感口红', // 所领取的礼品名称
      ruleState: false, // 活动规则显示
      countdown: 60,
      mobile: '',
      code: '',
      iconShow: '',
      isShow: false, // 是否显示登录弹框
      login_state: false, // 登录时登录状态
      login_con: "登录",
      plid: "", //推广来源
      recommendList: [], // 热销推荐
    };
  },
  created (){
    this.plid = common.getQueryString("plid") ? common.getQueryString("plid") : "";
    this.shareWechat(); // 微信分享
    this.getReccommend();
  },
  methods: {
    /*显示活动规则*/
    showRule (){
      this.ruleState = true;
    },
    /*隐藏活动规则*/
    closeRule (){
      this.ruleState = false;
    },
    /*免费领*/
    async receiveGift(giftID){
      let qm_cookie = $.cookie(keyConf.qm_cookie);
      let isLogin = await userIsLogin();
      
      if (!qm_cookie || isLogin.status == "error") { // 未登录
        if ( common.getQueryString("app").indexOf("ios") > -1 || common.getQueryString("app").indexOf("android") > -1 ) {
          window.location.href = '/login?action=login&url=/topic-sendgift';
        } else { // APP站外登录(H5登录)---注：该页面肯定是app站外打开
          this.isShow = true;
        }
      } else { // 已登录
        // 领取礼品
        let result = await getFreeGift({gift_id: giftID});
        if(result.status == "ok"){
          this.pro_id = giftID;
          switch (this.pro_id) {
            case 1:
              this.pro_name = "玛丽黛佳 轻雾感口红";
              break;
            case 2:
              this.pro_name = "柚子舍柚稚园 多肽修复原液";
              break;
            case 3:
              this.pro_name = "PBA妆前乳";
              break;
            default:
              this.pro_name = "";
              break;
          }
          this.receive_state = true; // 领取结果
          this.first_state = true; // 第一次领取
        }else if(result.status == "error" && result.code == "1"){
          this.pro_id = giftID;
          this.receive_state = true; // 领取结果
          this.first_state = false; // 你已领取过(非第一次领取)
        }else{
          // 提示：礼品不存在
          Toast({
            message: result.msg,
            duration: 1000,
            className: 'toast-tip'
          });
          // alert(result.msg);
        }

      }
    },
    async getReccommend() {
      let res = await Reccommend({});
      if (res.status === "ok"){
        this.recommendList = res.data;
      }
      console.log(this.recommendList);
    },

    /* 快捷登录----开始 */
    // 获取短信验证码
    async sendCode () {
      if(this.mobile.length < 11){
        Toast({
          message: '手机格式不正确',
          duration: 1000,
          className: 'toast-tip'
        });
        // alert('手机格式不正确');
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
      if(this.mobile.length < 11){
        Toast({
          message: '手机格式不正确',
          duration: 1000,
          className: 'toast-tip'
        });
        return
      }
      if(this.code.length <= 0){
        Toast({
          message: '验证码不能为空',
          duration: 1000,
          className: 'toast-tip'
        });
        return
      }

      this.login_state = true;
      this.login_con = "登录中...";
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
        Toast({
          message: result.msg,
          duration: 1000,
          className: 'toast-tip'
        });
        // alert(result.msg);
      }
      this.login_state = false;
      this.login_con = "登录";
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
    /* 快捷登录----结束 */

    //微信分享
    shareWechat(){
      let _this = this;
      wx.ready(function () {
          _this.share_setup(
            '新人专享，免费领好礼！',
            '价值149元的彩妆品免费领，赶紧喊你的小伙伴来领取吧~',
            'http://tmp-mm.qiaocat.com/topic-free-gifts?plid=94',
            'http://tmp-mm.qiaocat.com/static/topic/inviteNewUser_2017/share.jpg'
          );
      });
    },
    share_setup(title, desc, link, imgUrl) {
      wx.onMenuShareAppMessage({
        title: title,
        desc: desc,
        link: link,
        imgUrl: imgUrl,
        success: function(res) {
          console.log(1, res);
        },
        error: function(err) {
          console.log(1, err);
        }
      });
      wx.onMenuShareTimeline({
        title: title,
        link: link,
        imgUrl: imgUrl,
        success: function(res) {
          //todo
          console.log(2, res);
        },
        error: function(err) {
          console.log(2, err);
        }
      });
    },
  },
}
</script>
<style lang="scss" scoped>
@import '../../../assets/css/mixin.scss';
.gift-box {
  /*一、领取页面*/
  .receive-box {
    /*顶部banner*/
    .banner {
      font-size: 0;
      img{
        font-size: 0;
        width: 100%;
      }
    }
    /*礼品区*/
    .gift-box {
      .gift {
        position: relative;
        font-size: 0;
        img {
          font-size: 0;
          width: 100%;
        }
        .receive {
          position: absolute;
          bottom: 0;
          width: 36%;
          height: 4rem;
          cursor: pointer;
          // background-color: pink;
        }
        &:nth-of-type(1) {
          .receive {
            left: 8%;
          }
        }
        &:nth-of-type(2) {
          .receive {
            right: 10%;
            bottom: 3%;
          }
        }
        &:nth-of-type(3) {
          .receive {
            left: 13%;
            bottom: 12%;
          }
        }
      }
    }
    /*领取流程*/
    .process {
      position: relative;
      font-size: 0;
      .rule-btn {
        position: absolute;
        top: 15%;
        left: 38%;
        width: 24%;
        height: 5%;
        cursor: pointer;
      }
      img {
        width: 100%;
      }
    }
    /*热销推荐*/
    .recommend {
      img.top {
        width: 100%;
        vertical-align: top;
      }
    }

     /*活动规则*/
    .activity-rule {
      position: fixed;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      z-index: 1;
      background-color: rgba(0,0,0,0.7);
      .rule-box {
        max-width: 750px;
        position: relative;
        width: 84%;
        margin: 10rem auto 0;
        padding: 1.5rem;
        background-color: #fff;
        .close {
          display: block;
          width: 12%;
          position: absolute;
          top: -4.4rem;
          right: 0;
          cursor: pointer;
        }
        .rule_img {
          width: 100%;
        }
      }
    }

    /*快捷登录*/
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
        width: 86%;
        .cd-switcher {
          width: 100%;
          height: 4rem;
          position: relative;
          line-height: 4rem;
          text-align: center;
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
            @include wh(3rem,3rem);
            cursor: pointer;
          }
        }
        .login-box {
          background-color: #fff;
          padding-bottom: 3rem;
          #cd-login {
            width: 100%;
            padding-top: 2.4rem;
            .mobile{
              width: 100%;
              margin-bottom: 2.5rem;
              position: relative;
              padding: 0px 1.5rem;
              .input-mobile{
                .icon-delete{
                  top: 1.5rem;
                  right: 1.2rem;
                }
              }
              
              input[type=tel],input[type=tel]:-webkit-autofill{
                @include wh(100%,4.4rem);
                // background-image: url('../../../assets/image/icon/login/icon_user.png');
              }
            }
            .code{
              padding: 0px 1.5rem;
              padding-right: 42%;
              input[type=number]{
                @include wh(100%,4.4rem);
                // background-image: url('../../../assets/image/icon/login/icon_code.png');
              }
              .icon-delete{
                top: 1.5rem;
                right: 46%;
              }
              input[type=button]{
                position: absolute;
                top: 0rem;
                right: 1.5rem;
                padding: 0 0.4rem;
                width: 34%;
                height: 4.4rem;
                line-height: 4.4rem;
                background-color: #ff8584;
                text-align: center;
                font-size: 1.5rem;
                font-weight: 300;
                letter-spacing: 1px;
                // border-radius: 4rem;
                color: $bgWhite;
                cursor: pointer;
              }
              
            }
            .mobile,.code{
              width: 100%;
              margin-bottom: 1.8rem;
              input[type=tel],input[type=number]{
                padding-left: 1.5rem;
                font-size: 1.5rem;
                letter-spacing: 1px;
                color: #000;
                border: 1px solid #999;
                // border-radius: 4rem;
                background-size: 1.7rem 1.9rem;
                background-position: 1rem 1.2rem;
                background-repeat: no-repeat;
              }
            }
            .input-mobile,.code{
              position: relative;
              .icon-delete{
                position: absolute;
                @include wh(1.4rem,1.4rem);
                background-image: url('../../../assets/image/icon/login/icon_delete.png');
                background-size: 1.4rem 1.4rem;
              }
            }
          }
          /*登录*/
          .login-container {
            width: 100%;
            height: 4.4rem;
            line-height: 4.4rem;
            padding: 0 1.5rem;
            input {
              cursor: pointer;
              width: 100%;
              height: 4.4rem;
              background-color: #ff8584;
              font-size: 1.9rem;
              color: #fff;
              letter-spacing: 2px;
              border-radius: 4rem;
              &.logining {
                background-color: #ccc;
              }
            }
          }
        }
        .get-process {
          width: 100%;
          background-color: #f1f1f1;
          padding: 1rem;
          img {
            width: 100%;
            vertical-align: top;
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
  }

  /*二、领取结果页面*/
  .result-box {
    .notapp-box {
      .content {
        padding-top: 4.5rem;
        font-size: 1.8rem;
        line-height: 2.4rem;
        color: #000;
        text-align: center;
        /*第一次领取*/
        .first-box {
          p {
            color: #000;
            &:nth-of-type(1) {
              font-size: 2.3rem;
              line-height: 2rem;
              margin-bottom: 1.1rem;
            }
            &:nth-of-type(2) {
              font-size: 1.6rem;
              line-height: 1.4rem;
              width: 50%;
              margin: 0 auto;
              .txt_bg {
                display: block;
                width: 100%;
                height: 1.2rem;
                background-color: #FFE8E8;
                margin-top: -0.5rem;
              }
            }
          }
        }
        /*领取过了*/
        .notfirst {
            p {
              color: #000;
              font-size: 1.6rem;
              line-height: 1.5rem;
              &:nth-of-type(1) {
                margin-bottom: 0.6rem;
              }
              &:nth-of-type(2) {
                width: 44%;
                margin: 0 auto;
                .notfirst_bg {
                  display: block;
                  width: 100%;
                  height: 1.2rem;
                  background-color: #FFE8E8;
                  margin-top: -0.8rem;
                }
              }
            }
          }
      }
      .pro_img {
        text-align: center;
        margin: 3.1rem auto 3rem;
        font-size: 0;
        img {
          font-size: 0;
          height: 20rem;
        }
      }
      .tip_txt {
        font-size: 1.4rem;
        color: #888;
        text-align: center;
        line-height: 1.4rem;
        margin-bottom: 1.5rem;
      }
      .link-to {
        margin: 0 auto;
        display: block;
        width: 80%;
        height: 4.4rem;
        background-color: #ff9291;
        line-height: 4.4rem;
        text-align: center;
        color: #fff;
        font-size: 1.8rem;
        border-radius: 4rem;
        cursor: pointer;
      }
      .process_box {
        text-align: center;
        margin: 2rem auto;
        font-size: 0;
        img {
          font-size: 0;
          width: 88%;
        }
      }
    }
  }
}
</style>