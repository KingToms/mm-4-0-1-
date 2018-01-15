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
import noMessage from './children/noMessage'
import { getActivityMsg, setMsgReaded } from '@/service/getData';
import common from '../../common/common'
export default {
  name: "activity",
  data () {
    return {
      title: '活动消息',
      msg_list: [],

      count: '0', // 消息总数
      page_no: '1', // 第几页
      per_page: '10', // 一页显示几条
      flag: true,
    };
  },
  created(){
    this.getActivityMsgList();
    this.scroll();
  },
  methods: {
    // 获取活动消息列表
    async getActivityMsgList(){
      this.flag = false;
      let res = await getActivityMsg({page_no: this.page_no, per_page: this.per_page});
      if(res.status == 'ok'){
        this.msg_list = this.msg_list.concat(res.data);
        if(this.msg_list.length > 0){ // 有活动消息,则设置最新一条消息为已读
          this.setNewsReaded(this.msg_list[0].id);
        }

        this.flag = true;
        // 消息列表最后一页了
        if(res.data.length < this.per_page){
          this.flag = false;
        }
      }
    },

    // 设置活动消息已读
    async setNewsReaded(newsId){
      let result = await setMsgReaded({type: '1',news_id: newsId});
      if(result.status == 'ok'){ // 设置为已读消息

      }
    },

    // 滚动查看下一页
    scroll(){
      let _this = this;
      if(this.$route.path == '/messageCenter/activity'){
        common.scroll(() => {
          if(_this.flag){
            _this.page_no ++;
            _this.getActivityMsgList();
          }
        });
      }
    },
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
  background-color: #f3f3f3;
  @include wh(100%, 100%);
  .header{
    width: 100%;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 20;
  }
  .message_text{
    background-color: #f3f3f3;
    padding-top: 4rem;
    padding-bottom: 10rem;
  }
}
</style>