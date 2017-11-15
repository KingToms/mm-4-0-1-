<template>
  <div class="city">
    <div  class="header">
      <span class="back" @click="back"></span>
      <div class="title">选择城市</div>
      <div class="search" :class="{'input_search': inputState}">
        <form @submit.prevent="cityFilter()">
          <i class="icon" :class="{'iconState': inputState}"></i>
          <!-- 或拼音查询 @input="filterCity"-->
          <input type="search" v-model="searchText"  class="search_city" :class="{'inputing': inputState}" placeholder="输入城市名" @focus="inputText" @blur="inputBlur">
          <i class="icon-delete" v-show="iconShow" @click="resetText()"></i>
          <a href="javascript:void(0)" class="btn-cancal" v-if="inputState" @click="cancalSearch">取消</a href="javascript:void(0)">
        </form>
      </div>
    </div>
    <div class="content" v-show="unSearch">
      <div class="content-left">
        <section class="currentCity">
          <div class="title_city">当前定位的城市</div>
          <div class="city"@click="setCity(currentCity)">{{nowCity}}</div>
        </section>
        <section class="popularCity">
          <div class="title_city">热门城市</div>
          <ul class="cityDetail clear">
            <li class="city" v-for="(item,index) in popularCity" :key="index" @click="setCity({name: item, value: sourceData[item]})"><a href="javascript:void(0);">{{item}}</a></li>
          </ul>
        </section>
        <section class="openCity">
          <div class="title_city">已开通服务城市</div>
          <div v-for="item in arrTop" :key="item" :id="item">
            <div v-if="cityArr[item]">
              <div class="title">{{item}}</div>
              <div v-for="city in cityArr[item]" :key="city" class="city_item" @click="setCity(city)">{{city.name}}</div>
            </div>
          </div>
        </section>
      </div>
      <div class="right-text">
          <a v-for="item in arrTop" :key="item" href="javascript:void(0);" @click="goAnchor(`${item}`)">{{item}}</a>
      </div>
      <div id="tip">
        {{tipString}}
      </div>
    </div>
    <div class="searchResult" v-show="!unSearch">
      <div v-for="city in searchResult" :key="city" class="city_item" @click="setCity(city)">{{city.name}}</div>
    </div>
  </div>
</template>
<script>
import {setStore} from '../../common/store.js';
import {getCities} from '../../service/getData';
import '../../common/geolocation.min.js' // 引入腾讯地图前端定位组件的js
// import keyConf from '../../common/keyConf.js'
import {mapState} from 'vuex'
export default {
  name: 'city',
  data () {
    return {
      currentCity: {},
      nowCity: '',
      arrTop: ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'],
      cityArr: {},
      inputState: false, // 输入状态
      searchText: '', // 输入搜索内容
      iconShow: false, // 删除按钮显示
      tipString: '', // 字母提示
      sourceData: {}, // 返回原数据
      unSearch: true, // 是否进行搜索
      searchResult: [],
      popularCity: ['北京市','广州市','深圳市','杭州市','重庆市','佛山市','成都市','武汉市'] // 地址搜索结果
    }
  },
  created (){
    this.getCities();
    

  },
  computed:{
  },
  watch: {
    searchText (newCitySearch){
      this.cityFilter(newCitySearch);
    }
  },
  methods: {
    /* 获取当前城市定位 */
    geoLocation (){
      let geolocation = new qq.maps.Geolocation("525BZ-YED3G-LVMQM-I4SUN-QKSX7-S6FEX", "myapp");
      let options = {timeout: 8000};
      geolocation.getLocation(this.showPosition, this.showErr, options);
    },
    showPosition (position){
      let city_name = position.city ? position.city : "广州市";
      let city_id = position.adcode ? position.adcode : "440100";
      city_id = city_id.toString().substring(0,4) + "00"; // 确保获取的是城市ID，而不是区ID.
      let cityObj = {"city_name":city_name,"city_id":city_id};
      localStorage.setItem("current_city", JSON.stringify(cityObj)); // localStore存储当前城市及ID

      this.currentCity = {"name": city_name,"value": {"city_id":city_id}};
      this.nowCity = city_name; // 显示当前城市
    },
    showErr (){
      let cityObj = {"city_name": "广州市","city_id": "440100"};
      localStorage.setItem("current_city", JSON.stringify(cityObj));
      alert("定位失败！请刷新");
    },

    async getCities(){
      let res = await getCities()
      if(res){
        this.sourceData = res;
        this.formatCity(res);
        this.geoLocation ();
      }
    },
    formatCity(res){
      for(let key in res){
        let initials = res[key].py_name.substr(0,1)
        let newObj = {
          name: key,
          value: res[key]
        }
        if(this.cityArr[initials]){
          this.cityArr[initials].push(newObj)
        }else{
          this.cityArr[initials] = [newObj]
        }
      }
    },

    goAnchor (id){
      if(id === "#"){
        return
      }
      this.tipString = id; // 文字提示：点击字母
      let anchor = this.$el.querySelector('#'+id);
      let tip = this.$el.querySelector('#tip');
      // tip.setAttribute('class', 'tipAppear')
      // setTimeout(function () {
      //   tip.removeAttribute('class')
      // }, 500)
      $('#tip').fadeIn(500, ()=>{
        setTimeout(function() {
          $('#tip').fadeOut(500);
        }, 500);
      });
      $('html,body').animate({scrollTop: anchor.offsetTop}, 800); // 滚动到点击对应的字母
    },
    // 返回上一级
    back (){
      this.$router.go(-1);
    },
    inputText (){
      this.inputState = true;
      this.iconShow = true;
      this.unSearch = false;
    },
    inputBlur (){
      if(this.searchText == ""){
        // this.inputState = false;
        this.iconShow = false;
      }
    },
    // 删除搜索内容
    resetText () {
      this.searchText = "";
      this.iconShow = false;
      this.formatCity(this.sourceData)
      this.searchResult = [];
    },
    // 取消搜索
    cancalSearch (){
      this.unSearch = true;
      this.inputState = false;
      this.iconShow = false;
      this.searchText = "";
      this.searchResult = [];
    },

    // 得到城市第一个字母的首字母
    getFirstLetter (str){
      return pinyin(str)[0][0].charAt(0).toUpperCase();
    },
    filterCity(){
      // if( /[^\u4e00-\u9fa5]/.test(this.searchText))
      this.searchResult = []
      for(let key in this.sourceData){
        if(key.indexOf(this.searchText)>-1){
          this.searchResult.push({name:key,value:this.sourceData[key]})
        }
      }
    },
    // 城市搜索筛选
    cityFilter (){
      // console.log("触发")
      this.searchResult = []
      for(let key in this.sourceData){
        if(key.indexOf(this.searchText) > -1){
          this.searchResult.push({name:key,value:this.sourceData[key]})
        }
      }
    },
    setCity(city){
      let obj = {"city_name":city.name,"city_id":city.value.city_id}
      setStore("current_city",obj)
      this.$router.push("/")
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../assets/css/mixin.scss';
.city{
  @include wh(100%,100%);
  .header{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    box-sizing: border-box;
    background-color: #f8f8f8;
    z-index: 2;
    border-bottom: 1px solid #bbb;
    .back{
      position: absolute;
      top: 0.8rem;
      left: 0.6rem;
      @include wh(2.4rem,2.4rem);
      @include bis("../../assets/image/icon/login/nav_btn_return.png");
    }
    .title{
      @include wh(100%,4rem);
      @include sc(1.8rem,#000);
      letter-spacing: 2px;
      text-align: center;
      line-height: 4rem;
    }
    .search{
      @include wh(100%,4rem);
      position: relative;
      line-height: 4rem;
      padding: 0 1rem;
      .search_city{
        @include wh(100%,3rem);
        @include borderRadius(.4rem);
        background-color: #eee;
        text-align: center;
      }
      .inputing{
        text-align: left;
        padding-left: 3rem;
      }
      .icon{
        @include wh(1.4rem,1.4rem);
        @include bis("../../assets/image/icon/city/home_icon_search.png");
        position: absolute;
        top: 1.2rem;
        left: 50%;
        margin-left: -8rem;
      }
      .iconState{
        left: 2rem;
        margin-left: 0;
      }
      .icon-delete{
        @include wh(1.4rem,1.4rem);
        @include bis("../../assets/image/icon/detail/icon_delete.png");
        position: absolute;
        top: 1.4rem;
        right: 7.8rem;
      }
      .btn-cancal{
        position: absolute;
        top: 0.4em;
        right: 1rem;
        @include wh(4rem,3rem);
        line-height: 3rem;
        text-align: center;
        color: #e65058;
        font-size: 1.4rem;
      }
    }
    .input_search{
      padding-right: 6rem;
    }
  }
  .content{
    position: relative;
    width: 100%;
    margin-top: 8rem;
    .content-left{
      overflow: scroll;
      margin-right: 1.5rem;
      box-sizing: border-box;
      .currentCity{
        padding-left: 1.5rem;
      }
      .popularCity{
        padding-left: 1.5rem;
        ul.cityDetail{
          box-sizing: border-box;
          @include bgColor(#fff);
          li{
            float: left;
            height: 4rem;
            line-height: 4rem;
            padding: 0 7px 0 7px;
            margin: 0 1rem 1rem 0;
          }
        }
      }
      .openCity{
        .title_city{
          padding-left: 1.5rem;
        }
      }
      .title_city{
        @include sc(1.4rem, #999);
        padding: 2rem 0 1rem;
        line-height: 1.5rem;
      }
      .city{
        @include wh(10.5rem, 4rem);
        @include sc(1.5rem, #000);
        @include borderRadius(0.4rem);
        border: 1px solid #999;
        line-height: 4rem;
        text-align: center;
        background-color: #fff;
      }
    }
    .right-text{
      width: 1.5rem;
      right: 0.1rem;
      top: 3.25rem;
      @include ct;
      position: fixed;
      a{
        @include sc(1.1rem,#e65058);
        display: block;
        text-align: center;
        height: 1.4rem;
      }
    }
  }
  .openCity{
    .title{
      @include bgColor(#f5f5f5);
      @include sc(1.4rem, #999);
      @include wh(100%,2.8rem);
      line-height: 2.8rem;
      padding-left: 1.5rem;
    }
    .city_item{
      @include bgColor(#fff);
      @include sc(1.5rem, #000);
      height: 4.4rem;
      line-height: 4.4rem;
      margin-left: 1.5rem;
      border-bottom: 1px solid #ddd;
      &:last-child{
        border-bottom: 0;
      }
    }
  } 
  /* 点击选中的字母 */
  #tip{
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    border: 0.05rem solid #555;
    width: 5rem;
    height: 5rem;
    z-index: 10;
    text-align: center;
    line-height: 5rem;
    font-size: 2.5rem;
    color: #e65058;
    // opacity: 0;
    display: none;
  }
  .tipAppear {
    -webkit-animation: appearTip 1 linear 0.5s;
    animation: appearTip 1 linear 0.5s;
  }
  @-webkit-keyframes appearTip {
    0% {
      opacity: 1;
    }
    80% {
      opacity: 0.5;
    }
    100% {
      opacity: 0;
    }
  }
  @keyframes appearTip {
    0% {
      opacity: 1;
    }
    80% {
      opacity: 0.5;
    }
    100% {
      opacity: 0;
    }
  }
  .searchResult{
    position: relative;
    width: 100%;
    margin-top: 8rem;
    .city_item{
      @include bgColor(#fff);
      @include sc(1.5rem, #000);
      height: 4.4rem;
      line-height: 4.4rem;
      margin-left: 1.5rem;
      border-bottom: 1px solid #ddd;
      &:last-child{
        border-bottom: 0;
      }
    }
  }
}
</style>