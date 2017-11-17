<template>
  <div class="gift-giving">
    <section class="receive-box" v-if="!receive_state">
      <!--顶部bannar-->
      <div class="banner">
        <img src="/static/topic/giftGiving_1111/img1111-01.jpg" alt="俏猫,免费多种赠品">
      </div>
      <!--礼品区-->
      <div class="gift-box">
        <div class="gift">
          <img src="/static/topic/giftGiving_1111/img1111-02.jpg" alt="玛丽黛佳轻雾感口红">
          <div class="receive" @click="receiveGift('1')"></div>
        </div>
        <div class="gift">
          <img src="/static/topic/giftGiving_1111/img1111-03.jpg" alt="柚子舍柚稚园多肽修护原液">
          <div class="receive" @click="receiveGift('2')"></div>
        </div>
        <div class="gift">
          <img src="/static/topic/giftGiving_1111/img1111-04.jpg" alt="PBA妆前乳">
          <div class="receive" @click="receiveGift('3')"></div>
        </div>
      </div>
      <!--弹出层登录-->
      <transition name="fade">
        <section class="cd-user-modal" v-if="isShow" @click.self="isShow = false">
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

          </div>
        </section>
      </transition>
    </section>
    <section class="result-box" v-if="receive_state">
      <!--app站内-->
      <div class="app-box" v-if="app_state">
        <div class="pro_img">
          <img v-if="pro_id == '1'" src="/static/topic/giftGiving_1111/img1111_05.png" alt="">
          <img v-if="pro_id == '2'" src="/static/topic/giftGiving_1111/img1111_06.png" alt="">
          <img v-if="pro_id == '3'" src="/static/topic/giftGiving_1111/img1111_07.png" alt="">
        </div>
        <div class="content">
          <div class="success_txt" v-if="first_state">
            <p>领取成功</p>
          </div>
          <div class="un_success" v-else>
            <p>你已经领取过了</p>
            <p>赶快下单带回家吧</p>
          </div>
          <p class="tips">下单满39元，即可包邮到家。24小时内有效。</p>
        </div>
        <a class="link-to" href="http://mm.qiaocat.com/detail/1000205?from=mfshl">购美特惠通道</a>
        <div class="coupon" v-if="hidden_topic">
          <router-link to="/topic-newuser-invite-600">
            <img src="/static/topic/giftGiving_1111/invite.png" alt="600直减券">
          </router-link>
        </div>
        <img class="receive-tip" src="/static/topic/giftGiving_1111/text.png" alt="发货提示">
      </div>
      <!--app站外-->
      <div class="notapp-box" v-if="!app_state">
        <div class="content">
          <div v-if="first_state">
            <p>礼品已放入你的账户</p>
            <p>24小时内有效，过期将作废。</p>
          </div>
          <div v-else>
            <p>你已经领取过了</p>
            <p>赶快下单带回家吧</p>
          </div>
        </div>
        <div class="pro_img">
          <img v-if="pro_id == '1'" src="/static/topic/giftGiving_1111/img1111_05.png" alt="">
          <img v-if="pro_id == '2'" src="/static/topic/giftGiving_1111/img1111_06.png" alt="">
          <img v-if="pro_id == '3'" src="/static/topic/giftGiving_1111/img1111_07.png" alt="">
        </div>
        <a class="link-to" href="http://a.app.qq.com/o/simple.jsp?pkgname=com.qiaocat.app&fromcase=40002">下载APP登录查看</a>
        <div class="process_box">
          <img src="/static/topic/giftGiving_1111/process.png" alt="流程">
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import keyConf from "../../../common/keyConf";
import { getCode, authLogin, userIsLogin, authToken, getFreeGift } from "@/service/getData";
import { setStore, storage_custom } from "../../../common/store";
import common from "../../../common/common";
import { Toast } from 'mint-ui';
import '../../../../node_modules/mint-ui/lib/toast/style.css'
export default {
  name: "send_gift",
  data () {
    return {
      countdown: 60,
      mobile: '',
      code: '',
      iconShow: '',
      isShow: false, // 是否显示登录弹框
      plid: "", //推广来源
      login_state: false, // 登录时登录状态
      login_con: "登录",
      app_state: true, // 专题是否在APP中
      receive_state: false, // 领取结果显示(true: 领取结果页面)
      first_state: true, // 第一次领取
      pro_id: '', // 礼品
      from: '', // 来源
      hidden_topic: false, // 暂时隐藏领取600优惠券的入口
      weixinState: false,
    };
  },
  created() {
    this.is_weixn_qq();
    this.setStorage(); // 客户端是否已登录
    this.plid = common.getQueryString("plid") ? common.getQueryString("plid") : "";
    this.from = common.getQueryString("from") ? common.getQueryString("from") : "";

    this.shareWechat(); // 微信分享
  },
  methods: {
    // 判断是否在微信QQ端打开
    is_weixn_qq(){
      var ua = window.navigator.userAgent.toLowerCase();
      if(ua.match(/MicroMessenger/i) == "micromessenger") {
        this.app_state = false;
        this.weixinState = true;
        // return "weixin";
      } else if (ua.match(/QQ/i) == "qq") {
        this.app_state = false;
        this.weixinState = true;
        // return "QQ";
      }
      return false;
    },
    // 免费领
    async receiveGift(giftID){
      let qm_cookie = $.cookie(keyConf.qm_cookie);
      let isLogin = await userIsLogin();
      if (!qm_cookie || isLogin.status == "error") { // 未登录
        // APP站内登录(非微信QQ)
        if (
          // (common.getQueryString("app").indexOf("ios") > -1 || common.getQueryString("app").indexOf("android") > -1) && !this.weixinState
          !this.weixinState
        ) {
          this.app_state = true;
          window.location.href = "/login?action=login&url=/topic-sendgift?app=ios/datetime/plid=" + this.plid + "/from=" + this.from;
          // window.location.href = '/login?action=login&url=/topic-sendgift';
        } else { // APP站外登录(H5登录)
          this.app_state = false;
          this.isShow = true;
        }
      } else { // 已登录
        // 专题是否在APP站外打开
        this.is_weixn_qq();
        // 领取礼品
        let result = await getFreeGift({gift_id: giftID});
        if(result.status == "ok"){
          this.pro_id = giftID;
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

    // 客户端是否已登录
    async setStorage() {
      let datetime = common.getQueryString("datetime");
      let app = common.getQueryString("app");
      if (datetime && app) {
        let res = await authToken({ token: datetime });
        res.status === "ok"
          ? $.cookie(keyConf.qm_cookie, res.data.id)
          : $.cookie(keyConf.qm_cookie, "");
        storage_custom.set(keyConf.token, datetime);
      } else if (!datetime && app) {
        storage_custom.set(keyConf.token, "");
        $.cookie(keyConf.qm_cookie, "");
      }
    },

    /* 快捷登录----开始 */
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
        alert(result.msg);
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
            '俏猫|邀你领好礼',
            '价值149元的彩妆品免费派,赶紧喊你的小伙伴们来领取吧~数量有限,先到先得哦~',
            'http://mm.qiaocat.com/topic-sendgift',
            'http://mm.qiaocat.com/static/topic/giftGiving_1111/share.jpg'
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
.gift-giving {
  /*一、领取页面*/
  .receive-box {
    /*顶部banner*/
    .banner {
      font-size: 0;
      margin-bottom: 1.5rem;
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
        background-color: #fff;
        padding: 0 1rem;
        padding-bottom: 1rem;
        img {
          font-size: 0;
          width: 100%;
        }
        .receive {
          position: absolute;
          bottom: 16%;
          right: 8%;
          width: 50%;
          height: 4rem;
          cursor: pointer;
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
                background-color: #F23436;
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
              margin-bottom: 1.8rem;
              input[type=tel],input[type=number]{
                padding-left: 1.5rem;
                font-size: 1.5rem;
                letter-spacing: 1px;
                color: #000;
                border: 1px solid #999;
                border-radius: 4rem;
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
              background-color: #F23436;
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
    .app-box, .notapp-box {
      .content {
        padding-bottom: 0.5rem;
        font-size: 1.8rem;
        line-height: 2.4rem;
        color: #000;
        text-align: center;
        p {
          color: #000;
          // font-weight: bold;
        }
      }
      .pro_img {
        text-align: center;
        margin: 3rem auto;
        font-size: 0;
        img {
          font-size: 0;
          height: 18rem;
        }
      }
      .link-to {
        margin: 0 auto;
        display: block;
        width: 90%;
        height: 4.4rem;
        background-color: #F13434;
        line-height: 4.4rem;
        text-align: center;
        color: #fff;
        font-size: 1.8rem;
        border-radius: 4rem;
        cursor: pointer;
      }
    }
    /*1、app站内*/
    .app-box {
      .content {
        .success_txt {
          font-size: 2.3rem;
        }
        .un_success {
          font-size: 2rem;
        }
        .tips {
          color: #888;
          font-size: 1.2rem;
          margin: 1.5rem auto;
          line-height: 1.4rem;
        }
      }
      .pro_img {
        margin-top: 3.8rem;
        margin-bottom: 1.5rem;
      }
      .coupon {
        width: 80%;
        margin: 3.5rem auto;
        font-size: 0;
        cursor: pointer;
        img {
          font-size: 0;
          width: 100%;
        }
      }
      .receive-tip {
        padding-top: 5rem;
        vertical-align: middle;
        display: block;
        width: 90%;
        margin: 0 auto;
      }
    }
    /*2、app站外*/
    .notapp-box {
      .content {
        padding-top: 7.5rem;
      }
      .pro_img {

      }
      .process_box {
        text-align: center;
        margin: 3rem auto;
        font-size: 0;
        img {
          font-size: 0;
          width: 40%;
        }
      }
    }
  }
}
</style>