<template>
  <div class="look_item">
    <a :href=" shoppingId ? `/detail/${item.id}?stylist_id=${shoppingId}` : `/detail/${item.id}`">
      <div class="look_part">
        <div class="item_img">
          <div class="img_box" >
            <a class="product_img" :href=" shoppingId ? `/detail/${item.id}?stylist_id=${shoppingId}` : `/detail/${item.id}`">
              <img :src="imgFilter(item.images)">
            </a>
          </div>
        </div>
        <p class="pro_desc">
          <span>{{item.name}}</span>
        </p>
        <p class="price">
          <span class="discount_price">￥{{item.price}}</span>
          <span class="original_price">￥{{item.market_price}}</span>
          <span class="follow">{{item.product_favorite_count}}</span>
        </p>
      </div>
    </a>
  </div>
</template>
<script>
export default {
  name: "productItem",
  data () {
    return {
      shoppingId: '', //美业师id
    };
  },
  props: ["item"],
  created (){
    this.shoppingId = this.$route.params.shopid ? this.$route.params.shopid : '';
  },
  mounted (){
    /*确保产品图片显示正方形*/
    let _this = this;
    $(window).resize(function() {
      _this.squareImg();
    });
  },
  methods: {
    /*避免后端返回的产品图片地址不标准，显示不了*/
    imgFilter(image){
      if (!image) {
        return "";
      } else {
        if (image.indexOf("http") != -1) {
          return image;
        } else {
          return "http://pic.qiaocat.com/upload/" + image;
        }
      }
    },
    /*确保产品图片显示正方形*/
    squareImg(){
      let cw;
      setTimeout(function() {
        cw = $('.product_img').width();
        console.log("cw:",cw);
        $('.product_img').css({
          'height': cw + 'px'
        });

        $('.product_img img').each(function(index,item){
          let imgDom = new Image();
          imgDom.src = item.src;
          imgDom.onload = function (){
            let imgW = imgDom.width;
            let imgH = imgDom.height;
            if(imgW > imgH){ // 图：宽大于高
              $(item).addClass("horizontal");
            }else if(imgW < imgH){ // 图：宽小于高
              $(item).addClass("vertical");
            }else{ // 图：宽等于高
              $(item).removeClass("horizontal");
              $(item).removeClass("vertical");
            }
          }
        })
      }, 0);
    },
  },
}
</script>
<style lang="scss" scoped>
.look_item {
  float: left;
  padding: 2rem 0 1.6rem 0;
  border-bottom: 1px solid #ddd;
  width: 50%;
  text-align: center;
  a {
    display: block;
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
          .product_img {
            width: 100%;
            position: relative;
            display: block;
            overflow: hidden;
            border-radius: 0.4rem;
            img {
              display: block;
              width: 100%;
              position: absolute;
              top: 0;
              left: 0;
              @include borderRadius(0.4rem);
              &.horizontal {
                height: 100%;
                width: auto;
                left: 50%;
                transform: translateX(-50%);
              }
              &.vertical {
                width: 100%;
                height: auto;
                top: 50%;
                transform: translateY(-50%);
              }
            }
          }
        }
      }
      .pro_desc {
        // text-align: left;
        text-align: center;
        padding-right: 1rem;
        height: 3rem;
        line-height: 1.5rem;
        font-size: 1.4rem;
        color: #000;
        margin-top: 0.5rem;
      }
      .price {
        position: relative;
        @include wh(100%, 1.5rem);
        margin-top: 0.5rem;
        .discount_price {
          margin-right: 1rem;
          font-size: 1.4rem;
          color: $themeRed;
          line-height: 2rem;
          height: 3.8rem;
        }
        .original_price {
          font-size: 1.2rem;
          color: #999;
          text-decoration: line-through;
        }
        .follow{
          display: inline-block;
          margin-left: 1rem;
          padding-left: 2rem;
          @include bgi_2('../../../../assets/image/icon/home/product_icon_collect.png',1.1rem,1.1rem,6px,3px);
        }
      }
    }
  }
}
</style>