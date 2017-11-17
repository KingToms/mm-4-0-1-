<template>
  <div class="discovery">
    <div class="dis-header">
      <div class="header" v-show="hideFooterHeader">
        <div class="title">
          <h2>发现</h2>
        </div>
      </div>
    </div>
    <div class="banner">
      <!--<img src="/static/banner/adver.jpg" alt="">-->
    </div>
    <!--顶部轮播-->
    <div class="swipe-wrapper" v-show="topCarousel">
      <mt-swipe>
        <mt-swipe-item v-for="(item,index) in topCarousel" :key="index">
          <a class="imgshow" target="_blank" :href="item.link">
            <img :src="item.img_url" alt="">
          </a>
        </mt-swipe-item>
      </mt-swipe>
    </div>
    <div class="content">
      <wordItem v-for="(item, index) in discovery_list" :key="index" :item="item" :like_list="like_list" @showSendBox="showSendBox"></wordItem>
    </div>

    <!--评论-->
    <div class="comment_box" v-show="hide_sendbox" @click.self="hideSendBox">
      <div class="send_box">
        <form class="submit-msg">
          <div class="input">
            <input id="comment_t" type="text" v-model="comment_txt" @focus="setIconShow" @blur="setIconHide" placeholder="评论" autocomplete="on" autofocus="autofocus">
            <div class="box-delete" v-show="icon_show" @click="resetText">
              <i class="icon-delete"></i>
            </div>
          </div>
          <div class="send" @click="sendCommentMsg">发送</div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import wordItem from './children/wordItem'
import { Toast, Swipe, SwipeItem } from 'mint-ui'
import '../../../node_modules/mint-ui/lib/toast/style.css'
import '../../../node_modules/mint-ui/lib/swipe/style.css'
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
import { getFoundList } from '../../service/getData'
export default {
  name: 'discovery',
  data() {
    return {
      hideFooterHeader: true,
      topCarousel: [], // 顶部轮播图
      discovery_list: [], // 评论列表
      like_list: [], // 用户点赞列表
      hide_sendbox: false, // 默认隐藏输入框
      icon_show: false, // 隐藏评论时的删除按钮
      comment_txt: '', // 评论的内容
      comment_top: 0, // 评论距离顶部的距离
      count: '', // 评论总数
      page_size: '10', // 一页显示10条
      page: '1', // 页数
    }
  },
  created() {
    this.showHeaderFooter();
    this.getFoundList();
  },
  methods: {
    /*获取发现页数据*/
    async getFoundList() {
      let res = await getFoundList({})
      if (res.status == "ok") {
        this.count = res.count;
        this.page_size = res.page_size;
        this.page = res.page;

        this.topCarousel = res.ad;
        this.discovery_list = res.data;
        this.like_list = res.user_dz ? res.user_dz : '';
      }
    },


    // 发送评论
    sendCommentMsg() {
      if (this.comment_txt == '') {
        Toast({
          message: "评论不能为空，请重新输入",
          duration: 1000,
          className: 'toast-tip',
        });
      }
    },

    // 显示评论窗口
    showSendBox(comment_info) {
      this.comment_top = comment_info.pageY;
      console.log("this.comment_top:",this.comment_top);
      this.hide_sendbox = true;
      $("#comment_t").show();
      setTimeout(() => {
        if ($('.comment_box').css('display') == 'block') {
          $("#comment_t").trigger("click").focus();
          $("html,body").animate({
            scrollTop: document.body.scrollHeight
          },1);
          // document.body.scrollTop = document.body.scrollHeight;
        }
      },50);
    },

    // 隐藏评论窗口
    hideSendBox (){
      this.hide_sendbox = false;
      $("html,body").animate({
        scrollTop: this.comment_top
      },1);
    },

    // 显示删除按钮
    setIconShow() {
      let self = this
      setTimeout(function() {
        self.icon_show = true;
      }, 300)
    },
    // 隐藏删除按钮
    setIconHide() {
      let self = this;
      setTimeout(function() {
        self.icon_show = false;
      }, 300)
    },
    // 点击删除按钮，清空输入内容
    resetText() {
      this.comment_txt = '';
    },
    /*APP站内隐藏顶部*/
    showHeaderFooter() {
      let query = this.$route.query
      query = query ? query : {}
      if (query.app == 'ios' || query.app == 'android') {
        this.hideFooterHeader = false;
      }
    }
  },
  components: {
    wordItem,
  }
}
</script>
<style lang="scss" scoped>
@import '../../assets/css/mixin.scss';
.discovery {
  @include wh(100%, 100%);
  /* @include bgColor(#f3f3f3);*/
  padding-bottom: 50px;
  .dis-header {
    @include wh(100%, 4rem);
  }
  .header {
    position: fixed;
    z-index: 999;
    @include wh(100%, 4rem);
    @include bgColor(#fff);
    .title {
      @include wh(100%, 4rem); // border-bottom: 1px solid #999;
      @include average(#999);
      line-height: 4rem;
      text-align: center;
      h2 {
        font-size: 1.8rem;
        color: #000;
        letter-spacing: 1px;
      }
    }
  }
  /*banner*/
  .banner {
    font-size: 0;
    img {
      font-size: 0;
      width: 100%;
    }
  }
  .swipe-wrapper {
    width: 100%;
    height: 20rem;
    a.imgshow {
      display: block;
      width: 100%;
      min-height: 18rem;
    }
    img {
      width: 100%;
    }
  }

  .content {
    @include wh(100%, 100%);

    padding: 0 0 1.5rem 1.5rem;
  }

  /*评论输入框*/
  .comment_box {
    @include wh(100%, 100%);
    position: fixed;
    left: 0;
    top: 0;
    z-index: 1000;
    background-color: rgba(0, 0, 0, 0.3);
    .send_box {
      position: absolute;
      left: 0;
      bottom: 0;
      border-top: 0.05rem solid rgb(204, 204, 204);
      line-height: 5rem;
      width: 100%;
      height: 5rem;
      background-color: #eee;
      .input {
        position: relative;
        width: 100%;
        padding: 0 8rem 0 1rem;
        box-sizing: border-box;
        input[type=text] {
          border: none;
          width: 100%;
          height: 3.5rem;
          border-radius: 0.4rem;
          border: 0.05rem solid #ddd;
          background-color: #fff;
          padding-left: 0.8rem;
          font-size: 1.4rem;
          color: #000;
        }
        .box-delete {
          padding: 0.7rem;
          position: absolute;
          top: 0.9rem;
          right: 8.5rem;
          cursor: pointer;
          .icon-delete {
            display: block;
            width: 1.8rem;
            height: 1.8rem;
            background-image: url("/static/icon/discovery/icon_delete.png");
            background-repeat: no-repeat;
            background-size: 100% 100%;
          }
        }
      }
      .send {
        position: absolute;
        top: 0.68rem;
        right: 1rem;
        width: 6rem;
        height: 3.5rem;
        line-height: 3.5rem;
        border-radius: .4rem;
        background-color: #4795ff;
        text-align: center;
        font-size: 1.4rem;
        color: #fff;
        cursor: pointer;
      }
    }
  }
}
</style>