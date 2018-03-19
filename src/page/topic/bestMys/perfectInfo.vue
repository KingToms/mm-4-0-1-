<template>
  <div class="main">
    <div v-if="!success" class="info">
      <p class="note">请真实填写以下信息：</p>
      <input class="name" type="text" placeholder="请输入真实姓名" v-model="mysData.user_name">
      <div class="photo-box">
        <div class="item demo1">
          <img src="/static/topic/bestMys/2.1.2.jpg" alt="">
          <p>示例</p>
        </div>
        <div class="item add-img">
          <div class="img-box">
            <img :class="headimgVertical ? 'vertical': 'horizontal'" :src="headimgBase64" alt="">
          </div>
          <input type="file" @change="readFile($event, 'headimg')" accept="image/*" name="" id="headimg">
          <p class="operate" v-if="headimgBase64.length <= 0">点击上传正面形象照</p>
          <i class="icon-delete" v-if="headimgBase64.length > 0" @click="delateImg('headimg')"></i>
        </div>
        <div class="item demo2">
          <img src="/static/topic/bestMys/2.1.3.jpg" alt="">
          <p>示例</p>
        </div>
        <div class="item add-img">
          <div class="img-box">
            <img :class="certifiVertical ? 'vertical': 'horizontal'" :src="certificateBase64" alt="">
          </div>
          <input type="file" @change="readFile($event, 'certificate')" accept="image/*" name="" id="certificate">
          <p class="operate" v-if="certificateBase64.length <= 0">点击上传美业师相关证件</p>
          <i class="icon-delete" v-if="certificateBase64.length > 0" @click="delateImg('certificate')"></i>
        </div>
      </div>
      <div v-if="!unloading" class="submit" @click="submitBm">提交</div>
      <div v-else class="submit">图片上传中...</div>
    </div>
    <div v-else class="result">
      <div class="success-img">
        <img src="/static/topic/bestMys/icon_success.png" alt="">
        <p>报名成功</p>
      </div>
      <div class="success-tip">
        你的编号是：{{numbering}}，呼唤更多的朋友参加吧
      </div>
      <button class="share" @click="shareBoxShow = true">分享给小伙伴</button>
      <div class="success-tip ">
        <span>投票时间：2018年3月31日-4月6日</span><br> 敬请留意
      </div>
    </div>
    <img v-if="!success" src="/static/topic/bestMys/2.1.0bg.jpg" alt="" class="bg">
    <img v-else src="/static/topic/bestMys/2.2bg.jpg" alt="" class="bg">

    <!--分享指引-->
    <div class="share-guide" @click="hideShareBox" v-if="shareBoxShow">
      <div>
        <img src="/static/topic/bestMys/guide.png" alt="">
      </div>
    </div>
  </div>
</template>
<script>
import { Toast } from 'mint-ui';
import '../../../../node_modules/mint-ui/lib/toast/style.css';
import { mysTpBm, upLoadImage, mysTpIs } from '../../../service/getData';
import { getStore } from '../../../common/store.js';
import keyConf from '../../../common/keyConf.js';
import EXIF from 'exif-js';
export default {
  name: "perfectInfo",
  data() {
    return {
      mysData: {
        mobile: '', //手机号
        user_name: '',//用户名
        headimgurl: '',//用户头像(上传成功的图片路径)
        certificate: '',//用户证书(上传成功的图片路径)
      },
      numbering: '', //编号
      headimgBase64: '', // 上传的图片(头像)
      certificateBase64: '', // 上传的图片（证书）
      headimgVertical: true, //头像图片宽小于高
      certifiVertical: true, //证书图片宽小于高


      unloading: false, //图片上传中
      success: false, //是否报名成功
      shareBoxShow: false, // 分享指引
    };
  },
  created() {
    this.shareWechat();
    this.isBm();
  },
  methods: {
    /*微信分享*/
    shareWechat() {
      let _this = this;
      wx.ready(function() {
        _this.share_setup(
          "拼颜值，拼人气，你是最美美业师吗？",
          "豪送1388元女神大礼包~",
          "http://mm.qiaocat.com/topic-best-mys",
          "http://mm.qiaocat.com/static/topic/bestMys/share1.jpg"
        );
      });
    },
    share_setup(title, desc, link, imgUrl) {
      let _this = this;
      wx.onMenuShareAppMessage({
        title: title,
        desc: desc,
        link: link,
        imgUrl: imgUrl,
        success: function(res) {
          console.log(1, res);
          _this.shareBoxShow = false;

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
          _this.shareBoxShow = false;
        },
        error: function(err) {
          console.log(2, err);
        }
      });
    },

    // 是否已报名
    async isBm() {
      let res = await mysTpIs();
      if (res.status == 'ok') {
        this.numbering = res.data.number;
        this.success = true;
      } else {
        this.success = false;
      }
    },

    // 获取本地图片文件
    readFile(obj, str) {
      let _this = this;
      let file = obj.target.files[0];
      let Orientation;

      //获取照片方向角属性，用户旋转控制
      EXIF.getData(file, function() {
        // console.log(EXIF.pretty(this));
        EXIF.getAllTags(this);
        Orientation = EXIF.getTag(this, 'Orientation');
        //return;
      });

      let reader = new FileReader();
      reader.onload = function(e) {
        let image = new Image();
        image.src = e.target.result;
        image.onload = function() {
          let expectWidth = this.naturalWidth;
          let expectHeight = this.naturalHeight;
          if (this.naturalWidth > this.naturalHeight && this.naturalWidth > 800) {
            expectWidth = 800;
            expectHeight = expectWidth * this.naturalHeight / this.naturalWidth;
          } else if (this.naturalHeight > this.naturalWidth && this.naturalHeight > 1200) {
            expectHeight = 1200;
            expectWidth = expectHeight * this.naturalWidth / this.naturalHeight;
          }
          let canvas = document.createElement("canvas");
          let ctx = canvas.getContext("2d");
          canvas.width = expectWidth;
          canvas.height = expectHeight;
          ctx.drawImage(this, 0, 0, expectWidth, expectHeight);
          let base64;
          //1、修复ios
          if (navigator.userAgent.match(/iphone/i)) {
            //如果方向角不为1，都需要进行旋转
            if (Orientation != "" && Orientation != 1) {
              // alert(Orientation);
              switch (Orientation) {
                case 6: //需要顺时针（向左）90度旋转
                  _this.rotateImg(this, 'left', canvas);
                  break;
                case 8: //需要逆时针（向右）90度旋转
                  _this.rotateImg(this, 'right', canvas);
                  break;
                case 3: //需要180度旋转
                  _this.rotateImg(this, 'right', canvas); //转两次  
                  _this.rotateImg(this, 'right', canvas);
                  break;
              }
            }

            base64 = canvas.toDataURL("image/jpeg", 0.8);
          }
          /*else if (navigator.userAgent.match(/Android/i)) { // 修复android（有bug）
            let encoder = new JPEGEncoder();
            base64 = encoder.encode(ctx.getImageData(0, 0, expectWidth, expectHeight), 80);
          }*/
          else {
            if (Orientation != "" && Orientation != 1) {
              //alert('旋转处理');
              switch (Orientation) {
                case 6: //需要顺时针（向左）90度旋转
                  _this.rotateImg(this, 'left', canvas);
                  break;
                case 8: //需要逆时针（向右）90度旋转
                  _this.rotateImg(this, 'right', canvas);
                  break;
                case 3: //需要180度旋转
                  _this.rotateImg(this, 'right', canvas); //转两次
                  _this.rotateImg(this, 'right', canvas);
                  break;
              }
            }

            base64 = canvas.toDataURL("image/jpeg", 0.8);
          }


          let key = obj.target.id
          if (str == 'headimg') { //上传头像
            _this.headimgBase64 = base64;
            _this.headimgVertical = (image.width > image.height) ? false : true; //头像图宽是否小于高
          } else { //上传证书
            _this.certificateBase64 = base64;
            _this.certifiVertical = (image.width > image.height) ? false : true; //证书图宽是否小于高
          }

          _this.unloading = true; //图片上传中
          _this.funUploadImg(base64, key, str);
        };
      }
      reader.readAsDataURL(file);
    },

    //对拍照图片旋转处理
    rotateImg(img, direction, canvas) {
      //最小与最大旋转方向，图片旋转4次后回到原方向
      let min_step = 0;
      let max_step = 3;
      //let img = document.getElementById(pid);
      if (img == null) return;
      //img的高度和宽度不能在img元素隐藏后获取，否则会出错
      let height = img.height;
      let width = img.width;
      //let step = img.getAttribute('step');
      let step = 2;
      if (step == null) {
        step = min_step;
      }
      if (direction == 'right') {
        step++;
        //旋转到原位置，即超过最大值
        step > max_step && (step = min_step);
      } else {
        step--;
        step < min_step && (step = max_step);
      }
      //旋转角度以弧度值为参数
      let degree = step * 90 * Math.PI / 180;
      let ctx = canvas.getContext('2d');
      switch (step) {
        case 0:
          canvas.width = width;
          canvas.height = height;
          ctx.drawImage(img, 0, 0);
          break;
        case 1:
          canvas.width = height;
          canvas.height = width;
          ctx.rotate(degree);
          ctx.drawImage(img, 0, -height);
          break;
        case 2:
          canvas.width = width;
          canvas.height = height;
          ctx.rotate(degree);
          ctx.drawImage(img, -width, -height);
          break;
        case 3:
          canvas.width = height;
          canvas.height = width;
          ctx.rotate(degree);
          ctx.drawImage(img, -width, 0);
          break;
      }
    },

    // 上传图片
    async funUploadImg(base64, key, str) {
      let res = await upLoadImage({ image: base64 })
      // console.log("上传结果res:",res);
      if (res.status == 'ok') {
        if (str == 'headimg') { //上传头像
          this.mysData.headimgurl = res.data;
          document.querySelector('#' + str).value = '';
        } else { //上传证书
          this.mysData.certificate = res.data;
          document.querySelector('#' + str).value = '';
        }
        this.unloading = false;//图片上传完成
        // console.log("头像headimgurl：",this.mysData.headimgurl,";证书certificate：",this.mysData.certificate);
      }else{
        alert(res.msg);
        if(res.msg == '账号未登录'){
          this.$router.push('/topic-best-mys'); //报名登录页面
        }
      }
    },

    // 删除图片
    delateImg(str) {
      if (str == 'headimg') { //删除头像
        this.headimgBase64 = '';
        this.mysData.headimgurl = '';
      } else {//删除证书
        this.certificateBase64 = '';
        this.mysData.certificate = '';
      }
    },

    // 美业师投票报名
    async submitBm() {
      let qm_cookie = $.cookie(keyConf.qm_cookie);
      this.mysData.mobile = qm_cookie ? qm_cookie : '';
      if (!this.mysData.mobile) { //未登录
        Toast({
          message: '请先登录报名',
          duration: 2000,
          className: 'toast-tip'
        });
        let _self = this;
        setTimeout(function() {
          _self.$router.push('/topic-best-mys');
        }, 1000);
        return
      }
      if (this.mysData.user_name.trim() == '') {
        alert("真实姓名不能为空");
        return
      }
      if (this.mysData.headimgurl.length <= 0) {
        alert("请上传正面形象照");
        return
      }
      if (this.mysData.certificate.length <= 0) {
        alert("请上传美业师相关证件");
        return
      }
      let res = await mysTpBm(this.mysData);
      if (res.status == "ok") {
        this.numbering = res.data.number;
        this.success = true;
      } else {
        alert(res.msg);
      }
    },

    // 隐藏分享指引
    hideShareBox() {
      this.shareBoxShow = false;
    },
  },
}
</script>
<style lang="scss" scoped>
@import '../../../../src/assets/css/mixin.scss';
.main {
  position: relative;
  width: 100%;
  height: 100%;
  padding-top: 15%;
  /*背景图*/
  .bg {
    position: absolute;
    left: 0;
    top: 0;
    display: block;
    vertical-align: top;
    width: 100%;
  }
  .info {
    position: relative;
    z-index: 1;
    padding: 0 6.8%;
    .note {
      color: #fff;
      font-size: 1.7rem;
      padding-left: 6%;
    }
    .name {
      padding-left: 6%;
      display: block;
      width: 100%;
      height: 4.4rem;
      line-height: 4.4rem;
      margin-top: 6%;
      font-size: 1.7rem;
      color: #fff;
      background-color: transparent;
    }
    .photo-box {
      margin-top: 8%;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      .item {
        position: relative;
        margin-bottom: 0.5rem;
        width: 16rem;
        height: 16rem;
        p {
          position: absolute;
          left: 50%;
          transform: translate(-50%, 0);
          bottom: -0.3rem;
          color: #fff;
          text-align: center;
          font-size: 1rem;
          &.operate {
            width: 100%;
            bottom: 4rem;
            z-index: -1;
          }
        }
        ;

        &.demo1 {
          background-image: url('/static/topic/bestMys/2.1.1.png');
          background-size: cover;
          img {
            width: 78%;
            margin: 1.5rem 0 0 1.85rem;
            border-radius: 1rem;
          }
        }
        &.demo2 {
          background-image: url('/static/topic/bestMys/2.1.4.png');
          background-size: cover;
          img {
            width: 79.5%;
            margin: 3.5rem 0 0 1.65rem; // border-radius: 1rem;
          }
        }
      }
      .add-img {
        background-image: url('/static/topic/bestMys/button_upload.png');
        background-size: cover;
        padding: 1.35rem 1.73rem 2.1rem 1.8rem;
        .img-box {
          position: relative;
          width: 100%;
          height: 100%;
          border: none 0;
          @include borderRadius(0.7rem);
          overflow: hidden;
          img {
            display: block;
            border: 0;
            width: 100%;
            position: absolute;
            top: 0;
            left: 0;
            @include borderRadius(0.5rem);
            &.horizontal {
              height: 100%;
              width: auto;
              left: 50%;
              transform: translateX(-50%);
            }
            &.vertical {
              width: 100%;
              height: auto;
              top: 50%;
              transform: translateY(-50%);
            }
          }
        }
        /*img {
          width: 100%;
          height: 100%;
          // margin: 1.35rem 0 0 1.75rem;
          border-radius: 1rem;
          z-index: 1;
        }*/
        input {
          position: absolute;
          left: 1.75rem;
          top: 1.35rem;
          opacity: 0;
          width: 78%;
          height: 78%;
          border: none 0;
        }
      }
      .icon-delete {
        position: absolute;
        right: 5%;
        top: 0%;
        width: 2.5rem;
        height: 2.5rem;
        background-image: url('../../../assets/image/icon/login/icon_delete.png');
        background-size: cover;
        z-index: 2;
        cursor: pointer;
      }
    }
    /*提交*/
    .submit {
      width: 100%;
      height: 4.4rem;
      line-height: 4.4rem;
      border-radius: 2.2rem;
      background-color: #8584D0;
      color: #fff;
      text-align: center;
      font-size: 2.1rem;
      margin-top: 2.5rem;
    }
  }

  .result {
    position: relative;
    z-index: 1;
    padding: 15% 6.8% 0;
    text-align: center;
    color: #fff;
    .success-img {
      img {
        width: 6rem;
      }
      p {
        color: #fff;
        font-size: 2rem;
        margin-top: 0.4rem;
        letter-spacing: 0.3rem;
      }
    }
    .success-tip {
      color: #fff;
      font-size: 1.6rem;
      margin: 1rem 0 3rem;
      letter-spacing: 0.1rem;
      span {
        font-size: 1.4rem;
        color: #fff;
      }
    }
    .share {
      color: #fff;
      width: 100%;
      height: 4.4rem;
      line-height: 4.4rem;
      border-radius: 2.2rem;
      text-align: center;
      background-color: #8584D0;
      font-size: 2.2rem;
      margin-bottom: 1rem;
      letter-spacing: 0.3rem;
    }
  } // 分享指引
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