<template>
<div class="new-user-888">
  <section>
      <div class="first">
        <img src="./img/header.jpg" alt="">
      </div>
    </section>
    <section>
      <form id="form">
        <div class="phone">
          <input type="tel" class="mobile" maxlength="11" name="mobile" id="mobile" v-model="mobile" placeholder="输入手机号码" autocomplete="off">
        </div>
        <div class="vcode">
          <input type="number" name="vcode" id="vcode" v-model="vcode" placeholder="输入验证码">
          <span class="split"></span>
          <input class="btn get-code" type="button" value="发送验证码" @click="sendCode" id="sendCode">
          <!-- <a class="btn get-code" href="javascript:void(0);" @click="sendCode" id="sendCode">获取验证码</a> -->
        </div>
        <div class="first pt25">
          <img src="./img/btn-register.png" alt="注册领取888元">
          <a class="getCoupon" href="javascript:void(0);" @click="login"></a>
        </div>
      </form>
    </section>
    <section>
        <div class="first">
          <img src="./img/footer.jpg" alt="">
        </div>
      </section>
</div>
</template>
<script>
import { getCode, authLogin, getCenterCoupons } from "../../../service/getData";
import common from "../../../common/common";
import { setStore } from "../../../common/store.js";
import keyConf from "../../../common/keyConf.js";
export default {
  name: "new-user-888",
  data() {
    return {
      mobile: "",
      vcode: "",
      channel: ""
    };
  },
  created() {
    this.channel = common.getQueryString("plid");
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
        // this.$router.push("/");
      } else {
        alert(result.msg);
        // this.$router.push("/");
      }
    },
    async getCoupon() {
      let res = await getCenterCoupons({ type: 'topic-888' });
      if (res.status === "ok") {
        alert("领取成功");
        this.$router.push("/");
      } else {
        alert(res.msg);
        this.$router.push("/");
      }
    },
    settime($el, countdown) {
      let _this = this;
      if (countdown === 0) {
        $el.removeAttr("disabled");
        $el.val("发送验证码");
      } else {
        $el.attr("disabled", "true");
        $el.val(`${countdown}s`);
        countdown--;
        setTimeout(function() {
          _this.settime($el, countdown);
        }, 1000);
      }
    }
  }
};
</script>
<style lang="css" scoped>
body,
div,
span,
header,
footer,
nav,
section,
aside,
article,
ul,
dl,
dt,
dd,
li,
a,
p,
h1,
h2,
h3,
h4,
h5,
h6,
i,
b,
textarea,
button,
input,
select,
figure,
figcaption {
  padding: 0;
  margin: 0;
  list-style: none;
  font-style: normal;
  text-decoration: none;
  border: none;
  color: #333;
  font-weight: normal;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  box-sizing: border-box;
  -webkit-tap-highlight-color: transparent;
  -webkit-font-smoothing: antialiased;
  outline: none;
  letter-spacing: 1px;
}

body:hover,
div:hover,
span:hover,
header:hover,
footer:hover,
nav:hover,
section:hover,
aside:hover,
article:hover,
ul:hover,
dl:hover,
dt:hover,
dd:hover,
li:hover,
a:hover,
p:hover,
h1:hover,
h2:hover,
h3:hover,
h4:hover,
h5:hover,
h6:hover,
i:hover,
b:hover,
textarea:hover,
button:hover,
input:hover,
select:hover,
figure:hover,
figcaption:hover {
  outline: none;
}

body .position-abs {
  position: absolute;
}

body div.first {
  position: relative;
}

body div.first img {
  width: 100%;
}

#form {
  padding-top: 1.5rem;
}

#form div.phone,
#form div.vcode {
  margin: 1.5rem 2.7rem 0;
  position: relative;
}

#form div.phone:after,
#form div.vcode:after {
  display: block;
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  border-top: 1px solid #b6b0b0;
  content: " ";
  transform-origin: 0 0;
  -webkit-transform-origin: 0 0;
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

#form div.vcode .split {
  position: absolute;
  left: 66%;
  top: 50%;
  transform: translateY(-50%);
  height: 2.5rem;
  border-left: 1px solid #6b6b6b;
}

#form div.vcode .btn {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  width: 25%;
  font-size: 1.4rem;
  color: #3c3c3c;
  padding: 1.5rem 0;
  text-align: center;
  background-color: #fff;
}

#form input {
  width: 100%;
  height: 4.4rem;
  padding-left: 4.4rem;
  background-repeat: no-repeat;
  background-size: 1.4rem 1.8rem;
  background-position: 1.5rem center;
  font-size: 1.4rem;
}

#form input#mobile {
  background-image: url("./img/icon-phone.png");
}

#form input#vcode {
  width: 65%;
  background-image: url("./img/icon-code.png");
}

.pt25 {
  padding-top: 2.5rem;
  position: relative;
}

.pt25 a {
  position: absolute;
  top: 33.2%;
  left: 3.73%;
  width: 92.5%;
  height: 45.3%;
  border-radius: 2rem;
}
</style>