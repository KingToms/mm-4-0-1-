<template>
  <div class="message_center">
    <lHeader :title="title"></lHeader>
    <section class="message_box class_box">
      <messageList :list="classList.activity"></messageList>
      <!--<messageList :list="classList.customer"></messageList>-->
      <messageList :list="classList.system"></messageList>
    </section>
    <section class="message_box" v-if="message_box">
      <messageList :list="messsageList"></messageList>
      <messageList :list="messsageList"></messageList>
      <messageList :list="messsageList"></messageList>
    </section>
  </div>
</template>
<script>
import Vue from 'vue';
import lHeader from '../../components/common/lHeader';
import messageList from '../../page/messagepage/children/messageList';
export default {
  name: "messageCenter",
  data () {
    return {
      title: '消息中心',
      classList: {
        /* 活动消息 */
        activity: {
          url: '/messageCenter/activity',
          image: '../../../static/icon/message/info_icon_list01.png',
          title: '活动消息',
          time: '2017-07-03',
          content: '3月8日女神节给他完美侧颜杀',
          has_new: false, // 有新消息
        },
        /* 客服消息 */
        customer: {
          url: '/messageCenter/message',
          image: '../../../static/icon/message/info_icon_list02.png',
          title: '俏猫客服',
          time: '2017-06-18',
          content: '美业师已出发',
          has_new: true, // 有新消息
        },
        /* 系统消息 */
        system: {
          url: '/messageCenter/system',
          image: '../../../static/icon/message/info_icon_list03.png',
          title: '系统消息',
          time: '2017-07-03',
          content: '您有1张价值100元的优惠券，将于2016年12月21日过期，请及时使用，祝你体验愉快。',
          has_new: true, // 有新消息
        },
      },
      message_box: false, // 暂不显示留言功能
      /* 订单消息 */
      messsageList: {
        url: '/messageCenter/message',
        image: '../../../static/icon/message/people01.jpg',
        title: '李美美',
        time: '2017-07-03',
        content: '好的，我会准时到达服务的，提前祝你服务愉快。',
        // state: true,
      }
    };
  },
  methods: {
  },
  components: {
    lHeader,
    messageList,
  }
}
</script>
<style lang="scss" scoped>
@import '../../assets/css/mixin.scss';
.message_center{
  background-color: #f3f3f3;
  @include wh(100%, 100%);
  .header{
    width: 100%;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 20;
  }
  .message_box{
    background-color: #fff;
    padding-left: 1rem;
    margin-bottom: 1rem;
  }
  .class_box{
    margin-top: 4rem;
  }
  div.li_list:last-child{
    border-bottom: 0;
  }
}
</style>