<template>
<div class="new-user-50">
  <div class="receive-box" v-if="!result_state">
    <section>
      <div class="first">
        <img src="./img/img1111_08.png" alt="">
        <div class="tip-box">
          <img src="./img/img_600.png" alt="">
          <span>新人现金券将放到你的账号中</span>
        </div>
      </div>
    </section>
    <section>
      <form id="form">
        <div class="phone">
          <input type="tel" class="mobile" maxlength="11" name="mobile" id="mobile" v-model="mobile" placeholder="输入手机号码" autocomplete="off">
        </div>
        <div class="vcode">
          <input type="number" name="vcode" id="vcode" v-model="vcode" placeholder="输入验证码">
          <input class="btn get-code" type="button" value="发送验证码" @click="sendCode" id="sendCode">
        </div>
        <div class="pt25">
          <a class="getCoupon" href="javascript:void(0);" @click="login">马上领取</a>
        </div>
      </form>
    </section>
  </div>
  <div class="result-box" v-else>
    <div class="pro_img">
      <img src="./img/get_it.png" alt="">
    </div>
    <div class="content">
      <p class="tips">领取成功</p>
      <p>新人现金券将放到你的账号中</p>
    </div>
    <a class="link-to" href="http://a.app.qq.com/o/simple.jsp?pkgname=com.qiaocat.app&fromcase=40002">下载APP登录查看</a>
    <img class="bottom-img" src="./img/img1111_09.png" alt="">
  </div>
</div>
</template>
<script>
import { getCode, authLogin, getCenterCoupons } from "../../../service/getData";
import common from "../../../common/common";
import { setStore } from "../../../common/store.js";
import keyConf from "../../../common/keyConf.js";
export default {
  name: "new_user_600",
  data() {
    return {
      mobile: "",
      vcode: "",
      channel: "",
      result_state: false, // 领取结果显示
    };
  },
  created() {
    this.channel = common.getQueryString("plid");
    this.shareWechat(); // 微信分享
  },
  methods: {
    async sendCode() {
      if (this.mobile.length < 11) {
        alert("手机格式不正确");
        return;
      }
      let countdown = 120;
      this.settime($(this.$el.querySelector("#sendCode")), countdown);
      let res = await getCode({ mobile: this.mobile, type: 1 });
      if (res.status == "ok") {
        alert('发送成功~');
      }else{
        alert(res.msg);
      }
    },
    async login() {
      if (!/^((1[0-9]{1})+\d{9})$/.test(this.mobile)) {
        alert("请输入正确的电话号码");
        return false;
      } else if (!/^\d{6}$/.test(this.vcode)) {
        alert("请输入正确的验证码");
        return false;
      }
      let result = await authLogin({
        mobile: this.mobile,
        code: this.vcode,
        plid: this.channel
      });
      if (result.status == "ok") {
        $.cookie(keyConf.qm_cookie, this.mobile, { expires: 1, path: "/" });
        setStore(keyConf.userMoile, this.mobile);
        this.getCoupon();

      } else {
        alert(result.msg);

      }
    },
    async getCoupon() {
      let res = await getCenterCoupons({ type: 'topic-600' });
      if (res.status === "ok") {
        // alert("领取成功");
        this.result_state = true; // 显示领取成功页面
      } else if(res.code == "1"){ // 你已领取过600优惠券
        alert(res.msg);
        this.$router.push("/");
      }else {
        alert(res.msg);
      }
    },
    settime($el, countdown) {
      let _this = this;
      if (countdown === 0) {
        $el.removeAttr("disabled");
        $el.val('发送验证码').css('backgroundColor','#e70034');
      } else {
        $el.attr('disabled', 'true').css('backgroundColor','#bfbfbf');
        $el.val(`${countdown}s`);
        countdown--;
        setTimeout(function() {
          _this.settime($el, countdown);
        }, 1000);
      }
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
};
</script>
<style lang="scss" scoped>
/*一、领取页面*/
.receive-box {
  .first {
    position: relative;
    font-size: 0;
    img {
      width: 100%;
    }
    .tip-box {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 4.5rem;
      line-height: 4.5rem;
      background-color: rgba(0,0,0, 0.5);
      img {
        width: 30%;
        margin-top: -0.9rem;
        margin-left: 1.5rem;
        vertical-align: middle;
      }
      span {
        margin-left: 1rem;
        font-size: 1.6rem;
        color: #fff;
      }
    }
  }
  #form {
    padding-top: 1.5rem;
  }
  #form div.phone,
  #form div.vcode {
    margin: 1.5rem 2.7rem 0;
    position: relative;
  }
  .vcode {
    padding-right: 30%;
  }
  @media (-webkit-min-device-pixel-ratio: 2) {
    #form div.phone:after,
    #form div.vcode:after {
      transform: scaleY(0.5);
      -webkit-transform: scaleY(0.5);
    }
  }
  @media (-webkit-min-device-pixel-ratio: 3) {
    #form div.phone:after,
    #form div.vcode:after {
      transform: scaleY(0.33);
      -webkit-transform: scaleY(0.33);
    }
  }
  #form div.vcode {
    position: relative;
  }
  #form input {
    width: 100%;
    height: 4.4rem;
    padding-left: 1rem;
    background-repeat: no-repeat;
    background-size: 1.4rem 1.8rem;
    background-position: 1.5rem center;
    font-size: 1.4rem;
    background-color: #EFEFEF;
  }

  #form div.vcode .btn {
    position: absolute;
    right: 0;
    top: 0;
    background-color: #E70034;
    width: 32%;
    font-size: 1.6rem;
    text-align: center;
    color: #fff;
    line-height: 4.4rem;
    border-radius: 0.5rem;
    padding: 0;
  }
  .pt25 {
    padding-top: 2.5rem;
    position: relative;
    .getCoupon {
      display: block;
      width: 90%;
      height: 4.4rem;
      line-height: 4.4rem;
      text-align: center;
      margin: 0 auto;
      background-color: #E70034;
      border-radius: 0.5rem;
      color: #fff;
      font-size: 1.8rem;
      cursor: pointer;
    }
  }

}

/*二、结果页面*/
.result-box {
  .pro_img {
    width: 100%;
    text-align: center;
    padding-top: 3.4rem;
    img {
      width: 10rem;
    }
  }
  .content {
    p {
      text-align: center;
      color: #010101;
      font-size: 1.5rem;
      margin-bottom: 3rem;
      &.tips {
        font-size: 2rem;
        font-weight: bold;
        margin-bottom: 1.5rem;
      }
    }
  }
  .link-to {
    margin: 0 auto;
    display: block;
    width: 90%;
    height: 4.4rem;
    background-color: #E70034;
    line-height: 4.4rem;
    text-align: center;
    color: #fff;
    font-size: 1.8rem;
    border-radius: 0.6rem;
    cursor: pointer;
  }
  .bottom-img {
    margin-top: 6.4rem;
    width: 100%;
  }
}
</style>