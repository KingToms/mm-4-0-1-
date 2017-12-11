<template>
  <header class="header">
    <div class="header_top">
      <router-link to="/city" class="top_left">
        <span id="current_city">{{city}}</span>
        <img src="../../../assets/image/icon/home/city.png" alt="选择城市">
      </router-link>
      <div class="searchbar" @click="$router.push('/search/start')">
        <img src="../../../assets/image/icon/home/search01.png" alt="">
        <input type="text" name="search" id="search" v-model="searchContent" placeholder="魅力社交妆" disabled>
      </div>
      <!-- 消息通知 -->
      <!-- <router-link to="/messageCenter" class="top_right">
        <img src="../../../assets/image/icon/home/info_nor.png" alt="">
      </router-link> -->
    </div>
  </header>
</template>
<script>
import Vue from 'vue'
import {getStore} from '../../../common/store';
import {setStore} from '../../../common/store.js';
import {mapMutations} from 'vuex';
import '../../../common/geolocation.min.js'; // 引入腾讯地图前端定位组件的js
export default {
  name: 'header',
  data () {
    return {
      searchContent: '',
      _self: '',
      city: '广州市',
      adcode: ''
    }
  },
  created (){
    if(!JSON.parse(getStore("current_city"))){
      this.geoLocation();
    }else{
      this.city = JSON.parse(getStore("current_city")).city_name;
    }
  },
  computed: {
  },
  methods: {
    ...mapMutations(['SET_CURRENTCITY']),
    // 定位城市
    geoLocation (){
      let geolocation = new qq.maps.Geolocation("525BZ-YED3G-LVMQM-I4SUN-QKSX7-S6FEX", "myapp");
      let options = { timeout: 8000 };
      geolocation.getLocation(this.showPosition, this.showErr, options);
    },
    showPosition(position) {
      let city_name = position.city ? position.city : "广州市";
      let city_id = position.adcode ? position.adcode : "440100";
      city_id = city_id.toString().substring(0,4) + "00"; // 确保获取的是城市ID，而不是区ID.
      let cityObj = {"city_name":city_name,"city_id":city_id};
      setStore("current_city",cityObj); // localStore存储当前城市及ID

      this.city = city_name; // 显示当前定位城市
      let currentCity = {
        city_name: city_name, // 当前城市名称，存vuex
        city_id: city_id // 当前城市id，存vuex
      }
      this.SET_CURRENTCITY(currentCity); // 当前城市存vuex
    },
    showErr() {
      alert("定位失败！请重新选择城市");
    },

  },
  props: []
}
</script>
<style lang="scss" scoped>
@import '../../../assets/css/mixin.scss';
.header{
  width: 100%;
  max-width: 37.5rem;
  // position: fixed;
  top: 0;
  z-index: 2;
  background-color: #fff;
}
.header_top{
  position: relative;
  height: 4.5rem;
  line-height: 4.5rem;
  .top_left{
    z-index: 3;
    position: absolute;
    top: 0;
    left: 0;
    width: 9.2rem;
    height: 100%;
    font-size: 1.4rem;
    color: #000;
    padding: 0 1rem 0 1.2rem;
    cursor: pointer;
    #current_city{
      display: inline-block;
      width: 5.6rem;
      text-align: center;
      overflow:hidden;
      text-overflow:ellipsis;
      white-space:nowrap;
    }
    img{
      position: absolute;
      top: 44%;
      right: 1rem;
      display: inline-block;
      width: 1.1rem;
    }
  }
  .searchbar{
    position: relative;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    // padding: 0 4.8rem 0 9rem;
    padding: 0 1.5rem 0 9rem;
    img{
      position: absolute;
      top: 1.4rem;
      left: 10rem;
      width: 1.6rem;
    }
    #search{
      width: 100%;
      height: 2.8rem;
      padding-left: 3rem;
      margin-top: 0.8rem;
      font-size: 1.4rem;
      background-color: #EEE;
      @include borderRadius(0.5rem);
      #search::-webkit-input-placeholder,
      #search:-moz-placeholder,
      #search::-moz-placeholder,
      #search:-ms-input-placeholder
      {
        color: #999;
      }
    }
  }
  .top_right{
    z-index: 3;
    position: absolute;
    right: 0;
    top: 0;
    height: 100%;
    padding: 0 1.2rem;
    img{
      display: inline-block;
      width: 2.3rem;
      vertical-align: middle;
    }
  }
}
</style>