<template>
  <div class="dressparty">
    <section class="top-box">
      <div class="top">
        <img src="/static/topic/dressparty/order_top.jpg" alt="">
      </div>
    </section>
    <section class="bottom-box">
      <!--下单成功-->
      <div class="success">
        <img src="/static/topic/dressparty/success_order.jpg" alt="">
        <div class="number">{{num}}</div>
        <div class="tips">[截图保存]</div>
      </div>
    </section>
  </div>
</template>
<script>
import alertTip from '../../../components/common/alertTip'
import {getTopicNum} from '../../../service/getData.js'
export default {
  name: "successpay",
  data () {
    return {
      num: '00', // 下单成功排队号码
      type: 1, // type=1为活动价1元，type=10为活动价10元
      count: 0,
    };
  },
  created() {
    this.checkOrderStatus();

    this.type = this.$route.params.dressparty ? this.$route.params.dressparty : 1;
    this.shareWechat();
  },
  methods: {
    // 验证是否下单成功
    async checkOrderStatus (){
      if(this.$route.params.ordersn && this.$route.params.ordersn.length > 4){
        let res = await getTopicNum({sn: this.$route.params.ordersn});
        if(res.status == 'ok'){
          if(res.data.count < 10){
            this.num = "0" + res.data.count;
          }else{
            this.num = res.data.count;
          }
        }else{
          if(this.count < 6){
            this.count ++;
            setTimeout(this.checkOrderStatus,2000);
            if(this.count == 6){
              alert(res.msg);
            }
            // console.log("this.count:",this.count);
          }
        }
      }
    },
    // 微信分享
    shareWechat(){
      let _this = this;
      wx.ready(function () {
          _this.share_setup(
            '俏猫鬼怪狂欢夜 邀你一起鬼混',
            '画个荧光妆，这个万圣夜百鬼骚起来~',
            'http://mm.qiaocat.com/topic-dressparty?type=' + this.type,
            'http://mm.qiaocat.com/static/topic/dressparty/makeup_10.jpg'
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
    .tips {
      position: absolute;
      left: 39%;
      bottom: 17.4%;
      width: 24%;
      height: 3%;
      text-align: center;
      color: #fff;
      font-size: 1.4rem;
    }
  }
}
</style>