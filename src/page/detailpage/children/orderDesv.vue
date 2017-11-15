<template>
<div class="orderDesc">
  <div class="header">
    <div class="title">
      <h2>用户退款及爽约赔付规则</h2>
    </div>
    <a class="back" href="javascript:void(0);" @click="$router.go(-1)" ></a>
    <!-- <a class="share" href="javascript:void(0);" @click="share"></a> -->
  </div>
  <div class="img">
    <img src="/static/icon/detail/dg_banner.png" alt="">
  </div>
  <div class="content">
    <div class="paragraph" v-for="(item, i) in orderDesc" :key="i">
      <img class="icon" :src="`/static/icon/detail/dg_0${i+1}.png`" alt="">
      <p>{{item}}</p>
    </div>
    <div class="tip">*俏猫可在法律允许范围内对本次活动规则做出解释。</div>
  </div>
</div>
</template>
<script>
import {getjson} from '../../../service/getData';
import {storage_custom} from '../../../common/store';
import keyConf from '../../../common/keyConf';
export default {
  name: "orderDesc",
  data() {
    return {
      orderDesc: []
    };
  },
  created(){
    this.getConfigJson();
  },
  methods:{
    async getConfigJson(){
      if(storage_custom.isExpire(keyConf.orderDesc)){
        let json =await getjson();
      if(json.status == 'ok'){
        storage_custom.set(keyConf.orderDesc,json.data);
        this.orderDesc = json.data.Ordering_Information;
      }
      }else{
        this.orderDesc = storage_custom.get(keyConf.orderDesc).Ordering_Information;
      }
      
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../../assets/css/mixin.scss";
.orderDesc {
  .header {
    @include bgColor(#fff);
    position: fixed;
    z-index: 1;
    width: 100%;
    .title {
      @include wh(100%,4rem);
      // border-bottom: 1px solid #999;
      @include average(#999);
      line-height: 4rem;
      text-align: center;
      h2 {
        font-size: 1.8rem;
        color: #000;
        letter-spacing: 1px;
      }
    }
    .back {
      position: absolute;
      top: 0.7rem;
      left: 0.7rem;
      @include wh(2.4rem,2.4rem);
      background-image: url("../../../assets/image/icon/login/nav_btn_return.png");
      background-repeat: no-repeat;
      background-position: center;
      background-size: 2.2rem 2.2rem;
    }
    .share{
      position: absolute;
      top: 1rem;
      right: 1rem;
      @include wh(2.1rem,2.1rem);
      @include bis('/static/icon/detail/dg_share.png');
    }
  }
  .img{
    padding-top: 4rem;
    img{
      height: 14rem;
      width: auto;
    }
  }
  .content{
    padding: 2rem 2rem 0;
    .paragraph{
      position: relative;
    }
    .paragraph img.icon{
      position: absolute;
      @include wh(3.2rem,3.2rem);
    }
    p{
      padding-left: 5rem;
      margin-bottom: 2.2rem;
      text-align: justify;
      @include sc(1.1rem, $bgBlack);
    }
  }
  .tip{
    @include sc(1.3rem, $bgBlack);
    padding-bottom: 1.5rem;
  }
}
</style>