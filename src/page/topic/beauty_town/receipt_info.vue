<template>
  <div class="receipt-box">
    <img class="bg-img" src="/static/topic/beauty_down/luckdraw_3/bg_submit.jpg" alt="">
    <div class="info-box">
      <p class="title">填写收货信息</p>
      <div class="info">
        <input type="text" v-model="name" class="content" placeholder="收货人">
        <input type="tel" v-model="mobile" class="content" placeholder="联系电话" autocomplete="off" maxlength="11">
        <div class="area-box">
          <input type="text" v-model="area" readonly="readonly" class="content" placeholder="所在地区">
          <i class="icon"></i>
        </div>
        <div class="datail">
          <textarea id="address" type="text" v-model="address" placeholder="详细地址需填写楼栋楼层或房间号信息"></textarea>
          <i class="icon-delete" v-show="address.length > 0" @click="resetText()"></i>
        </div>
      </div>
      <p class="tips">我们会在5个工作日将礼品寄给你哦~</p>
      <div class="submit">提交</div>
    </div>
  </div>
</template>
<script>
export default {
  name: "receiptInfo",
  data () {
    return {
      name: '', // 收货人
      mobile: '', // 联系电话
      area: '', // 所在地区
      address: '', // 详细地址
      full_address: '', // 完整的收货地址
    };
  },
  methods: {
    resetText() {
      this.address = '';
    },
  },
}
</script>
<style lang="scss" scoped>
.receipt-box {
  position: relative;
  // 背景
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
      input.content {
        display: block;
        width: 100%;
        height: 4.4rem;
        border: .05rem solid #000;
        margin-top: 1.4rem;
        padding-left: 1rem;
        font-size: 1.5rem;
      }
      // 所在地区
      .area-box {
        position: relative;
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
      }
      // 具体地址
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
        padding-left: 1rem;
        padding-right: 3.5rem;
      }
    }
    // 提示
    .tips {
      font-size: 1.4rem;
      color: #000;
      line-height: 1.4rem;
      margin-top: 0.6rem;
    }
    // 提交
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
      margin-top: 3.5rem;
    }
  }
}
</style>