<template>
  <section class="word_box">
    <div class="main">
      <div class="head_img">
        <img :src="'' | uesrImg">
      </div>
      <div class="name">黄美娜</div>
      <div class="comment">化妆师很专业很有耐心，在人生最重要的一天化得美美哒~</div>
      <!--<ul class="clear">
        <li class="imgItem" style="backgroundImage : url('http://pic.qiaocat.com/upload/user/cdaa995186d4bb3a9ca68f1d01e0df75.jpg')">
          <img src="../../../assets/image/icon/detail/service_btn_photo.png">
        </li>
        <li class="imgItem" style="backgroundImage : url('http://pic.qiaocat.com/upload/user/cdaa995186d4bb3a9ca68f1d01e0df75.jpg')">
          <img src="../../../assets/image/icon/detail/service_btn_photo.png">
        </li>
        <li class="imgItem" style="backgroundImage : url('http://pic.qiaocat.com/upload/user/cdaa995186d4bb3a9ca68f1d01e0df75.jpg')">
          <img src="../../../assets/image/icon/detail/service_btn_photo.png">
        </li>
        <li class="imgItem" style="backgroundImage : url('http://pic.qiaocat.com/upload/user/cdaa995186d4bb3a9ca68f1d01e0df75.jpg')">
          <img src="../../../assets/image/icon/detail/service_btn_photo.png">
        </li>
        <li class="imgItem" style="backgroundImage : url('http://pic.qiaocat.com/upload/user/cdaa995186d4bb3a9ca68f1d01e0df75.jpg')">
          <img src="../../../assets/image/icon/detail/service_btn_photo.png">
        </li>
        <li class="imgItem" style="backgroundImage : url('http://pic.qiaocat.com/upload/user/cdaa995186d4bb3a9ca68f1d01e0df75.jpg')">
          <img src="../../../assets/image/icon/detail/service_btn_photo.png">
        </li>
        <li class="imgItem" style="backgroundImage : url('http://pic.qiaocat.com/upload/user/cdaa995186d4bb3a9ca68f1d01e0df75.jpg')">
          <img src="../../../assets/image/icon/detail/service_btn_photo.png">
        </li>
      </ul>-->
      <div class="gallery clear">
        <a class="imgItem" style="backgroundImage : url(http://pic.qiaocat.com/upload/user/cdaa995186d4bb3a9ca68f1d01e0df75.jpg)" href="javascript:void(0);" data-img="http://pic.qiaocat.com/upload/user/cdaa995186d4bb3a9ca68f1d01e0df75.jpg">
          <img src="http://pic.qiaocat.com/upload/user/cdaa995186d4bb3a9ca68f1d01e0df75.jpg" alt="">
        </a>
        <a class="imgItem" style="backgroundImage : url(http://pic.qiaocat.com/upload/user/cdaa995186d4bb3a9ca68f1d01e0df75.jpg)" href="javascript:void(0);" data-img="http://pic.qiaocat.com/upload/user/cdaa995186d4bb3a9ca68f1d01e0df75.jpg">
          <img src="http://pic.qiaocat.com/upload/user/cdaa995186d4bb3a9ca68f1d01e0df75.jpg" alt="">
        </a>
        <a class="imgItem" style="backgroundImage : url(http://pic.qiaocat.com/upload/user/cdaa995186d4bb3a9ca68f1d01e0df75.jpg)" href="javascript:void(0);" data-img="http://pic.qiaocat.com/upload/user/cdaa995186d4bb3a9ca68f1d01e0df75.jpg">
          <img src="http://pic.qiaocat.com/upload/user/cdaa995186d4bb3a9ca68f1d01e0df75.jpg" alt="">
        </a>
        <a class="imgItem" style="backgroundImage : url(http://pic.qiaocat.com/upload/user/cdaa995186d4bb3a9ca68f1d01e0df75.jpg)" href="javascript:void(0);" data-img="http://pic.qiaocat.com/upload/user/cdaa995186d4bb3a9ca68f1d01e0df75.jpg">
          <img src="http://pic.qiaocat.com/upload/user/cdaa995186d4bb3a9ca68f1d01e0df75.jpg" alt="">
        </a>
        <a class="imgItem" style="backgroundImage : url(http://pic.qiaocat.com/upload/user/cdaa995186d4bb3a9ca68f1d01e0df75.jpg)" href="javascript:void(0);" data-img="http://pic.qiaocat.com/upload/user/cdaa995186d4bb3a9ca68f1d01e0df75.jpg">
          <img src="http://pic.qiaocat.com/upload/user/cdaa995186d4bb3a9ca68f1d01e0df75.jpg" alt="">
        </a>
        <a class="imgItem" style="backgroundImage : url(http://pic.qiaocat.com/upload/user/cdaa995186d4bb3a9ca68f1d01e0df75.jpg)" href="javascript:void(0);" data-img="http://pic.qiaocat.com/upload/user/cdaa995186d4bb3a9ca68f1d01e0df75.jpg">
          <img src="http://pic.qiaocat.com/upload/user/cdaa995186d4bb3a9ca68f1d01e0df75.jpg" alt="">
        </a>
      </div>
      <div class="shopping clear">
        <a href="/detail/1000360">
          <img src="http://qiaocat.oss-cn-shenzhen.aliyuncs.com/7965471701504077100.jpeg" />
          <p>韩式丽人清新妆</p>
        </a>
      </div>
      <div class="comment_info clear">
        <span class="time">4分钟前</span>
        <span class="praise">952</span>
      </div>
      <div class="comment">
        
      </div>
    </div>
  </section>
</template>
<script>
export default {
  name: "wordItem",
  data () {
    return {
    };
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
  },
}
</script>
<style lang="scss" scoped>
@import '../../../assets/css/baguetteBox.min.css';
@import '../../../assets/css/mixin.scss';
.word_box {
  width: 100%;
  padding-top: 2rem;
  .main {
    position: relative;
    padding-left: 4rem;
    width: 100%;
    // background-color: #ccc;
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
    /*ul {
      li.imgItem {
        display: block;
        float: left;
        width: 29.9%;
        @include borderRadius(0.4rem);
        overflow: hidden;
        margin-left: 1rem;
        margin-bottom: 1rem;
        background-position: center;
        background-size: cover;
        img {
          display: block;
          width: 100%;
          opacity: 0;
          @include borderRadius(0.4rem);
        }
      }
      li.imgItem {
        &:first-child,
        &:nth-child(3n+1) {
          margin-left: 0;
        }
      }
    }*/

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
        opacity: 0; // @include borderRadius(0.4rem);
        border-radius: 0.4rem;
      }
    }

    /*产品链接*/
    .shopping {
      background-color: #EEEEEE;
      height: 5rem;
      margin-top: 0.6rem;
      border-radius: 0.4rem;
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
      margin: 0.5rem 0 1.5rem;
      .time {
        float: left;
        margin-top: 0.2rem;
        @include sc(1rem,#999);
      }
      .praise {
        float: right;
        display: block;
        padding-left: 2.1rem;
        @include sc(1.4rem,#999);
        background: url('/static/icon/discovery/found_icon_like_nor.png') 0 0.2rem/1.6rem 1.5rem no-repeat;
      }
    }
  }
}
</style>