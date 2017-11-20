<template>
  <div class="invitation">
    <a id="differentShare" :data="JSON.stringify(shareData)" style="display: none"></a>
    <img src="/static/topic/giftGiving_1111/receive.jpg" alt="邀请好友获得600元现金券">
  </div>
</template>
<script>
export default {
  name: "invitation",
  data () {
    return {
      isWeiXin: false, // 是否在微信端打开
      shareData: { // APP分享
        title:'俏猫|领取￥600现金券',desc:'【俏猫】预约化妆、美睫、半永久服务，最低98！',link:'http://mm.qiaocat.com/topic-new-user-600',imgUrl:'http://mm.qiaocat.com/static/topic/giftGiving_1111/receive_share.jpg',
      },
    };
  },
  created() {
    // this.is_weixn_qq();
    this.shareWechat(); // 微信分享
  },
  mounted() {
    // console.log(JSON.parse(document.getElementById("differentShare").getAttribute("data")).link);
  },
  methods: {
    // 判断是否在微信QQ端打开
    is_weixn_qq(){
      var ua = navigator.userAgent.toLowerCase();
      if(ua.match(/MicroMessenger/i)=="micromessenger") {
        location.href = "http://mm.qiaocat.com/topic-new-user-600";
        // return "weixin";
      } else if (ua.match(/QQ/i) == "qq") {
        location.href = "http://mm.qiaocat.com/topic-new-user-600";
        // return "QQ";
      }
      return false;
    },

    //微信分享
    shareWechat(){
      let _this = this;
      wx.ready(function () {
          _this.share_setup(
            '俏猫|领取￥600现金券',
            '【俏猫】预约化妆、美睫、半永久服务，最低98！',
            'http://mm.qiaocat.com/topic-new-user-600',
            'http://mm.qiaocat.com/static/topic/giftGiving_1111/receive_share.jpg'
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
html,body,.invitation {
  width: 100%;
  height: 100%;
}
.invitation {
  font-size: 0;
  img {
    font-size: 0;
    width: 100%;
    height: 100%;
  }
}
</style>