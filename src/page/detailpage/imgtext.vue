<template>
  <div class="details">
    <h4>图文详情</h4>
    <i></i>
    <p>
      <span> GRAPHIC&nbsp;&nbsp;&nbsp;&nbsp;DETAILS</span>
    </p>
    <div class="picText_detail" v-html="picText_detail" v-if="picText_detail.length !=0"></div>
    <div class="img_detail" v-if="img_detail.length != 0">
      <img v-for="(item,index) in img_detail" :key="index" :src="item" alt="">
    </div>
    <div class="remarks" v-if="picText_detail.length == 0 && img_detail.length == 0">
      {{remarks}}
    </div>
  </div>
</template>
<script>
import Vue from 'vue';
import { productList } from '@/service/getData';
export default {
  name: "imgtext",
  data() {
    return {
      productId: '', // 产品ID
      picText_detail: '', // 图文详情(文本为主)
      img_detail: '', // 图文详情(图为主)
      remarks: '', // 备注(旧产品的图文详情以 “备注” 显示)
    };
  },
  created() {
    this.getProduct(); //通过产品详情，获取对应图文详情
  },
  methods: {
    /* 获取产品详情 */
    async getProduct() {
      let _this = this;
      _this.productId = _this.$route.params.id; // 获取产品ID
      let result = await productList({ product_id: _this.productId });
      if (result.status == "ok") {
        _this.picText_detail = result.data.description ? result.data.description : '';
        _this.img_detail = result.data.new_pic_path ? result.data.new_pic_path.split(",") : '';
        _this.remarks =  result.data.summary ? result.data.summary : '';
      } else {
        _this.remarks = result.msg;
      }
    }
  }
}
</script>
<style>
/*处理v-html中的样式*/
.picText_detail img {
  display: block;
}
</style>

<style lang="scss" scoped>
@import '../../../src/assets/css/mixin.scss';


/*图文详情*/
.details {
  text-align: center;
  background-color: #fff;
  margin-top: 1rem;
  padding: 2.4rem 0;
  h4 {
    @include sc(1.6rem, #000)
  }
  i {
    display: block;
    width: 2rem;
    height: 0.3rem;
    background-color: #000;
    margin: 1rem auto;
  }
  p {
    margin-bottom: 1.5rem;
    span {
      position: relative;
      @include sc(1.6rem, #000);
      &:before,
      &:after {
        content: "";
        position: absolute;
        width: 8.7rem;
        border-bottom: 1px solid #000;
        top: 1.1rem;
      }
      &:before {
        left: -11rem;
      }
      &:after {
        right: -11rem;
      }
    }
  }
  /*图文详情--文*/
  .picText_detail {
    text-align: left;
    padding-bottom: 1rem;
    font-size: 1.2rem;
    img {
      display: block;
    }
  }
  /*图文详情--图*/
  .img_detail {
    width: 100%;
    img {
      width: 100%;
    }
  }
  .product {
    margin-bottom: 1rem;
  }
  img {
    width: 100%;
  }
}
</style>