<template>
  <div class="search">
    <div class="header">
      <form @submit.prevent="searchFun()">
        <div class="input" v-auto-focus="focusCtrl" :data-current="currentIndex">
          <input type="search" v-model="searchText" placeholder="请输入要搜索的内容" data-index="0">
        </div>
          <a href="javascript:void(0);" @click="back" class="back"></a>
          <a href="javascript:void(0)" @click="searchFun" class="btn-search">搜索</a>
      </form>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
import {mapState, mapMutations} from 'vuex'
import noResult from './children/noResult'
import {getStore,setStore,removeStore} from '../../common/store.js'
import keyConf from '../../common/keyConf.js'
import {search} from '../../service/getData.js'
export default {
  name: 'search',
  data () {
    return {
      focusCtrl: 0,
      currentIndex: 0,
      searchText: '',
      searchList: [],
    }
  },
  created () {
    this.searchText = this.currentSearch
  },
  computed:{
    ...mapState([
      'currentSearch'
    ])
  },
  components: {
    // searchHistory,
    // searchResult,
    // noResult
  },
  methods: {
    ...mapMutations([
      'SET_SEARCHHIS','CLEAR_SEARCHHIS','HAS_HISTORY','SET_CURRENTSEARCH'
    ]),
    back(){
      // this.SET_SEARCHHIS('')
      this.SET_CURRENTSEARCH('')
      this.$router.push('/');
    },
    searchFun (content) {
      if(this.searchText.length>0){
        this.SET_SEARCHHIS(this.searchText)
        this.HAS_HISTORY()
      }
      this.SET_CURRENTSEARCH(this.searchText)
      // 获取数据
      // let res = await search({Keyword: this.searchText})
      this.$router.push('/search/result')
    },

  }
}
</script>
<style lang="scss" scoped>
@import '../../assets/css/mixin.scss';
.search{
  background-color: #fff;
  .header{
    position: relative;
    @include wh(100%, 4.4rem);
    line-height: 4.4rem;
    border-bottom: .05rem solid #ccc;
    .input{
      @include wh(100%, 2.8rem);
      padding: 0 5.4rem 0 5rem;
      box-sizing: border-box;
      input[type=search]{
        @include wh(100%, 2.8rem);
        border-radius: .5rem;
        background-color: #eaebed;
        padding-left: 3rem;
        background-image: url('../../assets/image/icon/home/search01.png');
        background-size: 1.5rem 1.4rem;
        background-repeat: no-repeat;
        background-position: 1.2rem .8rem;
      }
    }
    a{
      position: absolute;
      // @include wh()
      &.back{
        position: absolute;
        top: .8rem;
        left: 1.3rem;
        @include wh(2.4rem,2.4rem);
        background-image: url('../../assets/image/icon/login/nav_btn_return.png');
        background-repeat: no-repeat;
        background-position: center;
        background-size:2.2rem 2.2rem;
      }
      &.btn-search{
        // @include wh(3.2rem, 2.4rem);
        height: 2.4rem;
        top: .8rem;
        right: 1rem;
        line-height: 2.4rem;
        color: #000;
        font-size: 1.6rem;
        letter-spacing: 0;
        // vertical-align: middle;
      }
    }
  }
}
</style>