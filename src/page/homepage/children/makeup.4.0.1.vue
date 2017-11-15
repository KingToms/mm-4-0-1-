<template>
<div class="makeup">
  <lheader :title="`化妆`"></lheader>
  <ul class="filter-tab">
    <li class="active">销量最高</li>
    <li class="active">分类</li>
    <li class="active">价格</li>
    <li class="active">筛选</li>
  </ul>
</div>
</template>
<script>
import lheader from "../../../components/common/lHeader";
export default {
  name: "makeup",
  data() {
    return {};
  },
  components: {
    lheader
  }
};
</script>
<style lang="scss" scoped>
@import "../../../assets/css/mixin.scss";
@mixin liAfter($nth,$right,$width,$height,$iconUrl){
  &:nth-of-type($nth):after {
    position: absolute;
    content: "";
    right: $right;
    top: 50%;
    transform: translateY(-50%);
    @include wh($width, $height);
    @include bis($iconUrl);
  }
}
.makeup {
  .filter-tab {
    display: flex;
    @include average(#999);
    li {
      position: relative;
      height: 4.4rem;
      line-height: 4.4rem;
      text-align: center;
      flex: 1;
      @include sc(1.4rem,#666);
      &.active {
        @include sc(1.4rem, $themeRed);
        @include liAfter(1, .4rem, .9rem, .45rem, "../../../assets/image/icon/all/classify_icon_choose_sel.png");
        @include liAfter(2, .1.8rem, .9rem, .45rem, "../../../assets/image/icon/all/classify_icon_choose_sel.png");
        @include liAfter(3, .1.8rem, .9rem, .45rem, "../../../assets/image/icon/all/classify_icon_choose_sel.png");
        @include liAfter(4, 1.8rem, .95rem, 1.1rem, "../../../assets/image/icon/all/classify_icon_screen_sel.png");
        /* &:nth-of-type(n):after {
          position: absolute;
          content: "";
          right: 0.4rem;
          top: 50%;
          transform: translateY(-50%);
          @include wh(0.9rem, 0.45rem);
          @include bis("../../../assets/image/icon/all/classify_icon_choose_sel.png");
        }
        &:nth-of-type(2):after,
        &:nth-of-type(3):after {
          position: absolute;
          content: "";
          right: 1.8rem;
          top: 50%;
          transform: translateY(-50%);
          @include wh(0.9rem, 0.45rem);
          @include bis("../../../assets/image/icon/all/classify_icon_choose_sel.png");
        }
        &:nth-of-type(4):after {
          position: absolute;
          content: "";
          right: 1.8rem;
          top: 50%;
          transform: translateY(-50%);
          @include wh(0.95rem, 1.1rem);
          @include bis("../../../assets/image/icon/all/classify_icon_screen_sel.png");
        } */
      }
      @include liAfter(1, .4rem, .9rem, .45rem, "../../../assets/image/icon/all/classify_icon_choose_nor.png");
        @include liAfter(2, .1.8rem, .9rem, .45rem, "../../../assets/image/icon/all/classify_icon_choose_nor.png");
        @include liAfter(3, .1.8rem, .9rem, .45rem, "../../../assets/image/icon/all/classify_icon_choose_nor.png");
        @include liAfter(4, 1.8rem, .95rem, 1.1rem, "../../../assets/image/icon/all/classify_icon_screen_nor.png");
      /* &:nth-of-type(1):after {
        position: absolute;
        content: "";
        right: 0.4rem;
        top: 50%;
        transform: translateY(-50%);
        @include wh(0.9rem, 0.45rem);
        @include bis("../../../assets/image/icon/all/classify_icon_choose_nor.png");
      }
      &:nth-of-type(2):after,
      &:nth-of-type(3):after {
        position: absolute;
        content: "";
        right: 1.8rem;
        top: 50%;
        transform: translateY(-50%);
        @include wh(0.9rem, 0.45rem);
        @include bis("../../../assets/image/icon/all/classify_icon_choose_nor.png");
      }

      &:nth-of-type(4):after {
        position: absolute;
        content: "";
        right: 1.8rem;
        top: 50%;
        transform: translateY(-50%);
        @include wh(0.95rem, 1.1rem);
        @include bis("../../../assets/image/icon/all/classify_icon_screen_nor.png");
      } */
    }
  }
  .active {
    @include sc(1.4rem, $themeRed);
  }
}
</style>