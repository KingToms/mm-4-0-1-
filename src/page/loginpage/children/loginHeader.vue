<template>
  <div class="header">
    <div class="title">
      <h2>{{title}}</h2>
    </div>
    <div class="reg-box" v-show="regShow">
      <router-link class="reg-btn" :to="`/register?plid=${channel}&url=${$route.query.url}`" v-if="$route.query.url">注册</router-link>
      <router-link class="reg-btn" :to="`/register?plid=${channel}`" v-else>注册</router-link>
    </div>
    <a class="back" href="javascript:void(0);" @click="$router.go(-1)" ></a>
  </div>
</template>
<script>
export default {
  name: 'loginHeader',
  data () {
    return {
      title: '',
    }
  },
  props:{
    channel:{
      default: '',
      type: String
    },
    regShow:{
      default: 'true',
      type: Boolean
    },
  }
}
</script>
<style lang="scss" scoped>
@import '../../../assets/css/mixin.scss';
.header{
  @include bgColor(#fff);
  position: relative;
  .title{
    @include wh(100%,4.4rem);
    // border-bottom: 0.05rem solid #999;
    line-height: 4.4rem;
    text-align: center;
    h2{
      font-size: 1.8rem;
      color: #000;
      letter-spacing: 1px;
    }
  }
  /*注册*/
  .reg-box {
    display: block;
    position: absolute;
    top: 1rem;
    right: 1.4rem;
    font-size: 1.5rem;
    cursor: pointer;
    .reg-btn {
      color: #666;
    }
  }
  /*返回上一步*/
  .back{
    position: absolute;
    top: 1.2rem;
    left: 1.5rem;
    @include wh(1.7rem,1.7rem);
    background-image: url('../../../assets/image/icon/login/nav_btn_return.png');
    background-repeat: no-repeat;
    background-position: center;
    background-size: 2.2rem 2.2rem;
    cursor: pointer;
  }
}
</style>