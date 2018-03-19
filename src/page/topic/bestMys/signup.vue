<template>
  <div class="sign-up">
    <img src="/static/topic/bestMys/1.1bg.jpg" alt="寻找最美美业师" class="bg-img">
    <div class="main">
      <div class="period">报名时间：2018年3月16日-22日</div>
      <div class="sign-box">
        <!--手机号、验证码-->
        <input class="tel" type="tel" v-model="mobile" @focus="inputText" @blur="inputBlur" placeholder="请输入手机号码" maxlength="11">
        <i class="icon-delete" v-show="iconShow" @click="resetText"></i>
        <input class="mCode" v-model="code" type="tel" placeholder="请输入验证码" maxlength="6">
        <input type="button" value="获取验证码" id="sendCode" class="btn-code" @click="sendCode"></input>
        <div v-if="agreeState" class="signup" @click="codeLogin">马上报名</div>
        <div v-else class="signup disable-btn" @click="showTip">马上报名</div>
      </div>
    </div>
    <div class="rule-box">
      <div class="agree">
        <span class="agreement" @click="toAgree">
          <div class="icon">
            <img class="icon_choose" src="/static/topic/bestMys/icon_choose.png" alt="">
            <img v-show="agreeState" class="icon_choosed" src="/static/topic/bestMys/icon_chosed.png" alt="">
          </div>
          本人已阅读并同意
        </span>
        <span class="rule-item" @click="showRule">活动规则</span>
      </div>
      <img class="explain" src="/static/topic/bestMys/explain.png" alt="">
    </div>

    <!--活动规则-->
    <div class="activity-rule" v-if="showRuleDiv">
      <div class="content">
        <div class="close" @click="toClose"></div>
        <img src="/static/topic/bestMys/1.2.png" alt="">
        <div class="rule-detail">
          <img src="/static/topic/bestMys/rule.png" alt="">
          <div class="rules">
            <p>1.每个用户每天可投票一次。</p>
            <p>2.本次活动只针对美业师开展，美业师包括：化妆师、美睫师、纹绣师等。</p>
            <p>3.活动期间使用任何舞弊行为的用户一经发现，即刻取消活动资格。</p>
            <p>4.用户需提供真实的个人半身或全身形象照及相关证件证明美业师身份，如资料提交不全导致无法参赛，主办方不对由此产生的任何后果负责。</p>
            <p>5.用户需提供真实信息，如因用户资料不全导致活动奖品无法正确发放的情况，主办方不对由此产生的任何后果负责。</p>
            <p>6.所有礼品将在活动结束后的15个工作日内免费寄出。</p>
            <p>7.本活动最终解释权归俏猫所有。</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Toast } from 'mint-ui';
import '../../../../node_modules/mint-ui/lib/toast/style.css';
import { getCode, authLogin, userIsLogin } from '../../../service/getData.js';
import common from '../../../common/common.js';
import { setStore } from '../../../common/store.js'
import keyConf from '../../../common/keyConf.js';
export default {
  name: "bestMys",
  data() {
    return {
      showRuleDiv: false,
      agreeState: true,
      mobile: '', //手机号码
      code: '', //验证码
      iconShow: false,// 删除按钮显示隐藏
      countdown: 60,
      plid: '', // 推广链接表ID
    };
  },
  created() {
    this.isLogin();
    this.plid = common.getQueryString("plid") ? common.getQueryString("plid") : "";
    this.shareWechat();
  },
  methods: {
    /*微信分享*/
    shareWechat() {
      let _this = this;
      wx.ready(function() {
        _this.share_setup(
          "拼颜值，拼人气，你是最美美业师吗？",
          "豪送1388元女神大礼包~",
          "http://mm.qiaocat.com/topic-best-mys?plid=126",
          "http://mm.qiaocat.com/static/topic/bestMys/share1.jpg"
        );
      });
    },
    share_setup(title, desc, link, imgUrl) {
      let _this = this;
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

    // 是否已登录
    async isLogin() {
      let qm_cookie = $.cookie(keyConf.qm_cookie);
      let isLogin = await userIsLogin();
      if (!qm_cookie || isLogin.status == 'error') {
        // console.log("用户未登录");
      } else { //已登录
        window.location.href = '/topic-best-mys/info';
      }
    },

    // 同意活动规则
    toAgree() {
      this.agreeState = !this.agreeState;
    },
    // 请同意活动规则
    showTip() {
      Toast({
        message: '请阅读并同意活动规则，参与报名',
        duration: 2000,
        className: 'toast-tip'
      });
    },
    //显示活动规则窗口
    showRule() {
      this.showRuleDiv = true;
    },
    //关闭活动规则窗口
    toClose() {
      this.showRuleDiv = false;
    },

    // 输入手机号码时
    inputText() {
      let self = this
      setTimeout(function() {
        self.iconShow = true;
      }, 300);
    },
    inputBlur() {
      if (this.mobile == "") {
        let self = this
        setTimeout(function() {
          self.iconShow = false;
        }, 300);
      }
    },
    // 删除手机号码
    resetText() {
      this.mobile = "";
      this.iconShow = false;
    },
    // 获取短信验证码
    async sendCode() {
      if (this.mobile.length < 11) {
        Toast({
          message: '手机格式不正确',
          duration: 1500,
          className: 'toast-tip'
        });
        return
      }
      this.countdown = 60
      common.settime($(this.$el.querySelector("#sendCode")), this.countdown);
      let res = await getCode({ mobile: this.mobile, type: 1 })
      if (res.status != 'ok') {
        alert(res.msg);
      }
    },
    // 验证码登录
    async codeLogin() {
      let result = await authLogin({ mobile: this.mobile, code: this.code, plid: this.plid })
      if (result.status == 'ok') {
        $.cookie(keyConf.qm_cookie, this.mobile, { expires: 1, path: '/' })
        setStore(keyConf.userMoile, this.mobile)

        // 完善资料
        /*Toast({
          message: '请填写完善资料，参与报名',
          duration: 2000,
          className: 'toast-tip'
        });*/
        this.$router.push('/topic-best-mys/info');
      } else {
        alert(result.msg);
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.sign-up {
  position: relative;
  width: 100%;
  height: 100%;
  padding-top: 78%;
  /*背景图*/
  .bg-img {
    position: absolute;
    left: 0;
    top: 0;
    display: block;
    vertical-align: top;
    width: 100%;
  }
  /*报名盒子*/
  .main {
    position: relative;
    width: 88%;
    margin: 0 auto;
    display: block; // background-color: pink;
    .period {
      color: #fff;
      font-size: 1.5rem;
      text-align: center;
      line-height: 2rem;
      margin-bottom: 1rem;
    }
    .sign-box {
      position: relative;
      width: 100%;
      height: 20rem;
      margin-top: 2.5%;
      input.tel,
      input.mCode {
        position: absolute;
        height: 4.4rem;
        left: -2%;
        text-align: left;
        text-indent: 1rem;
        background-color: transparent;
        font-size: 1.6rem;
        padding-left: 2rem;
        color: #fff;
        z-index: 2;
      }
      .tel {
        display: block;
        width: 100%;
        top: 6%;
      }
      .icon-delete {
        position: absolute;
        right: 8%;
        top: 13%;
        width: 1.8rem;
        height: 1.8rem;
        background-image: url('../../../assets/image/icon/login/icon_delete.png');
        background-size: cover;
        z-index: 2;
      }
      .mCode {
        width: 55%;
        top: 39%;
      }
      .btn-code {
        position: absolute;
        top: 39%;
        right: 1%;
        width: 38%;
        height: 4.4rem;
        text-align: center;
        font-size: 1.6rem;
        color: #fff;
        cursor: pointer;
        background-color: transparent !important;
      }
      .signup {
        position: absolute;
        width: 100%;
        height: 22.5%;
        bottom: 2%;
        left: 0%;
        cursor: pointer;
        color: #fff;
        text-align: center;
        font-size: 2.1rem;
      }
      .disable-btn {
        color: #aaa;
      }
    }
  }
  /*规则*/
  .rule-box {
    position: relative;
    text-align: center;
    .agree {
      margin: 2rem 0 1.5rem;
      text-align: center;
      color: #fff;
      font-size: 1.5rem;
      line-height: 2rem;
      .icon {
        position: relative;
        display: inline-block;
        width: 1.6rem;
        height: 1.6rem;
        margin-bottom: -0.25rem;
        .icon_choose {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
        }
        .icon_choosed {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          width: 50%;
        }
      }
      span.agreement {
        color: #fff;
      }
      span.rule-item {
        color: #b1b0ff;
        text-decoration: underline;
      }
    }
    img.explain {
      width: 60%;
    }
  }
  /*规则说明*/
  .activity-rule {
    position: fixed;
    z-index: 999;
    width: 100%;
    height: 100%;
    max-width: 37.5rem;
    top: 0;
    background-color: rgba(0, 0, 0, 0.4);
    .content {
      width: 80%;
      margin: 0 auto;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      .close {
        width: 4.4rem;
        height: 4.4rem;
        position: absolute;
        top: -0.5rem;
        right: -0.5rem;
      }
      img {
        width: 100%;
      }
      .rule-detail {
        position: absolute;
        left: 0;
        top: 10%;
        width: 100%;
        height: 88%;
        padding: 2rem 1rem;
        text-align: left;
        img {
          display: block;
          width: 80%;
          margin: 1rem auto 0;
        }
        .rules {
          padding: 2rem 1rem 0;
          p {
            color: #fff;
            font-size: 1.4rem;
          }
        }
      }
    }
  }
}
</style>