<template>
  <div class="look_item clear">
    <div class="look_part">
      <div class="item_img">
        <div @click="goLink(list.id)" class="img_box" :style="{backgroundImage : 'url('+product_thumb+')'}">
          <img src="../../../../assets/image/icon/detail/square_default_bg.jpg">
        </div>
      </div>
      <div class="pro_desc">{{list.name ? list.name : ''}}</div>
      <div class="price">
        <span class="deposit">定金</span>
        <span class="discount_price">￥{{list.price ? list.price : '0'}}</span>
        <span class="follow small_size">{{list.product_favorite_count ? list.product_favorite_count : '0'}}</span>
      </div>
      <div class="pay_more">
        到店再付: {{list.shop_price ? list.shop_price : "0"}}元
      </div>
      <div class="beauty_man" v-if="list.type_user"> <!-- 非俏猫：个人店铺、机构店铺 -->
        <div class="portrait" :style="{backgroundImage: 'url('+myimgs+')'}"></div>
        <div class="name" v-if="list.type_user && list.type_user ==1 && meiyeshi_info.store_type && meiyeshi_info.store_type == 1"> <!-- 个人店铺 -->
          {{meiyeshi_info && meiyeshi_info.store_name ? meiyeshi_info.store_name : ''}}
          <span class="grade">{{person_level}}</span>
        </div>
        <div class="name" v-else-if="list.type_user && list.type_user ==1 && meiyeshi_info.store_type && meiyeshi_info.store_type == 2">{{meiyeshi_info && meiyeshi_info.store_name ? meiyeshi_info.store_name : ''}}</div> <!-- 机构店铺 -->
        <div class="name" v-else>俏猫医美</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "medicalItem",
  data () {
    return {
      person_level: '', // 美业师级别
      meiyeshi_info: '', // 美业师列表
      myimgs: '', // 头像
      product_thumb: '', // 产品缩略图
      from_class: '', // 产品缩略图的所属类（推荐，化妆，美睫，培训等）
    };
  },
  props: ["list"],
  created (){
    this.fromClass();

    if(this.list.type_user && this.list.type_user == 1){
      this.meiyeshi_info = this.list.stylist ? this.list.stylist : '';
    }

    /* 处理用户头像--相对路径问题 */
    if (!this.meiyeshi_info.user_img) {
      this.myimgs = "/static/icon/detail/details_photo_default.png";
    } else {
      if (this.meiyeshi_info.user_img.indexOf("http") != -1) {
        this.myimgs = this.meiyeshi_info.user_img;
      } else {
        this.myimgs = "http://pic.qiaocat.com/upload/" + this.meiyeshi_info.user_img;
      }
    }
    /* 处理产品缩略图--相对路径问题 */
    if (!this.list.thumb) {
      this.product_thumb = "../../../../assets/image/icon/detail/square_default_bg.jpg";
    } else {
      if (this.list.thumb.indexOf("http") != -1) {
        this.product_thumb = this.list.thumb;
      } else {
        this.product_thumb = "http://pic.qiaocat.com/upload/" + this.list.thumb;
      }
    }

  },
  methods: {
    /*产品缩略图的所属类（推荐，化妆，美睫，培训等）*/
    fromClass (){
      var path = window.location.pathname;
      this.from_class = path.substring(6);
    },

    // 获取美业师级别
    getPersonLevel (){
      switch (this.meiyeshi_info.level){
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

    goLink(id) {
      location.href = "/detail/"+id+"?"+this.from_class;
    },
  },
  mounted(){
    // 获取美业师级别
    this.getPersonLevel();
    // 最后一行去边框
    if($(".look_item").length % 2 ==0 ){
      $(".look_item:last").css("border-bottom", "0");
      $(".look_item").eq($(".look_item").length-2).css("border-bottom", "0");
    }else{
      $(".look_item:last").css("border-bottom", "0");
    }
  }
}
</script>
<style lang="scss" scoped>
@import "../../../../assets/css/mixin.scss";
.look_item{
  float: left;
  padding: 2rem 0 1.6rem 0;
  border-bottom: 1px solid #ddd;
  width: 50%;
  text-align: center;
  .look_part{
    .item_img{
      display: inline-block;
      width: 100%;
      .img_box{
        width: calc(100% - 1rem);
        float: left;
        @include borderRadius(0.4rem);
        background-position: center;
        background-size: cover;
        img{
          display: block;
          width: 100%;
          opacity: 0;
          @include borderRadius(0.4rem);
        }
      }
    }
    .pro_desc{
      height: 3rem;
      line-height: 1.5rem;
      font-size: 1.4rem;
      color: #000;
      text-align: left;
      margin-top: 0.5rem;
      padding-right: 1rem;
    }
    .price{
      position: relative;
      @include wh(100%,2.2rem);
      padding-left: 3.5rem;
      line-height: 1.5rem;
      margin-top: 1rem;
      text-align: left;
      .discount_price{
        margin-left: 0.2rem;
        font-size: 1.4rem;
        color: #e65058;
        font-weight: bold;
        margin-right: 2rem;
        height: 1.5rem;
      }
      .small_size{
        font-size: 1.2rem;
        color: #999;
      }
      .deposit{
        position: absolute;
        top: 0;
        left: 0;
        display: inline-block;
        @include wh(2.8rem,1.5rem);
        @include sc(1rem,$bgWhite);
        @include borderRadius(0.4rem);
        background-color: $themeRed;
        text-align: center;
        line-height: 1.5rem;
      }
      .follow{
        display: inline-block;
        padding-left: 1.5rem;
        line-height: 1.1rem;
        background-image: url("../../../../../src/assets/image/icon/home/product_icon_collect.png");
        background-repeat: no-repeat;
        background-position: 0 0;
        background-size: contain;
      }
    }
    .pay_more{
      @include sc(1.1rem,#999);
      text-align: left;
      line-height: 1.2rem;
      margin: 0.6rem 0 0.8rem;
      padding-right: 1rem;
    }
    .beauty_man{
      position: relative;
      @include wh(100%,3rem);
      padding-right: 1rem;
      text-align: left;
      .portrait{
        border: 0.05rem solid #ddd;
        position: absolute;
        top: 0;
        left: 0;
        @include wh(3rem,3rem);
        @include borderRadius(50%);
        background-position: center;
        background-size: contain;
        background-repeat: no-repeat;
      }
      .name{
        @include wh(100%,100%);
        @include sc(1.3rem,#000);
        padding-left: 3.5rem;
        padding-top: 0.4rem;
      }
      span.grade{
        display: inline-block;
        @include wh(4rem,1.6rem);
        @include sc(1.1rem,$bgWhite);
        box-sizing: border-box;
        padding-left: .2rem;
        line-height: 1.6rem;
        @include bis("../../../../../src/assets/image/icon/home/product_bg_grade.png");
      }
    }
  }
}
</style>