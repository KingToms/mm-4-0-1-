<template>
  <div class="luckdraw-box">
    <div class="big-wheel">
      <!--二、注册登录窗口-->
      <transition name="fade">
        <section class="cd-user-modal" v-if="isShow">
          <div class="cd-user-modal-container">
            <!-- 登录表单 -->
            <div class="login-box">
              <div id="cd-login">
                <form class="cd-form">
                  <div class="mobile">
                    <div class="input-mobile">
                      <input type="tel" class="tel" v-model="mobile" @focus="setIconShow('tel')" @blur="setIconHide" placeholder="手机号码" autofocus autocomplete="off" maxlength="11">
                      <i class="icon-delete" v-show="iconShow=='tel'" @click="resetText('tel')"></i>
                    </div>
                  </div>

                  <div class="code">
                    <input type="number" v-model="code" class="number" name="code" @focus="setIconShow('number')" @blur="setIconHide" placeholder="验证码" autocomplete="off" maxlength="6">
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

            <ul class="cd-switcher">
              <!--<li><a class="title" href="#0">快捷登录</a></li>-->
              <img class="close-box" @click="loginboxHide" src="/static/topic/giftGiving_1111/icon_shut.png" alt="">
            </ul>
          </div>
        </section>
      </transition>

      <!--三、大转盘抽奖-->
      <div class="luckdraw-box">
        <img class="bg-img" src="/static/topic/beauty_down/luckdraw_3/home_page.jpg" alt="">
        <div class="wheel-box">
          <div id="rotary-table" class="wheel">
            <div :class="`gift gift_${index}`" v-for="(item,index) in gift_txt" :key="index">
              <span>{{item.prize_name ? item.prize_name : ''}}</span>
            </div>
          </div>
          <img class="start" src="/static/topic/beauty_down/luckdraw_3/arrow.png" alt="点击开始" @click="luckyDraw">
        </div>
      </div>

      <!--四、抽奖结果-->
      <div class="bg" v-show="isbg">
        <div class="result-box" :class="{'nochance-box': noChance}">
          <img class="close" src="/static/topic/beauty_down/luckdraw_3/icon_shut.png" alt="关闭" @click="closeBox">
          <img class="bg-box" src="/static/topic/beauty_down/luckdraw_3/box_awards.png" v-show="!noChance" alt="">
          <img class="bg-box" src="/static/topic/beauty_down/luckdraw_3/box_register.png" v-show="noChance" alt="">
          <div class="received-box" v-if="first_state">
            <div class="result">
              <!--非实物：888元俏猫美妆券-->
              <div class="p2" v-if="gift_id == '7' || gift_id == '8'">
                <img class="pro_img" :src="pro_img" alt="">
                <p class="tip-txt">完成问卷还可以获得抽奖机会~</p>
                <div class="next-box">
                  <span class="next" @click="shareBoxShow = true">分享</span>
                  <span class="next" @click="goQuestionnaire">问卷</span>
                </div>
              </div>
              <!--实物：-->
              <div class="p2" v-else>
                <div class="pro_box">
                  <img class="pro_img" :src="pro_img" alt="">
                </div>
                <button class="delivery" @click="goReceipt">填写收货信息</button>
              </div>
            </div>
          </div>
          <!--没有抽奖次数-->
          <div class="received-box" v-else>
            <div class="result">
              <div class="first-part" v-if="!noChance">
                <p class="p1">{{gift_msg}}</p>
                <p class="tip-txt">完成问卷还可以获得抽奖机会~</p>
                <div class="next-box">
                  <span class="next" @click="shareBoxShow = true">分享</span>
                  <span class="next" @click="goQuestionnaire">问卷</span>
                </div>
              </div>
              <!--遇见你，3生有幸-->
              <div class="last-part" v-else>
                <img src="/static/topic/beauty_down/luckdraw_3/advert.png" alt="遇见你，3生有幸" class="advert">
                <p class="last-tip">您已花光所有抽奖机会</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--分享指引-->
    <div class="share-guide" @click="hideShareBox" v-if="shareBoxShow">
      <div>
        <img src="/static/topic/inviteNewUser_2017/guide2.png" alt="">
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
import { setStore, getStore } from "../../../common/store";
import { getCode, authLogin, userIsLogin, getPrizeList, getLuckDraw, getMoreDraw } from "@/service/getData";
export default {
  name: "luckDraw1230",
  data() {
    return {
      isbg: false, //虚化背景
      first_state: true, // 抽奖成功
      // gift_txt: ['PBA经典款BB霜 小样', '玛丽黛佳 怪怪收纳袋', 'Won-in箱包（双肩）', '雅美菲套刷', '玛丽黛佳 巴黎时装周妆容别册', '柚花少女套盒', '俏猫888元美妆券', 'IPHONE X'],
      gift_txt: [],
      gift_con: ['7', '6', '5', '4', '3','2', '1','0'], // ['PBA经典款BB霜 小样', '玛丽黛佳 怪怪收纳袋', 'Won-in箱包（双肩）', '雅美菲套刷', '玛丽黛佳 巴黎时装周妆容别册', '柚花少女套盒', '俏猫888元美妆券', 'IPHONE X']，对应的位置
      gift_id: 7, // 后端返回抽中的奖品
      pro_img: '', // 奖品图片
      gift_msg: '', // 抽奖提示
      offOn: true, // 是否转动
      num: 0,
      n: 0,
      rdm: 0, // 转盘转到哪
      timer: null, // 定时器

      /*---注册登录窗口---开始*/
      wechat_id: '', //微信id
      wechat_avatar: '', //微信用户头像
      wechat_nickname: '', //微信用户昵称

      countdown: 60,
      mobile: '', // 手机号
      code: '', // 验证码
      plid: '', // 推广来源
      iconShow: '',
      isShow: false, // 是否显示登录弹框
      login_state: false, // 登录时登录状态
      login_con: "马上抽奖",
      /*---注册登录窗口---结束*/

      noChance: false, // 共3次机会，是否用完
      shareBoxShow: false, // 分享指引
      shareData: { // APP分享
        title: '美丽小城，俏猫三周年！',
        desc: '俏猫三周年·集金币抽iphoneX~',
        link: 'http://mm.qiaocat.com/topic-beauty-town?plid=101',
        imgUrl: 'http://mm.qiaocat.com/static/topic/beauty_down/luckdraw_3/share.jpg'
      },
    };
  },
  created() {
    this.getGiftList();
    this.plid = common.getQueryString("plid") ? common.getQueryString("plid") : "";

    console.log("this.plid:", this.plid);
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
    /*增加获奖次数*/
    async getMoreLuckdraw(addType) {
      // type: gold为金币后增加，share为分享后增加，paper为问卷后增加
      let res = await getMoreDraw({type: addType});
      if(res.status == 'ok'){
        // 增加了一次抽奖机会
        this.shareBoxShow = false; //隐藏分享指引
        alert("分享成功，已为您增加1次抽奖机会，马上抽奖吧~");
      }
    },
    /*获取抽奖礼品列表*/
    async getGiftList() {
      let res = await getPrizeList();
      if(res.status == 'ok'){
        this.gift_txt = res.data;
        // console.log("奖品列表:", this.gift_txt);
      }

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
          window.location.href = this.plid ? `/login?action=login&url=/topic-beauty-town?plid=${this.plid}` : `/login?action=login&url=/topic-beauty-town`;
        } else {
          // 未登录，显示注册登录窗口
          this.isShow = true;
        }
      } else { // 已登录
        if (this.offOn) { // 防止连续点击抽奖
          this.num++;
          this.offOn = !this.offOn;
          let setDrawData = await getLuckDraw();
          if (setDrawData.status == 'ok') {
            this.ratating(setDrawData.data);
          } else {
            // 3次机会都用完后，提示“遇见你三生有幸”
            this.noChance = (setDrawData.code == '3') ? (this.noChance = true) : false;

            this.offOn = !this.offOn;
            if (!this.isbg) { // 没显示结果的时候，显示
              this.gift_msg = setDrawData.msg; // 抽奖失败提示
              this.first_state = false; // 抽奖失败，次数已用完
              this.isbg = true; // 显示抽奖结果
            }
          }
        }
      }

    },
    /*转动抽奖*/
    ratating(data) {
      let _this = this;
      // let cat = Math.floor(Math.random()*8)*45; // 前端随机
      if (data.prize_id == '1') {
        _this.gift_id = 1; // 1:PBA经典款BB霜 小样
      } else if (data.prize_id == '2') {
        _this.gift_id = 2; // 2:玛丽黛佳 怪怪收纳袋
      } else if (data.prize_id == '3') {
        _this.gift_id = 3; // 3:Won-in箱包（双肩）
      } else if (data.prize_id == '4') {
        _this.gift_id = 4; // 4:雅美菲套刷
      } else if (data.prize_id == '5') {
        _this.gift_id = 5; // 5:玛丽黛佳 巴黎时装周妆容别册
      } else if (data.prize_id == '6') {
        _this.gift_id = 6; // 6:柚花少女套盒
      } else if (data.prize_id == '7') {
        _this.gift_id = 7; // 7:俏猫888元美妆券
      } else if (data.prize_id == '8') {
        _this.gift_id = 8; // 8:IPHONE X
      }

      if(data.prize_id == '7' || data.prize_id == '8'){ // 用户抽奖了实物奖品
        $.cookie('key_id', '', { expires: 1, path: '/topic-beauty-town' });
      }else{
        $.cookie('key_id', data.key_id, { expires: 1, path: '/topic-beauty-town' });// 实物奖品key_id
      }

      let cat = _this.gift_con[(_this.gift_id - 1) >= 0 ? (_this.gift_id - 1) : 7] * 45; // 后端抽奖
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
              // IPHONE X
              _this.pro_img = '/static/topic/beauty_down/luckdraw_3/product_7.png';
              _this.isbg = true;
              break;
            case 45:
              // 俏猫888元美妆券
              _this.pro_img = '/static/topic/beauty_down/luckdraw_3/product_7.png';
              _this.isbg = true;
              break;
            case 90:
              // 柚花少女套盒
              _this.pro_img = '/static/topic/beauty_down/luckdraw_3/product_6.png';
              _this.isbg = true;
              break;
            case 135:
              // 玛丽黛佳 巴黎时装周妆容别册
              _this.pro_img = '/static/topic/beauty_down/luckdraw_3/product_5.png';
              _this.isbg = true;
              break;
            case 180:
              // 雅美菲套刷
              _this.pro_img = '/static/topic/beauty_down/luckdraw_3/product_4.png';
              _this.isbg = true;
              break;
            case 225:
              // Won-in箱包（双肩）
              _this.pro_img = '/static/topic/beauty_down/luckdraw_3/product_3.png';
              _this.isbg = true;
              break;
            case 270:
              // 玛丽黛佳 怪怪收纳袋
              _this.pro_img = '/static/topic/beauty_down/luckdraw_3/product_2.png';
              _this.isbg = true;
              break;
            case 315:
              // PBA经典款BB霜 小样
              _this.pro_img = '/static/topic/beauty_down/luckdraw_3/product_1.png';
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
            $el.val('获取验证码').css('backgroundColor', '#FF5466');
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
        this.login_state = true; // 显示登录窗口
        this.login_con = "抽奖准备中...";

        this.plid = common.getQueryString("plid") ? common.getQueryString("plid") : "";
        this.wechat_id = getStore('wechat_id') ? getStore('wechat_id') : ''; //微信id
        this.wechat_avatar = getStore('wechat_avatar') ? getStore('wechat_avatar') : ''; //微信用户头像
        this.wechat_nickname = getStore('wechat_nickname') ? getStore('wechat_nickname') : ''; //微信用户昵称

        let result = await authLogin({
          mobile: this.mobile,
          code: this.code,
          plid: this.plid,
          wechat_id: this.wechat_id,
          wechat_avatar: this.wechat_avatar,
          wechat_nickname: this.wechat_nickname
        });
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
        this.login_con = "马上抽奖";
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

    /*跳转到调查问卷*/
    goQuestionnaire() {
      this.$router.push('./questionnaire');
    },

    /*跳转到填写收货信息*/
    goReceipt() {
      this.$router.push('./receipt');
    },

    // 隐藏分享指引
    hideShareBox (){
      this.shareBoxShow = false;
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
        max-width: 37.5rem;
        margin: 0 auto;
        margin-top: 10rem;
        width: 80%;
        height: 31rem;
        background: url("/static/topic/beauty_down/luckdraw_3/box_register.png") no-repeat center/contain;
        .cd-switcher {
          width: 100%;
          height: 4rem;
          position: relative;
          line-height: 4rem;
          text-align: center;
          margin-top: 5rem;
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
            width: 4rem;
            height: 4rem;
            cursor: pointer;
            margin: 0 auto;
            opacity: 0;
          }
        }
        .login-box {
          // background-color: #fff;
          padding-bottom: 3rem;
          #cd-login {
            width: 100%;
            padding-top: 2.4rem;
            .mobile {
              width: 100%;
              margin-bottom: 2.5rem;
              position: relative;
              padding: 0 3rem 0 2.5rem;
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
              padding: 0 3rem 0 2.5rem;
              padding-right: 47%;
              input[type=number] {
                @include wh(100%, 4.4rem); // background-image: url('../../../assets/image/icon/login/icon_code.png');
              }
              .icon-delete {
                top: 1.5rem;
                right: 50%;
              }
              input[type=button] {
                position: absolute;
                top: 0rem;
                right: 3rem;
                padding: 0 0.4rem;
                width: 34%;
                height: 4.4rem;
                line-height: 4.4rem;
                background-color: #FF5466;
                text-align: center;
                font-size: 1.4rem;
                font-weight: 300;
                letter-spacing: 1px;
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
          /*马上抽奖*/
          .login-container {
            width: 100%;
            height: 4.4rem;
            line-height: 4.4rem;
            padding: 0 3rem 0 2.5rem;
            input {
              cursor: pointer;
              width: 100%;
              height: 4.4rem;
              background-color: #FF5466;
              font-size: 1.8rem;
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
        width: 76%;
        min-height: 30%;
        margin: 20% auto 0;
        text-align: center;
        .close {
          position: absolute;
          left: 11rem;
          bottom: -1rem;
          display: block;
          padding: 1rem;
          width: 12%;
          cursor: pointer;
          opacity: 0;
        }
        // 结果弹框背景
        .bg-box {
          width: 100%;
        }
        // 抽奖结果窗口
        .received-box {
          width: 100%;
          position: absolute;
          top: 2rem;
          left: 0;
        }
        // 结果提示
        .result {
          padding-top: 8%;
          // 中奖产品图
          .pro_img {
            width: 60%;
          }
          // 选择收货地址按钮
          .delivery {
            width: 75%;
            margin: 3rem 1rem 0;
            height: 4.4rem;
            line-height: 4.4rem;
            font-size: 1.8rem;
            background-color: #FF5466;
            text-align: center;
            color: #fff;
            border-radius: 4rem;
            cursor: pointer;
          }
          .tip-txt {
            margin: 2rem 0 1rem;
            font-size: 1.3rem;
            color: #010101;
          }
          .next-box {
            span.next {
              display: inline-block;
              width: 10rem;
              margin: 0 1rem;
              height: 4.4rem;
              line-height: 4.4rem;
              font-size: 1.8rem;
              background-color: #FF5466;
              text-align: center;
              color: #fff;
              border-radius: 4rem;
              cursor: pointer;
            }
          }
          .p1 {
            font-size: 2rem;
            margin: 7rem auto;
          }
          // 遇见你，3生有幸
          .last-part {
            margin-top: -2.8rem;
            img {
              width: 75%;
              margin: 0 auto;
            }
            .last-tip {
              margin-top: 0.4rem;
              font-size: 1.8rem;
            }
          }
        }
      }

      // 3次抽奖机会都用完
      .nochance-box {
        margin-top: 30%;
      }
    }
    img {
      vertical-align: top;
    }
    .bg-img {
      width: 100%;
    }
    .wheel-box {
      position: absolute;
      left: 0;
      top: 25.2%;
      width: 100%;
      font-size: 0;
      .wheel {
        position: relative;
        width: 82%;
        display: block;
        margin: 0 auto;
        background: url("/static/topic/beauty_down/luckdraw_3/dial.png") center no-repeat;
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
          width: 25%;
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
          top: 14%;
          left: 66%;
            transform: rotate(45deg);
          }
          &.gift_1 {
            top: 41%;
            left: 77%;
            transform: rotate(90deg);
            span {
              color: #DF0A36;
            }
          }
          &.gift_2 {
            top: 69%;
            left: 65%;
            transform: rotate(135deg);
          }
          &.gift_3 {
            top: 86%;
            left: 37%;
            transform: rotate(180deg);
            span {
              color: #DF0A36;
            }
          }
          &.gift_4 {
            top: 64%;
            left: 11%;
            transform: rotate(225deg);
          }
          &.gift_5 {
            top: 41%;
            left: -1%;
            transform: rotate(270deg);
            span {
              color: #DF0A36;
            }
          }
          &.gift_6 {
            top: 13%;
            left: 11%;
            transform: rotate(-45deg);
          }
          &.gift_7 {
            top: 3%;
            left: 39%;
            transform: rotate(0deg);
            span {
              color: #DF0A36;
            }
          }
        }
      }
      .start {
        display: block;
        width: 18%;
        position: absolute;
        left: 41%;
        top: 36%;
        cursor: pointer;
        z-index: 1;
      }
    }
  }
  // 分享指引
  .share-guide {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 99;
    div {
      width: 100%;
      height: 100%;
      max-width: 750px;
      margin: 0 auto;
    }
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>