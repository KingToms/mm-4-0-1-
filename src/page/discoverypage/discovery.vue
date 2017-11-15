<template>
  <div class="discovery">
    <div class="dis-header">
      <div class="header" v-show="hideFooterHeader">
        <div class="title">
          <h2>发现</h2>
        </div>
      </div>
    </div>
    <div class="content">
      <activityItem v-for="(item,index) in activity" :key="index" :item="item"></activityItem>
    </div>
  </div>
</template>
<script>
import activityItem from '../../page/messagepage/children/activityItem'
import {getFoundList} from '../../service/getData'
export default {
  name: 'discovery',
  data () {
    return {
      hideFooterHeader: true,
      activity: []
    }
  },
  created(){
    this.showHeaderFooter()
    this.getFoundList()
  },
  methods:{
    async getFoundList(){
      let res = await getFoundList({})
      this.activity = res
    },
    showHeaderFooter(){
      let query = this.$route.query
      query = query ? query : {}
      if(query.app == 'ios' || query.app == 'android'){
        this.hideFooterHeader = false
      }
    }
  },
  components:{
    activityItem
  }
}
</script>
<style lang="scss" scoped>
@import '../../assets/css/mixin.scss';
.discovery{
  @include wh(100%,100%);
  @include bgColor(#f3f3f3);
  padding-bottom: 50px;
  .dis-header{
    @include wh(100%,4rem);
  }
  .header{
    position: fixed;
    @include wh(100%,4rem);
    @include bgColor(#fff);
    .title{
      @include wh(100%,4rem);
      // border-bottom: 1px solid #999;
      @include average(#999);
      line-height:4rem;
      text-align: center;
      h2{
        font-size: 1.8rem;
        color: #000;
        letter-spacing: 1px;
      }
    }
  }
  .content{
    @include wh(100%,100%);
    
    padding: 0 1.5rem 1.5rem;
  }
}
</style>