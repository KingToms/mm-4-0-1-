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
      <wordItem v-for="(item, index) in discovery_list" :key="index" :item="item" :like_list="like_list"></wordItem>
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
    $("#comment_tt").trigger("click").focus();
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

}
</style>