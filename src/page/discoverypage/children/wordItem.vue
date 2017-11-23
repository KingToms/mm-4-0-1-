<template>
  <section class="word_box">
    <div class="main">
      <div class="head_img">
        <img :src="item.user_img | uesrImg">
      </div>
      <div class="name">{{item.user_name}}</div>
      <div class="comment">{{item.comment}}</div>
      <div class="gallery clear" v-if="item.images && item.images.length != 0">
        <a class="imgItem" v-for="(item, index) in comments_imgs" :key="index" :style="{backgroundImage : 'url('+item+')'}" href="javascript:void(0);" :data-img="item">
          <img :src="item" alt="">
        </a>
      </div>
      <div class="shopping clear">
        <a :href="`/detail/${item.product_id}`">
          <img :src="item.product_img | productImg" />
          <p>{{item.product_name}}</p>
        </a>
      </div>
      <div class="comment_info clear">
        <span class="time">{{item.created_at}}</span>
        <span class="praise" :class="{'praised': praise_state}" @click="addLike($event, item)">{{item.dianzan ? item.dianzan : '0'}}</span>
      </div>
      <div class="comments">
        <p class="word" v-for="(item, index) in comments_list" :key="index" @click="sendReply($event,item)">
          <span class="normal">{{item.reply_name}}</span>
          <i class="normal" v-if="item.replyed_name && item.replyed_name.length >0"> 回复
            <span class="normal">{{item.replyed_name}}</span>
          </i>:
          <i class="reply-com normal">{{item.comment}}</i>
        </p>
      </div>
      <div class="word_btn">
        <div class="submit-msg">
          <!-- <input id="comment_t" type="text" v-model="input_txt" @focus="setIconShow" @blur="setIconHide" placeholder="我有话说"> -->
          <textarea id="comment_t" type="text" v-model="input_txt" @focus="setIconShow" placeholder="我有话说" @blur="setFooterShow"></textarea>
          <!-- <div id="comment_t" contenteditable="true" v-text="input_txt" @focus="setIconShow" @blur="input_txt = $event.target.innerText"></div> -->
          <!-- <v-edit-div id="comment_t" v-model="input_txt" :value="input_txt" @input="setIconShow"></v-edit-div> -->
          <input id="submit_btn" type="button" value="发送" v-show="input_txt" @click="sendMsg($event)">
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import Vue from "vue";
import keyConf from "../../../common/keyConf"
import common from "../../../common/common"
import { storage_custom } from "../../../common/store"
import { userIsLogin, authToken, foundDzpl } from '../../../service/getData';
import { Toast } from 'mint-ui';
import '../../../../node_modules/mint-ui/lib/toast/style.css';
// import vEditDiv from '../../../components/common/editDiv';
export default {
  name: "wordItem",
  data() {
    return {
      praise_state: false, // 是否已点赞
      comments_imgs: [], // 评价图片
      comments_list: [], // 评论列表
      commentTXT: '', // 评论栏（被评论人姓名及id）
      input_txt: '', // 输入框内容
      user_info: {}, // 登录用户的信息
      comment_info: {
        comment: '', // 评论内容
        comment_id: '', // 评论id,评论了哪一条
        type: '1', // 类型 1:点赞、 2:评论
        reply_id: '', // 评论人id,谁评论了
        reply_name: '', // 评论人姓名
        replyed_id: '', // 被评论人id
        replyed_name: '', // 被评论人姓名
      }
    };
  },
  props: ["item", "like_list"],
  created() {
    this.comments_imgs = (this.item && this.item.images && this.item.images.length > 0) ? this.item.images.split(/[,|\\|]/) : ''; //评价图片列表数组
    this.comments_list = (this.item && this.item.pinglun && this.item.pinglun.length > 0) ? this.item.pinglun : ''; //评价列表数组

    this.setStorage();
    this.checkLike();
  },
  components:{
    // vEditDiv
  },
  mounted() {
    /*使评价图片显示正方形*/
    setTimeout(function() {
      var cw = $('.imgItem').width();
      $('.imgItem').css({
        'height': cw + 'px'
      });
    }, 0);
    $(window).resize(function() {
      var cw = $('.imgItem').width();
      $('.imgItem').css({
        'height': cw + 'px'
      });
    });

    /*评论图片查看器*/
    let bBox = require('../../../assets/js/baguetteBox.js');
    bBox.baguetteBox.run('.gallery');
  },
  methods: {
    /*用户是否已点赞*/
    checkLike() {
      let _this = this;
      _this.like_list.forEach(function(n, i) {
        if (n.moment_id == _this.item.id) {
          _this.praise_state = true;
          return;
        }
      })
    },
    /*点赞*/
    async addLike(event, item) {
      let qm_cookie = $.cookie(keyConf.qm_cookie);
      let isLogin = await userIsLogin(); // 验证是否登录，并获取用户信息
      if (!qm_cookie || isLogin.status == "error") {
        if (
          common.getQueryString("app") == "ios" ||
          common.getQueryString("app") == "android"
        ) {
          window.location.href = `/login?action=login`;
        } else {
          alert("未登录");
          let baseUrl = '/login?url=/discovery';
          this.$router.push(baseUrl);
        }
      } else { // 已登录
        this.user_info = isLogin.data; // 用户信息
        let res = await foundDzpl({ comment_id: item.id, type: 1, replyed_id: item.user_id });
        if (res.status == "ok") {
          this.praise_state = !this.praise_state;
          if (this.praise_state) {
            this.item.dianzan += 1;
          } else {
            (this.item.dianzan != 0) ? (this.item.dianzan -= 1) : this.item.dianzan;
          }
        }
      }

    },
    /*点击回复评论*/
    async sendReply(event, item) {
      let qm_cookie = $.cookie(keyConf.qm_cookie);
      let isLogin = await userIsLogin(); // 验证是否登录，并获取用户信息
      if (!qm_cookie || isLogin.status == "error") {
        if (
          common.getQueryString("app") == "ios" ||
          common.getQueryString("app") == "android"
        ) {
          window.location.href = `/login?action=login`;
        } else {
          alert("未登录");
          let baseUrl = '/login?url=/discovery';
          this.$router.push(baseUrl);
        }
      } else { // 已登录
        this.user_info = isLogin.data; // 用户信息
        this.commentTXT = $(event.target).parents(".comments").siblings(".word_btn").find("#comment_t");
        if (this.user_info.user_name != item.reply_name) { // 非回复自己，回复别人
          this.commentTXT.attr("placeholder","回复"+item.reply_name+":");
          this.commentTXT.data("replyed_id",item.reply_id);
          this.commentTXT.data("replyed_name",item.reply_name);
        }else {
          this.commentTXT.attr("placeholder","我有话说");
          this.commentTXT.data("replyed_id","");
          this.commentTXT.data("replyed_name","");
        }
        this.commentTXT.trigger("click").focus();
      }
    },
    /*发表评论*/
    async sendMsg(event) {
      let qm_cookie = $.cookie(keyConf.qm_cookie);
      let isLogin = await userIsLogin(); // 验证是否登录，并获取用户信息
      if (!qm_cookie || isLogin.status == "error") {
        if (
          common.getQueryString("app") == "ios" ||
          common.getQueryString("app") == "android"
        ) {
          window.location.href = `/login?action=login`;
        } else {
          alert("未登录");
          let baseUrl = '/login?url=/discovery';
          this.$router.push(baseUrl);
        }
      } else { // 已登录
        this.user_info = isLogin.data; // 用户信息

        this.comment_info.comment_id = this.item.id; // 评论id,评论了哪一条
        this.comment_info.type = '2'; // 类型 1:点赞、 2:评论
        this.comment_info.reply_id = ''; // 评论人id(后端自动获取)
        this.comment_info.reply_name = this.user_info.user_name; // 评论人姓名
        this.comment_info.comment = $.trim(this.input_txt); // 输入框内容(去除前后空格)
        this.comment_info.replyed_id = this.commentTXT ? this.commentTXT.data("replyed_id") : ''; // 被评论人id
        this.comment_info.replyed_name = this.commentTXT ? this.commentTXT.data("replyed_name") : ''; // 被评论人姓名
        
        if(this.comment_info.comment && this.comment_info.comment.length > 0){ // 发送内容不为空
          let resData = await foundDzpl({
            comment_id: this.comment_info.comment_id,
            type: this.comment_info.type,
            reply_id: this.comment_info.reply_id,
            reply_name: this.comment_info.reply_name,
            replyed_id: this.comment_info.replyed_id,
            replyed_name: this.comment_info.replyed_name,
            comment: this.comment_info.comment,
          });
          if (resData.status == "ok") { // 评论成功
            this.comments_list.push(this.comment_info);
            this.input_txt = ''; // 清空输入框
            this.history_txt = '';
            if(this.commentTXT){ // 回复别人成功后，回复默认值
              this.commentTXT.attr("placeholder","我有话说");
              this.commentTXT.data("replyed_id","");
              this.commentTXT.data("replyed_name","");
            }
            this.comment_info = {}; // 发送成功后,回复默认
          }

        }else { // 发送内容为空
          Toast({
            message: '评论内容不能为空',
            duration: 1000,
            className: 'toast-tip'
          });
          this.input_txt = '';
        }
      }

    },
    /*判断APP是否登录*/
    async setStorage() {
      let datetime = common.getQueryString("datetime");
      let app = common.getQueryString("app");
      if (datetime && app) {
        let res = await authToken({ token: datetime });
        res.status === "ok"
          ? $.cookie(keyConf.qm_cookie, res.data.id, {expires:1, path: '/'})
          : $.cookie(keyConf.qm_cookie, "");
        storage_custom.set(keyConf.token, datetime);
      } else if (!datetime && app) {
        storage_custom.set(keyConf.token, "");
        $.cookie(keyConf.qm_cookie, "");
      }
    },
    setIconShow($event){
      // this.input_txt = this.history_txt && this.history_txt.length > 0 ? this.history_txt : $event.target.innerText;
      // this.input_txt = $event.target.innerText;
      this.btnShow = true;
      this.showHeaderFooter();
    },
    showHeaderFooter(){
      $('.footer').hide();
    },
    setFooterShow(){
      $('.footer').show();
    }
  },
  filters: {
    uesrImg(item) {
      if (!item) {
        return require("../../../assets/image/icon/detail/my_photo_default.png");
      } else {
        if (item.indexOf("http") != -1) {
          return item;
        } else {
          return "http://pic.qiaocat.com/upload/" + item;
        }
      }
    },
    productImg(imgUrl) {
      if (!imgUrl)
        return require('../../../assets/image/img/detail/square_default_bg.jpg');
      if (imgUrl.indexOf("http") > -1)
        return imgUrl;
      return "http://pic.qiaocat.com/upload/" + imgUrl;
    },
  }
}
</script>
<style lang="scss" scoped>
@import '../../../assets/css/baguetteBox.min.css';
@import '../../../assets/css/mixin.scss';
.word_box {
  width: 100%;
  padding: 2rem 1.5rem 2rem 0;
  border-bottom: 0.05rem solid #ddd;
  .main {
    position: relative;
    padding-left: 4rem;
    width: 100%;
    @include sc(1.4rem, #000);
    /*用户头像*/
    .head_img {
      position: absolute;
      top: 0;
      left: 0;
      @include wh(3rem, 3rem);
      margin-right: 1rem;
      img {
        width: 100%;
        height: 100%;
        // border-radius: 50%;
        @include borderRadius(50%);
        vertical-align: middle;
      }
    }
    /*名字*/
    .name {
      line-height: 3rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    /*评论*/
    .comment {
      line-height: 1.8rem;
      padding: 0.5rem 0 1.2rem;
    }
    /*发表图片*/
    .imgItem {
      display: block;
      float: left;
      width: 29.9%;
      @include borderRadius(0.4rem);
      overflow: hidden;
      margin-left: 1rem;
      margin-bottom: 1rem;
      background-position: center;
      background-size: cover;
      &:first-child,
      &:nth-child(3n+1) {
        margin-left: 0;
      }
      img {
        display: block;
        width: 100%;
        opacity: 0;
        // border-radius: 0.4rem;
        @include borderRadius(0.4rem);
      }
    }

    /*产品链接*/
    .shopping {
      background-color: #EEEEEE;
      height: 5rem;
      margin-top: 0.6rem;
      // border-radius: 0.4rem;
      @include borderRadius(0.4rem);
      a {
        display: block;
        width: 100%;
        height: 100%;
      }
      img {
        float: left;
        margin: 0.5rem;
        width: 4rem;
        height: 4rem;
      }
      p {
        height: 5rem;
        line-height: 5rem;
        float: left;
        @include sc(1.4rem, #000);
        margin-left: 0.5rem;
      }
    }
    /*时间、点赞数*/
    .comment_info {
      margin: 0.6rem 0 1.2rem;
      .time {
        float: left;
        margin-top: 0.3rem;
        @include sc(1rem, #999);
      }
      .praise {
        float: right;
        display: block;
        padding-left: 2.1rem;
        @include sc(1.4rem, #999);
        background: url('/static/icon/discovery/found_icon_like_nor.png') 0 0.1rem/1.6rem 1.5rem no-repeat;
        cursor: pointer;
      }
      .praised {
        color: $themeRed;
        background-image: url('/static/icon/discovery/found_icon_like_sel.png');
      }
    }
    /*客户评论内容*/
    .comments {
      font-size: 1.4rem;
      color: #000;
      text-align: left;
      .word {
        line-height: 1.8rem;
        margin-bottom: 0.4rem;
        span {
          color: #666;
        }
        .normal {
          font-style: normal;
        }
      }
    }
    /*我有话说*/
    .word_btn {
      // @include wh(100%,3rem);
      width: 100%;
      border: 0.05rem solid #bbb;
      border-radius: 0.4rem;
      // line-height: 3rem;
      text-align: left;
      cursor: pointer;
      margin-top: 1rem;
      padding-left: 3.3rem;
      padding-top: .3rem;
      background: url('/static/icon/discovery/find_icon_comment.png') 0.8rem 0.5rem/1.8rem no-repeat;
      .submit-msg {
        // position: relative;
        width: 100%;
        #comment_t {
          resize:none;
          word-break:break-all;
          overflow: auto;
          width: 80%;
          max-height:8rem;
          min-height: 100%;
          @include sc(1.4rem,
          #000);
        }
        #submit_btn {
          position: absolute;
          bottom: 0.4rem;
          right: 0.5rem;
          padding: 0 0.8rem;
          height: 2.2rem;
          line-height: 2.2rem;
          text-align: center;
          // border-radius: 0.4rem;
          @include borderRadius(0.4rem);
          color: #fff;
          background-color: #E70034;
          cursor: pointer;
        }
      }
    }
  }
}
</style>