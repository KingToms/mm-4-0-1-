<template>
<div class="share">
  <div class="content">
    <p>分享</p>
    <ul>
      <li>
        <img src="../../../../src/assets/image/icon/detail/details_icon_share01.png" alt="">
        <span>微信</span>
      </li>
      <li>
        <img src="../../../../src/assets/image/icon/detail/details_icon_share02.png" alt="">
        <span>朋友圈</span>
      </li>
      <li>
        <img src="../../../../src/assets/image/icon/detail/details_icon_share03.png" alt="">
        <span>微博</span>
      </li>
      <li>
        <img src="../../../../src/assets/image/icon/detail/details_icon_share04.png" alt="">
        <span>复制链接</span>
      </li>
    </ul>
    <button @click="share_cancle">取消</button>
  </div>
</div>
</template>

<script>
    export default {
        name: 'share',
        props:["displey"],
        data () {
            return {
              show:"block"
            }
        },
        methods: {
          share_cancle:function(){
            this.$emit('share_hide');
          }
        }
    }
</script>

<style lang="scss" scoped>
  @import '../../../../src/assets/css/mixin.scss';
  .share{
    @include wh(100%,100%);
    position: fixed;
    z-index: 6;
    top:0;
    left: 0;
    background-color: rgba(0,0,0,.5);
    .content{
      @include wh(100%,24rem);
      position: absolute;
      bottom: 0;
      left: 0;
      background-color: #fff;
      p{
        text-align: center;
        @include sc(1.6rem,#000);
        margin: 1.8rem 0;
      }
      ul{
        display: flex;
        width: 100%;
        li{
          flex: 1;
          padding: 2.2rem;
          text-align: center;
          img{
            width: 100%;
          }
        }
      }
      button{
        width: 100%;
        height: 4.5rem;
        text-align: center;
        border-top:1px solid #999;
        @include sc(1.8rem,#000);
        line-height: 3rem;
        color: #666;
        position: absolute;
        bottom: 0;
        background-color: transparent;
      }
    }




}
</style>

