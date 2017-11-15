<template>
  <div class="main">
    <!--顶部轮播-->
    <div class="swipe-wrapper" v-show="topCarousel">
      <mt-swipe>
        <mt-swipe-item v-for="(item,index) in topCarousel" :key="index">
          <a :class="{imgshow: item.image.length > 0}" target="_blank" @click="linkType(item)">
            <img :src="(item && item.image) ? item.image : ''" alt="">
          </a>
        </mt-swipe-item>
      </mt-swipe>
    </div>
    <!--选项-->
    <div class="option_box">
      <div class="option">
        <div class="option_item" @click="showSignTip">
            <img id="sign" src="../../../assets/image/icon/home/top01.png">
            <p class="option_label">每日签到</p>
        </div>
        <a href="/coupon" class="option_item">
            <img id="discount" src="../../../assets/image/icon/home/top02.png">
            <p class="option_label">领券中心</p>
        </a>
        <!-- <a href="/invitation" class="option_item">
            <img id="invitation" src="../../../assets/image/icon/home/top03.png">
            <p class="option_label">邀请好友</p>
        </a> -->
        <a href="https://shop13319964.wxrrd.com" target="_blank" class="option_item">
            <img id="trial" src="../../../assets/image/icon/home/top04.png">
            <p class="option_label">俏猫商城</p>
        </a>
      </div>
    </div>
    <!--专题-->
    <div class="topic_option" v-for="(item,index) in recommendList" v-if="index==0" :key="index">
      <!--自然美-->
      <div class="natural" v-show="firstPartState">
        <h3 class="title">{{firstPartTitle ? firstPartTitle : ''}}</h3>
        <p class="title_en">——&nbsp;&nbsp;&nbsp;{{firstPartList && firstPartList.length>0 && firstPartList[0].code ? firstPartList[0].code : '0'}}&nbsp;&nbsp;&nbsp;——</p>
        <div class="natural_con">
          <a @click="linkType(firstPartList[0])">
            <img class="item01" :src="firstPartList && firstPartList.length>0 && firstPartList[0].image ? firstPartList[0].image : ''">
          </a>
          <div class="natural_bottom clear">
            <a @click="linkType(firstPartList[1])" class="half left">
              <img class="item02" :src="firstPartList && firstPartList.length>1 && firstPartList[1].image ? firstPartList[1].image : ''">
            </a>
            <a @click="linkType(firstPartList[2])" class="half left">
              <img class="item03" :src="firstPartList && firstPartList.length>2 && firstPartList[2].image ? firstPartList[2].image : ''">
            </a>
          </div>
        </div>
      </div>
      <!--今日推荐-->
      <div class="recommend" v-show="secondPartState">
        <h3 class="title">{{secondPartTitle ? secondPartTitle : ''}}</h3>
        <p class="title_en">——&nbsp;&nbsp;&nbsp;{{secondPartList && secondPartList.length>0 && secondPartList[0].code ? secondPartList[0].code : ''}}&nbsp;&nbsp;&nbsp;——</p>
        <div class="recommend_con clear">
          <div class="recommend_left">
            <a @click="linkType(secondPartList[0],'fans')">
              <img id="popularity" :src="secondPartList && secondPartList.length>0 && secondPartList[0].image ? secondPartList[0].image : '../../../assets/image/icon/home/my_photo_default.png'" alt="人气最高">
            </a>
            <h3>人气最高</h3>
            <div class="pop_people people">          
              <span>{{secondPartList && secondPartList.length>0 && secondPartList[0].stylist && secondPartList[0].stylist.real_name ? secondPartList[0].stylist.real_name : ''}}</span>
              <span class="grade" v-if="(secondPartList && secondPartList.length>0 && secondPartList[0].stylist && secondPartList[0].stylist.level)">{{secondPartList[0].stylist.level_name}}</span>
              <!-- <span class="grade" v-if="(secondPartList && secondPartList.length>0 && secondPartList[0].stylist && secondPartList[0].stylist.level)">{{secondPartList[0].stylist.level | getPersonLevel}}</span> -->
              <!-- <span class="grade" v-else>见习</span> -->
            </div>
          </div>
          <div class="recommend_right">
            <a @click="linkType(secondPartList[1],'new')">
              <img id="new_store" :src="secondPartList && secondPartList.length>1 && secondPartList[1].image? secondPartList[1].image : '../../../assets/image/icon/home/my_photo_default.png'" alt="新店开张">
            </a>
            <h3>新店开张</h3>
            <div class="new_people people">
              <span>{{(secondPartList && secondPartList.length>1 && secondPartList[1].stylist && secondPartList[1].stylist.real_name) ? secondPartList[1].stylist.real_name : ''}}</span>
              <span class="grade" v-if="(secondPartList && secondPartList.length>1 && secondPartList[1].stylist && secondPartList[1].stylist.level)">{{secondPartList[1].stylist.level_name}}</span>
              <!-- <span class="grade" v-if="(secondPartList && secondPartList.length>1 && secondPartList[1].stylist && secondPartList[1].stylist.level)">{{secondPartList[1].stylist.level | getPersonLevel}}</span>
              <span class="grade" v-else>见习</span> -->
            </div>
          </div>
        </div>
      </div>
      <!--高颜值-->
      <div class="beauty natural" v-show="thirdPartState">
        <h3 class="title">{{thirdPartTitle ? thirdPartTitle : ''}}</h3>
        <p class="title_en">——&nbsp;&nbsp;&nbsp;{{thirdPartList && thirdPartList.length>0 && thirdPartList[0].code ? thirdPartList[0].code : ''}}&nbsp;&nbsp;&nbsp;——</p>
        <div class="natural_con">
          <a @click="linkType(thirdPartList[0])">
            <img class="item01" :src="thirdPartList && thirdPartList.length>0 && thirdPartList[0].image ? thirdPartList[0].image : ''">
          </a>
          <div class="natural_bottom clear">
            <a @click="linkType(thirdPartList[1])" class="half left">
              <img class="item02" :src="thirdPartList && thirdPartList.length>1 && thirdPartList[1].image ? thirdPartList[1].image : ''">
            </a>
            <a @click="linkType(thirdPartList[2])" class="half left">
              <img class="item03" :src="thirdPartList && thirdPartList.length>2 && thirdPartList[2].image ? thirdPartList[2].image : ''">
            </a>
          </div>
        </div>
      </div>
      <!--大家都在看-->
      <div class="people_look clear" v-show="fourPartState">
        <div class="title_box">
          <h3 class="title">{{fourPartTitle ? fourPartTitle : ''}}</h3>
          <p class="title_en">{{fourPartList && fourPartList.length>0 && fourPartList[0].code ? fourPartList[0].code : ''}}</p>
        </div>
        <!--产品项-->
        <div class="pro_box">
          <RecommendItem v-for="(item,index) in fourPartList" :key="index" v-if="item.ad_type == 3" :recommendList="(item && item.product) ? item.product : ''"></RecommendItem>
        </div>
      </div>

      <!-- <div class="footer-tip">
        <p>——&nbsp;&nbsp; 您已经滑到底啦 &nbsp;&nbsp; ——</p>
      </div> -->
    </div>
  </div>
</template>
<script>
import Vue from 'vue';
import RecommendItem from './children/recommendItem'
import { Swipe, SwipeItem } from 'mint-ui';
import '../../../../node_modules/mint-ui/lib/swipe/style.css'
import keyConf from '../../../common/keyConf'
import {getHomeRecommend} from "@/service/getData"
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
export default {
  name: "Recommend",
  data () {
    return {
      recommendList: '', // 首页推荐列表
      topCarousel: [], // 顶部轮播图
      link_address: '', // 链接地址

      firstPartState: true, // 显示第一部分
      firstPartTitle: '', // 第一部分标题（自然美）
      firstPartList: [], // 第一部分内容

      secondPartState: true, // 显示第二部分
      secondPartTitle: '', // 第二部分标题（今日推荐）
      secondPartList: [], // 第二部分

      thirdPartState: true, // 显示第三部分
      thirdPartTitle: '', // 第三部分标题（高颜值）
      thirdPartList: [], // 第三部分

      fourPartState: true, // 显示第四部分
      fourPartTitle: '', // 第四部分标题（高颜值）
      fourPartList: [], // 第四部分
    };
  },
  created (){
    this.getRecommendList();
  },
  methods: {
    /* 获取首页推荐内容 */
    async getRecommendList (){
      let res = await getHomeRecommend();
      this.recommendList = res;
      this.topCarousel = (this.recommendList.length>0 && this.recommendList[0].data) ? this.recommendList[0].data : ''; // 轮播图
      this.firstPartTitle = (this.recommendList.length>1 && this.recommendList[1].title) ? this.recommendList[1].title : '';
      this.firstPartList =  (this.recommendList.length>1 && this.recommendList[1].data) ? this.recommendList[1].data : '';
      this.secondPartTitle = (this.recommendList.length>2 && this.recommendList[2].title) ? this.recommendList[2].title : '';
      this.secondPartList = (this.recommendList.length>2 && this.recommendList[2].data) ? this.recommendList[2].data : '';
      this.thirdPartTitle = (this.recommendList.length>3 && this.recommendList[3].title) ? this.recommendList[3].title : '';
      this.thirdPartList = (this.recommendList.length>3 && this.recommendList[3].data) ? this.recommendList[3].data : '';
      this.fourPartTitle = (this.recommendList.length>4 && this.recommendList[4].title) ? this.recommendList[4].title : '';
      this.fourPartList = (this.recommendList.length>4 && this.recommendList[4].data) ? this.recommendList[4].data : '';

      // this.checkDataState();
    },
    /* 检测数据是否报错，显示隐藏相应部分模块 */
    checkDataState(){
      if(!this.firstPartTitle && !this.firstPartList[0] && !this.firstPartList[1] && !this.firstPartList[2]){
        this.firstPartState = false; // 隐藏自然美
      }
      if(!this.secondPartTitle && !this.secondPartList[0] && !this.secondPartList[1]){
        this.secondPartState = false; // 隐藏今日推荐
      }
      if(!this.thirdPartTitle && !this.thirdPartList[0] && !this.thirdPartList[1] && !this.thirdPartList[2]){
        this.thirdPartState = false; // 隐藏高颜值
      }
      if(!this.fourPartTitle && !this.fourPartList[0]){
        this.fourPartState = false; // 隐藏大家都在看
      }
    },
    // 三元表达式
    isEmpty(i){
      return i ? i : '';
    },
    // 页面跳转类型（专题、店铺、产品）
    linkType(item,tab) {
      if(item.ad_type == '1'){ // 专题链接
        this.link_address = item.link;
      }else if(item.ad_type == '2'){ // 店铺链接
        this.link_address = `/stylist/${tab}/${item.link}`
        // this.link_address = "/detail/shopping/" + item.link;
      }else if(item.ad_type == '3'){ // 产品链接
        this.link_address = "/detail/" + item.link;
      }
      location.href = this.link_address;
    },
    // 每日签到
    showSignTip (){
      let query = this.$route.query
      query = query ? query : {}
      if(query.app == 'ios' || query.app == 'android'){ // IOS、Android端不弹框
        location.href = "?sign/1";
      }else if(!$.cookie(keyConf.qm_cookie)){
        this.$router.push({name: "login", query: {url: "/home"}});
      }else{
        this.$emit('showSign');
      }
    },
  },
  components: {
    RecommendItem, // 大家都在看
  },
  filters:{
    // 获取美业师级别
    getPersonLevel (level){
      switch (level){
        case 0:
          return "见习";
          break;
        case 1:
          return "新晋";
          break;
        case 2:
          return "专业";
          break;
        case 3:
          return "高级";
          break;
        case 4:
          return "首席";
          break;
        case 5:
          return "明星";
          break;
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import "../../../assets/css/mixin.scss";
.main{
  width: 100%;
  // margin-top: 8.9rem;
  .swipe-wrapper{
    width: 100%;
    height: 20rem;
    a.imgshow {
      display: block;
      width: 100%;
      min-height: 18rem;
    }
    img{
      width: 100%;
    }
  }
  .option_box{
    width: 100%;
    margin-top: 2.8rem;
    margin-bottom: 5rem;
    .option{
      display: flex;
      .option_item{
        flex: 1;
        text-align: center;
        font-size: 1.2rem;
        color: #000;
        img{
          width: 3.1rem;
        }
      }
    }
  }
  h3.title{
    font-size: 1.8rem;
    color: #000;
    text-align: center;
    letter-spacing: 0.4rem;
    height: 1.8rem;
    line-height: 1.8rem;
    margin-bottom: 1rem;
  }
  p.title_en{
    line-height: 1.3rem;
    height: 1.3rem;
    font-size: 1.6rem;
    text-align: center;
  }
  .topic_option .natural{
    width: 100%;
    .natural_con{
      font-size: 0;
      padding: 2rem 0 1rem;
      img.item01{
        width: 100%;
        margin-bottom: 1rem;
      }
      .half{
        width: 50%;
        display: inline-block;
      }
      img.item02,img.item03{
        vertical-align: top;
        width: calc(100% - 0.5rem);
      }
      img.item02{
        float: left;
      }
      img.item03{
        float: right;
      }
    }
  }
  .topic_option .recommend{
    width: 100%;
    padding: 5rem 0 3.6rem;
    color: #000;
    background-color: #FBFBFB;
    .recommend_con{
      padding: 3.4rem 2.8rem 0;
      .recommend_left{
        float: left;
        width: calc(50% - 2.9rem);
        text-align: center;
      }
      .recommend_right{
        float: right;
        width: calc(50% - 2.9rem);
        text-align: center;
      }
      #popularity, #new_store{
        width: 100%;
        margin-bottom: 1.6rem;
        -webkit-border-radius: 50%;
        -moz-border-radius: 50%;
        -ms-border-radius: 50%;
        -o-border-radius: 50%;
        border-radius: 50%;
        vertical-align: top;
      }
      h3{
        line-height: 1.6rem;
        height: 1.6rem;
        font-size: 1.6rem;
        position: relative;
      }
      h3:before{
        content: "";
        display: block;
        width: 17%;
        height: 0.2rem;
        background-color: #000;
        position: absolute;
        left: 42%;
        bottom: -1.4rem;
      }
      .people{
        height: 1.6rem;
        margin-top: 2.6rem;
        span{
          display: inline-block;
          height: 1.6rem;
          line-height: 1.6rem;
          font-size: 1.4rem;
        }
        span.grade{
          vertical-align: top;
          // margin-left: 0.5rem;
          @include wh(4.5rem,1.6rem);
          @include sc(1.1rem,$bgWhite);
          box-sizing: border-box;
          padding-left: .3rem;
          text-align: left;
          @include bis("../../../../src/assets/image/icon/home/product_bg_grade.png");
        }
      }
    }
  }
  .beauty{
    margin-top: 3.6rem;
  }
  .people_look{
    position: relative;
    margin-top: 3.6rem;
    margin-bottom: 5.8rem;
    padding-top: 6.5rem;
    padding-left: 1rem;
    border-top: 2px solid #999;
    .title_box{
      position: absolute;
      top: -1.2rem;
      left: 50%;
      margin-left: -6rem;
      width: 14rem;
      line-height: 3.2rem;
      background-color: #fff;
      h3{
        position: relative;
        margin-bottom: 2.6rem;
      }
      h3:before{
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
  .footer-tip p{
    margin-bottom: 6rem;
    font-size: 1.4rem;
    color: #999;
    text-align: center;
  }
}
</style>