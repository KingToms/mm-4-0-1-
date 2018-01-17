<template>
  <div class="system_box">
    <lHeader :title="title"></lHeader>
    <div class="message_text" v-if="hasMessage">
      <systemItem :isSystemMsg="isSystemMsg"></systemItem>
      <systemItem :isSystemMsg="!isSystemMsg"></systemItem>
    </div>
    <no-message v-if="!hasMessage"></no-message>
  </div>
</template>
<script>
import lHeader from '../../components/common/lHeader'
import systemItem from './children/systemItem'
import noMessage from './children/noMessage'
import { getSystemMsg, setMsgReaded } from '@/service/getData'
import common from '../../common/common'
export default {
  name: "system",
  data () {
    return {
      title: '系统消息',
      msg_list: [], // 消息列表
      hasMessage: false, //是否有系统消息
      isSystemMsg: true, // 是否是优惠券消息,还是订单消息

      count: '0', // 消息总数
      page_no: '1', // 第几页
      per_page: '10', // 一页显示几条
      flag: true,
    };
  },
  created(){
    // this.getSystemMsgList();
    // this.scroll();
  },
  methods: {
    // 获取系统消息列表
    async getSystemMsgList (){
      this.flag = false;
      let res = await getSystemMsg({page_no: this.page_no, per_page: this.per_page});
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

    // 设置系统消息已读
    async setNewsReaded(newsId){
      let result = await setMsgReaded({type: '2',news_id: newsId});
      if(result.status == 'ok'){ // 设置为已读消息

      }
    },

    // 滚动查看下一页
    scroll(){
      let _this = this;
      if(this.$route.path == '/messageCenter/system'){
        common.scroll(() => {
          if(_this.flag){
            _this.page_no ++;
            _this.getSystemMsgList();
          }
        });
      }
    },
  },
  components: {
    lHeader,
    systemItem,
    noMessage,
  }
}
</script>
<style lang="scss" scoped>
@import '../../assets/css/mixin.scss';
.system_box{
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
    padding: 4rem 1.5rem 10rem;
  }
}
</style>