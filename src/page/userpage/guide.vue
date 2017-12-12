<template>
  <div class="guide">
    <div class="header" v-if="hideHeader">
      <lHeader :title="title"></lHeader>
    </div>
    <div class="guide-box">
      <img v-lazy="require('../../assets/image/img/guide/A.jpg')" class="guide-img1" alt="">
      <img v-lazy="require('../../assets/image/img/guide/B.jpg')" class="guide-img2" alt="">
      <img v-lazy="require('../../assets/image/img/guide/C.jpg')" class="guide-img3" alt="">
    </div>
  </div>
</template>
<script>
import Vue from 'vue';
import lHeader from '../../components/common/lHeader';
import '../../../node_modules/mint-ui/lib/lazyload/style.css'
import { Lazyload } from 'mint-ui';
Vue.use(Lazyload);
export default {
  name: "guide",
  data () {
    return {
      title: '新手指引',
      hideHeader: true,
    };
  },
  created() {
    this.showHeader();
  },
  methods: {
    /*APP客户端中隐藏标题栏*/
    showHeader(){
      let query = this.$route.query
      query = query ? query : {}
      if(query.app == 'ios' || query.app == 'android'){
        this.hideHeader = false;
      }
    },

  },
  components: {
    lHeader,
  },
}
</script>
<style lang="scss" scoped>
@import '../../assets/css/mixin.scss';
.guide {
  .header{
    @include wh(100%,4rem);
    position: fixed;
    left: 0;
    top: 0;
    z-index: 1;
  }
  .guide-box {
    margin-top: 4rem;
    width: 100%;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    font-size: 0;
    img {
      display: block;
      width: 100%;
      margin-bottom: 2.5rem;
      &:nth-last-of-type(1) {
        margin-bottom: 0;
      }
    }

    // 设置图片在加载时的样式
    image[lazy=loading] {
      width: 100%;
      margin: auto;
    }
  }
}
</style>