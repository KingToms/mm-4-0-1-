<template>
  <div class="setting">
    <l-header :title="title"></l-header>
    <ul class="clear">
      <li class="left">
        <p>免责声明</p>
        <router-link to="/statement"><icon></icon></router-link>
      </li>
      <li class="left">
        <p @click="bgShow = true">退出登录</p>
      </li>
    </ul>
    <div class="bg" v-if="bgShow">
      <div class="alert">
        <div class='p'>确定要退出登录吗？</div>
        <div class="relative">
          <div class="btn clear">
            <div class="left" @click="cancelBg">取消</div>
            <div class="left" @click="confirm">确定</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import lHeader from '../../components/common/lHeader'
import {logout} from '../../service/getData'
import keyConf from '../../common/keyConf'
export default {
  name: 'setting',
  data () {
    return {
      title: '设置',
      bgShow: false
    }
  },
  components:{
    lHeader
  },
  methods: {
    cancelBg () {
      this.bgShow = false
    },
    async confirm () {
      let res = await logout()
      // 移除cookie
      $.removeCookie(keyConf.qm_cookie,{path: '/'})
      // $.cookie(keyConf.qm_cookie,'')
      alert(res.msg)
      this.cancelBg();
      this.$router.push("/");
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../assets/css/mixin.scss';
.setting{
  ul.clear{
    margin-left: 1.5rem;
    li.left{
      position: relative;
      @include average(#ccc);
      @include wh(100%,5rem);
      @include sc(1.5rem,#000);
      line-height: 5rem;
      icon{
        position: absolute;
        top: 50%;
        right: 1.5rem;
        transform: translateY(-50%);
        @include wh(2.2rem,2.2rem);
        @include bgi_2('/static/icon/order/indent_icon_name.png',1.1rem,1.1rem);
      }
    }
  }
  .bg{
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0,0,0,.4);
    @include wh(100%,100%);
    z-index: 2;
    .alert{
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
      @include bgColor(#fff);
      width: 27rem;
      border-radius: 1.3rem;
      text-align: center;
      .title{
        padding-top: 2rem;
        @include sc(1.8rem,#000);
      }
      .p{
        padding:1.5rem 2.4rem 1.5rem;
        @include sc(1.6rem,#000);
      }
      .relative{
        position: relative;
        .btn{
          // position: absolute !important;
          // bottom: 0;
          @include average_before(#999);
          @include wh(100%,4.4rem);
          @include sc(1.8rem,#000);
          text-align: center;
          line-height: 4.4rem;
          .left:first-child{
            color: #999;
            border-right: .05rem solid #999;
          }
          .left:first-child,.left:last-child{
            @include wh(50%,4.4rem);
          }
        }
      }
    }
  }
}
</style>