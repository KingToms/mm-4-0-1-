<template>
  <router-link :to="list.url" tag="div" class="li_list">
    <div class="icon">
      <img :src="list.image" alt="" onerror="this.src='../../../../static/icon/message/service_icon_user.png'">
      <img src="../../../../static/icon/message/info_icon_list_red.png" alt="新消息" class="new_message" v-show="list.has_new">
    </div>
    <div class="content">
      <p class="top clear">
        <span class="title left">{{list.title}}</span>
        <span class="time right">{{list.time}}</span>
      </p>
      <p class="text">{{list.content}}</p>
    </div>
  </router-link>
</template>
<script>
export default {
  name: "messageList",
  data () {
    return {
    };
  },
  props: {
    list: {
      type: Object
    }
  },
  created(){
  },
  methods: {

  },
}
</script>
<style lang="scss" scoped>
@import '../../../assets/css/mixin.scss';
div.li_list{
  position: relative;
  @include wh(100%, 7.2rem);
  border-bottom: 1px solid #ddd;
  .icon{
    position: absolute;
    top: 1.3rem;
    @include wh(4.5rem,4.5rem);
    background-color: #F3F3F3;
    img{
      width: 100%;
    }
    img.new_message{
      position: absolute;
      top: -0.5rem;
      right: -0.5rem;
      @include wh(1.4rem,1.4rem);
    }
  }
  .content{
    @include wh(100%, 100%);
    padding-left: 5.5rem;
    p.top{
      padding: 1.5rem 0 1rem;
      line-height: 1.5rem;
      span.title{
        @include sc(1.6rem,#000);
      }
      span.time{
        @include sc(1.1rem,#999);
        margin-right: 1rem;
      }
    }
    p.text{
      line-height: 1.3rem;
      @include sc(1.3rem,#999);
      margin-right: 1.5rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
</style>