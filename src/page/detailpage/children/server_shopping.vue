<template>
  <div class="server">
    <div class="content">
      <p>服务商圈</p>
      <ul>
        <li>
          <span>{{list.city}}</span>
          <div>
            <i v-for="(i,j) in list.street" :key="j" >{{i}}</i>
          </div>
        </li>
      </ul>
      <button @click="server_sure">确定</button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'server_shopping',
    props:["list"], // 美业师服务商圈
    data () {
      return {
        show:"block"
      }
    },
    created (){
    },
    methods: {
      server_sure:function(){
        this.$emit('server_hide');
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../../../src/assets/css/mixin.scss';
  .server{
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
      overflow: auto;
      background-color: #fff;
      p{
        text-align: center;
        @include sc(1.6rem,#000);
        margin: 2rem 0 0rem;
      }
      ul{
        padding: 0 1.8rem;
        height: 25.5rem;
        overflow: auto;
        li{
          span{
            @include sc(1.4rem,#000);
            margin:1.5rem 0 1rem;
            display: inline-block;
            &:before{
              content: "";
              display: inline-block;
              @include wh(0.4rem,0.4rem);
              background-color: #000;
              vertical-align: middle;
              margin-right:0.5rem;
            }
          }
          div{
            i{
              @include sc(1.2rem,#666666);
              text-align: left;
              display: inline-block;
              margin-top:0.4rem;
              margin-right:1rem;
            }
          }
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

