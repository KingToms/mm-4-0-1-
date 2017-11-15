<template>
<div class="makeup">
  <lheader :title="`化妆`"></lheader>
  <div class="bg"></div>
  <div class="makeup-filter">
    <ul class="filter-tab">
      <li :class="{active: chooseTab == 'salesVolume'}">销量最高</li>
      <li :class="{active: chooseTab == 'categary'}">分类</li>
      <li :class="{active: chooseTab == 'price'}">价格</li>
      <li :class="{active: chooseTab == 'filterCondition'}">筛选</li>
    </ul>

    <!-- 销量最高开始 -->
    <div class="salesVolume">
      <ul>
        <li :class="{active: true}">综合排序<i class="icon"></i></li>
        <li>销量最高</li>
        <li>好评最高</li>
        <li>最新发布</li>
      </ul>
    </div>
    <!-- 销量最高结束 -->
    <!-- 分类开始 -->
    <div class="categary">
      <ul>
        <li class="active">日常休闲<i class="icon"></i></li>
        <li class="active">职场妆<i class="icon"></i></li>
        <li>结婚出嫁</li>
        <li>电视电影广告</li>
        <li>舞蹈表演</li>
        <li>活动派对</li>
        <li>个性化定制</li>
        <li>仿妆</li>
      </ul>
    </div>
    <!-- 分类结束 -->
    <!-- 价格开始 -->
    <div class="price">

    </div>
    <!-- 价格结束 -->
    <!-- 筛选开始 -->
    <div class="filterCondition">

    </div>
    <!-- 筛选结束 -->
  </div>
</div>
</template>
<script>
import lheader from "../../../components/common/lHeader";
export default {
  name: "makeup",
  data() {
    return {
      chooseTab: ''
    };
  },
  components: {
    lheader
  }
};
</script>
<style lang="scss" scoped>
@import "../../../assets/css/mixin.scss";
@mixin liAfter($nth,$right,$width,$height,$iconUrl){
  &:nth-of-type(#{$nth}):after {
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
  .bg{
    position: fixed;
    z-index: 2;
    top: 8.4rem;
    @include wh(100%, 100%);
    background: rgba(0,0,0,.4);
  }
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
        @include liAfter('1', .4rem, .9rem, .45rem, "../../../assets/image/icon/all/classify_icon_choose_sel.png");
        @include liAfter('2', .1.8rem, .9rem, .45rem, "../../../assets/image/icon/all/classify_icon_choose_sel.png");
        @include liAfter('3', .1.8rem, .9rem, .45rem, "../../../assets/image/icon/all/classify_icon_choose_sel.png");
        @include liAfter('4', 1.8rem, .95rem, 1.1rem, "../../../assets/image/icon/all/classify_icon_screen_sel.png");
      }
      @include liAfter(1, .4rem, .9rem, .45rem, "../../../assets/image/icon/all/classify_icon_choose_nor.png");
      @include liAfter(2, 1.8rem, .9rem, .45rem, "../../../assets/image/icon/all/classify_icon_choose_nor.png");
      @include liAfter(3, 1.8rem, .9rem, .45rem, "../../../assets/image/icon/all/classify_icon_choose_nor.png");
      @include liAfter(4, 1.8rem, .95rem, 1.1rem, "../../../assets/image/icon/all/classify_icon_screen_nor.png");
    }
  }
  

  .makeup-filter{
    position: relative;
    .salesVolume{
      position: absolute;
      // display: none;
      z-index: 2;
      padding-left: 1.5rem;
      width: 100%;
      @include bgColor($bgWhite);
      li{
        position: relative;
        height: 4rem;
        line-height: 4rem;
        @include sc(1.4rem, #666);
        &:not(:last-child){
          @include average(#999);
        }
        &.active {
          @include sc(1.4rem, $themeRed);
          i.icon{
            position: absolute;
            top: 50%;
            right: 1.2rem;
            transform: translateY(-50%);
            @include wh(1.4rem, 1rem);
            @include bis('../../../assets/image/icon/all/classify_icon_tick.png');
          }
        }
      }
    }
    .categary{
      position: absolute;
      display: none;
      z-index: 2;
      padding-left: 1.5rem;
      width: 100%;
      @include bgColor($bgWhite);
      li{
        float: left;
        position: relative;
        flex: 1;
        width:45%;
        height: 4rem;
        line-height: 4rem;
        margin-right: 1rem;
        @include sc(1.4rem, #666);
        &:not(:last-child){
          @include average(#999);
        }
        &.active {
          @include sc(1.4rem, $themeRed);
          i.icon{
            position: absolute;
            top: 50%;
            right: 1.2rem;
            transform: translateY(-50%);
            @include wh(1.4rem, 1rem);
            @include bis('../../../assets/image/icon/all/classify_icon_tick.png');
          }
        }
      }
    }
  }

  
}
</style>