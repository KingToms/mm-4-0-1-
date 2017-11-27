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
              <p class="p2">“{{gift_txt}}”</p>
            </div>
            <p class="tips">PS:请截图向工作人员确认并领取礼品。</p>
          </div>
          <!--你已经领取过-->
          <div class="received-box" v-else>
            <div class="result">
              <p class="p1">你已经</p>
              <p class="p1">已经参加过抽奖啦~</p>
            </div>
          </div>
        </div>
      </div>
      <img class="bg-img" src="/static/topic/luckDraw_2017/luckDraw_1129/bg.jpg" alt="">
      <!--大转盘-->
      <div class="wheel-box">
        <img class="wheel" src="/static/topic/luckDraw_2017/luckDraw_1129/29gif.png" alt="俏猫大转盘">
        <img class="start" src="/static/topic/luckDraw_2017/luckDraw_1129/start.png" alt="点击开始" @click="luckyDraw">
      </div>
    </div>

    <!--分享信息-->
    <span id="differentShare" :data="JSON.stringify(shareData)" style="display: none"></span>
  </div>
</template>
<script>
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
      gift_txt: '小甘菊旅行随手组',

      shareData: { // APP分享
        title: '俏猫幸运大转盘',
        desc: '漂亮的人都转起来~',
        link: 'http://mm.qiaocat.com/topic-luckdraw-1129',
        imgUrl: 'http://mm.qiaocat.com/static/topic/luckDraw_1129/share.jpg'
      },
    };
  },
  created() {
    this.plid = common.getQueryString("plid") ? common.getQueryString("plid") : "";

    this.shareWechat();
  },
  methods: {
    /*抽奖*/
    luckyDraw() {
      this.isbg = true;
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
      z-index: 1;
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
          top: -28%;
          display: block;
          padding: 1rem;
          width: 10%;
          cursor: pointer;
        }
        // 结果提示
        .result {
          padding-top: 15%;
          p {
            font-size: 2rem;
            color: #cc9942;
            &.p2 {
              font-weight: bold;
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
        width: 90%;
        display: block;
        margin: 0 auto;
      }
      .start {
        display: block;
        width: 20%;
        position: absolute;
        left: 40%;
        top: 36%;
        cursor: pointer;
      }
    }
  }
}
</style>