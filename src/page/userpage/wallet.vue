<template>
  <div class="wallet">
    <div class="header" :class="{'list_title': accoun_more}">
      <div class="title">
        <h2>{{title}}</h2>
      </div>
      <a class="back" href="javascript:void(0);" @click="back"></a>
    </div>
    <div class="content" v-if="!accoun_more">
      <div class="top">
        <div class="balance">
          <p class="count">{{balance}}<span>元</span></p>
          <p class="text">我的余额</p>
        </div>
      </div>

      <div class="account_detail">
        <span class="icon01"></span>
        <div class="account">账单明细</div>
        <div class="more" @click="showList">
          查看更多
          <span class="icon02"></span>
        </div>
      </div>
      <div class="datails">
        <bill-item v-for="(item,index) in filterAccount" :key="index" v-if="index < 3" :list="item"></bill-item>
      </div>
    </div>

    <section class="account_list" v-if="accoun_more">
      <!-- 无账户明细 -->
      <div class="no_list" v-if="filterAccount.length <=0">
        <img src="/static/icon/ucenter/wallet_icon_null.png" alt="">
        <p>您没有相关的账户明细</p>
      </div>
      <div class="list_cnt">
        <bill-item v-for="(item,index) in filterAccount" :key="index" :list="item"></bill-item>
      </div>
    </section>
  </div>
</template>
<script>
import billItem from "./children/bill_item"
import {getStore} from "../../common/store"
import {walletBalanceList} from "@/service/getData"
import common from '../../common/common'
export default {
  name: "wallet",
  data () {
    return {
      title: '我的钱包',
      balance: '0.00', // 钱包余额
      user_id: '', // 用户ID
      accoun_more: false, // 默认不显示明细
      filterAccount: [], // 账户明细列表
      uInfoStorage: '', // localStore的用户信息

      flag: true,
      pageNo: 1 , //页码
      pageSize: 10, //记录数
      count_page: '', // 数据总页数
    };
  },
  created (){
    this.uInfoStorage = JSON.parse(getStore("uInfo"));
    this.balance = this.uInfoStorage.balance ? this.uInfoStorage.balance : '0.00'; // 钱包余额
    this.user_id = this.uInfoStorage.user_id; // 用户ID
    this.getWalletList();
    this.scroll();
  },
  methods: {
    /* 获取用户钱包收支列表 */
    async getWalletList (){
      this.flag = false;
      let res = await walletBalanceList({uid: this.user_id, page: this.pageNo, page_size: this.pageSize});
      // let res = await walletBalanceList({uid: "324248231", page: this.pageNo, page_size: this.pageSize}); // 测试用
      if(res.status == "ok"){
        this.flag = true;
        this.count_page = (res.data.count % this.pageSize) == 0 ? parseInt(res.data.count / this.pageSize) : parseInt(res.data.count / this.pageSize + 1);
        this.filterAccount = this.filterAccount.concat(res.data.result);
      }else{
        this.flag = false;
      }
    },
    scroll (){
      let _this = this;
      if(this.$route.path == '/wallet'){
        common.scroll(()=>{
          if(_this.flag){
            console.log("pageNo",this.pageNo);
            if(_this.pageNo > _this.count_page){
              return false;
            }
            _this.pageNo++;
            _this.getWalletList();
          }
        });
      }
    },
    back (){
      if(this.title == "账户明细"){
        this.accoun_more = false;
        this.title = "我的钱包";
      }else{
        this.$router.go(-1);
      }
    },
    /* 账户明细 */
    showList (){
      this.accoun_more = true;
      this.title = "账户明细";
    },
  },
  components: {
    billItem,
  }
}
</script>
<style lang="scss" scoped>
@import '../../assets/css/mixin.scss';
.wallet{
  @include wh(100%,100%);
  .header{
    z-index: 1;
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
    .title{
      @include wh(100%,4rem);
      line-height:4rem;
      text-align: center;
      h2{
        font-size: 1.8rem;
        color: #fff;
        letter-spacing: 1px;
      }
    }
    .back{
      position: absolute;
      top: .7rem;
      left: .7rem;
      @include wh(2.4rem,2.4rem);
      background-image: url('/static/icon/ucenter/nav_btn_return_white.png');
      background-repeat: no-repeat;
      background-position: center;
      background-size: 2.2rem 2.2rem;
    }
  }
  .list_title{
    position: fixed;
    background-color: #fff;
    border-bottom: 1px solid #ddd;
    h2{
      color: #000 !important;
    }
    .back{
      background-image: url('/static/icon/ucenter/nav_btn_return.png');
    }
  }
  .content{
    .top{
      @include wh(100%,21rem);
      @include bgi_2('/static/icon/ucenter/my_bg_top.png',100%,100%);
      .balance{
        padding-top: 4rem;
        text-align: center;
        .count{
          @include sc(3.5rem, $themeRed);
          padding: 3.8rem 0 2rem;
          line-height: 2.8rem;
          span{
            padding-left: .5rem;
            @include sc(1.8rem, $themeRed);
          }
        }
        .text{
          @include sc(1.4rem, #fff);
        }
      }
    }
    .account_detail{
      @include wh(100%,7rem);
      padding-bottom: 1rem;
      position: relative;
      background-color: #f3f3f3;
      .account{
        @include wh(100%,100%);
        @include sc(1.6rem,#000);
        line-height: 6rem;
        padding: 0 8.7rem 0 4.5rem;
        background-color: #fff;
      }
      .icon01{
        display: block;
        @include wh(2.2rem,2.2rem);
        position: absolute;
        top: 1.8rem;
        left: 1.5rem;
        @include bis("/static/icon/ucenter/wallet_icon_account.png");
      }
      .more{
        position: absolute;
        top: 2rem;
        right: 1.5rem;
        @include sc(1.4rem,#666);
        line-height: 2.2rem;
        padding-right: 1.5rem;
        .icon02{
          display: inline-block;
          @include wh(0.7rem,1.3rem);
          position: absolute;
          top: 0.38rem;
          right: 0;
          @include bis("/static/icon/ucenter/icon_next.png");
        }
      }
    }
    .datails{
      margin-bottom: 8rem;
      .bill_box{
        background-color: #fff;
      }
    }
  }
  /* 账户明细 */
  .account_list{
    padding-top: 4rem;
    padding-bottom: 6rem;
    /* 无账户明细提醒 */
    .no_list{
      position: fixed;
      top: 40%;
      left: 50%;
      transform: translate(-50%,-50%);
      text-align: center;
      img{
        @include wh(12rem, 12rem);
      }
      p{
        @include sc(1.6rem, #999);
        text-align: center;
      }
    }
    .list_cnt{
      background-color: #f3f3f3;
    }
  }
}
</style>