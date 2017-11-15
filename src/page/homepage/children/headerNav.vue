<template>
  <div class="header_bottom">
    <nav class="top_nav">
      <ul>
        <router-link :to="recommendLink" tag="li" class="type">推荐</router-link>
        <router-link :to="makeupLink" tag="li" class="type">化妆</router-link>
        <router-link :to="beautyLink" tag="li" class="type">美睫</router-link>
        <router-link :to="tattooLink" tag="li" class="type">半永久</router-link>
        <router-link :to="medicalLink" tag="li" class="type">医美</router-link>
        <router-link :to="trainLink" tag="li" class="type">培训</router-link>
      </ul>
    </nav>
  </div>
</template>
<script>
export default {
  name: "headerNav",
  data () {
    return {
      routerLink: '',
      recommendLink: '/home/recommend',
      makeupLink: '/home/makeup',
      beautyLink: '/home/beauty',
      tattooLink: '/home/tattoo',
      medicalLink: '/home/medical',
      trainLink: '/home/train',

    };
  },
  created (){
    this.initPage();
  },
  methods: {
    /*是否为客户端调用首页*/
    initPage (){
       var url = window.location.search; //获取url中"?"符后的字串
       if(url.indexOf("app=") != -1){
          this.recommendLink = this.recommendLink + "?app=ios";
          this.makeupLink = this.makeupLink + "?app=ios";
          this.beautyLink = this.beautyLink + "?app=ios";
          this.tattooLink = this.tattooLink + "?app=ios";
          this.medicalLink = this.medicalLink + "?app=ios";
          this.trainLink = this.trainLink + "?app=ios";
       }
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../../assets/css/mixin.scss';
.header_bottom{
  // position: fixed;
  // top: 4.4rem;
  left: 0;
  z-index: 2;
  width: 100%;
  border-bottom: 0.1rem solid #ccc;
  background-color: #fff;
  .top_nav ul{
    display: flex;
    li.type{
      flex: 1;
      text-align: center;
      height: 4.4rem;
      line-height: 4.4rem;
      font-size: 1.4rem;
      color: #999;
    }
    li.router-link-active{
      position: relative;
      color: $themeRed;
    }
    li.router-link-active:before{
      content: "";
      display: block;
      width: 70%;
      height: 0.3rem;
      background-color: $themeRed;
      position: absolute;
      left: 15%;
      bottom: 0;
    }
  }
}
</style>