<template>
  <div class="luckdraw-box">
    <div class="big-wheel">
      <!--抽奖结果-->
      <div class="bg" v-show="isbg">
        <div class="result-box">
          <img class="close" src="/static/topic/luckDraw_2017/luckDraw_1129/icon_shut.png" alt="关闭" @click="closeBox">
          <div class="receive-box" v-if="first_state">
            <div class="result">
              <p class="p1">恭喜你，获得</p>
              <p class="p2">“{{gift_content}}”</p>
            </div>
            <p class="tips">PS:请截图向工作人员确认并领取礼品。</p>
          </div>
          <!--你已经领取过-->
          <div class="received-box" v-else>
            <div class="result">
              <p class="p1">{{gift_msg}}</p>
            </div>
          </div>
        </div>
      </div>
      <img class="bg-img" src="/static/topic/luckDraw_2017/luckDraw_1129/bg.jpg" alt="">
      <!--大转盘-->
      <div class="wheel-box">
        <div id="rotary-table" class="wheel">
          <div :class="`gift gift_${index}`" v-for="(item,index) in gift_txt" :key="index">
            <span>{{item.prize ? item.prize : ''}}</span>
          </div>
        </div>
        <img class="start" src="/static/topic/luckDraw_2017/luckDraw_1129/start.png" alt="点击开始" @click="luckyDraw">
      </div>
    </div>

    <!--分享信息-->
    <span id="differentShare" :data="JSON.stringify(shareData)" style="display: none"></span>
  </div>
</template>
<script>
import keyConf from "../../../common/keyConf";
import { userIsLogin, getListPrize, setPlate } from "@/service/getData";
import common from "../../../common/common"
import { Toast } from 'mint-ui';
import '../../../../node_modules/mint-ui/lib/toast/style.css'
export default {
  name: "luckDraw1129",
  data() {
    return {
      plid: '', // 推广来源
      from_ad: 'topic_luckdraw1129', //专题来源,20171129俏猫大转盘
      isbg: false, //虚化背景
      first_state: true, // 第一次领取
      // gift_txt: ['BC温润无痕洁妆棉', '小甘菊旅行随手组', '神秘礼品', '美肤宝爽肤水', '仙人掌眼膜', '卡通可爱指甲钳', '俏猫￥888现金', '咪咪零食'],
      gift_txt: [],
      gift_con: ['7', '5', '4', '1'], // BC温润无痕洁妆棉、美肤宝爽肤水、神秘礼品、咪咪零食，对应的位置
      gift_id: 4, // 后端返回抽中的奖品(1:BC温润无痕洁妆棉、2:美肤宝爽肤水、3:神秘礼品、4:咪咪零食)
      gift_content: '', // 奖品内容
      gift_msg: '', // 抽奖提示
      offOn: true, // 是否转动
      num: 0,
      n: 0,
      rdm: 0, // 转盘转到哪
      timer: null, // 定时器

      shareData: { // APP分享
        title: '俏猫幸运大转盘',
        desc: '漂亮的人都转起来~',
        link: 'http://mm.qiaocat.com/topic-luckdraw-1129',
        imgUrl: 'http://mm.qiaocat.com/static/topic/luckDraw_1129/share.jpg'
      },
    };
  },
  created() {
    this.getGiftList();
    this.plid = common.getQueryString("plid") ? common.getQueryString("plid") : "";

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
      let res = await getListPrize();
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
          window.location.href = this.plid ? `/login?action=login&url=/topic-luckdraw-1129?plid=${this.plid}` : `/login?action=login&url=/topic-luckdraw-1129`;
        } else {
          Toast({
            message: '未登录',
            duration: 1500,
            className: 'toast-tip'
          });
          let baseUrl = this.plid
            ? `/login?url=/topic-luckdraw-1129?plid=${this.plid}`
            : `/login?url=/topic-luckdraw-1129`;
          this.$router.push(baseUrl);
        }
      } else { // 已登录
        if (this.offOn) { // 防止连续点击抽奖
          this.num++;
          this.offOn = !this.offOn;
          let setPlateData = await setPlate();
          if(setPlateData.status == 'ok'){
            this.ratating(setPlateData.data);
          }else{
            this.offOn = !this.offOn;
            if(!this.isbg){ // 没显示结果的时候，显示
              this.gift_msg = setPlateData.msg;
              this.first_state = false; // 已领取过奖品
              this.isbg = true;
            }
          }
        }


        /*let setPlateData = await setPlate();
        if(setPlateData.status == 'ok'){
          if (this.offOn) {
            this.num++;
            this.offOn = !this.offOn;
            this.ratating(setPlateData.data);
          }
        }else {
          if (this.offOn) {
            this.gift_msg = setPlateData.msg;
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
      if(data.code == '1'){
        _this.gift_id = 1; // 1:BC温润无痕洁妆棉
      }else if(data.code == '4') {
        _this.gift_id = 2; // 2:美肤宝爽肤水
      }else if(data.code == '3'){
        _this.gift_id = 3; // 3:神秘礼品
      }else if(data.code == '8'){
        _this.gift_id = 4; // 4:咪咪零食
      }
      let cat = _this.gift_con[(_this.gift_id - 1) >= 0 ? (_this.gift_id - 1) : 3] * 45; // 后端抽奖
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
              // 俏猫￥888现金券
              _this.gift_content = data.name;
              _this.isbg = true;
              break;
            case 45:
              // 咪咪零食
              _this.gift_content = data.name;
              _this.isbg = true;
              break;
            case 90:
              // 卡通可爱指甲钳
              _this.gift_content = data.name;
              _this.isbg = true;
              break;
            case 135:
              // 仙人掌眼膜
              _this.gift_content = data.name;
              _this.isbg = true;
              break;
            case 180:
              // 神秘礼品
              _this.gift_content = data.name;
              _this.isbg = true;
              break;
            case 225:
              // 美肤宝爽肤水
              _this.gift_content = data.name;
              _this.isbg = true;
              break;
            case 270:
              // 小甘菊旅行随手组
              _this.gift_content = data.name;
              _this.isbg = true;
              break;
            case 315:
              // BC温润无痕洁妆棉
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

    /*微信分享*/
    shareWechat() {
      let _this = this;
      wx.ready(function() {
        _this.share_setup(
          "俏猫幸运大转盘",
          "漂亮的人都转起来~",
          "http://mm.qiaocat.com/topic-luckdraw-1129",
          "http://mm.qiaocat.com/static/topic/luckDraw_1129/share.jpg"
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
        height: 30%;
        margin: 50% auto;
        background-color: #fff;
        text-align: center;
        .close {
          position: absolute;
          right: -1rem;
          top: -30%;
          display: block;
          padding: 1rem;
          width: 10%;
          cursor: pointer;
        } // 结果提示
        .result {
          padding-top: 15%;
          p {
            font-size: 2rem;
            color: #cc9942;
            &.p2 {
              font-weight: bold;
            }
          }
        } // 结果提示
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
      top: 28%;
      width: 100%;
      font-size: 0;
      .wheel {
        position: relative;
        width: 92%;
        display: block;
        margin: 0 auto;
        background: url("/static/topic/luckDraw_2017/luckDraw_1129/empty.png") center no-repeat;
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
            font-size: 1.4rem;
          }

          @for $i from 0 through 7 {
            &.gift_#{$i} {
              @include xz(45 * $i+45);
            }
          }

          &.gift_0 {
            top: 15%;
            left: 64%;
          }
          &.gift_1 {
            top: 42%;
            left: 77%;
          }
          &.gift_2 {
            top: 78%;
            left: 40%;
            transform: rotate(180deg);
          }
          &.gift_3 {
            top: 68%;
            left: 66%;
            transform: rotate(135deg);
          }
          &.gift_4 {
            top: 65%;
            left: 16%;
          }
          &.gift_5 {
            top: 41%;
            left: 6%;
          }
          &.gift_6 {
            top: 3%;
            left: 41%;
            transform: rotate(0deg);
          }
          &.gift_7 {
            top: 19%;
            left: 17%;
            transform: rotate(-45deg);
          }
        }
      }
      .start {
        display: block;
        width: 20%;
        position: absolute;
        left: 40%;
        top: 36%;
        cursor: pointer;
        z-index: 3;
      }
    }
  }
}
</style>