<template>
  <div class="receipt-box">
    <img class="bg-img" src="/static/topic/beauty_down/luckdraw_3/bg_submit.jpg" alt="">
    <div class="info-box" v-if="!resultState">
      <p class="title">填写收货信息</p>
      <div class="info">
        <input type="text" v-model="infoObj.real_name" class="content" placeholder="收货人">
        <input type="tel" v-model="infoObj.mobile" class="content" placeholder="联系电话" autocomplete="off" maxlength="11">
        <div class="area-box" @click="showPicker">
          <!--<input type="text" v-model="area" readonly="readonly" class="content" placeholder="所在地区">-->
          <div class="content con_area" :class="{hasCon: area != '所在地区'}">{{area ? area : '所在地区'}}</div>
          <i class="icon"></i>
        </div>
        <div class="datail">
          <textarea id="address" type="text" v-model="part_address" placeholder="详细地址需填写楼栋楼层或房间号信息"></textarea>
          <i class="icon-delete" v-show="part_address.length > 0" @click="resetText()"></i>
        </div>
      </div>
      <p class="tips">我们会在5个工作日内将礼品寄给你，到付不包邮哦~</p>
      <div class="submit" @click="submitInfo">提交</div>
    </div>
    <!--结果提醒-->
    <div class="result-box" v-else>
      <img src="/static/topic/beauty_down/luckdraw_3/submit_success.png" alt="提交成功">
      <div class="next-box">
        <span class="next" @click="shareBoxShow = true"></span>
        <span class="next" @click="goQuestionnaire"></span>
      </div>
    </div>

    <!--分享指引-->
    <div class="share-guide" @click="hideShareBox" v-if="shareBoxShow">
      <div>
        <img src="/static/topic/beauty_down/index/guide.png" alt="">
      </div>
    </div>
    <myAddress :showAddressPicker="showAddressPicker" :init="area" @save-address="saveAddress" @hide-picker="hidePicker"></myAddress>
  </div>
</template>
<script>
import myAddress from './children/address_picker.vue';
import keyConf from '../../../common/keyConf';
import { Toast } from 'mint-ui';
import '../../../../node_modules/mint-ui/lib/toast/style.css';
import { setAddData } from "@/service/getData";
export default {
  name: "receiptInfo",
  data() {
    return {
      infoObj: {
        key_id: '', // 主键id
        real_name: '', // 收货人
        mobile: '', // 联系电话
        address: '', // 完整的收货地址
      },

      showAddressPicker: false, // 显示地区选择
      area: '所在地区', // 所在地区
      part_address: '', // 详细地址
      shareBoxShow: false, // 分享指引
      resultState: false, // 提交结果显示
    };
  },
  created() {
    this.shareWechat();
  },
  components: {
    myAddress,
  },
  methods: {
    /*微信分享*/
    shareWechat () {
        let _this = this;
        wx.ready(function () {
            _this.share_setup(
                "美丽小城，俏猫三周年！",
                "俏猫三周年·集金币抽iphoneX~",
                "http://mm.qiaocat.com/topic-beauty-town",
                "http://mm.qiaocat.com/static/topic/beauty_down/luckdraw_3/share.jpg"
            );
        });
    },
    share_setup (title, desc, link, imgUrl) {
        let _this = this;
        wx.onMenuShareAppMessage({
            title: title,
            desc: desc,
            link: link,
            imgUrl: imgUrl,
            success: function (res) {
                console.log(1, res);
                _this.getMoreLuckdraw('share');

            },
            error: function (err) {
                console.log(1, err);
            }
        });
        wx.onMenuShareTimeline({
            title: title,
            link: link,
            imgUrl: imgUrl,
            success: function (res) {
                //todo
                console.log(2, res);
                _this.getMoreLuckdraw('share');
            },
            error: function (err) {
                console.log(2, err);
            }
        });
    },

    /*增加获奖次数*/
    async getMoreLuckdraw(addType) {
      // type: gold为金币后增加，share为分享后增加，paper为问卷后增加
      let res = await getMoreDraw({type: addType});
      if(res.status == 'ok'){
        // 分享增加
        if(addType == 'share'){
          this.shareBoxShow = false; //隐藏分享指引
          alert("分享成功，已为您增加1次抽奖机会，马上抽奖吧~");
          this.$router.push('./luckdraw?plid=107'); // 返回抽奖页面
        }
      }
    },

    // 显示地区选择
    showPicker() {
      this.showAddressPicker = !this.showAddressPicker
    },
    // 隐藏地区选择
    hidePicker() {
      // 接受子组件关闭popup事件
      this.showAddressPicker = false;
    },
    // 完成选择地区
    saveAddress(val) {
      // 从子组件接受返回所选值 val
      this.area = val;
      this.showAddressPicker = !this.showAddressPicker;
    },
    // 清空具体地址
    resetText() {
      this.part_address = '';
    },

    /*完善奖品收货地址*/
    async setFullAddress(infoObj) {
      let res = await setAddData(infoObj);
      if (res.status == 'ok') {
        this.resultState = true; // 提交成功
      }else{
        alert(res.msg);
        this.$router.push('/topic-beauty-town');
      }
    },

    /*提交收货信息*/
    submitInfo() {
      let qm_cookie = $.cookie(keyConf.qm_cookie);
      if(!qm_cookie){ // 未登录
        alert("账户暂未登录哦~");
        this.$router.push('/topic-beauty-town');
      }else {
        // 用户已登录
        if (this.infoObj.real_name.length <= 0) {
          Toast({
            message: '收货人不能为空',
            duration: 1000,
            className: 'toast-tip'
          });
          return
        }
        if (this.infoObj.mobile.length < 11) {
          Toast({
            message: '联系格式不正确',
            duration: 1000,
            className: 'toast-tip'
          });
          return
        }

        if(this.area.length > 0 && this.area != '所在地区' && this.part_address.length > 0){
          // 需选择了地区、填写具体地址
          this.area = this.area.replace(/-/g,'');
          this.infoObj.address = this.area + this.part_address;
        }
        if (this.infoObj.address.length <= 0 ) {
          Toast({
            message: '收货地址不完整',
            duration: 1000,
            className: 'toast-tip'
          });
          return
        }
        
        this.infoObj.key_id = $.cookie('key_id') ? $.cookie('key_id') : '';
        this.setFullAddress(this.infoObj);
      }

    },

    /*跳转到调查问卷*/
    goQuestionnaire() {
      this.$router.push('./questionnaire');
    },
    // 隐藏分享指引
    hideShareBox (){
      this.shareBoxShow = false;
    },
  },
}
</script>
<style lang="scss" scoped>
.receipt-box {
  position: relative; // 背景
  .bg-img {
    vertical-align: top;
    width: 100%;
  } 
  // 收货信息
  .info-box {
    position: absolute;
    left: 10%;
    top: 35%;
    width: 80%;
    .title {
      font-size: 2.3rem;
      color: #000;
    }
    .info {
      .content {
        display: block;
        width: 100%;
        height: 4.4rem;
        border: .05rem solid #000;
        margin-top: 1.4rem;
        padding-left: 1rem;
        font-size: 1.5rem;
      } // 所在地区
      .area-box {
        position: relative;
        .con_area {
          line-height: 4.4rem;
          color: #999;
        } // 已选择所在地区
        .hasCon {
          color: #000;
        }
        .icon {
          position: absolute;
          right: 1.5rem;
          top: 50%;
          -webkit-transform: translateY(-50%);
          transform: translateY(-50%);
          width: 0.7rem;
          height: 1.3rem;
          background-image: url('/static/topic/beauty_down/luckdraw_3/icon_next.png');
          background-size: 0.7rem, 1.3rem;
          background-position: center center;
          background-repeat: no-repeat;
        }
      }
      .datail {
        position: relative;
        .icon-delete {
          position: absolute;
          top: 2rem;
          right: 1.2rem;
          width: 1.4rem;
          height: 1.4rem;
          background-size: 1.4rem 1.4rem;
          background-image: url('/static/topic/beauty_down/luckdraw_3/icon_delete.png');
          cursor: pointer;
        }
      } // 具体地址
      #address {
        resize: none;
        word-break: break-all;
        overflow: auto;
        width: 100%;
        min-height: 4.4rem;
        font-size: 1.4rem;
        color: #000;
        border: .05rem solid #000;
        margin-top: 1.4rem;
        padding: 0.4rem 3.5rem 0.4rem 1rem;
      }
    } // 提示
    .tips {
      font-size: 1.4rem;
      color: #000;
      line-height: 1.5em;
      margin-top: 0.6rem;
    } // 提交
    .submit {
      width: 100%;
      height: 4.4rem;
      line-height: 4.4rem;
      text-align: center;
      border-radius: 4rem;
      background-color: #FF5466;
      color: #fff;
      cursor: pointer;
      font-size: 1.8rem;
      margin-top: 3rem;
    }
  }
  // 提交结果
  .result-box {
    position: absolute;
    left: 10%;
    top: 35%;
    width: 80%;
    img {
      width: 100%;
      margin-top: 3rem;
    }
    // 分享、问卷
    .next-box {
      position: absolute;
      left: 0;
      bottom: 0.2rem;
      span.next {
        display: inline-block;
        width: 12.5rem;
        height: 4.4rem;
        line-height: 4.4rem;
        font-size: 1.8rem;
        text-align: center;
        color: #fff;
        border-radius: 4rem;
        cursor: pointer;
        margin-left: 1rem;
        &:nth-of-type(2){
          margin-left: 3rem;
        }
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