<template>
  <div class="service-type">
    <div class="icon"><img :src="serviceImg" alt=""></div>
    <div class="service-title"><span :class="{'color':type == inDoor}">{{serviceTitle}}</span></div>
  </div>
</template>
<script>
export default {
  name: 'serviceType',
  data () {
    return {
    }
  },
  props: ['serviceImg', 'serviceTitle', 'inDoor', 'type']
}
</script>
<style lang="scss" scoped>
@import '../../../assets/css/mixin.scss';
.service-type{
  overflow: hidden;
  .icon{
    text-align: center;
    img{
      @include wh(2.2rem, 2.2rem);
      margin-top: 2.2rem;
      vertical-align: bottom;
    }
  }
  .service-title{
    padding: .3rem 0 2.3rem 0;
    text-align: center;
    span{
      font-size: 1.4rem;
      color: #999;
      letter-spacing: 1px;
      &.color{
        color: #e70034;
      }
    }
  }
}
</style>