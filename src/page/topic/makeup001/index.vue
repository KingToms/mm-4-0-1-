<template>
  <div class="dressparty">
    <section class="top-box">
      <div class="top">
        <img src="/static/topic/makeup001/order_top0.01.jpg" alt="">
      </div>
    </section>
    <section class="bottom-box">
      <!--活动价0.01元-->
      <div class="price-one">
        <img src="/static/topic/makeup001/order_0.01.jpg" alt="">
      </div>
      <!--手机号、验证码-->
      <form v-if="type == 0.01">
        <input class="tel" type="tel" v-model="mobile" @focus="inputText" @blur="inputBlur" placeholder="请输入手机号码" maxlength="11">
        <i class="icon-delete" v-show="iconShow" @click="resetText"></i>
        <input class="mCode" v-model="code" type="tel" placeholder="请输入验证码" maxlength="6">
        <input type="button" value="获取验证码" id="sendCode" class="btn-code" @click="sendCode"></input>
        <div class="orderpay" @click="getOrder"></div>
      </form>
    </section>
  </div>
</template>
<script>
import alertTip from '../../../components/common/alertTip'
import {getCode,authLogin,createOrder} from '../../../service/getData.js'
import common from '../../../common/common.js'
import {setStore} from '../../../common/store.js'
import keyConf from '../../../common/keyConf.js'
export default {
  name: "makeup001",
  data () {
    return {
      num: '00', // 下单成功排队号码
      type: 0.01, // type=0.01为活动价0.01元
      iconShow: false,// 删除按钮显示隐藏
      countdown: 60,
      mobile: '', // 手机号码
      code: '', // 验证码
      sendTime: '', // 服务时间
      proid: '', // 产品ID
      plid: '', // 推广链接表ID
    };
  },
  created() {
    this.showProduct();

    this.shareWechat();
  },
  methods: {
    // 显示活动价产品
    showProduct (){
      if(common.getQueryString("type") && common.getQueryString("type") == "0.01"){
        this.type = common.getQueryString("type");
        if(this.type == 0.01){
          this.proid = '1000570'; // 活动价0.01元产品
        }
      }else{
        window.location.href = "?type=0.01";
      }
    },

    // 获取短信验证码
    async sendCode () {
      if(this.mobile.length < 11){
        alert('手机格式不正确');
        return
      }
      this.countdown = 60
      common.settime($(this.$el.querySelector("#sendCode")),this.countdown);
      let res = await getCode({mobile: this.mobile, type: 1})
      if(res.status != 'ok'){
        alert(res.msg);
      }
    },
    // 验证码登录
    async codeLogin () {
      this.plid = common.getQueryString("plid") ? common.getQueryString("plid") : "";
      let result = await authLogin({mobile: this.mobile,code: this.code,plid: this.plid})
      if(result.status == 'ok'){
        $.cookie(keyConf.qm_cookie, this.mobile, {expires:1, path: '/'})
        setStore(keyConf.userMoile, this.mobile)

        this.payment(this.mobile);
      }else{
        alert(result.msg);
      }
    },
    // 获取下单时间4小时后为服务时间(send_time)
    getSendTime (){
      // 获取当前时间的时间戳
      let timestamp = new Date().getTime();
      // 获取4小时的时间戳
      let timestamp4 = new Date("2017-10-28 14:00:00").getTime() - new Date("2017-10-28 10:00:00").getTime();
      let sendTimestamp = timestamp + timestamp4;
      this.timetrans (sendTimestamp);
    },

    // 时间戳转化成时间日期：
    timetrans (date){
      var date = new Date(date);
      var Y = date.getFullYear() + '-';
      var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
      var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
      var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
      var m = (date.getMinutes() <10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
      var s = (date.getSeconds() <10 ? '0' + date.getSeconds() : date.getSeconds());
      this.sendTime = Y+M+D+h+m+s;
      return Y+M+D+h+m+s;
    },

    // 立即支付
    async payment(mobile) {
      this.getSendTime(); // 获取服务时间（下单时间4小时后）
      let obj = {
        items: [{"id":this.proid,"number":1}], // 产品ID,数量1
        service_form: 2, // 服务方式：上门服务
        use_points: false,
        use_balance: false,
        money: 0.01, // 产品价格
        money_after: 0.01, // 产品价格
        contact: {
          consignee: mobile,
          address: '广州市天河区黄埔大道西平云广场163号通讯大楼西区6层',
          mobile: mobile,
          // send_time: this.sendTime,
          send_time: '2018-11-07 23:55:00',
          province_id: '0',
          city_id: '0',
          district_id: '0',
          postscript: ''
        },
        coupon_sn: 0,
        stylist_id: 0,
        from_ad: '#topic_makeup001',
      }
      let data = JSON.stringify(obj)
      let res = await createOrder({ data: data });
      if (res.status == 'ok') {
        if (res.data.pay_status == 2) { // 使用账户余额支付
          this.$router.push('/orderlist');
          return
        }
      this.$router.push({ name: 'payment', params: { orderid: res.data.sn }, query: { dressparty: "0.01" } });

      } else {
        alert(res.msg)
      }
    },

    // 立即下单
    getOrder () {
      this.codeLogin();
    },

    // 输入手机号码时
    inputText () {
      let self = this
      setTimeout(function() {
        self.iconShow = true;
      }, 300);
    },
    inputBlur (){
      if(this.mobile == ""){
        let self = this
        setTimeout(function() {
          self.iconShow = false;
        }, 300);
      }
    },
    // 删除手机号码
    resetText () {
      this.mobile = "";
      this.iconShow = false;
    },
    // 微信分享
    shareWechat(){
      let _this = this;
      wx.ready(function () {
          _this.share_setup(
            '俏猫万圣狂欢趴，一起来嗨',
            '不鬼怪，无狂欢，妆起来',
            'http://mm.qiaocat.com/topic-makeup001?type=0.01',
            'http://mm.qiaocat.com/static/topic/makeup001/makeup_0.01.jpg'
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
    }
  }
}
</script>
<style lang="scss" scoped>
.dressparty {
  position: relative;
  width: 100%;
  padding: 0;
  img {
    font-size: 0;
    width: 100%;
    border: 0 none;
    vertical-align: top;
  }
  .top-box {
  }
  .bottom-box {
    .price-one {
    }
    input.tel,
    input.mCode {
      position: absolute;
      height: 4.4%;
      left: 10%;
      text-align: left;
      text-indent: 1rem;
      color: #9a5113;
      background-color: rgba(0, 0, 0, 0);
      font-size: 1.6rem;
      padding-left: 2rem;
      color: #fff;
      z-index: 2;
    }
    .tel {
      display: block;
      width: 80%;
      bottom: 30.7%;
    }
    .icon-delete {
      position: absolute;
      right: 15%;
      bottom: 31.5%;
      width: 1.8rem;
      height: 1.8rem;
      background-image: url('../../../assets/image/icon/login/icon_delete.png');
      background-size: cover;
      z-index: 2;
    }
    .mCode {
      width: 50%;
      bottom: 22.7%;
    }
    .btn-code {
      position: absolute;
      bottom: 22.7%;
      right: 11%;
      width: 24%;
      height: 4.4%;
      text-align: center;
      font-size: 1.6rem;
      color: #fff;
      cursor: pointer;
      background-color: transparent !important;
    }
    .orderpay {
      position: absolute;
      width: 46%;
      height: 7%;
      bottom: 12.7%;
      left: 27%;
      cursor: pointer;
    }
    .number {
      position: absolute;
      left: 45%;
      bottom: 28.2%;
      width: 16%;
      height: 3%;
      text-align: center;
      color: #ffc053;
      font-size: 2.1rem;
    }
  }
}
</style>