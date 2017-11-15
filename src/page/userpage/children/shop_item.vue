<template>
  <router-link :to="`/detail/shopping/${list.id}`" class="shop_item">
    <div class="detail">
      <div class="head_img" :style="{backgroundImage: 'url('+(list.user_img ? list.user_img : require('../../../assets/image/icon/detail/details_photo_store.png'))+')'}">
      </div>
      <div class="describe">
        <div class="top">
          <span class="name">{{storeNameFilter(list)}}</span>
          <span class="grade" v-if="list.store_type == 1">{{person_level}}</span>
        </div>
        <div class="bottom clear">
          <div class="praise left" v-if="list.Agency_rate && list.Agency_rate !='0%'">
            好评率&nbsp;&nbsp;<span>{{list.Agency_rate}}</span>
          </div>
          <div class="praise left" v-else>
            <!-- 好评率为0% -->
            暂无评价
          </div>
          <div class="line left"></div>
          <div class="follow left">
            关注数&nbsp;&nbsp;<span>{{list.fans}}人</span>
          </div>
        </div>
      </div>
    </div>
  </router-link>
</template>
<script>
export default {
  name: "shopItem",
  data () {
    return {
      person_level: '', // 美业师等级
    };
  },
  props: ["list"],
  mounted (){
    // 获取美业师级别
    this.getPersonLevel();
  },
  methods: {
    // 获取美业师级别
    getPersonLevel (){
      switch (this.list.level){
        case 0:
          this.person_level = "见习";
          break;
        case 1:
          this.person_level = "新晋";
          break;
        case 2:
          this.person_level = "专业";
          break;
        case 3:
          this.person_level = "高级";
          break;
        case 4:
          this.person_level = "首席";
          break;
        case 5:
          this.person_level = "明星";
          break;
        default:
          this.person_level = "见习";
          break;
      }
    },
    storeNameFilter(item){
      if(item.store_type && item.store_type == 1){
        return item.real_name ? item.real_name : '';
      }else if(item.store_type && item.store_type == 2){
        return item.store_name ? item.store_name : '';
      }
    },
  }
}
</script>
<style lang="scss" scoped>
@import "../../../assets/css/mixin.scss";
.shop_item{
  @include wh(100%,11.4rem);
  display: block;
  background-color: #fff;
  padding-left: 1.5rem;
  .detail{
    position: relative;
    @include wh(100%,100%);
    border-bottom: 1px solid #ddd;
    .head_img{
      position: absolute;
      top: 2rem;
      left: 0;
      @include wh(7.4rem,7.4rem);
      @include borderRadius(50%);
      border: 0.05rem solid #ddd;
      background-position: center;
      background-size: contain;
      background-repeat: no-repeat;
    }
    .describe{
      @include wh(100%,100%);
      padding-left: 8.6rem;
      .top{
        line-height: 2rem;
        padding-top: 3rem;
        span.name{
          @include sc(1.6rem,#000);
        }
        span.grade{
          display: inline-block;
          width: 4rem;
          height: 1.6rem;
          font-size: 1.1rem;
          color: $bgWhite;
          box-sizing: border-box;
          padding-left: .3rem;
          line-height: 1.6rem;
          background-image: url("/static/icon/ucenter/product_bg_grade.png");
          background-repeat: no-repeat;
          background-size: 100% 100%;
        }
      }
      .bottom{
        margin-top: 1.2rem;
        .praise,.follow{
          @include sc(1.3rem,#666);
          span{
            color: #000;
          }
        }
        .praise{
          margin-right: 2rem;
        }
        .line{
          margin-top: 0.2rem;
          width: 0.1rem;
          height: 1.4rem;
          content: '';
          border-right: 0.1rem solid #999;
        }
        .follow{
          margin-left: 2rem;
        }
      }
    }
  }
  &:last-of-type{
    .detail{
      border-bottom: 0 none;
    }
  }
}
</style>