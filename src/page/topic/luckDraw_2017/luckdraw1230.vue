<template>
  <div class="luckdraw-box">
    <div class="big-wheel">
      <!--活动说明-->
      <div class="bg" v-show="isExplain">
        <div class="result-box explain-box">
          <img class="close" src="/static/topic/luckDraw_2017/luckDraw_1230/icon_shut.png" alt="关闭" @click="closeExplainBox">
          <div class="explain">
            <p>【活动时间】即日起-12月31号</p>
            <p>【活动细则】</p>
            <p>1. 活动期间，关注“俏猫”公众号的所有用户均可参加抽奖，每人在整个活动期间仅限一次抽奖机会，先到先得，抽完为止；</p>
            <p>2. 用户需要输入手机号并验证后方可参加抽奖；</p>
            <p>3. 中奖后，流量将在24小时内充值到验证手机上，现金券将立即充值到您的俏猫账户；</p>
            <p>4. 如果发现不正当作弊行为，本公司保留取消活动资格及追究进一步责任的权利；</p>
            <p>5. 俏猫在法律规定的范围内有解释权。</p>
          </div>
        </div>
      </div>
      <!--抽奖结果-->
      <div class="bg" v-show="isbg">
        <div class="result-box">
          <img class="close" src="/static/topic/luckDraw_2017/luckDraw_1230/icon_shut.png" alt="关闭" @click="closeBox">
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
      <img class="bg-img" src="/static/topic/luckDraw_2017/luckDraw_1230/bg.jpg" alt="">
      <!--活动说明按钮-->
      <div class="explain-btn" @click="showExplainBox" title="活动说明"></div>
      <!--大转盘-->
      <div class="wheel-box">
        <div id="rotary-table" class="wheel">
          <div :class="`gift gift_${index}`" v-for="(item,index) in gift_txt" :key="index">
            <span>{{item.prize ? item.prize : ''}}</span>
          </div>
        </div>
        <img class="start" src="/static/topic/luckDraw_2017/luckDraw_1230/start.png" alt="点击开始" @click="luckyDraw">
      </div>
    </div>

    <!--分享信息-->
    <span id="differentShare" :data="JSON.stringify(shareData)" style="display: none"></span>
  </div>
</template>
<script>
import keyConf from "../../../common/keyConf";
import { userIsLogin, getPrize, setDraw } from "@/service/getData";
import common from "../../../common/common"
import { Toast } from 'mint-ui';
import '../../../../node_modules/mint-ui/lib/toast/style.css'
export default {
  name: "luckDraw1230",
  data() {
    return {
      plid: '', // 推广来源
      from_ad: 'topic_luckdraw1230', //专题来源,20171230俏猫大转盘
      isExplain: false, // 活动说明
      isbg: false, //虚化背景
      first_state: true, // 第一次领取
      // gift_txt: ['谢谢参与', '10M', '20M', '30M', '50M', '100M', '500M', '888元美妆券'],
      gift_txt: [],
      gift_con: ['4', '3', '5', '6', '2','7', '1','0'], // ['谢谢参与', '10M', '20M', '30M', '50M', '100M', '500M', '888元美妆券']，对应的位置
      gift_id: 1, // 后端返回抽中的奖品
      gift_content: '', // 奖品内容
      gift_msg: '', // 抽奖提示
      offOn: true, // 是否转动
      num: 0,
      n: 0,
      rdm: 0, // 转盘转到哪
      timer: null, // 定时器

      shareData: { // APP分享
        title: '毫无套路，100%中奖！',
        desc: '俏猫三周年·10000G流量豪气送~',
        link: 'http://mm.qiaocat.com/topic-luckdraw-1230?plid=101',
        imgUrl: 'http://mm.qiaocat.com/static/topic/luckDraw_2017/luckDraw_1230/share.jpg'
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
          // window.location.href = `/login?action=login`;
          window.location.href = this.plid ? `/login?action=login&url=/topic-luckdraw-1230?plid=${this.plid}` : `/login?action=login&url=/topic-luckdraw-1230`;
        } else {
          Toast({
            message: '未登录',
            duration: 1500,
            className: 'toast-tip'
          });
          let baseUrl = this.plid
            ? `/login?url=/topic-luckdraw-1230?plid=${this.plid}`
            : `/login?url=/topic-luckdraw-1230`;
          this.$router.push(baseUrl);
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


        /*let setDrawData = await setDraw();
        if(setDrawData.status == 'ok'){
          if (this.offOn) {
            this.num++;
            this.offOn = !this.offOn;
            this.ratating(setDrawData.data);
          }
        }else {
          if (this.offOn) {
            this.gift_msg = setDrawData.msg;
            this.first_state = false; // 已领取过奖品
            this.isbg = true;
          }
        }*/

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
        _this.gift_id = 7; // 7:500M
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

    /*关闭结果页面*/
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

    /*微信分享*/
    shareWechat() {
      let _this = this;
      wx.ready(function() {
        _this.share_setup(
          "毫无套路，100%中奖！",
          "俏猫三周年·10000G流量豪气送~",
          "http://mm.qiaocat.com/topic-luckdraw-1230?plid=101",
          "http://mm.qiaocat.com/static/topic/luckDraw_2017/luckDraw_1230/share.jpg",
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
    /*虚化背景*/
    .bg {
      position: fixed;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      background-color: rgba(0, 0, 0, 0.6);
      z-index: 99;
      .result-box {
        position: relative;
        width: 86%;
        min-height: 30%;
        margin: 50% auto;
        background-color: #fff;
        text-align: center;
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
      top: 2%;
      cursor: pointer;
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
        background: url("/static/topic/luckDraw_2017/luckDraw_1230/empty.png") center no-repeat;
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
        z-index: 3;
      }
    }
  }
}
</style>