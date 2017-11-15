<template>
  <div class="bill_box">
    <div class="month_list" v-if="month">{{month}}</div>
    <div class="bill_list">
      <ul>
        <li>
          <div class="left_box">
            <p class="item_title">{{list.note}}</p>
            <p class="item_time">
              <span>{{list.created_at}}</span>
            </p>
          </div>
          <div class="right_box">
            <span class="price">
              <span class="symbol" v-show="list.amount > 0">+</span>
              {{list.amount}}
            </span>元
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: "billItem",
  data () {
    return {
      month: '', // 月份
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
  background-color: #f3f3f3;
  .month_list{
    @include wh(100%,5.3rem);
    @include sc(1.4rem,#666);
    box-sizing: border-box;
    background-color: #fff;
    border-bottom: 1px solid #ddd;
    padding-left: 1.5rem;
    padding-top: 1.7rem;
    line-height: 3.5rem;
  }
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
          padding-right: 10rem;
          .item_title{
            @include sc(1.4rem,#000);
            margin-bottom: 0.4rem;
          }
          .item_time{
            @include sc(1.1rem,#666);
          }
        }
        .right_box{
          height: 100%;
          @include sc(1.2rem,#211d1d);
          line-height: 7.2rem;
          box-sizing: border-box;
          position: absolute;
          top: 0;
          right: 1.5rem;
          text-align: right;
          span.price{
            margin-right: -0.6rem;
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