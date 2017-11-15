<template>
  <div class="main">
    <!--顶部轮播-->
    <div class="swipe-wrapper">
      <mt-swipe :auto="4000">
        <mt-swipe-item>
          <a>
            <!--<img src="../../../assets/image/img/home/home_banner_class04.jpg" alt="">-->
            <img :src="bannerImg | uesrImg" alt="">
          </a>
        </mt-swipe-item>
      </mt-swipe>
    </div>
    <!-- 二级分类 -->
    <div class="class_box">
      <ul class="clear">
        <div class="btn-wrap" v-for="(item,i) in typeList" :key="i">
          <li class="class_button" :class="{on:i==selectIndex}" @click="selectType(i,typeState,item.id)">{{(i==0)?'全部':item.name}}</li>
        </div>
      </ul>
    </div>
    <!--大家都在看-->
    <div class="people_look clear">
      <!--产品项-->
      <MedicalItem v-for="(item,index) in makpupList" :key="index" :list="item"></MedicalItem>
    </div>
    <!-- <div class="footer-tip">
      <p>——&nbsp;&nbsp; 您已经滑到底啦 &nbsp;&nbsp; ——</p>
    </div> -->
  </div>
</template>
<script>
import Vue from 'vue';
import { getProductList, categoryList } from "@/service/getData"
import MedicalItem from './children/medicalItem'
import common from '../../../common/common'
import { Swipe, SwipeItem } from 'mint-ui';
import '../../../../node_modules/mint-ui/lib/swipe/style.css'
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
export default {
  name: "Medical",
  data() {
    return {
      selectIndex: 0,
      Type: '2048',
      cate_id: '', // 第二级typeID
      cate_oldId: '', // 第二级前一個点击的typeID
      typeList: [],
      makpupList: [],
      typeState: 2048,
      bannerImg: '', // 顶部banner图
      flag: true,
      pageNo: 1 , //页码
      pageSize: 10, //记录数
      count_page: '', // 数据总页数
    };
  },
  created() {
    this.ProductList(); // 显示服务产品列表
    this.funTypeList(); // 显示服务分类
    this.scroll();
  },
  methods: {
    /* 显示服务分类 */
    async funTypeList() {
      let res = await categoryList({ type: this.typeState });
      this.typeList = res;
      this.bannerImg = (this.typeList.length>0 && this.typeList[0].show_image) ? this.typeList[0].show_image : '';
    },
    selectType(index, type, cateId){
      this.selectIndex = index;
      this.Type = type || this.typeState;
      if(this.cate_oldId!=cateId){ // 重复点击时，不重复调用数据（“全部”除外）
        this.cate_id = cateId || '';
        this.makpupList = [];
        this.pageNo = 1
        if(this.Type == this.cate_id){
          this.cate_id = '';
        }
        this.ProductList();
      }
    },
    /* 显示服务产品列表 */
    async ProductList() {
      this.flag = false;
      let res = await getProductList({ type: this.Type, cate_id_2: this.cate_id, page: this.pageNo, page_size: this.pageSize });
      if(res.status == "ok"){
        this.flag = true;
        this.cate_oldId = this.cate_id; // 点击第二级type，请求数据成功后，记录当前typeID
        this.count_page = (res.count % this.pageSize) == 0? parseInt(res.count / this.pageSize) : parseInt(res.count / this.pageSize + 1);
        this.makpupList = this.makpupList.concat(res.data);
      }else{
        this.flag = false;
      }
    },
    scroll (){
      let _this = this;
      if(this.$route.path == '/home/medical'){
        common.scroll(()=>{
          if(_this.flag){
            if(_this.pageNo > _this.count_page){
              return
            }
            _this.pageNo++;
            _this.ProductList();
          }
        });
      }
    }
  },
  filters: {
    uesrImg(item) {
      if (!item) {
        return require("../../../assets/image/img/home/home_banner_class04.jpg");
      } else {
        if (item.indexOf("http") != -1) {
          return item;
        } else {
          return "http://pic.qiaocat.com" + item;
        }
      }
    },
  },
  components: {
    MedicalItem,
  },
}
</script>
<style lang="scss" scoped>
@import "../../../assets/css/mixin.scss";
.main {
  width: 100%;
  // margin-top: 8.9rem;
  .swipe-wrapper {
    width: 100%;
    height: 16rem;
    img {
      width: 100%;
    }
  }
  h3.title {
    font-size: 1.8rem;
    color: #000;
    text-align: center;
    letter-spacing: 0.4rem;
    height: 1.8rem;
    line-height: 1.8rem;
    margin-bottom: 1rem;
  }
  p.title_en {
    line-height: 1.3rem;
    height: 1.3rem;
    font-size: 1.6rem;
    text-align: center;
  }
  .class_box {
    width: 100%;
    ul {
      padding: 1.5rem .25rem 0;
      .btn-wrap {
        margin: 0 0 1.5rem 0;
        display: inline-block;
        width: 25%;
        text-align: center;
        .class_button {
          height: 3rem;
          line-height: 3rem;
          margin: 0 .25rem;
          background: #f3f3f3;
          @include borderRadius(0.4rem);
          @include sc(1.3rem, #000);
          &.on {
            // background: $lightYellow;
            color: $themeRed;
          }
        }
      }
    }
  }
  .people_look {
    position: relative;
    margin-bottom: 5.8rem;
    padding-left: 1rem;
    .title_box {
      position: absolute;
      top: -1.2rem;
      left: 50%;
      margin-left: -6rem;
      width: 14rem;
      line-height: 3.2rem;
      background-color: #fff;
      h3 {
        position: relative;
        margin-bottom: 2.6rem;
      }
      h3:before {
        content: "";
        display: block;
        width: 18%;
        height: 0.2rem;
        background-color: #000;
        position: absolute;
        left: 42%;
        bottom: -1.4rem;
      }
    }
  }
  .footer-tip p {
    margin-bottom: 6rem;
    font-size: 1.4rem;
    color: #999;
    text-align: center;
  }
}
</style>