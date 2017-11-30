<template>
  <div class="descripion">
    <ul class="name">
      <li>
        <i>从业</i>
        <span>【{{detail.year ? detail.year : 0}}年】</span>
      </li>
      <li v-if="detail.user_good">
        <i>擅长</i>
        <span>【{{detail.user_good ? detail.user_good : ""}}】</span>
      </li>
      <li>
        <i>简介</i>
        <p>{{detail.intro}}</p>
      </li>
    </ul>
    <div class="product clearfix">
      <p>作品</p>
      <span>WORKS</span>
      <!-- <ul class="gallery">
        <li v-for="(n,index) in pictures" :key="index">
          <img v-lazy="n" alt="">
        </li>
      </ul> -->
      <div class="gallery">
        <!-- <a href="/static/image/search/search_pic02.png"><img src="/static/image/search/search_pic02.png" alt=""></a> -->
        <a v-for="(n,index) in pictures" :key="index" href="javascript:void(0);" :data-img="n"><img :src="n" alt=""></a>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
// import bBox from '../../../assets/js/baguetteBox.min.js';
import { Lazyload } from 'mint-ui';
Vue.use(Lazyload);
export default {
  name: 'shop_profile',
  data() {
    return {
      pictures: [],
      flag: true
    }
  },
  props: ["detail"],
  updated() {
    let _this = this;
    if (_this.flag) {
      _this.flag = false;
      if (this.detail.photo.length == 0) {
           _this.pictures=[];
      } else {
        this.detail.photo.forEach(function (n, i) {
          if (n.indexOf("http") != -1) {
            _this.pictures.push(n);
          } else {
            _this.pictures.push("http://pic.qiaocat.com/upload/" + n);
          }
        });

        this.squareImg();
      }

    }

    let bBox = require('../../../assets/js/baguetteBox.js');
    bBox.baguetteBox.run('.gallery');
  },
  mounted(){
    /*确保产品图片显示正方形*/
    let _this = this;
    $(window).resize(function(){
      _this.squareImg();
    });
  },
  methods: {
    // 确保产品图片显示正方形
    squareImg(){
      let cw;
      setTimeout(function() {
        cw = $('.gallery a').width();
        $('.gallery a').css({
          'height': cw + 'px'
        });

        $('.gallery a img').each(function(index,item){
          let imgDom = new Image();
          imgDom.src = item.src;
          imgDom.onload = function (){
            let imgW = imgDom.width;
            let imgH = imgDom.height;
            if(imgW > imgH){ // 图：宽大于高
              $(item).addClass("horizontal");
            }else if(imgW < imgH){ // 图：宽小于高
              $(item).addClass("vertical");
            }else{ // 图：宽等于高
              $(item).removeClass("horizontal");
              $(item).removeClass("vertical");
            }
          }

        })
      }, 0);


    },
  },
}
</script>

<style lang="scss" scoped>
@import '../../../assets/css/baguetteBox.min.css';
@import '../../../assets/css/mixin.scss';
.descripion {
  .name {
    padding: 0 1.5rem;
    li {
      margin-top: 2rem;
      i {
        @include sc(1.4rem, #000)
      }
      span {
        @include sc(1.4rem, #000)
      }
      p {
        @include sc(1.4rem, #000);
        margin-left: 0.9rem;
      }
      &:before {
        content: "";
        display: inline-block;
        width: 0.4rem;
        height: 0.4rem;
        background-color: #000;
        margin-right: 0.9rem;
        vertical-align: super;
      }
    }
  }
  .product {
    text-align: center;
    margin: 7rem 0;
    P {
      @include sc(1.6rem, #000);
    }
    span {
      @include sc(1.4rem, #000);
      position: relative;
      margin-top: 1rem;
      &:before,
      &:after {
        position: absolute;
        content: "";
        width: 4rem;
        border-bottom: 0.05rem solid #000;
        top: 1rem;
      }
      &:before {
        left: -5rem;
      }
      &:after {
        right: -5rem;
      }
    }
    .gallery {
      width: 100%;
      margin: 1rem auto;
      a {
        position: relative;
        margin-left: 3%;
        margin-bottom: 2%;
        float: left;
        width: 29%;
        display: block;
        overflow: hidden;
        img {
          width: 100%;
          position: absolute;
          top: 0;
          left: 0;
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
    }
  }
  .clearfix::before, .clearfix::after {
      display: block;
      content: '';
      visibility: hidden;
      height: 100%;
      clear: both;
  }
}
</style>

