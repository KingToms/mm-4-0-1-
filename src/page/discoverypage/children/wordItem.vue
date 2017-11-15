<template>
  <section class="word_box">
    <div class="main">
      <div class="head_img">
        <img :src="'' | uesrImg">
      </div>
      <div class="name">黄美娜</div>
      <div class="comment">化妆师很专业很有耐心，在人生最重要的一天化得美美哒~</div>
      <ul class="clear">
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
      </ul>
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
@import '../../../assets/css/mixin.scss';
.word_box {
  width: 100%;
  padding-top: 2rem;
  .main {
    position: relative;
    padding-left: 4rem;
    width: 100%;
    background-color: #ccc;
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
    ul {
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
    }
  }
}
</style>