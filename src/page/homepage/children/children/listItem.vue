<template>
  <div class="look_item clear" v-if="list && list.price">
    <a :href="`/detail/${list.id}`">
      <div class="look_part">
        <div class="item_img">
          <div class="img_box" :style="{backgroundImage : 'url('+product_thumb+')'}">
            <a :href="`/detail/${list.id}`">
              <img src="../../../../assets/image/icon/detail/square_default_bg.jpg">
            </a>
          </div>
        </div>
        <div class="pro_desc">{{list.name}}</div>
        <p class="price">
          <span class="deposit" v-if="list.cate_id && list.cate_id == 2048">定金</span>
          <span class="discount_price">￥{{list.price ? list.price : '0'}}</span>
          <span class="original_price small_size" v-if="list.cate_id && list.cate_id != 2048">￥{{list.market_price}}</span>
          <span class="follow small_size">{{list.product_favorite_count ? list.product_favorite_count : '0'}}</span>
        </p>
        <div class="pay_more" v-if="list.cate_id && list.cate_id == 2048">
          到店再付: {{list.shop_price ? list.shop_price : "0"}}元
        </div>
        <div class="pay_more" v-else></div>
        <div class="beauty_man">
          <div class="user_img" :style="{backgroundImage: 'url('+ myimgs +')'}"></div>
          <!-- <div class="user_img" :style="{backgroundImage: 'url('+(list.user_img ? list.user_img : '/static/icon/detail/details_photo_store60px.png')+')'}"></div> -->
          <div class="people">
            <!-- <span class="name" v-if="(list.type_user && list.type_user == 1 && list.store_type && list.store_type ==1)">{{list.real_name ? list.real_name : ''}}</span>
            <span class="name" v-else-if="(list.type_user && list.type_user == 1 && list.store_type && list.store_type ==2)">{{list.store_name ? list.store_name : ''}}</span>
            <span class="name" v-else-if="list.type_user === 2">俏猫</span> -->
            <span class="name">{{userNameFilter(list)}}</span>
            <span class="grade" v-show="(list.type_user && list.type_user == 1 && list.store_type && list.store_type ==1)">{{person_level}}</span>
          </div>
        </div>
      </div>
    </a>
  </div>
</template>
<script>
export default {
  name: "listItem",
  data() {
    return {
      person_level: '', // 美业师级别
      myimgs: '', // 头像
      product_thumb: '', // 产品缩略图
    };
  },
  props: ["list"],
  created() {
    /* 处理用户头像--相对路径问题 */
    if(!this.list.type_user || this.list.type_user != 1){ // 俏猫用户
      this.myimgs = '/static/icon/detail/photo_qiaocat.png';
    }else if (!this.list.user_img) {
      this.myimgs = (this.list.store_type && this.list.store_type == 2) ? "/static/icon/detail/details_photo_store60px.png" : '/static/icon/detail/photo_qiaocat.png';
    } else {
      if (this.list.user_img.indexOf("http") != -1) {
        this.myimgs = this.list.user_img;
      } else {
        this.myimgs = "http://pic.qiaocat.com/upload/" + this.list.user_img;
      }
    }
    /* 处理产品缩略图--相对路径问题 */
    if (!this.list.thumb) {
      this.product_thumb = require("../../../../assets/image/icon/detail/square_default_bg.jpg");
    } else {
      if (this.list.thumb.indexOf("http") != -1) {
        this.product_thumb = this.list.thumb;
      } else {
        this.product_thumb = "http://pic.qiaocat.com/upload/" + this.list.thumb;
      }
    }

  },
  mounted() {
    // 获取美业师级别
    this.getPersonLevel();
    // 产品---最后一行去边框
    if ($(".look_item").length % 2 == 0) {
      $(".look_item:last").css("border-bottom", "0");
      $(".look_item").eq($(".look_item").length - 2).css("border-bottom", "0");
    } else {
      $(".look_item:last").css("border-bottom", "0");
    }
  },
  methods: {
    // 获取美业师级别
    getPersonLevel() {
      switch (this.list.level) {
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
    userNameFilter(item){
      // console.log(item);
      /* if(item.type_user == 1 && item.store_type == 1) 
        return item.real_name ? item.real_name : ''; */
        //  && item.store_type != 1
      if(item.type_user && item.type_user == 1 && item.store_type && item.store_type ==1){
        return item.real_name ? item.real_name : '';
      }else if(item.type_user && item.type_user == 1 && item.store_type && item.store_type ==2){
        return item.store_name ? item.store_name : '';
      }else {
        return '俏猫';
      }
    }
  },
  filters: {
    userImg(n) {
      if (n.indexOf("http") != -1) {
        return n;
      } else {
        return "http://pic.qiaocat.com/upload/" + n;
      }
    }
  },

}
</script>
<style lang="scss" scoped>
@import "../../../../assets/css/mixin.scss";
.look_item {
  float: left;
  padding: 2rem 0 1.6rem 0;
  border-bottom: 1px solid #ddd;
  width: 50%;
  text-align: center;
  .look_part {
    .item_img {
      display: inline-block;
      width: 100%;
      .img_box {
        width: calc(100% - 1rem);
        float: left;
        border-radius: 0.4rem;
        background-color: #f3f3f3;
        background-position: center;
        background-size: cover;
        img {
          display: block;
          width: 100%;
          opacity: 0;
          @include borderRadius(0.4rem);
        }
      }
    }
    .pro_desc {
      height: 3rem;
      line-height: 1.5rem;
      font-size: 1.4rem;
      color: #000;
      text-align: left;
      margin-top: 0.5rem;
      padding-right: 1rem;
    }
    .price {
      @include wh(100%, 2.2rem);
      margin-top: 0.5rem;
      text-align: left;
      .discount_price {
        margin-left: 0.2rem;
        margin-right: 0.2rem;
        font-size: 1.4rem;
        color: #e65058;
        font-weight: bold;
      }
      .small_size {
        font-size: 1.2rem;
        color: #999;
      }
      .deposit {
        position: absolute;
        top: 0;
        left: 0;
        display: inline-block;
        @include wh(2.8rem, 1.5rem);
        @include sc(1rem, #000);
        @include borderRadius(0.4rem);
        background-color: #ffe500;
        text-align: center;
        line-height: 1.5rem;
      }
      .original_price {
        text-decoration: line-through;
        margin-right: 0.7rem;
      }
      .follow {
        display: inline-block;
        padding-left: 1.5rem;
        line-height: 1.1rem;
        background-image: url("../../../../assets/image/icon/home/product_icon_collect.png");
        background-repeat: no-repeat;
        background-position: 0 0;
        background-size: contain;
      }
    }
    .pay_more {
      @include sc(1.1rem,
      #999);
      height: 1rem;
      text-align: left;
      line-height: 1rem;
      margin-bottom: 0.8rem;
      padding-right: 1rem;
    }
    .beauty_man {
      position: relative;
      @include wh(100%,
      3rem);
      margin-top: 0.5rem;
      .user_img {
        border: 0.05rem solid #ddd;
        position: absolute;
        top: 0;
        left: 0.8rem;
        @include wh(3rem,
        3rem);
        @include borderRadius(50%);
        background-position: center;
        background-size: contain;
        background-repeat: no-repeat;
      }
      .people {
        @include wh(100%,
        100%);
        padding-left: 4.3rem;
        padding-top: 0.4rem;
        text-align: left;
      }
      span.name {
        @include sc(1.3rem,
        #000);
        margin-right: 0.5rem;
      }
      span.grade {
        display: inline-block;
        @include wh(4rem,
        1.6rem);
        @include sc(1.1rem,
        $bgWhite);
        box-sizing: border-box;
        padding-left: .2rem;
        line-height: 1.6rem;
        @include bis("../../../../assets/image/icon/home/product_bg_grade.png");
      }
    }
  }
}
</style>
