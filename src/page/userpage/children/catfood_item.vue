<template>
  <div class="bill_box">
    <div class="bill_list">
      <ul>
        <li>
          <div class="left_box">
            <p class="item_title">{{list.message}}</p>
            <p class="item_time">
              <span>{{list.created_at}}</span>
            </p>
          </div>
          <div class="right_box">
            <span class="price">
              <span class="symbol" v-if="list.points > 0">+</span>
              {{list.points}}
            </span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: "catfoodItem",
  data () {
    return {
    };
  },
  props: ["list"],
  created (){
  },
  methods: {
  }
}
</script>
<style lang="scss" scoped>
@import '../../../assets/css/mixin.scss';
.bill_box{
  .bill_list{
    background-color: #fff;
    padding-left: 1.5rem;
    ul{
      li{
        @include wh(100%,7.2rem);
        position: relative;
        border-bottom: 1px solid #ddd;
        line-height: 1.5rem;
        .left_box{
          @include wh(100%,100%);
          padding-top: 2.2rem;
          padding-right: 6rem;
          .item_title{
            @include sc(1.4rem,#000);
            margin-bottom: 0.4rem;
          }
          .item_time{
            @include sc(1.1rem,#666);
          }
        }
        .right_box{
          @include wh(6rem,100%);
          @include sc(1.2rem,#211d1d);
          line-height: 7.2rem;
          box-sizing: border-box;
          position: absolute;
          top: 0;
          right: 1.5rem;
          text-align: right;
          span.price{
            @include sc(1.9rem,#211d1d);
            .symbol{
              margin-right: -0.6rem;
            }
          }
        }
      }
    }
  }
}
</style>