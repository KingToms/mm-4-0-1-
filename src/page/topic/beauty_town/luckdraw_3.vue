<template>
  <div class="luckdraw-box">
    <div class="big-wheel">
      <!--一、活动说明-->
      <div class="bg" v-show="isExplain">
        <div class="result-box explain-box">
          <img class="close" src="/static/topic/beauty_down/luckdraw_3/icon_shut.png" alt="关闭" @click="closeExplainBox">
          <div class="explain">
            <p>【活动时间】即日起至1月31号</p>
            <p>【活动细则】</p>
            <p>1. 凡在俏猫小城上集齐10枚金币均可获得1次抽奖机会；</p>
            <p>2. 用户需要输入手机号并验证后方可参加抽奖；</p>
            <p>3. 奖品包括Iphone X、知名彩妆护肤好物、专业化妆刷套组、原创潮牌箱包、美妆券等；</p>
            <p>4. 抽到实物礼品，需如实填写个人信息以便发货；</p>
            <p>5. 实物礼品将于活动结束后的五个工作日内寄出；</p>
            <p>6. 如果发现不正当作弊行为，俏猫保留取消活动资格及追究进一步责任的权利；</p>
          </div>
        </div>
      </div>
      <!--活动说明按钮-->
      <div class="explain-btn" @click="showExplainBox" title="活动说明"></div>

      <!--二、注册登录窗口-->
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
                      <input type="button" value="获取验证码" @click="sendCode" id="sendCode">
                    </div>
                  </div>
                </form>
              </div>
              <div class="login-container">
                <input :class="{'logining': login_state}" type="button" v-model="login_con" @click="codeLogin">
              </div>
            </div>
            <!--<div class="get-process">
              <img src="/static/topic/inviteNewUser_2017/invite2_process.png" alt="">
            </div>-->
          </div>
        </section>
      </transition>

      <!--三、大转盘抽奖-->
      <div class="luckdraw-box">
        <img class="bg-img" src="/static/topic/beauty_down/luckdraw_3/bg.jpg" alt="">
        <div class="wheel-box">
          <div id="rotary-table" class="wheel">
            <div :class="`gift gift_${index}`" v-for="(item,index) in gift_txt" :key="index">
              <span>{{item.prize ? item.prize : ''}}</span>
            </div>
          </div>
          <img class="start" src="/static/topic/beauty_down/luckdraw_3/start.png" alt="点击开始" @click="luckyDraw">
        </div>
      </div>

      <!--四、抽奖结果-->
      <div class="bg" v-show="isbg">
        <div class="result-box">
          <img class="close" src="/static/topic/beauty_down/luckdraw_3/icon_shut.png" alt="关闭" @click="closeBox">
          <div class="receive-box" v-if="first_state">
            <div class="result">
              <!--谢谢参与-->
              <p class="p1" v-if="gift_id == '1'"><b>{{gift_content}}</b></p>
              <div v-else>
                <p class="p1">恭喜你，获得</p>
                <!--888元现金券-->
                <div class="p2" v-if="gift_id == '8'">
                  <b>“{{gift_content}}”</b>
                  <p class="tip-txt">请直接进入俏猫公众号可查看。</p>
                </div>
                <!--电影票-->
                <div class="p2" v-else-if="gift_id == '7'">
                  <b>“一张{{gift_content}}”</b>
                  <p class="tip-txt exchange">
                    <a href="https://at.umeng.com/S15Tba"><img src="/static/topic/beauty_down/luckdraw_3/exchange.png" alt=""></a>
                  </p>
                </div>
                <!--流量-->
                <div class="p2" v-else>
                  <b>“{{gift_content}}流量”</b>
                  <p class="tip-txt">我们将在24小时内为您充值，请留意手机短信。</p>
                </div>
              </div>

            </div>
          </div>
          <!--你已经领取过-->
          <div class="received-box" v-else>
            <div class="result">
              <p class="p1">{{gift_msg}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--五、APP分享信息-->
    <span id="differentShare" :data="JSON.stringify(shareData)" style="display: none"></span>
  </div>
</template>
<script>
import keyConf from "../../../common/keyConf";
import common from "../../../common/common"
import { Toast } from 'mint-ui';
import '../../../../node_modules/mint-ui/lib/toast/style.css';
import { setStore } from "../../../common/store";
import { getCode, authLogin, userIsLogin, getPrize, setDraw } from "@/service/getData";
export default {
  name: "luckDraw1230",
  data() {
    return {
      plid: '', // 推广来源
      isExplain: false, // 活动说明(显示)
      isbg: false, //虚化背景
      first_state: true, // 第一次领取
      // gift_txt: ['谢谢参与', '10M', '20M', '30M', '50M', '100M', '500M', '888元美妆券'],
      gift_txt: [],
      gift_con: ['4', '3', '5', '6', '2','7', '1','0'], // ['谢谢参与', '10M', '20M', '30M', '50M', '100M', '500M', '888元美妆券']，对应的位置
      gift_id: 1, // 后端返回抽中的奖品
      gift_content: '', // 奖品内容
      ticket_link: 'https://at.umeng.com/S15Tba', // 电影票链接
      gift_msg: '', // 抽奖提示
      offOn: true, // 是否转动
      num: 0,
      n: 0,
      rdm: 0, // 转盘转到哪
      timer: null, // 定时器

      /*注册登录窗口---开始*/
      countdown: 60,
      mobile: '',
      code: '',
      iconShow: '',
      isShow: false, // 是否显示登录弹框
      login_state: false, // 登录时登录状态
      login_con: "登录",
      /*注册登录窗口---结束*/

      shareData: { // APP分享
        title: '毫无套路，100%中奖！',
        desc: '俏猫三周年·10000G流量豪气送~',
        link: 'http://mm.qiaocat.com/topic-luckdraw-town?plid=101',
        imgUrl: 'http://mm.qiaocat.com/static/topic/beauty_down/luckdraw_3/share.jpg'
      },
    };
  },
  created() {
    this.getGiftList();
    this.plid = common.getQueryString("plid") ? common.getQueryString("plid") : "";

    console.log("this.plid:", this.plid);
    this.shareWechat();
  },
  mounted() {
    /*使大转盘盒子显示为正方形*/
    setTimeout(function() {
      var cw = $('#rotary-table').width();
      $('#rotary-table').css({
        'height': cw + 'px'
      });
    }, 0);
    $(window).resize(function() {
      var cw = $('#rotary-table').width();
      $('#rotary-table').css({
        'height': cw + 'px'
      });
    });

  },
  methods: {
    /*获取抽奖礼品列表*/
    async getGiftList() {
      let res = await getPrize();
      let resData = eval(res.data);
      for (var i in resData) {
        this.gift_txt.push(resData[i]);
      }
      // console.log("gift_txt:", this.gift_txt);
    },

    /*抽奖*/
    async luckyDraw() {
      let qm_cookie = $.cookie(keyConf.qm_cookie);
      let isLogin = await userIsLogin();
      if (!qm_cookie || isLogin.status == "error") {
        if (
          common.getQueryString("app") == "ios" ||
          common.getQueryString("app") == "android"
        ) {
          window.location.href = this.plid ? `/login?action=login&url=/topic-luckdraw-town?plid=${this.plid}` : `/login?action=login&url=/topic-luckdraw-town`;
        } else {
          // 未登录，显示注册登录窗口
          this.isShow = true;
        }
      } else { // 已登录
        if (this.offOn) { // 防止连续点击抽奖
          this.num++;
          this.offOn = !this.offOn;
          let setDrawData = await setDraw();
          if (setDrawData.status == 'ok') {
            this.ratating(setDrawData.data);
          } else {
            this.offOn = !this.offOn;
            if (!this.isbg) { // 没显示结果的时候，显示
              this.gift_msg = setDrawData.msg;
              this.first_state = false; // 已领取过奖品
              this.isbg = true;
            }
          }
        }
      }

    },
    /*转动抽奖*/
    ratating(data) {
      let _this = this;
      // let cat = Math.floor(Math.random()*8)*45; // 前端随机
      if (data.code == '1') {
        _this.gift_id = 1; // 1:谢谢参与
      } else if (data.code == '2') {
        _this.gift_id = 2; // 2:10M
      } else if (data.code == '3') {
        _this.gift_id = 3; // 3:20M
      } else if (data.code == '4') {
        _this.gift_id = 4; // 4:30M
      } else if (data.code == '5') {
        _this.gift_id = 5; // 5:50M
      } else if (data.code == '6') {
        _this.gift_id = 6; // 6:100M
      } else if (data.code == '7') {
        _this.gift_id = 7; // 7:电影票
      } else if (data.code == '8') {
        _this.gift_id = 8; // 8:888元美妆券
      }
      let cat = _this.gift_con[(_this.gift_id - 1) >= 0 ? (_this.gift_id - 1) : 1] * 45; // 后端抽奖
      let rotaryTable = document.getElementById("rotary-table");
      clearInterval(_this.timer);
      _this.timer = setInterval(function() {
        _this.rdm = 3600 * _this.num + cat;
        rotaryTable.style.transform = "rotate(" + _this.rdm + "deg)";
        clearInterval(_this.timer);
        setTimeout(function() {
          _this.n = _this.rdm % 360;
          switch (_this.n) { // 转动幅度
            case 0:
              // 888元美妆券
              _this.gift_content = data.name;
              _this.isbg = true;
              break;
            case 45:
              // 500M
              _this.gift_content = data.name;
              _this.isbg = true;
              break;
            case 90:
              // 50M
              _this.gift_content = data.name;
              _this.isbg = true;
              break;
            case 135:
              // 10M
              _this.gift_content = data.name;
              _this.isbg = true;
              break;
            case 180:
              // 谢谢参与
              _this.gift_content = data.name;
              _this.isbg = true;
              break;
            case 225:
              // 20M
              _this.gift_content = data.name;
              _this.isbg = true;
              break;
            case 270:
              // 30M
              _this.gift_content = data.name;
              _this.isbg = true;
              break;
            case 315:
              // 100M
              _this.gift_content = data.name;
              _this.isbg = true;
              break;
          };

          _this.offOn = !_this.offOn;
        }, 4000);
      }, 30);
    },

    /*关闭抽奖结果页面*/
    closeBox() {
      this.isbg = false;
    },
    /*显示活动说明页面*/
    showExplainBox() {
      this.isExplain = true;
    },
    /*关闭活动说明页面*/
    closeExplainBox() {
      this.isExplain = false;
    },

    /* 快捷登录----开始 */
      // 获取短信验证码
      async sendCode() {
        if (this.mobile.length < 11) {
          Toast({
            message: '手机格式不正确',
            duration: 1000,
            className: 'toast-tip'
          });
          return
        }
        this.countdown = 60
        this.settime($(this.$el.querySelector("#sendCode")), this.countdown);
        let res = await getCode({ mobile: this.mobile, type: 1 })
        if (res.status != 'ok') {
          alert(res.msg);
        }
      },
      // 验证码倒计时重新发送
      settime($el, countdown) {
        function aa() {
          if (countdown == 0) {
            $el.removeAttr('disabled');
            $el.val('获取验证码').css('backgroundColor', '#FE0000');
          } else {
            $el.attr('disabled', 'true').css('backgroundColor', '#bfbfbf');
            $el.val(`重新发送(${countdown}s)`);
            countdown--;

            setTimeout(function() {
              aa();
            }, 1000);
          }
        }
        aa()
      },
      // 验证码登录
      async codeLogin() {
        if (this.mobile.length < 11) {
          Toast({
            message: '手机格式不正确',
            duration: 1000,
            className: 'toast-tip'
          });
          return
        }
        if (this.code.length <= 0) {
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
        let result = await authLogin({ mobile: this.mobile, code: this.code, plid: this.plid })
        if (result.status == 'ok') {
          $.cookie(keyConf.qm_cookie, this.mobile, { expires: 1, path: '/' })
          setStore(keyConf.userMoile, this.mobile)

          Toast({
            message: result.msg,
            duration: 700,
            className: 'toast-tip'
          });
          // 隐藏弹框
          let self = this;
          setTimeout(function() {
            self.isShow = false;
          }, 1200);
        } else {
          Toast({
            message: result.msg,
            duration: 1000,
            className: 'toast-tip'
          });
        }
        this.login_state = false;
        this.login_con = "登录";
      },
      // 显示删除按钮
      setIconShow(choose) {
        let self = this
        setTimeout(function() {
          self.iconShow = choose;
        }, 300)
      },
      // 隐藏删除按钮
      setIconHide() {
        let self = this;
        setTimeout(function() {
          self.iconShow = '';
        }, 300)
      },
      // 点击删除按钮，清空输入内容
      resetText(_self) {
        let $input = $(this.$el.querySelector('.' + _self))
        $input.val('')
        if ($input.prop('type') === 'tel') {
          this.mobile = ''
        } else {
          this.code = ''
        }
      },
      // 隐藏弹框
      loginboxHide() {
        this.isShow = false;
      },
    /* 快捷登录----结束 */

    /*微信分享*/
    shareWechat() {
      let _this = this;
      wx.ready(function() {
        _this.share_setup(
          "毫无套路，100%中奖！",
          "俏猫三周年·10000G流量豪气送~",
          "http://mm.qiaocat.com/topic-luckdraw-town?plid=101",
          "http://mm.qiaocat.com/static/topic/beauty_down/luckdraw_3/share.jpg",
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
  }
}
</script>
<style lang="scss" scoped>
@import '../../../assets/css/mixin.scss';
.luckdraw-box {
  position: relative;
  .big-wheel {
    position: relative;
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
            @include wh(3rem, 3rem);
            cursor: pointer;
          }
        }
        .login-box {
          background-color: #fff;
          padding-bottom: 3rem;
          #cd-login {
            width: 100%;
            padding-top: 2.4rem;
            .mobile {
              width: 100%;
              margin-bottom: 2.5rem;
              position: relative;
              padding: 0px 1.5rem;
              .input-mobile {
                .icon-delete {
                  top: 1.5rem;
                  right: 1.2rem;
                }
              }

              input[type=tel],
              input[type=tel]:-webkit-autofill {
                @include wh(100%, 4.4rem); // background-image: url('../../../assets/image/icon/login/icon_user.png');
              }
            }
            .code {
              padding: 0px 1.5rem;
              padding-right: 42%;
              input[type=number] {
                @include wh(100%, 4.4rem); // background-image: url('../../../assets/image/icon/login/icon_code.png');
              }
              .icon-delete {
                top: 1.5rem;
                right: 46%;
              }
              input[type=button] {
                position: absolute;
                top: 0rem;
                right: 1.5rem;
                padding: 0 0.4rem;
                width: 34%;
                height: 4.4rem;
                line-height: 4.4rem;
                background-color: #FE0000;
                text-align: center;
                font-size: 1.5rem;
                font-weight: 300;
                letter-spacing: 1px; // border-radius: 4rem;
                color: $bgWhite;
                cursor: pointer;
              }
            }
            .mobile,
            .code {
              width: 100%;
              margin-bottom: 1.8rem;
              input[type=tel],
              input[type=number] {
                padding-left: 1.5rem;
                font-size: 1.5rem;
                letter-spacing: 1px;
                color: #000;
                border: 1px solid #999; // border-radius: 4rem;
                background-size: 1.7rem 1.9rem;
                background-position: 1rem 1.2rem;
                background-repeat: no-repeat;
              }
            }
            .input-mobile,
            .code {
              position: relative;
              .icon-delete {
                position: absolute;
                @include wh(1.4rem, 1.4rem);
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
              background-color: #FE0000;
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
    .fade-enter-active,
    .fade-leave-active {
      transition: opacity .5s
    }
    .fade-enter,
    .fade-leave-to/* .fade-leave-active in below version 2.1.8 */
    {
      opacity: 0
    }

    /*虚化背景*/
    .bg {
      position: fixed;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      background-color: rgba(0, 0, 0, 0.6);
      // background-image: url("/static/topic/beauty_down/luckdraw_3/bg.jpg");
      // background-position: 0 0;
      // background-repeat: no-repeat;
      // background-size: contain;
      z-index: 99;
      .result-box {
        max-width: 37.5rem;
        position: relative;
        width: 86%;
        min-height: 30%;
        margin: 40% auto 0;
        background-color: #fff;
        text-align: center;

        border: 0.1rem solid #ccc;
        .close {
          position: absolute;
          right: -1rem;
          // top: -30%;
          top: -6rem;
          display: block;
          padding: 1rem;
          width: 10%;
          cursor: pointer;
        }
        .explain {
          text-align: left;
          padding: 2rem 1rem 3rem;
          p {
            font-size: 1.2rem;
            color: #000;
            padding-top: 0.5rem;
          }
        }
        // 结果提示
        .result {
          padding-top: 15%;
          p,.p2 {
            font-size: 2rem;
            color: #cc9942;
            b {
              display: inline-block;
              color: #cc9942;
              font-weight: bold;
              margin-top: 0.5rem;
            }
          }
          .tip-txt {
            margin-top: 3rem;
            font-size: 1.2rem;
            color: #010101;
          }
          // 点击兑换电影票
          .exchange {
            width: 50%;
            margin: 3rem auto 0;
            img {
              width: 100%;
              margin-bottom: 2rem;
              cursor: pointer;
            }
          }
        }
        // 结果提示
        .tips {
          font-size: 1.2rem;
          color: #000;
          padding-top: 10%;
        }
        .received-box {
          // 结果提示
          .result {
            padding-top: 22%;
          }
        }
      }
      .explain-box {
        margin: 9rem auto 0;
        max-width: 37.5rem;
      }
    }
    img {
      vertical-align: top;
    }
    .bg-img {
      width: 100%;
    }
    .explain-btn {
      position: absolute;
      width: 20%;
      height: 5%;
      text-align: center;
      right: 2%;
      top: 3%;
      cursor: pointer;
      z-index: 1;
    }
    .wheel-box {
      position: absolute;
      left: 0;
      top: 31.4%;
      width: 100%;
      font-size: 0;
      .wheel {
        position: relative;
        width: 63%;
        display: block;
        margin: 0 auto;
        background: url("/static/topic/beauty_down/luckdraw_3/empty.png") center no-repeat;
        background-size: contain;
        -webkit-transform: rotate(0deg);
        -moz-transform: rotate(0deg);
        -ms-transform: rotate(0deg);
        -o-transform: rotate(0deg);
        transform: rotate(0deg);
        -webkit-transition: all 4s;
        -moz-transition: all 4s;
        -ms-transition: all 4s;
        -o-transition: all 4s;
        transition: all 4s;
        /*礼品*/
        .gift {
          position: absolute;
          top: 10%;
          width: 18%;
          color: #000;
          text-align: center;
          span {
            display: block;
            margin-top: 20%;
            font-size: 1.3rem;
          }

          @for $i from 0 through 7 {
            &.gift_#{$i} {
              @include xz(45 * $i+45);
            }
          }

          &.gift_0 {
            top: 77%;
            left: 40%;
            transform: rotate(180deg);
          }
          &.gift_1 {
            top: 71%;
            left: 13%;
            transform: rotate(225deg);
          }
          &.gift_2 {
            top: 72%;
            left: 69%;
            transform: rotate(135deg);
          }
          &.gift_3 {
            top: 44%;
            left: 80%;
            transform: rotate(90deg);
          }
          &.gift_4 {
            top: 43%;
            left: 1%;
            transform: rotate(270deg);
          }
          &.gift_5 {
            top: 17%;
            left: 69%;
            transform: rotate(45deg);
          }
          &.gift_6 {
            top: 15%;
            left: 13%;
            transform: rotate(-45deg);
          }
          &.gift_7 {
            top: 3%;
            left: 41%;
            transform: rotate(0deg);
          }
        }
      }
      .start {
        display: block;
        width: 18%;
        position: absolute;
        left: 41%;
        top: 30%;
        cursor: pointer;
        z-index: 1;
      }
    }
  }
}
</style>