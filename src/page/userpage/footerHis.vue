<template>
  <div class="footer-history">
    <div class="header">
      <div><lHeader :title="title"></lHeader></div>
    </div>
     <!-- :style="{ height: wrapperHeight + 'px' }" -->
    <div class="list page-loadmore-wrapper" id="wrapper">
      <div class="content clear">
        <ListItem v-for="(item,index) in product_list" :key="index" :list="item"></ListItem>
      </div>
    </div>

    <!-- 无足迹 -->
    <div class="no_list" v-if="product_list.length <=0">
      <img src="/static/icon/ucenter/footprint_icon_null.png" alt="">
      <p>您没有相关的足迹</p>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import lHeader from '../../components/common/lHeader'
import ListItem from '../homepage/children/children/listItem'
import { Loadmore } from 'mint-ui'

import {getFootList} from '../../service/getData'
import {getStore} from '../../common/store.js'
import keyConf from '../../common/keyConf.js'
import common from '../../common/common'
Vue.component(Loadmore.name, Loadmore)
export default {
  name: 'footHis',
  data () {
    return {
      title: '我的足迹',
      uinfo: JSON.parse(getStore(keyConf.uInfo)),
      product_list: [],
      page: 1,
      psize: 10,
      totalCount: -1,
      flag: true
    }
  },
  created(){
    this.getFootList()
    this.scroll()
  },
  updated() {
  },
  components:{
    lHeader,
    ListItem
  },
  methods: {
    async getFootList(){
      this.flag = false
      let res = await getFootList({uid:this.uinfo.id,page: this.page, psize: this.psize})
      if(res.status === 'ok'){
        this.product_list = this.product_list.concat(res.data.result) 
        this.totalCount = res.data.count
        this.flag = true
        if(this.totalCount === this.product_list.length)
          this.flag = false
      }
      
    },
    scroll(){
      
      let _this = this
      if(this.$route.path === '/footerhis'){
        common.scroll(()=>{
          if(_this.flag){
              _this.page++
              _this.getFootList()
            }
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../assets/css/mixin.scss';
.footer-history{
  .header{
    @include wh(100%,4rem);
    >div{
      position: fixed;
      z-index: 1;
      @include wh(100%,4rem);
    }
  }
  .content{
    padding-left: 1rem;
  }
  /* 无足迹提醒 */
  .no_list{
    position: fixed;
    top: 40%;
    left: 50%;
    transform: translate(-50%,-50%);
    text-align: center;
    img{
      @include wh(12rem, 12rem);
    }
    p{
      @include sc(1.6rem, #999);
      text-align: center;
    }
  }
}
</style>