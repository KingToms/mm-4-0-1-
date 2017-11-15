<template>
  <div class="message">
    <lHeader :title="title"></lHeader>
    <section id="record" @click="click_add=false">
      <!--商品链接-->
      <div class="pro_link" v-if="orderState">
        <div class="link_top clear">
          <img src="../../assets/image/img/detail/pro_item03.png" alt="">
          <div class="more">
            <p class="title">韩式新娘跟妆（全日）韩式新娘跟妆全日</p>
            <p class="price">
              <span class="discount_price">￥1688</span>
              <span class="original_price">￥2188</span>
            </p>
          </div>
        </div>
        <div class="link_bottom">
          <div class="send_link" @click="send_link">发送商品链接</div>
        </div>
      </div>
      <p class="send_time">15:06</p>      
      <div class="msg_content" v-for="(item, index) in messages" :key="index">      
        <!--商品链接-->
        <div class="content" v-if="item.type == '1'" v-show="item.link" @click="backUp">
          <p class="send_time" v-show='item.time'>{{item.time}}</p>
          <div class="content_left"  >
            <div class="con">
              <div class="link_top clear">
                <img src="../../assets/image/img/detail/pro_item03.png" alt="">
                <div class="more">
                  <p class="title">韩式新娘跟妆（全日）韩式新娘跟妆全日</p>
                  <p class="price">
                    <span class="discount_price">￥1688</span>
                    <span class="original_price">￥2188</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="content_right">
            <img class="head_img" src="../../assets/image/icon/detail/service_icon_user.png" alt="">
          </div>
          <span class="send_tip" @click="sendTip" v-show="sendFailure"></span>
        </div>
        <!--留言内容-->
        <div class="content" v-if="item.type == '2'" v-show="item.msgs">
          <p class="send_time" v-show='item.time'>{{item.time}}</p>
          <div class="content_left">
            <div class="con">{{item.msgs}}</div>
          </div>
          <div class="content_right">
            <img class="head_img" src="../../assets/image/icon/detail/service_icon_user.png" alt="">
          </div>
        </div>
        <!--留言图片-->
        <div class="content" v-if="item.type == '3'" v-show="item.imgs">
          <p class="send_time" v-show="item.time">{{item.time}}</p>
          <div class="content_left">
            <div class="con">
              <img :src='item.imgs' width='100%'>
            </div>
          </div>
          <div class="content_right">
            <img class="head_img" src="../../assets/image/icon/detail/service_icon_user.png" alt="">
          </div>
        </div>
        <!--客服内容-->
        <div class="service" v-if="item.type == '4'" v-show='item.reply'>
          <p class="send_time" v-show='item.time'>{{item.time}}</p>
          <div class="service_left">
            <img class="head_img" src="../../assets/image/icon/detail/service_icon_service.png" alt="">
          </div>
          <div class="service_right">
            <div class="con">{{item.reply}}</div>
          </div>
        </div>
      </div>
    </section>

    <div class="message_box">
      <div class="footer">
        <div class="input">
          <input type="text" v-model="messageText" class="msg_con" autocomplete="on" @focus="setIconShow('msg')" @blur="setIconHide">
          <i class="icon-delete" v-show="iconShow=='msg'" @click="resetText('msg_con')"></i>
        </div>
        <img class="add_img" @click="addPicture" src="../../assets/image/icon/detail/service_btn_add.png" alt="">
        <button class="send" @click="send_msg">发送</button>
      </div>
      <div class="photo" v-show="click_add">
        <div class="camera">
          <a href="javascript:;" class="a_camera">
            <input id="cameraId" type="file" accept="image/*" capture="camera" @change="funReadFile">
          </a>
          <img src="../../assets/image/icon/detail/service_btn_camera.png" alt="">
          <p>拍照</p>
        </div>
        <div class="album">
          <a href="javascript:;" class="a_camera">
            <input id="albumId" type="file" accept="image/*" @change="funReadFile">
          </a>
          <img src="../../assets/image/icon/detail/service_btn_photo.png" alt="">
          <p>相册</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue';
import lHeader from '../../components/common/lHeader';
import { MessageBox } from 'mint-ui';
import '../../../node_modules/mint-ui/lib/message-box/style.css'
export default {
  name: "Message",
  data () {
    return {
      title: '留言',
      click_add: false,
      _self: this,
      iconShow: '',
      messageText: "",
      messages: [
        {"type":"4", reply:"您好，请问有什么可以帮您！"},
        {"type":"1", link:false},
        {"type":"2", msgs:"您好，我想问一下：韩式新娘妆包含哪些内容", time:"16:58"},
        {"type":"3", imgs:""},
        {"type":"4", reply:"您的反馈我们已经收到，我们会真诚回复，谢谢。"},
      ],
      sendFailure: false,
    };
  },
  props: ['orderState'],
  methods: {
    // 商品链接跳转
    backUp(){
      this.$router.push({path: '/detail/id=123'});
    },
    // 留言发送失败提示信息
    sendTip (){
      MessageBox({
        title: '',
        message: '重发该消息？',
        showCancelButton: true,
        cancelButtonClass: 'tip_button_cancal',
        confirmButtonClass: 'tip_button_confirm'
      }).then(action => {
        console.log("重新发送留言");
      });
    },
    // 发送商品链接
    send_link(){
      this.messages.push( {"type":"1", link:true, time: new Date().toLocaleString()});
    },
    // 发送留言
    send_msg(){
      if(this.messageText.trim() == ""){
        MessageBox({
          title: '',
          message: '留言内容不能为空',
          showCancelButton: false,
          cancelButtonClass: 'tip_button_cancal',
          confirmButtonClass: 'tip_button_confirm'
        })
      }else{
        this.messages.push( {"type":"2", msgs:this.messageText.trim(), time: new Date().toLocaleString()});
        this.messageText = "";
        this.click_add = false;

      }
    },
    // 上传图片
    funReadFile (obj){
      let _this = this;
      let file = obj.target.files[0];
      let reader = new FileReader();
      this.click_add = false;

      // 将文件以Data URL形式读入页面
      reader.readAsDataURL(file);
      reader.onload = function (e) {
        // 显示图片文件
        _this.messages.push({"type":"3", imgs:e.target.result});
        // let key = obj.target.id;
        // _this.data[key].push(e.target.result);
      };
    },
    setIconShow(choose){
      let self = this;
      setTimeout(function() {
        self.iconShow = choose;
      }, 300);
    },
    setIconHide () {
      let self = this;
      setTimeout(function() {
        self.iconShow = '';
      }, 300)
    },
    resetText (_self) {
      this.messageText = "";
    },
    // 添加图片
    addPicture (){
      this.click_add = !this.click_add;
    },
  },
  watch: {
    messages() {
      this.$nextTick(() => {
        var container = this.$el.querySelector("#record");
        container.scrollTop = container.scrollHeight;
      })    
    }
  },
  components: {
    lHeader
  }
}
</script>
<style lang="scss" scoped>
@import '../../assets/css/mixin.scss';
.message{
  position: relative;
  height: 100%;
  padding: 4rem 0 5rem;
  background-color: #fff;
  /*顶部*/
  .header{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background-color: #fff;
    z-index: 20;
  }
  /*聊天记录*/
  #record{
    height: 100%;
    overflow: auto;
    /* 增加该属性，可以增加弹性，是滑动更加顺畅 */
    -webkit-overflow-scrolling: touch;
    padding: 1.6rem 1.5rem 0;
    .send_time{
      height: 1.2rem;
      line-height: 1.2rem;
      text-align: center;
      color: #999;
      font-size: 1.2rem;
      margin-bottom: 0.5rem;
    }
    .pro_link{
      position: relative;
      padding: 1rem;
      margin-bottom: 3.4rem;
      background-color: #f3f3f3;
      border-radius: 0.5rem;
      min-height: 8rem;
    }
    .link_top img{
      position: absolute;
      top: 1rem;
      left: 1rem;
      margin-right: 1rem;
      width: 7rem;
    }
    .link_top .more{
      width: 100%;
      height: 7rem;
      padding-left: 8rem;
      .title{
        width: 100%;
        height: 3.5rem;
        line-height: 3.5rem;
        color: #000;
        font-size: 1.6rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .price{
        margin-top: 1rem;
        height: 1.5rem;
        line-height: 1.5rem;
        .discount_price{
          margin-right: 1rem;
          font-size: 1.6rem;
          color: #e65058;
          font-weight: bold;
        }
        .original_price{
          font-size: 1.1rem;
          color: #999;
          text-decoration: line-through;
        }
      }
    }
    .link_bottom{
      padding: 1.6rem 0;
      .send_link{
        @include wh(12.4rem, 2.8rem);
        margin: 0 auto;
        background-color: #ffe500;
        border-radius: .4rem;
        text-align: center;
        line-height: 2.8rem;
        font-size: 1.4rem;
        color: #000;
      }
    }
    .service{
      position: relative;
      padding-bottom: 2rem;
      .service_left{
        position: absolute;
        left: 0;
        top: 0.4rem;
        @include wh(4.4rem, 4.4rem);
        border-radius: 50%;
        .head_img{
          width: 100%;
        }
      }
      .service_right{
        padding-left: 5.8rem;
        width: 100%;
        .con{
          position: relative;
          width: 90%;
          max-width: 25rem;
          padding: 1.2rem;
          background-color: #FFF496;
          border-radius: 0.4rem;
          font-size: 1.6rem;
          color: #000;
          &::after{
            content: '';
            position: absolute;
            top: 1.8rem;
            left: -0.8rem;
            width: 0.1rem;
            height: 0.1rem;
            border-width: 1rem 0 0 1rem;
            border-style: solid;
            border-top-color: #FFF496;
            border-left-color: transparent;
          }
        }
      }
    }
    .content{
      position: relative;
      padding-bottom: 2rem;
      .content_left{
        padding-left: 10%;
        padding-right: 5.8rem;
        width: 100%;
        .con{
          position: relative;
          max-width: 25rem;
          padding: 1.2rem;
          background-color: #f3f3f3;
          border-radius: 0.4rem;
          font-size: 1.6rem;
          color: #000;
          &::after{
            content: '';
            position: absolute;
            top: 1.4rem;
            right: -0.8rem;
            width: 0.1rem;
            height: 0.1rem;
            border-width: 1rem 1rem 0 0;
            border-style: solid;
            border-top-color: #f3f3f3;
            border-right-color: transparent;
          }
        }
      }
      .content_right{
        position: absolute;
        right: 0;
        top: 0.4rem;
        @include wh(4.4rem, 4.4rem);
        border-radius: 50%;
        .head_img{
          width: 100%;
        }
      }
      .send_tip{
        @include wh(2.2rem, 2.2rem);
        @include bis("../../assets/image/icon/detail/service_btn_Failure.png");
        position: absolute;
        top: 50%;
        left: 0;
        display: block;
        margin-top: -2.4rem;
        cursor: pointer;
      }
    }
  }
  /*留言输入*/
  .message_box{
    width: 100%;
    background-color: #f3f3f3;
    position: absolute;
    left: 0;
    bottom: 0;
    z-index: 999;
    .footer{
      @include wh(100%, 5rem);
      line-height: 5rem;
      border-top: 0.05rem solid #ccc;
      .input{
        position: relative;
        @include wh(100%, 3.5rem);
        padding: 0 8rem 0 4.7rem;
        box-sizing: border-box;
        input[type=text]{
          @include wh(100%, 3.5rem);
          border-radius: 0.4rem;
          border: .05rem solid #ddd;
          background-color: #fff;
          padding-left: 1rem;
          font-size: 1.3rem;
          color: #000;
        }
        .icon-delete{
          @include wh(1.4rem,1.4rem);
          @include bis("../../assets/image/icon/detail/icon_delete.png");
          position: absolute;
          top: 1.8rem;
          right: 8.8rem;
        }
      }
      .add_img{
        display: inline-block;
        @include wh(2.7rem,2.7rem);
        position: absolute;
        left: 1rem;
        top: 1.2rem;
        cursor: pointer;
      }
      button.send{
        position: absolute;
        top: 0.56rem;
        right: 1rem;
        @include wh(6rem,3.5rem);
        line-height: 3.5rem;
        border-radius: .4rem;
        background-color: #ffe500;
        text-align: center;
        font-size: 1.6rem;
        color: #000;
        cursor: pointer;
      }
    }
    .photo{
      border-top: 0.05rem solid #ccc;
      @include wh(100%, 10.9rem);
      text-align: center;
      font-size: 0;
      .camera, .album{
        position: relative;
        display: inline-block;
        margin-top: 1.6rem;
        .a_camera{
          display: block;
          @include wh(6rem, 6rem);
          overflow: hidden;
          position: absolute;
          top: 0;
          left: 0;
        }
        input{
          font-size: 5rem;
          opacity: 0;
        }
      }
      .camera{
        margin-right: 3rem;
      }
      img{
        @include wh(6rem, 6rem);
      }
      p{
        font-size: 1.2rem;
      }
    }
  }
}
</style>