<template>
  <div class="activity_box">
    <lHeader :title="title"></lHeader>
    <div class="message_text" v-if="msg_list.length > 0">
      <activityItem v-for="(item,index) in msg_list" :key="index" :item="item"></activityItem>
    </div>
    <no-message v-else></no-message>
  </div>
</template>
<script>
import lHeader from "../../components/common/lHeader"
import activityItem from "./children/activityItem"
import noMessage from '../../page/messagepage/children/noMessage'
import { getTopics } from '@/service/getData';
import common from '../../common/common'
export default {
  name: 'topic',
  data () {
    return {
      title: '活动专场',
      msg_list: [],

      count: '0', // 消息总数
      page_no: '1', // 第几页
      per_page: '10', // 一页显示几条
      flag: true,
    }
  },
  created(){
    this.getTopics();
    // this.scroll();
  },
  methods: {
    // 获取专题列表
    async getTopics(){
      let res =await getTopics();
      this.msg_list = res
    },
    // 滚动查看下一页
    scroll(){
      let _this = this;
      if(this.$route.path == '/messageCenter/activity'){
        common.scroll(() => {
          if(_this.flag){
            _this.page_no ++;
            _this.getTopics();
          }
        });
      }
    }
  },
  components: {
    lHeader,
    activityItem,
    noMessage,
  }
}
</script>
<style lang="scss" scoped>
@import '../../assets/css/mixin.scss';
.activity_box{
  // background-color: #f3f3f3;
  @include wh(100%, 100%);
  .header{
    width: 100%;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 20;
  }
  .message_text{
    // background-color: #f3f3f3;
    padding-top: 4.6rem;
    padding-bottom: 10rem;
  }
}
</style>