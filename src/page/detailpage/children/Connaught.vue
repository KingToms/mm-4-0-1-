<template>
  <div class="cn" @click.self="chengnuo_sure">
    <div class="content">
      <p>服务承诺</p>
      <ul>
        <li v-for="(item,index) in commitment" :key="index">
          <span>
            <img :src="require('../../../../src/assets/image/icon/detail/'+item.icon_m)" alt="">
            {{item.title}}
          </span>
          <p>{{item.content}}</p>
        </li>
      </ul>
      <button @click="chengnuo_sure">确定</button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'share',
    data () {
      return {
        show:"block"
      }
    },
    props: ["commitment"],
    methods: {
      chengnuo_sure:function(){
        this.$emit('chengnuo_hide');
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../../../src/assets/css/mixin.scss';
  .cn{
    @include wh(100%,100%);
    position: fixed;
    z-index: 6;
    top:0;
    left: 0;
    background-color: rgba(0,0,0,.5);
    .content{
      @include wh(100%,35rem);
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
        padding: 0 1.8rem;
        li{
          span{
            @include sc(1.4rem,#000);
            img {
              @include wh(1.8rem, 1.8rem);
              vertical-align: middle;
              margin-top: -0.6rem;
              margin-right: 0.5rem;
              width: 1.8rem;
              height: 1.8rem;
            }
          }
          p{
            @include sc(1.3rem,#666666);
            text-align: left;
            margin: 0.5rem 0 2rem 0;
          }
          /*&:first-child>span:before{
            content: "";
            display: inline-block;
            @include wh(1.8rem,1.8rem);
            @include bis("../../../../src/assets/image/icon/detail/details_icon_promise_colours01.png");
            vertical-align: sub;
            margin-right:1rem;
          }
          &:nth-child(2)>span:before{
            content: "";
            display: inline-block;
            @include wh(1.8rem,1.8rem);
            @include bis("../../../../src/assets/image/icon/detail/details_icon_promise_colours02.png");
            vertical-align: sub;
            margin-right:1rem;
          }
          &:nth-child(3)>span:before{
            content: "";
            display: inline-block;
            @include wh(1.8rem,1.8rem);
            @include bis("../../../../src/assets/image/icon/detail/details_icon_promise_colours03.png");
            vertical-align: sub;
            margin-right:1rem;
          }*/
        }
      }
      button{
        width: 100%;
        height: 4.5rem;
        text-align: center;
        @include sc(1.8rem,$bgWhite);
        line-height: 3rem;
        // color: #000;
        position: absolute;
        bottom: 0;
        background-color: $themeRed;
      }
    }
  }
</style>

