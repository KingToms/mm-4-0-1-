<template>
  <section class="activityMsg">
    <a :href="item.link">
      <h3 class="title">{{item.title}}</h3>
      <div class="img" :style="{'background-image':`url(${item.image})`}"></div>
      <div class="content" v-html="item.description">
      </div>
      <p class="time">{{item.created_at}}</p>
    </a>
  </section>
</template>
<script>
export default {
  name: "activityItem",
  data () {
    return {
    };
  },
  props:{
    item: {
      default: {
        link: '#',
        title: '从路人甲蜕变成女王',
        image: 'http://crm2test.qiaocat.com//upload/ad/b8474a62363da1334755405a66087a1d.jpg',
        description: '女神节不能输侧颜杀！拉近镜头你敢吗？完美侧颜，俘虏那些奇遇的男生',
        created_at: '2017-03-01',
      },
      type: Object
    }
  },
  methods: {
  }
}
</script>
<style lang="scss" scoped>
@import '../../../assets/css/mixin.scss';
.activityMsg{
  margin-top: 1rem;
  padding: 1.6rem 1.5rem 1.2rem;
  background-color: #fff;
  width: 100%;
  .title{
    @include sc(1.6rem,#000);
    line-height: 1.8rem;
    margin-bottom: 1.6rem;
  }
  .img{
    @include wh(100%,14rem);
    @include borderRadius(0.4rem);
    background-position: center;
    background-size: cover;
    // @include bis("../../../../static/image/message/home_activity01.jpg");
    margin-bottom: 1.2rem;
  }
  .content{
    @include wh(100%,1.5rem);
    @include sc(1.3rem,#666);
    line-height: 1.5rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 1rem;
  }
  .time{
    @include sc(1.1rem,#999);
    line-height: 1.2rem;
  }
}
</style>