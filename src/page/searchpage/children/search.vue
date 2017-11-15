<template>
  <div class="search-child">
    <div class="search-hot">
      热门搜索
    </div>
    <div class="search-hotword">
      <ul class="clear">
        <li class="left" v-for="item in hotWord" :key="item.value"><a href="javascript:void(0);" @click="searchHistory(item.name)">{{item.name}}</a></li>
      </ul>
    </div>
    <div class="search-history">
      <div class="serach-history-header"></div>
      <div class="serach-history-title" v-if="hasHistory">
        <p>搜索历史</p>
        <a href="javascript:void(0);" class="delete-history" @click="delHistory"></a>
      </div>
      <p class="search-noresult" v-if="!hasHistory">暂无搜索记录</p>
      <div class="search-history-result">
        <ul>
          <li v-for="item in searchHis" :key="item" @click="searchHistory(item)"><a href="javascript:void(0);">{{item}}</a></li>
          <!--<li><a href="javascript:void(0);" @click="searchFun">唇</a></li>-->
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import {mapState, mapMutations} from 'vuex'
import {search} from '../../../service/getData'
export default {
  name: 'searchChild',
  data () {
    return {
      hotWord: []
    }
  },
  computed: {
    ...mapState([
      'searchHis','hasHistory'
    ])
  },
  created () {
    // 获取搜索热词
    this.getHot()
    this.GET_SEARCHHIS()
    this.HAS_HISTORY()
  },
  methods: {
    ...mapMutations([
      'CLEAR_SEARCHHIS','HAS_HISTORY','GET_SEARCHHIS','SET_CURRENTSEARCH','SET_SEARCHHIS'
    ]),
    delHistory () {
      this.CLEAR_SEARCHHIS()
      this.HAS_HISTORY()
    },
    searchHistory(item){
      this.SET_SEARCHHIS(item)
      this.HAS_HISTORY()
      this.SET_CURRENTSEARCH(item)
      this.$router.push('/search/result')
      // this.$emit('searchChild', {keyword: item})
    },
    async getHot () {
      let res = await search()
      this.hotWord = res.data.hot_search
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../../assets/css/mixin.scss';
.search-child{
  background-color: #fff;
  letter-spacing: 1px;
  .search-hot{
    @include wh(100%, 4.4rem);
    line-height: 4.4rem;
    padding-left: 1rem;
    font-size: 1.4rem;
    color: #999;
  }
  .search-hotword{
    overflow: auto;
    margin: 1rem 0 2.3rem;
    ul.clear{
      padding-left: .8rem;
      li{
        height: 3.5rem;
        margin: 0 .7rem 1.2rem;
        line-height: 3.5rem;
        padding: 0 1.3rem;
        background-color: #eaebed;
        border-radius: .5rem;
        font-size: 1.3rem;
        color: #666;
      }
    }
  }
  .search-history{
    border-top: .05rem solid #ddd;
    .serach-history-header{
      @include wh(100%, .9rem);
      background-color: #f3f3f3;
    }
    .serach-history-title,.search-noresult{
      position: relative;
      height: 4.3rem;
      line-height: 4.3rem;
      border-bottom: .05rem solid #ddd;
      padding-left: 1rem;
      font-size: 1.4rem;
      color: #999;
      .delete-history{
        position: absolute;
        top: .8rem;
        right: 1.5rem;
        @include wh(2.4rem, 2.4rem);
        background-image: url('/static/icon/search/search_icon_delete.png');
        background-size: 2.2rem 2.2rem;
        background-repeat: no-repeat;
        background-position: center center;
      }
    }
    .search-noresult{
      color: #000;
      text-align: center;
    }
    .search-history-result{
      border-bottom: .05rem solid #ddd;
      ul{
        padding-left: 2rem;
        li{
          width: 100%;
          border-bottom: .05rem solid #ddd;
          word-wrap: break-word;
          a{
            height: 4.3rem;
            line-height: 4.3rem;
            padding-left: 1rem;
            font-size: 1.4rem;
          }
          &:last-child{
            border: none;
          }
        }
      }
    }
  }
}
</style>