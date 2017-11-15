<template>
  <div class="evaluate">
    <div class="header"><l-header :title="title"></l-header></div>
    <div class="content">
      <!-- <div class="shop-info">
        <img src="http://image.hzsabc.com//upload/product/d95f3418142da63a9ca0b9158c2c0743.jpg" alt="">
        <span>黄丽娜</span>
      </div> -->
      <div class="produce-info">
        <div class="text">
          <p>模特礼仪妆</p>
          <span v-show="order.comments_num > 0">已评价</span>
          <!-- <p>
            <span>￥368</span>
            <del>￥398</del>
            <span><small>x</small> 1</span>
          </p> -->
        </div>
        <img :src="order.order_product && order.order_product.length > 0? order.order_product[0].thumb:''" alt="">
        <div class="score"  v-if="order.comments_num === 0" >
          <!-- <div class="title">
            <img src="/static/icon/order/indent_icon_grade.png" alt="">
            <span class="desc">服务评分</span>
            <span>满意请给5星哦</span>
          </div> -->
          <div class="level">
            <li>
              <span>评分</span>
              <div class="clear">
                <icon @click="star=1" :class="{'y-star':star>=1}"></icon>
                <icon @click="star=2" :class="{'y-star':star>=2}"></icon>
                <icon @click="star=3" :class="{'y-star':star>=3}"></icon>
                <icon @click="star=4" :class="{'y-star':star>=4}"></icon>
                <icon @click="star=5" :class="{'y-star':star>=5}"></icon>
              </div>
            </li>
          </div>
        </div>
      </div>
      <div class="all-history" v-if="order.comments_num > 0">
        <div class="history-evaluate" v-for="(item,index) in order.comments" :key="index">
          <p>{{item.comment}}</p>
          <div class="clear">
            <div class="imgItem left" v-for="(imageItem,imgIndex) in commentsImg[item.id]" :key="imgIndex">
              <img :src="imageItem" alt="">
            </div>
          </div>
          <span>{{item.created_at}}</span>
        </div>
        
      </div>
      <div class="split-line" v-if="order.comments_num < 2"></div>
      <div class="evaluate-text" v-if="order.comments_num < 2">
        <textarea v-model="formData.content" placeholder="请输入您的评论，这有助于我们更好的为您服务！(10-100字)" name="" id="" cols="30" rows="4" minlength="10" maxlength="100"></textarea>
      </div>
      <div class="img clear" v-if="order.comments_num < 2">
        <div class="imgItem left" v-for="(item,index) in base64" :key="index">
          <img :src="item" alt="">
          <span class="icon" @click.stop="delImgArray(index)"></span>
        </div>
        <div class="imgItem left">
          <input type="file" @change="readFile" accept="image/*" id="file">
          <span class="desc">添加图片</span>
        </div>
      </div>
    </div>
    <div class="btn" >
      <div v-if="order.comments_num === 0" @click="commentOrder">发表评价</div>
      <div v-if="order.comments_num > 0 && order.comments_num < 2" @click="commentOrder">追加评价</div>
    </div>
  </div>
</template>
<script>
import lHeader from '../../components/common/lHeader'
import {getOrder,upLoadImage,commentOrder} from '../../service/getData'
export default {
  name: 'evaluate',
  data () {
    return {
      title:'评价晒单',
      star:0,
      sn: '',
      base64:[], // 上传的图片
      uploadSuccess:[], // 上传成功的图片路径
      order: {},
      commentsImg:{},
      formData:{
        order_id:'',
        product_id:'',
        content:'',
        score:0,
        // attitude:0,
        images:'',
        parent_id:0,
        top_parent_id:0
      }
    }
  },
  created () {
    this.sn = this.$route.params.sn
    this.getOrder()
  },
  components: {
    lHeader
  },
  methods: {
    // 获取订单信息，第一次评价的数据
    async getOrder () {
      let res = await getOrder({order_sn: this.sn})
      if(res.status === 'ok'){
        this.order = res.data.length > 0 ? res.data[0] : {}
        this.setImg()
      }
      else alert(res.msg)
    },
    async funUploadImg(base64, key) {
      // 上传图片
      let res = await upLoadImage({image: base64})
      if (res.status == 'ok') {
        this.uploadSuccess.push(res.data)
        document.querySelector('#file').value = '';
      }
    },
    // 评价订单
    async commentOrder() {
      this.formData = {
        order_id: this.order.id,
        product_id: this.order.order_product[0].id,
        content: this.formData.content,
        score: this.star,
        // attitude: '',
        images: this.uploadSuccess.join(','),
        parent_id: this.order.comments_num > 0 ? this.order.comments[0].id : 0,
        top_parent_id: this.order.comments_num > 0 ? this.order.comments[0].id : 0
      }
      let res = await commentOrder(this.formData)
      if(res.status === 'ok')
        this.$router.push({name:'evaResult'})
      else
        alert(res.msg)
    },
    readFile(obj) {
      let _this = this
      let file = obj.target.files[0]
      let reader = new FileReader()

      reader.onload = function (e) {
        let key = obj.target.id
        _this.base64.push(e.target.result)
        _this.funUploadImg(e.target.result, key)
      }
      reader.readAsDataURL(file)
    },
    setImg(){
       let comments = this.order.comments.length > 0 ? this.order.comments : []
       comments.forEach(comment => {
         this.commentsImg[comment.id] = comment.images ? comment.images.split(',') : []
       });
    },
    // 删除上传的图片
    delImgArray(index){
      this.base64.splice(index,1)
      this.uploadSuccess.splice(index,1)
    }

  }
}
</script>
<style lang="scss" scoped>
@import '../../assets/css/mixin.scss';
.evaluate{
  @include wh(100%,100%);
  .header{
    position: fixed;
    @include wh(100%,4rem);
    @include bgColor(#fff);
    z-index: 1;
  }
  .content{
    // margin-left: 1.5rem;
    margin-bottom: 2rem;
    padding-top: 4rem;
    .shop-info{
      margin-left: 1.5rem;
      @include wh(100%,5rem);
      line-height: 5rem;
      
      img{
        @include wh(3.3rem,3.3rem);
        border-radius: 50%;
        vertical-align: middle;
      }
      span{
        padding-left: 1rem;
        @include sc(1.4rem,#000);
      }
    }
    .produce-info{
      position: relative;
      margin-left: 1.5rem;
      @include average(#ccc);
      // @include average(#ccc);
      .text{
        position: relative;
        @include wh(100%,11rem);
        padding-left: 9.5rem;
        p{
          // padding-top: 2.5rem;
          line-height: 11rem;
          @include sc(1.4rem,#000);
        }
        span{
          position: absolute;
          @include wh(4.6rem,1.6rem);
          @include sc(1.1rem,#999);
          top: 70%;
          transform: translateY(-50%);
          border: .05rem solid #999;
          text-align: center;
          line-height: 1.6rem;
        }
        // p:last-child{
        //   position: relative;
        //   padding-top: 1.2rem;
        //   @include sc(1.8rem,#000);
        //   del{
        //     @include sc(1.2rem,#999);
        //   }
        //   span:last-child{
        //     position: absolute;
        //     right: 1.5rem;
        //     color: #999;
        //   }
        // }
      }
      img{
        position: absolute;
        @include wh(8rem,8rem);
        top: 1.5rem;
        left: 0;
      }
    }
    .evaluate-text{
      margin-left: 1.5rem;
      padding: 2.5rem 1.5rem .8rem .4rem;
      textarea{
        overflow:hidden;
        resize:none;
        @include sc(1.4rem,#000);
        @include wh(100%,10rem);
      }
    }
    .split-line{
      @include wh(100%,1rem);
      @include bgColor(#f3f3f3);
    }
    .history-evaluate{
      margin-left: 1.5rem;
      padding-bottom: 1rem;
      // @include average(#ccc);
      p{
        // @include wh(100%,5rem);
        @include sc(1.4rem,#000);
        font-size: 1.4rem !important;
        // line-height: 5rem;
        padding: 1rem 0;
      }
      .imgItem{
        margin-top: 0 !important;
      }
    }
    .img,.history-evaluate{
      margin-left: 1.5rem;
      .imgItem{
        position: relative;
        @include wh(80px,80px);
        // border: .05rem dashed #999;
        @include bgi_2('/static/icon/order/indent_btn_photo.png',100%,100%);
        margin-right: 1rem;
        margin-top: 2rem;
        
        input[type=file]{
          position: absolute;
          z-index: 1;
          opacity: 0;
          @include wh(80px,80px);
        }
        img{
          @include wh(80px,80px);
          border-radius: .4rem;
        }
        span.icon{
          position: absolute;
          top: -.8rem;
          right: -.5rem;
          @include wh(2.2rem, 2.2rem);
          @include bgi_2('../../assets/image/icon/detail/icon_delete.png',2.2rem,2.2rem);
        }
        span.desc{
          position: absolute;
          width: 80px;
          top: 60%;
          text-align: center;
          @include sc(1.3rem,#000);
        }
      }
    }
  }
  .parting{
    @include wh(100%,1rem);
    @include bgColor(#f3f3f3);
  }
  .score{
    
    .title{
      position: relative;
      @include wh(100%,5rem);
      line-height: 5rem;
      @include average(#ccc);
      img{
        @include wh(21px,21px);
        vertical-align: middle;
      }
      span.desc{
        @include sc(1.6rem,#000);
        padding-left: .4rem;
      }
      span:last-child{
        position: absolute;
        right: 1.5rem;
        @include sc(1.3rem,#000);
      }
    }
    .level{
      margin-top: .4rem;
      li{
        @include wh(100%,3.9rem);
        position: relative;
        span{
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          @include sc(1.3rem,#000);
        }
        div{
          padding-left: 5rem;
          icon{
            float: left;
            @include wh(2.2rem,2.2rem);
            @include bgi_2('/static/icon/order/indent_icon_star_normal.png',2.2rem,2.2rem);
            padding: .8rem;
            &.y-star{
              @include bgi_2('/static/icon/order/indent_icon_star_select.png',2.2rem,2.2rem);
            }
          }
        }
      }
    }
  }
  .btn{
    padding: 3rem 1.5rem;
    div{
      @include wh(100%,4.4rem);
      @include bgColor($themeRed);
      @include sc(1.8rem,$bgWhite);
      text-align: center;
      line-height: 4.4rem;
      border-radius: .4rem;
    }
  }
}
</style>