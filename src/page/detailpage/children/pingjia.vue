<template>
  <section class='curstom'>
    <div class="name">
      <div class="head_img">
        <img :src="list.user_img | uesrImg" v-if="list.user_img">
        <img src="../../../assets/image/icon/detail/my_photo_default.png" v-else>
      </div>
      <div class="info">
        <!-- | changeUserName -->
        <p class="user_name">{{list.user_name | changeUserName}}</p>
        <p class="time">{{list.created_at ? list.created_at.substring(0,10) : "2017-8-08 15:56:07"}}</p>
      </div>
      <div class="praise">
        <ul class="star">
          <li v-for="(item,index) in 5" :key="index">
            <img src="../../../assets/image/icon/detail/details_icon_star_nor.png" alt="">
            <img class="score" v-if="index < list.score" src="../../../assets/image/icon/detail/details_icon_star_sel.png" alt="">
          </li>
        </ul>
      </div>
    </div>
    <p class="des">{{list.comment ? list.comment : ''}}</p>
    <!--<ul class="clear" v-if="list.images && list.images.length != 0">
      <li class="imgItem" v-for="(item,index) in comments_imgs" :key="index" :style="{backgroundImage : 'url('+item+')'}">
        <img src="../../../assets/image/icon/detail/service_btn_photo.png">
      </li>
    </ul>-->
    <div class="gallery clear" v-if="list.images && list.images.length != 0">
      <a class="imgItem" v-for="(item,index) in comments_imgs" :key="index" :style="{backgroundImage : 'url('+item+')'}" href="javascript:void(0);" :data-img="item">
        <img :src="item" alt="">
      </a>
    </div>
    <p class="zjdes" v-if="list.zhuijia && (list.zhuijia.comment || list.zhuijia.images)">
      <span>【追加评价】</span>
      <span v-if="list.zhuijia.comment">{{list.zhuijia.comment}}</span>
    </p>
    <!--<ul class="clear" v-if="list.zhuijia && list.zhuijia.images && list.zhuijia.images.length != 0">
      <li class="imgItem" v-for="(item,index) in add_imgs" :key="index" :style="{backgroundImage : 'url('+item+')'}">
        <img src="../../../assets/image/icon/detail/service_btn_photo.png">
      </li>
    </ul>-->
    <div class="gallery clear" v-if="list.zhuijia && list.zhuijia.images && list.zhuijia.images.length != 0">
      <a class="imgItem" v-for="(item,index) in add_imgs" :key="index" :style="{backgroundImage : 'url('+item+')'}" href="javascript:void(0);" :data-img="item">
        <img :src="item" alt="">
      </a>
    </div>
    <div class="reply-panel" v-if="list.huifu && list.huifu.length != 0">
      <div class="reply">
        商家回复：{{list.huifu.comment ? list.huifu.comment : ''}}
      </div>
    </div>
  </section>
</template>
<script>
export default {
  name: 'customer_pingjia',
  data() {
    return {
      pingjia_img: '', // 评价图片列表
      comments_imgs: [], //新评价图片列表
      addPingjia_imgs: [], //追加评价图片
      add_imgs: [], //新追加评价图片列表
      flag: true,
      flag2: true,
    }
  },
  props: ["list"],
  created() {
    this.pingjia_img = (this.list && this.list.images && this.list.images.length > 0) ? this.list.images.split(/[,|\\|]/) : '';//新评价图片列表数组
    this.addPingjia_imgs = this.list.zhuijia && this.list.zhuijia.images && this.list.zhuijia.length ? this.list.zhuijia.images.split(/[,|\|]/) : '';//新追加评价图片列表数组
    this.pingjiaImg();
    this.zhujiaImg();
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
    pingjiaImg() { //判断评价图片是否是相对路径还是绝对路径
      let _this = this;
      let reg = /\.(jpg|gif|png|bmp)$/;
      if (this.flag) {
        this.flag = false;
        if (this.pingjia_img.length == 0) {
          this.comments_imgs = [];
        } else {
          this.pingjia_img.forEach(function(n, i) {
            if (n.indexOf("http") != -1) {
              _this.comments_imgs.push(n);
            } else {
              if (n != 0 && reg.test(n)) { // 排除后天返回的图片路径为：“|0”,而且为图片类型
                _this.comments_imgs.push("http://pic.qiaocat.com/upload/" + n);
              }
            }
          })
        }
      }
    },
    zhujiaImg() { // 判断追加评价图片是否是相对路径还是绝对路径
      let _this = this;
      if (this.flag2) {
        this.flag2 = false;
        if (this.addPingjia_imgs.length == 0) {
          this.add_imgs = [];
        } else {
          this.addPingjia_imgs.forEach(function(n, i) {
            if (n.indexOf("http") != -1) {
              _this.add_imgs.push(n);
            } else {
              _this.add_imgs.push("http://pic.qiaocat.com/upload/" + n);
            }
          })
        }
      }
    },
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
    changeUserName(user_name) {
      if (user_name && (user_name + '').indexOf('*') > 0)
        return user_name;
      return user_name && /^1[34578]\d{9}$/.test(user_name) ? user_name.substr(0, 3) + '*****' + user_name.substr(user_name.length - 3) : user_name;
    }
  },
  updated() {
    this.pingjiaImg();
    this.zhujiaImg();
  },

}
</script>

<style lang="scss" scoped>
@import '../../../assets/css/baguetteBox.min.css';
@import '../../../../src/assets/css/mixin.scss';
.curstom {
  border-bottom: 1px solid #ddd;
  padding: 2rem 1.5rem 2.4rem;
  .name {
    position: relative;
    .head_img {
      position: absolute;
      top: 0.4rem;
      left: 0;
      @include wh(3rem, 3rem);
      margin-right: 1rem;
      img {
        width: 100%;
        vertical-align: middle;
      }
    }
    .info {
      padding: 0 9rem 0 4rem;
      p.user_name {
        @include sc(1.3rem, #000);
      }
      p.time {
        @include sc(1rem, #999);
      }
    }
    .praise {
      position: absolute;
      top: 1rem;
      right: 0;
      width: 10rem;
      ul.star {
        height: 1.2rem;
        line-height: 1.2rem;
        text-align: right;
        margin-right: 1rem;
        li {
          position: relative;
          display: inline-block;
          width: 1rem;
          margin: 0 0.2rem;
          img {
            width: 100%;
            vertical-align: top;
          }
          img.score {
            position: absolute;
            top: 0;
            left: 0;
          }
        }
      }
    }
  }
  .des {
    @include sc(1.3rem, #000);
    margin: 1rem 0 1rem;
    line-height: 1.5rem;
  }
  .zjdes {
    @include sc(1.3rem, #000);
    margin: 0 0 1.4rem -0.5rem;
    span {
      @include sc(1.3rem, #666);
    }
  }

  .imgItem {
    display: block;
    float: left;
    width: 30.5%;
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


  .reply-panel {
    position: relative;
    &:before {
      content: "";
      position: absolute; // left: 2rem;
      top: -0.6rem;
      @include wh(0, 0);
      width: 0;
      height: 0;
      border-left: 1.4rem solid transparent;
      border-right: 1.4rem solid transparent;
      border-bottom: 1.8rem solid #F3F3F3;
    }
    .reply {
      position: relative;
      @include sc(1.3rem, #000);
      @include borderRadius(.4rem);
      margin-top: 0.5rem;
      background-color: #F3F3F3; // padding: 1.5rem;
      padding: .5rem 0 0 .4rem;
      overflow: hidden;
      word-wrap: break-word;
      /* &:after {
        content: "";
        position: absolute;
        left: 2rem;
        top: -0.6rem;
        @include wh(0, 0);
        border-left: 1.4rem solid transparent;
        border-right: 1.4rem solid transparent;
        border-bottom: 1.4rem solid #f3f3f3;
      } */
    }
  }
}

.curstom:last-of-type {
  border-bottom: 0 none;
}
</style>

