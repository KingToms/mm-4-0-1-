<template>
  <div class="complaint">
    <div class="fixed">
      <div class="header">
        <div class="title">
          <h2>{{title}}</h2>
        </div>
        <a class="back" href="javascript:void(0);" @click="back" ></a>
      </div>
    </div>
    <div v-show="isRule===0">
      <div class="refound-rule">
        举报商家
        <a href="javascript:void(0);" @click="isRule=1">{{ selectedSty.length > 0 ? selectedSty: '请选择'}}</a>
      </div>
      <div class="cancel-reason">
        <ul>
          <li>投诉举报原因</li>
          <li v-for="(item,index) in reasons" :key="index" @click="choose=index">
            {{item}}
            <icon :class="{'choose':choose===index}"></icon>
          </li>
          
        </ul>
      </div>
      <div class="refound-btn">
        <p @click="submit">提交</p>
      </div>
    </div>
    <div class="rule" v-show="isRule===1">
      <ul>
        <li>近3个月购买过的商家</li>
        <li v-for="(item,index) in stylist" :key="index" @click="chooseStylist(item,index)">
          {{item.real_name}}
          <icon :class="{'choose':shooseStylist===index}"></icon>
        </li>
      </ul>
    </div>
    <div class="refound-btn" v-show="isRule===1">
      <p @click="selStylist">确定</p>
    </div>
    <complaint-result v-show="isRule===2"></complaint-result>
  </div>
</template>
<script>
import complaintResult from './children/complaintResult'
import keyConf from '../../common/keyConf'
import {getStore} from '../../common/store'
import {getStylist,complaint} from '../../service/getData'
export default {
  name: 'complaint',
  data () {
    return {
      choose: 0,
      shooseStylist:-1,
      stylist_id: 0,
      isRule: 0,
      title: '投诉举报',
      selectedSty:'',
      uinfo: JSON.parse(getStore(keyConf.uInfo)),
      reasons: [
        '商家迟到',
        '商家服务态度不好',
        '商家使用的产品及服务质量有问题',
        '商家道德问题',
        /* 'APP使用不畅',
        '客服服务态度及质量不好' */
      ],
      stylist:[]
    }
  },
  created(){
    this.getStylist()
  },
  components:{
    complaintResult
  },
  methods: {
    async submit(){
      if(this.stylist_id == 0) {
        alert('请先选择需要投诉的商家')
        return
      }
      let res = await complaint({
        user_name: this.uinfo.user_name,
        description: this.reasons[this.choose],
        contact: this.uinfo.mobile,
        stylist_id: this.stylist_id
      })
      if(res.status === 'ok')
        this.isRule =2
      else
        alert('网络异常，请重试')
    },
    async getStylist(){
      let res = await getStylist()
      this.stylist = res.data
    },
    chooseStylist(item, index){
      this.stylist_id=item.id
      this.shooseStylist=index
      this.selectedSty=item.real_name
    },
    back () {
      if(this.isRule == 1)
        this.isRule = 0
      else
        this.$router.go(-1)
    },
    selStylist(){
      this.isRule = 0
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../assets/css/mixin.scss';
.complaint{
  >div{
    overflow: hidden;
    @include bgColor(#f3f3f3);
  }
  .fixed{
    @include wh(100%,4rem);
  }
  .header{
    position: fixed;
    @include wh(100%,4rem);
    @include bgColor(#fff);
    z-index: 1;
    // position: relative;
    .title{
      @include wh(100%,4rem);
      // border-bottom: 1px solid #999;
      @include average(#999);
      line-height:4rem;
      text-align: center;
      h2{
        font-size: 1.8rem;
        color: #000;
        letter-spacing: 1px;
      }
    }
    .back{
      position: absolute;
      top: .7rem;
      left: .7rem;
      @include wh(2.4rem,2.4rem);
      background-image: url('../../assets/image/icon/login/nav_btn_return.png');
      background-repeat: no-repeat;
      background-position: center;
      background-size: 2.2rem 2.2rem;
    }
    .edit{
      position: absolute;
      top: .8rem;
      right: 1.5rem;
      @include sc(1.6rem,#000);
    }
  }
  .refound-rule{
    position: relative;
    margin-top: 1rem;
    margin-bottom: 1rem;
    @include bgColor(#fff);
    @include sc(1.6rem,#333);
    height: 5rem;
    line-height: 5rem;
    padding-left: 1.5rem;
    a{
      position: absolute;
      @include sc(1.6rem,#999);
      // width: 8rem;
      // @include wh(1.1rem,1.1rem);
      padding: 1.1rem;
      right: 1.5rem;
      top: 50%;
      // line-height: 1.6rem;
      transform: translateY(-50%);
      @include bgi_2('/static/icon/order/indent_icon_name.png',1.1rem,1.1rem,center,right);
    }
  }
  .cancel-reason,.rule{
    position: relative;
    @include bgColor(#fff);
    ul{
      padding-left: 1.5rem;
      li{
        line-height: 5rem;
        @include wh(100%,5rem);
        @include average(#ccc);
        @include sc(1.4rem,#000);
        &:not(:first-child){
          padding-left: 3.2rem;
        }
        icon{
          position: absolute;
          @include wh(2.2rem,2.2rem);
          @include bgi_2('/static/icon/order/btn_choose_nor.png',2.2rem,2.2rem);
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          &.choose{
            @include bgi_2('/static/icon/order/btn_choose_sel.png',2.2rem,2.2rem);
          }
        }
      }
    }
  }
  .refound-btn{
    @include bgColor(#fff);
    padding:5.8rem 1.5rem 3rem;
    p{
      @include wh(100%,4.4rem);
      @include bgColor($themeRed);
      @include sc(1.8rem,$bgWhite);
      text-align: center;
      line-height: 4.4rem;
      border-radius: .4rem;
    }
  }
  .rule{
    @include bgColor(#fff);
    padding:2.05rem 0 0 1.5rem;
    li{
      padding-right: 1rem;
      p{
        line-height: 2rem;
        @include sc(1.4rem,#000);
        &:first-child{
          line-height: 3.9rem;
          font-weight: 600;
        }
        &:last-child{
          padding-left: 1.2rem;
        }
      }
    }
  }
  
}
</style>