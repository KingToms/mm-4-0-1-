<template>
  <section class="evaluate_box">
    <!--顶部标题-->
    <div class="header">
      <div class="header_top">
        <div class="title">
          <h2>服务评价</h2>
        </div>
        <a class="back" href="javascript:void(0);" @click="pingjia_hide" ></a>
      </div>
      <div class="header_bottom">
        <mt-navbar v-model="selected">
          <mt-tab-item id="all" @click.native.prevent="selectClass('all')">
            <p class="line num">{{all_num}}</p>
            <p class="line text">全部</p>
          </mt-tab-item>
          <mt-tab-item id="good" @click.native.prevent="selectClass('good')">
            <p class="line num">{{good_num}}</p>
            <p class="line text">好评</p>
          </mt-tab-item>
          <mt-tab-item id="normal" @click.native.prevent="selectClass('normal')">
            <p class="line num">{{normal_num}}</p>
            <p class="line text">中评</p>
          </mt-tab-item>
          <mt-tab-item id="bad" @click.native.prevent="selectClass('bad')">
            <p class="line num">{{bad_num}}</p>
            <p class="line text">差评</p>
          </mt-tab-item>
          <mt-tab-item id="picture" @click.native.prevent="selectClass('picture')">
            <p class="line num">{{pic_num}}</p>
            <p class="line text">有图</p>
          </mt-tab-item>
        </mt-navbar>
      </div>
    </div>
    <div class="evaluate_text">
      <div class="content">
        <pingjia v-for="(item,index) in commentsList" :key="index" :list="item"></pingjia>
      </div>
    </div>
  </section>
</template>
<script>
import Vue from 'vue';
import pingjia from './pingjia';
import { Navbar, TabItem } from 'mint-ui';
Vue.component(Navbar.name, Navbar);
Vue.component(TabItem.name, TabItem);
import { TabContainer, TabContainerItem } from 'mint-ui';
Vue.component(TabContainer.name, TabContainer);
Vue.component(TabContainerItem.name, TabContainerItem);
import '../../../../node_modules/mint-ui/lib/style.css';
import {getEvaluateList} from '@/service/getData';
import common from '../../../common/common';
export default {
  name: "allEvaluate",
  data () {
    return {
      commentsList: [],// 评论列表
      all_num: '0', // 全部评价数量
      good_num: '0', // 好评数量
      normal_num: '0', // 中评数量
      bad_num: '0', // 差评数量
      pic_num: '0', // 有图评价数量
      selected: 'all', // nav默认选择哪一类
      active: 'tab_all', // 内容默认显示

      totalCount: 0, // 对应类型评价的总数
      typeID: 'all', // 评价类型
      pageNo: 1, // 当前页数
      page_size: 10, // 单页数据记录
      flag: true,
      count_page: '', // 数据总页数
    };
  },
  props: ["productId"], // 产品ID
  created (){
    this.getEvaluate();
    this.scroll();
  },
  components: {
    pingjia,
  },
  methods: {
    // 隐藏全部评价窗口
    pingjia_hide (){
      this.$emit('pingjia_hide');
    },
    // 点击显示评价类型
    selectClass (id){
      this.typeID = id;
      this.pageNo = 1;
      this.page_size = 10;
      this.commentsList = [];
      this.getEvaluate(id);
    },
    /* 获取产品评论列表 */
    async getEvaluate(id){
      this.flag = false;
      this.productId = this.$route.params.id; // 产品ID
      let obj = {
        product_id: this.productId,
        type: this.typeID,
        page: this.pageNo,
        page_size: this.page_size
      }
      let res = await getEvaluateList(obj)
      if(res.status == "ok"){
        this.flag = true;
        this.count_page = (res.data.count % this.page_size) == 0 ? parseInt(res.data.count / this.page_size) : parseInt(res.data.count / this.page_size + 1); // 评价总页数
        let data = res.data.result; // 评价列表
        this.all_num = res.data.all_comments_count; // 全部评价数
        this.good_num = res.data.good_comments_count; // 好评数
        this.normal_num = res.data.normal_comments_count; // 中评数
        this.bad_num = res.data.bad_comments_count; // 差评数
        this.pic_num = res.data.picture_comments_count; // 有图数

        this.totalCount = res.data[`${id}_comments_count`];
        for (let item in data) {
          this.commentsList.push(data[item]);
        }
      }else{
        this.flag = false;
      }
    },
    scroll (){
      let _this = this;
      if(this.$route.path.indexOf('/detail') > -1){
        common.scroll(()=>{
          if(_this.flag){
            if(_this.pageNo > _this.count_page){
              return false;
            }
            _this.pageNo++;
            _this.getEvaluate();
          }
        });
      }
    },

  },

}
</script>
<style lang="scss" scoped>
@import "../../../assets/css/mixin.scss";
.evaluate_box {
  width: 100%;
  height: auto;
  background-color: #F3F3F3;
  overflow-y: auto;
  -webkit-overflow-scrolling : touch;
  padding-top: 11.5rem;
  /* 顶部标题栏 */
  .header{
    @include bgColor(#fff);
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    margin-bottom: 1rem;
    z-index: 999;
    -webkit-transform: translateZ(0);
    .header_top {
      .title{
        @include wh(100%,4rem);
        @include average(#999);
        line-height:4rem;
        text-align: center;
        h2{
          font-size: 1.8rem;
          color: #000;
          letter-spacing: 1px;
        }
      }
      .back{
        position: absolute;
        top: .7rem;
        left: .7rem;
        @include wh(2.4rem,2.4rem);
        background-image: url('../../../assets/image/icon/login/nav_btn_return.png');
        background-repeat: no-repeat;
        background-position: center;
        background-size: 2.2rem 2.2rem;
      }
    }
  }
  /* 评价内容 */
  .evaluate_text {
    .content {
      overflow: scroll;
      padding: 0 1.5rem;
      background-color: #fff;
      margin-bottom: 10rem;
    }
  }
}
</style>