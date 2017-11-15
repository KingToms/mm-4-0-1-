<template>
  <div class="descripion">
    <ul class="name">
      <li>
        <i>从业</i>
        <span>【{{detail.year?detail.year:0}}年】</span>
      </li>
      <li v-if=detail.user_good>
        <i>擅长</i>
        <span>【{{detail.user_good?detail.user_good:""}}】</span>
      </li>
      <li>
        <i>简介</i>
        <p>{{detail.intro}}</p>
      </li>
    </ul>
    <div class="product">
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
        })
      }

    }

    let bBox = require('../../../assets/js/baguetteBox.js');
    bBox.baguetteBox.run('.gallery');
  },
  mounted(){
    
  },
  methods: {},
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
    margin-top: 7rem;
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
        margin-left: 3%;
        margin-bottom: 2%;
        float: left;
        width: 29%;
        img {
          width: 100%;
        }
      }
    }
  }
}
</style>

