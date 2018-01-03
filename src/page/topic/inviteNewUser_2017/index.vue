<template>
  <div class="invite-box">
    <div class="strategy_btn" @click="showStrategy">
      <img src="/static/topic/inviteNewUser_2017/invite1_strategy_btn.png" alt="赚钱攻略">
    </div>
    <img src="/static/topic/inviteNewUser_2017/invite1_01.jpg" alt="邀请好友，赚现金券">
    <img src="/static/topic/inviteNewUser_2017/invite1_02.jpg" alt="新人免费领礼品">
    <div class="share-box" v-show="shareState" @click="showShareBox">立即分享领现金券</div>
    <!--赚钱攻略-->
    <div class="strategy-box" v-if="strategyState">
      <div class="rule-box">
        <img class="close" src="/static/topic/inviteNewUser_2017/icon_shut.png" @click="closeStrategy" alt="关闭">
        <img class="rule_img" src="/static/topic/inviteNewUser_2017/invite1_rule.png" alt="">
      </div>
    </div>
    <!--分享指引-->
    <div class="share-guide" @click="hideShareBox" v-if="shareBoxShow">
      <div>
        <img src="/static/topic/inviteNewUser_2017/guide2.png" alt="">
      </div>
    </div>

    <!--分享信息-->
    <span id="differentShare" :data="JSON.stringify(shareData)" style="display: none"></span>
  </div>
</template>
<script>
import common from "../../../common/common"
export default {
  name: "inviteNewUser",
  data () {
    return {
      shareState: true,
      strategyState: false,
      shareBoxShow: false,

      shareData: { // APP分享
        title: '新人专享，免费领好礼！',
        desc: '俏猫|价值149元的彩妆品免费领，赶紧喊你的小伙伴来领取吧~',
        link: 'http://mm.qiaocat.com/topic-free-gifts?plid=102',
        imgUrl: 'http://mm.qiaocat.com/static/topic/inviteNewUser_2017/share.jpg'
      },
    };
  },
  created (){
    this.shareWechat();

    // APP版本暂不支持H5触发原生右上角的分享操作
    if (
      common.getQueryString("app") == "ios" ||
      common.getQueryString("app") == "android"
    ) {
      // this.shareState = false;
    }
  },
  methods: {
    // 显示赚钱攻略
    showStrategy (){
      this.strategyState = true;
      this.shareState = false;
    },
    // 隐藏赚钱攻略
    closeStrategy (){
      this.strategyState = false;
      this.shareState = true;
    },
    // 显示分享指引
    showShareBox (){
      if (
        common.getQueryString("app") == "ios" ||
        common.getQueryString("app") == "android"
      ) {
        // window.location.href = "#?share=app";
        this.shareBoxShow = true;
      }else{
        this.shareBoxShow = true;
      }
    },
    // 隐藏分享指引
    hideShareBox (){
      this.shareBoxShow = false;
    },

    /*微信分享*/
    shareWechat() {
      let _this = this;
      wx.ready(function() {
        _this.share_setup(
          "新人专享，免费领好礼！",
          "俏猫|价值149元的彩妆品免费领，赶紧喊你的小伙伴来领取吧~",
          "http://mm.qiaocat.com/topic-free-gifts?plid=102",
          "http://mm.qiaocat.com/static/topic/inviteNewUser_2017/share.jpg"
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
.invite-box {
  position: relative;
  font-size: 0;
  img {
    width: 100%;
    vertical-align: top;
  }
  // 赚钱攻略
  .strategy_btn {
    position: absolute;
    top: 26%;
    left: 39%;
    width: 24%;
    cursor: pointer;
    img {
      width: 100%;
    }
  }
  // 立即分享
  .share-box {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 4.9rem;
    line-height: 4.9rem;
    text-align: center;
    color: #fff;
    font-size: 1.7rem;
    background-color: #ff8d8f;
    cursor: pointer;
  }
  // 赚钱攻略
  .strategy-box {
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
  // 分享指引
  .share-guide {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
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