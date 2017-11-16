<template>
<div class="makeup">
  <lheader :title="`化妆`"></lheader>
  
  <div class="makeup-filter">
    <ul class="filter-tab">
      <li :class="{active: chooseTab.indexOf('salesVolume') > -1}" @click="orderCompre">{{condiction.compreOrder.name}}</li>
      <li :class="{active: chooseTab.indexOf('categary') > -1}" @click="filterCategery">{{condiction.categaryFilter.cateNames.length > 3 ? condiction.categaryFilter.cateNames.substr(0,3)+'...' : (condiction.categaryFilter.cateNames.length == 0 ? '分类' : condiction.categaryFilter.cateNames)}}</li>
      <li v-if="condiction.priceOrder == 'desc'" :class="{active: chooseTab.indexOf('price') > -1}" @click="orderPrice">价格降序</li>
      <li v-else :class="{active: chooseTab.indexOf('price') > -1}" @click="orderPrice">价格升序</li>
      <li :class="{active: chooseTab.indexOf('filterCondition') > -1}" @click="filterPrice">筛选</li>
    </ul>
  </div>
  <!-- 销量最高开始 -->
  <div class="salesVolume">
    <div class="salesVolume-sub">
      <ul>
        <li :class="{active: condiction.compreOrder.id == 'com'}" @click="compreChoose('com', '综合排序')">综合排序<i class="icon"></i></li>
        <li :class="{active: condiction.compreOrder.id == 'sv'}" @click="compreChoose('sv', '销量最高')">销量最高<i class="icon"></i></li>
        <li :class="{active: condiction.compreOrder.id == 'pr'}" @click="compreChoose('pr', '好评最高')">好评最高<i class="icon"></i></li>
        <li :class="{active: condiction.compreOrder.id == 'new'}" @click="compreChoose('new', '最新发布')">最新发布<i class="icon"></i></li>
      </ul>
    </div>
  </div>
  <!-- 销量最高结束 -->
  <!-- 分类开始 -->
  <div class="categary">
    <div class="categary-sub">
      <ul class="clear">
        <li v-for="(item, index) in categaryItems" :key="index" :class="{active: condiction.categaryFilter.cateids.indexOf(item.id) > -1 }" @click="categaryFilterChoose(item.id,item.name)">{{item.name}}<i class="icon"></i></li>
      </ul>
    </div>
  </div>
  <!-- 分类结束 -->
  <!-- 筛选开始 -->
  <div class="filterCondition">
    <div class="filterCondition-sub">
      <div class="title">
        筛选
        <span class="icon" @click="closeFilterPrice"></span>
      </div>
      <div class="price-section">
        <ul>
          <li>价格区间</li>
          <li :class="{active: condiction.priceFilter.priceid == 0}" @click="priceChoose(0)">￥200以下<i class="icon"></i></li>
          <li :class="{active: condiction.priceFilter.priceid == 1}" @click="priceChoose(1)">￥201-300<i class="icon"></i></li>
          <li :class="{active: condiction.priceFilter.priceid == 2}" @click="priceChoose(2)">￥301-400<i class="icon"></i></li>
          <li :class="{active: condiction.priceFilter.priceid == 3}" @click="priceChoose(3)">￥401-500<i class="icon"></i></li>
          <li :class="{active: condiction.priceFilter.priceid == 4}" @click="priceChoose(4)">￥500以上<i class="icon"></i></li>
          <li>
            <input type="number" name="lowPrice" placeholder="最低价格">
            <span>—</span>
            <input type="number" name="highestPrice" placeholder="最高价格">
          </li>
        </ul>
      </div>
      <div class="footer">
        <div class="reset" @click="reset()">重置</div>
        <div class="confirm" @click="confirm">确定</div>
      </div>
    </div>
  </div>
  <!-- 筛选结束 -->
  <!-- 产品列表开始 -->
  <div class="people_look clear">
    <!--产品项-->
    <RecommendItem v-for="(item,index) in makpupList" :key="index" :recommendList="item"></RecommendItem>
  </div>
  <!-- 产品列表结束 -->
</div>
</template>
<script>
import lheader from "../../../components/common/lHeader";
import { categoryList, getProductList } from '../../../service/getData';
import {storage_custom} from '../../../common/store';
import keyConf from '../../../common/keyConf';
import common from '../../../common/common.js';
import RecommendItem from './children/recommendItem';
export default {
  name: "makeup",
  data() {
    return {
      cate_name:['makeup', 'beaty', 'tatoo'],
      cate_id: this.$route.params['cate_id'],
      chooseTab: "",
      currentTab: "",
      tabNames: [".salesVolume", ".categary", ".price", ".filterCondition"],
      condiction: {
        priceOrder: "desc",
        compreOrder: {
          id: "com",
          name: "综合排序"
        },
        categaryFilter: {
          cateids: "",
          cateNames: "",
          cateList: []
        },
        priceFilter: {
          priceid: -1,
          lowPrice: 0,
          heigestPrice: 0
        }
      },
      categaryItems: [],
      makpupList: [],
      flag: true,
      pageNo: 1,
      pageSize: 10, //记录数
      count_page: '', // 数据总页数
    };
  },
  created(){
    this.setCategaryData();
    this.ProductList();
    this.scroll();
  },
  components: {
    lheader,
    RecommendItem
  },
  methods: {
    setCategaryData(){
      this.categaryItems = storage_custom.getArray(keyConf.categaryStore[this.cate_id]);
      if(!this.categaryItems){
        this.getCategaryList();
      }
    },
    async getCategaryList(){
      let res = await categoryList();
      let makeUp =[], beaty = [], tatoo = [];
      res.forEach(function (item) {
        if(item.parent_id == 1) makeUp.push(item);
        if(item.parent_id == 64) beaty.push(item);
        if(item.parent_id == 128) tatoo.push(item);
      });
      storage_custom.set(keyConf.categaryStore[1], makeUp);
      storage_custom.set(keyConf.categaryStore[64], beaty);
      storage_custom.set(keyConf.categaryStore[128], tatoo);

      this.categaryItems = storage_custom.getArray(keyConf.categaryStore[this.cate_id]);
    },
    async ProductList() {
      this.flag = false;
      let res = await getProductList({ type: 1, cate_id_2: '', page: 1, page_size: 10 });
      if(res.status == "ok"){
        this.flag = true;
        // this.cate_oldId = this.cate_id; // 点击第二级type，请求数据成功后，记录当前typeID
        this.count_page = (res.count % this.pageSize) == 0 ? parseInt(res.count / this.pageSize) : parseInt(res.count / this.pageSize + 1);
        this.makpupList = this.makpupList.concat(res.data);
      }else{
        this.flag = false;
      }
    },
    scroll (){
      let _this = this;
      if(this.$route.path.indexOf('/home/makeup') > -1){
        common.scroll(()=>{
          if(_this.flag){
            if(_this.pageNo > _this.count_page){
              return
            }
            _this.pageNo++;
            _this.ProductList();
          }
        });
      }
    },
    orderCompre() {
      let tabName = "salesVolume";
      this.hideOtherTab(tabName);
      this.filterChooseTab(tabName);
      $(`.${tabName}`).slideToggle("fast");
    },
    orderPrice() {
      let tabName = "price";
      this.hideOtherTab(tabName);
      this.filterChooseTab(tabName);
      this.condiction.priceOrder =
        this.condiction.priceOrder == "desc" ? "asc" : "desc";
    },
    filterCategery() {
      let tabName = "categary";
      this.hideOtherTab(tabName);
      this.filterChooseTab(tabName);
      $(`.${tabName}`).slideToggle("fast");
    },
    filterPrice() {
      let tabName = "filterCondition";
      this.hideOtherTab(tabName);
      this.filterChooseTab(tabName);
      $(`.${tabName}`).show();
      $(".filterCondition-sub").animate({ right: "0" });
    },
    hideOtherTab(tabName) {
      let tabNames = this.filterTab(tabName);
      $(".bg").hide();
      $(`${tabNames}`).slideUp("fast");
    },
    filterChooseTab(tabName) {
      this.chooseTab =
        this.chooseTab.indexOf(tabName) > -1
          ? this.chooseTab
          : `${tabName},${this.chooseTab}`;
    },
    filterTab(tabName) {
      let tabNames = this.tabNames.filter(item => item != `.${tabName}`);
      return tabNames.join(",");
    },
    closeFilterPrice() {
      $(".filterCondition-sub").animate({ right: "-77%" });
      $(".filterCondition").hide();
    },
    compreChoose(id, name) {
      this.condiction.compreOrder.id = id;
      this.condiction.compreOrder.name = name;
      $(`.salesVolume`).slideToggle("fast");
    },
    categaryFilterChoose(id, name) {
      let idIndex = this.condiction.categaryFilter.cateids.indexOf(id);
      let nameIndex = this.condiction.categaryFilter.cateNames.indexOf(name);
      if (idIndex > -1 && nameIndex > -1) {
        this.condiction.categaryFilter.cateids = this.condiction.categaryFilter.cateids.replace(
          `${id},`,
          ""
        );
        this.condiction.categaryFilter.cateNames = this.condiction.categaryFilter.cateNames.replace(
          `${name},`,
          ""
        );
      } else {
        this.condiction.categaryFilter.cateids = `${id},${this.condiction
          .categaryFilter.cateids}`;
        this.condiction.categaryFilter.cateNames = `${name},${this.condiction
          .categaryFilter.cateNames}`;
      }
    },
    priceChoose(id) {
      this.condiction.priceFilter.priceid =
        this.condiction.priceFilter.priceid == id ? -1 : id;
    },
    reset() {
      this.chooseTab = '';
      this.condiction = {
        priceOrder: "desc",
        compreOrder: {
          id: "com",
          name: "综合排序"
        },
        categaryFilter: {
          cateids: "",
          cateNames: "",
          cateList: []
        },
        priceFilter: {
          priceid: -1,
          lowPrice: 0,
          heigestPrice: 0
        }
      };
    },
    confirm() {
      let priceCon = this.condiction.priceFilter;
      if(priceCon.priceid != -1 || priceCon.lowPrice != 0 || priceCon.heigestPrice != 0)
        this.chooseTab = 'filterCondition';
      this.closeFilterPrice();
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../../assets/css/mixin.scss";
@mixin liAfter($nth,$right,$width,$height,$iconUrl) {
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
        @include liAfter("1", 0.4rem, 0.9rem, 0.45rem, "../../../assets/image/icon/all/classify_icon_choose_sel.png");
        @include liAfter("2", 0.8rem, 0.9rem, 0.45rem, "../../../assets/image/icon/all/classify_icon_choose_sel.png");
        @include liAfter("3", 0.2rem, 0.9rem, 0.45rem, "../../../assets/image/icon/all/classify_icon_choose_sel.png");
        @include liAfter("4", 1.8rem, 0.95rem, 1.1rem, "../../../assets/image/icon/all/classify_icon_screen_sel.png");
      }
      @include liAfter(1, 0.4rem, 0.9rem, 0.45rem, "../../../assets/image/icon/all/classify_icon_choose_nor.png");
      @include liAfter(2, 1.8rem, 0.9rem, 0.45rem, "../../../assets/image/icon/all/classify_icon_choose_nor.png");
      @include liAfter(3, 0.2rem, 0.9rem, 0.45rem, "../../../assets/image/icon/all/classify_icon_choose_nor.png");
      @include liAfter(4, 1.8rem, 0.95rem, 1.1rem, "../../../assets/image/icon/all/classify_icon_screen_nor.png");
    }
  }

  .makeup-filter {
    position: relative;
  }
  .salesVolume,
  .categary {
    position: absolute;
    display: none;
    z-index: 2;
    top: 8.4rem;
    @include wh(100%, 100%);
    background: rgba(0, 0, 0, 0.4);
  }
  // 销量最高
  .salesVolume-sub {
    // position: absolute;
    // display: none;
    // z-index: 2;
    padding-left: 1.5rem;
    width: 100%;
    @include bgColor($bgWhite);
    li {
      position: relative;
      height: 4rem;
      line-height: 4rem;
      @include sc(1.4rem, #666);
      &:not(:last-child) {
        @include average(#999);
      }
      &.active {
        @include sc(1.4rem, $themeRed);
        i.icon {
          position: absolute;
          top: 50%;
          right: 1.2rem;
          transform: translateY(-50%);
          @include wh(1.4rem, 1rem);
          @include bis("../../../assets/image/icon/all/classify_icon_tick.png");
        }
      }
    }
  }
  // 分类
  .categary-sub {
    // position: absolute;
    // display: none;
    // z-index: 2;
    padding-left: 1.5rem;
    width: 100%;
    @include bgColor($bgWhite);
    li {
      float: left;
      position: relative;
      flex: 1;
      width: 45%;
      height: 4rem;
      line-height: 4rem;
      margin-right: 1rem;
      @include sc(1.4rem, #666);
      &:not(:last-child) {
        @include average(#999);
      }
      &.active {
        @include sc(1.4rem, $themeRed);
        i.icon {
          position: absolute;
          top: 50%;
          right: 1.2rem;
          transform: translateY(-50%);
          @include wh(1.4rem, 1rem);
          @include bis("../../../assets/image/icon/all/classify_icon_tick.png");
        }
      }
    }
  }
  // 筛选
  .filterCondition {
    position: absolute;
    display: none;
    top: 0;
    left: 0;
    @include wh(100%, 100%);
    background: rgba(0, 0, 0, 0.5);
    z-index: 3;
  }
  .filterCondition-sub {
    position: absolute;
    right: -77%;
    @include wh(77%, 100%);
    @include bgColor($bgWhite);
    overflow: hidden;
    .title {
      height: 4.4rem;
      line-height: 4.4rem;
      position: relative;
      text-align: center;
      @include sc(1.6rem, $bgBlack);
      @include average(#999);
      span.icon {
        position: absolute;
        top: 50%;
        left: 1.5rem;
        padding: 0.6rem;
        transform: translateY(-50%);
        @include wh(1.1rem, 1.1rem);
        @include bis("../../../assets/image/icon/all/classify_icon_shutup.png");
      }
    }
    .price-section {
      width: 100%;
      padding-left: 1.5rem;
      li {
        position: relative;
        height: 4rem;
        line-height: 4rem;
        @include sc(1.4rem, #666);
        &:not(:last-child) {
          @include average(#999);
        }
        &.active {
          @include sc(1.4rem, $themeRed);
          i.icon {
            position: absolute;
            top: 50%;
            right: 1.2rem;
            transform: translateY(-50%);
            @include wh(1.4rem, 1rem);
            @include bis("../../../assets/image/icon/all/classify_icon_tick.png");
          }
        }
        &:last-child {
          padding-top: 1.5rem;
          input[type="number"] {
            text-align: center;
            border-radius: 0.5rem;
            @include wh(11.5rem, 3rem);
            background: rgba(0, 0, 0, 0.1);
          }
          span {
            color: #999;
          }
        }
      }
    }
    .footer {
      width: 100%;
      position: absolute !important;
      bottom: 0;
      display: flex;
      @include average_before(#cfcfcf);
      div {
        flex: 1;
        height: 5rem;
        text-align: center;
        line-height: 5rem;
        &.reset {
          @include bgColor(#f9f9f9);
          @include sc(1.8rem, $bgBlack);
        }
        &.confirm {
          @include bgColor($themeRed);
          @include sc(1.8rem, $bgWhite);
        }
      }
    }
  }
  .people_look {
    position: relative;
    margin-bottom: 5.8rem;
    padding-left: 1rem;
    .title_box {
      position: absolute;
      top: -1.2rem;
      left: 50%;
      margin-left: -6rem;
      width: 14rem;
      line-height: 3.2rem;
      background-color: #fff;
      h3 {
        position: relative;
        margin-bottom: 2.6rem;
      }
      h3:before {
        content: "";
        display: block;
        width: 18%;
        height: 0.2rem;
        background-color: #000;
        position: absolute;
        left: 42%;
        bottom: -1.4rem;
      }
    }
  }
}
</style>