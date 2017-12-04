<template>
<div class="stylist">
  <header>
    <div class="height">
      <div class="fixed">
        <div class="input">
          <form @submit.prevent="funSearch">
            <input type="search" placeholder="请输入要搜索的关键字" v-model="searchSty">
          </form>
        </div>
        <a href="javascript:void(0);" @click="$router.go(-1)"></a>
      </div>
      <ul class="tab">
        <li @click="changeType('fans')"><span :class="{'active': tab == 'fans'}">人气最高</span></li>
        <li @click="changeType('new')"><span :class="{'active': tab == 'new'}">新店开张</span></li>
      </ul>
    </div>
  </header>
  <content>
    <div class="list">
      <ul class="clear">
        <li class="left" v-if="recommend != null">
          <a :href="`/detail/shopping/${recommend.id}`">
          <!-- :src=" item.user_img.indexOf('http://') > -1 ? item.user_img : `${baseUrl}${item.user_img}`" -->
            <img v-lazy=" recommend.user_img.indexOf('http://') > -1 ? recommend.user_img : `${baseUrl}${recommend.user_img}`" > <!-- @error="defaultSrc(this)" -->
            <p class="nick">{{recommend.real_name}}</p>
            <span>{{recommend.level_name}}</span>
            <!-- <span>{{level[recommend.level]}}</span> -->
          </a>
        </li>
        <li class="left" v-for="(item,index) in stylist" :key="index">
          <a :href="`/detail/shopping/${item.id}`">
          <!-- :src=" item.user_img.indexOf('http://') > -1 ? item.user_img : `${baseUrl}${item.user_img}`" -->
            <img v-lazy=" item.user_img.indexOf('http://') > -1 ? item.user_img : `${baseUrl}${item.user_img}`" > <!-- @error="defaultSrc(this)" -->
            <p>{{item.real_name}}</p>
            <span>{{item.level_name}}</span>
            <!-- <span>{{level[item.level]}}</span> -->
          </a>
        </li>
      </ul>
    </div>
  </content>
</div>
</template>
<script>
import { getStylistFans } from '../../service/getData'
import { getStore } from '../../common/store'
import common from '../../common/common'
export default {
  name: 'stylist',
  data () {
    return {
      searchSty: '',  // 要搜索的店铺
      pageNo: 1, // 要获取的页数
      page_size: 10, // 单页记录数
      total_count: 0, // 总记录数
      city: {}, // 当前所在城市
      tab: 'fans', // 选择的tab
      sourceTab:'', // 存原tab
      id: 0, // 推荐的id
      flag: true, // 标识服务端是否已经响应
      stylist: [], // 美业师列表
      recommend:null, // 推荐
      baseUrl: 'http://pic.qiaocat.com/upload/',
      level:['见习','新晋','专业','高级','首席','明星'] // 美业师等级
    }
  },
  created(){
    this.city = JSON.parse(getStore('current_city'))
    this.tab = this.$route.params.tabName
    this.sourceTab = this.tab
    // this.id = this.$route.params.id
    this.getStylist()
    $(window).scrollTop(0);
    this.scroll(this.$route.query)
  },
  methods: {
    funSearch(){
      this.pageNo = 1
      this.stylist = []
      this.id = 0
      $(window).scrollTop(0)
      this.getStylist()
    },
    changeType(tab){
      $(window).scrollTop(0)
      this.tab = tab
      // this.id = this.tab == this.sourceTab ? this.$route.params.id : 0
      this.id = 0
      this.pageNo = 1
      this.searchSty = ''
      this.stylist = []
      this.recommend = null
      this.getStylist()
    },
    async getStylist(){
      this.flag = false
      let obj = {
        sort_by: this.tab,
        recommend_sid: this.id,
        sort_rule: 'desc',
        name: this.searchSty,
        province_id: '',
        city_id: this.city.city_id,
        area_id: '',
        page: this.pageNo,
        page_size: this.page_size
      }
      let res = await getStylistFans(obj)
      if(res.status == 'ok'){
        this.stylist = this.stylist.concat(res.data.result)
        this.total_count = res.data.count
        this.recommend = res.data.recommend
        // console.log(res)
      }
      this.flag = true
    },
    scroll(){
      let _this = this
      if(this.$route.path.indexOf('/stylist') > -1 ){
        common.scroll(()=>{
          if(_this.flag){
              _this.pageNo++
              _this.getStylist()
            }
        })
      }
    },
    defaultSrc(_this){
      $(_this).attr('src','/static/icon/search/data_photo_default.png')
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../assets/css/mixin.scss';
.stylist{
  header{
    // @include wh(100%,4.4rem);
    height: 8.8rem;
    .height{
      position: fixed !important;
      @include bgColor(#fff);
      @include average(#ccc);
      width: 100%;
      z-index: 1;
    }
    .fixed{
      @include wh(100%,4.4rem);
      .input{
        padding: 0 1.5rem 0 4.2rem;
        line-height: 4.4rem;
        input{
          @include wh(100%,2.8rem);
          @include bgColor(#EEE);
          @include bgi_2('../../assets/image/icon/city/home_icon_search.png',1.4rem,1.4rem,.4rem);
          border-radius: .4rem;
          padding-left: 2.2rem;
          line-height: 2.8rem;
        }
      }
      a{
        position: absolute;
        @include wh(4.4rem,4rem);
        @include bgi_2('../../assets/image/icon/city/nav_btn_return.png',2.2rem,2.2rem);
        top: 0;
        // left: 1.5rem;
        // padding: 1rem;
      }
    }
    .tab{
      display: flex;
      @include wh(100%,4.4rem);
      li{
        flex: 1;
        @include sc(1.4rem,#000);
        height: 4.4rem;
        line-height: 4.4rem;
        text-align: center;
        span{
          display: inline-block;
          height: 4.4rem;
          box-sizing: border-box;
          padding: 0 1rem;
          &.active{
            border-bottom: .3rem solid $themeRed;
            color: $themeRed;
          }
        }
      }
    }
  }
  content{
    .list{
      padding: 0 1.5rem;
      li.left{
        width: 50%;
        text-align: center;
        padding-top: 2rem;
        img{
          @include wh(12rem,12rem);
          border-radius: 50%;
        }
        p{
          @include sc(1.4rem,#000);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        span{
          display: inline-block;
          @include wh(4rem,2.1rem);
          @include bgi_2('/static/icon/coupon/product_bg_grade.png',4rem,2.1rem);
          @include sc(1rem,$bgWhite);
          line-height: 2.3rem;
          text-align: left;
          padding-left: .2rem
        }
      }
    }
  }
}
</style>