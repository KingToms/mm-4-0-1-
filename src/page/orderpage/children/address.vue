<template>
  <div class="address-module">
    <!--无地址提醒-->
    <div class="no-addressList" v-if="filterAddress.length == 0 && !newAddState">
      <img src="/static/icon/order/address_icon_null.png" alt="">
      <p>您没有添加服务地址</p>
    </div>
    <!--添加新地址-->
    <section class="new-address" v-if="newAddState">
      <div class="current-city">
        <div class="city" :class="{'color-tip': cityName}">
          <i class="icon"></i>
          {{cityName}}
        </div>
      </div>
      <div class="detail">
        <ul class="detail-add">
          <li @click="areaChoose"><span>所在地区</span><div class="more" :class="{'color-black': Localarea}" href="javascript:void(0);">{{Localarea ? Localarea : "请选择"}}</div><i class="icon"></i></li>
          <li><span>详细街道</span><textarea :class="[address_Tip=='街道\街道号等' ? '' : 'color-black' ]" v-model="address_Tip" class="more" rows="2" @focus="clearContent" @blur="noChange"></textarea></li>
        </ul>
        <div class="default-add">
          设为默认地址
          <mt-switch v-model="buttonState" class="select" @change="changeDefault"></mt-switch>
        </div>
      </div>
    </section>
    <!--商圈地址-->
    <section class="trading-box" @click.self="hideArea(false)" v-show="areaSelect">
      <div class="trading-area">
        <div class="title">
          <div class="top">
            <h3>所在地区</h3>
            <span class="cancal"  @click="hideArea(true)">{{areaButton}}</span>
          </div>
          <div class="bottom">
            <ul class="clear">
              <li :class="{'active' : !tradingArea}" @click="tradingArea = false">{{clickArea}}</li>
              <li :class="{'active' : tradingArea}" @click="tradingArea = true" v-if="selectArea!=='-1' && this.tradeArea.length !=0">{{clickTrading}}</li>
            </ul>
          </div>
        </div>
        <div class="district">
          <div class="district-detail" v-if="!tradingArea">
            <ul class="detail">
              <li v-for="(item1, index) in region" :key="index"><span :class="{'select': index == selectArea}" @click="currentArea(index,item1)">{{item1.name}}</span><i class="icon" v-if="index == selectArea"></i></li>
            </ul>
          </div>
          <div class="district-sort district-detail scroll" v-if="tradingArea">
            <ul class="detail">
              <li v-for="(item2, index) in tradeArea" :key="index"><span :class="{'select': index == selectTrading}" @click="currentTrade(index,item2)">{{item2.name}}</span><i class="icon" v-if="index == selectTrading"></i></li>
            </ul>
          </div>
        </div>
      </div>
    </section>
    <!--选择服务地址-->
    <section class="select-address" v-if="!newAddState">
      <ul class="address-info">
        <li class="addItem" v-for="(item,index) in filterAddress" :key="index">
          <!-- <span class="detail" :class="{'inconsistent': (serverStreet ? serverStreet.indexOf(item.street) =='-1' : false)}"> -->
          <span class="detail" :class="{'inconsistent': false}" @click="currentAddress(index,item)">
            <span class="default" v-if='item.is_default'>[ 默认 ]</span>
            {{item.city_name}}{{item.district_name}}{{item.street_name}}{{item.address}}
          </span>
          <!-- <i class="icon" :class="{'nowAddress' : ((selectItem || selectItem ==0) ? (index == selectItem) : item.is_default)}" v-show="editState && (serverStreet ? serverStreet.indexOf(item.street) !='-1' : true)" @click="currentAddress(index,item)"></i> -->
          <i class="icon" :class="{'nowAddress' : ((selectItem || selectItem ==0) ? (index == selectItem) : item.is_default)}" v-show="editState && true" @click="currentAddress(index,item)"></i>
          <div class="edit-box" v-show="!editState">
            <ul class="clear">
              <li class="left" @click="modify(item,index)">
                <div class="edit-icon">
                  <img src="../../../../static/icon/order/address_btn_edit.png" alt="编辑">
                </div>
              </li>
              <li class="left">
                <div class="vertical"></div>
              </li>
              <li class="left" @click="delate(item,index)">
                <div class="edit-icon">
                  <img src="../../../../static/icon/order/address_btn_del.png" alt="删除">
                </div>
              </li>
            </ul>
          </div>
          <!-- <span class="text-tip" v-show="(serverStreet ? serverStreet.indexOf(item.street) =='-1' : false)">[超出服务范围]</span> -->
          <span class="text-tip" v-show="false">[超出服务范围]</span>
        </li>
      </ul>
    </section>
    <!--底部按钮-->
    <div class="bottom-btn">
      <div class="btn" @click="newAddress(itemCurrentIndex)">
        {{bottomText}}
        <i class="icon" v-if="!newAddState"></i>
      </div>
    </div>

  </div>
</template>
<script>
import {mapState,mapMutations} from 'vuex'
import Vue from 'vue';
import { Switch } from 'mint-ui';
Vue.component(Switch.name, Switch);
import {getAddress} from '@/service/getData'; // 获取用户地址列表
import {saveAddress} from '@/service/getData'; // 保存用户地址列表
import {delateAddress} from '@/service/getData'; // 删除用户地址列表
import {areaList} from '@/service/getData'; // 获取城市的区
import {streetList} from '@/service/getData'; // 获取城市商圈
import '../../../../node_modules/mint-ui/lib/switch/style.css';
import {getStore} from '../../../common/store.js'; // 获取store中 当前城市
import '../../../common/geolocation.min.js' // 引入腾讯地图前端定位组件的js
export default {
  name: 'address',
  data () {
    return {
      bottomText: '添加新地址', //底部按钮文本
      address_Tip: "街道\街道号等",
      areaSelect: false,
      buttonState: false, // 按钮值
      dafaultState: 0, // 选择默认地址
      selectItem: '',  // 选择地址
      cityName: "", // 城市
      clickArea: "请选择地区", // 点击选择的地区
      area: "", 
      area_id: "", // 地区ID
      clickTrading: "",  // 点击选择的商圈
      trading: "",
      trading_id: "",// 商圈ID
      clickTrading: "请选择商圈", // 点击选择的商圈
      Localarea: "",
      selectArea: "-1",  // 选择地区
      selectTrading: "-1", //选择商圈
      tradingArea: false,
      editState: true,
      modifyState: 0, // 新增地址状态判断
      itemCurrent: '',
      itemCurrentIndex: '',
      newAddState: false,
      totalAddress: "", // 市区街道（总地址）
      region: [], // 区名称
      tradeArea: [], // 商圈名称
      addressInfo: { // 保存地址信息
        province: '', // 省份ID
        city: '', // 城市ID
        district: '', // 区ID
        street: '', //商圈ID
        address: '', // 详细地址
      },
      areaButton: "取消",
      filterAddress: [], // 用户地址列表
      cityStorage: '', // localStore的地址
    }
  },
  props:{
    userInfomation:{ //用户信息
      type:Object
    },
    serverStreet:{ // 美业师服务商圈
      type:String
    }
  },
  created(){
    this.selectItem = this.confirmOrder.selected; // 记录已选中的地址
    this.getAddressList();
    if(!JSON.parse(getStore("current_city"))){
      this.geoLocation();
    }else{
      this.cityStorage = JSON.parse(getStore("current_city"));
      this.cityName = JSON.parse(getStore("current_city")).city_name;
    }
  },
  computed:{
    ...mapState(['confirmOrder','currentCity']),
  },
  watch: {},
  methods: {
    ...mapMutations(['SET_CONFIRMORDER']),
    /* 获取当前城市定位 */
    geoLocation (){
      let geolocation = new qq.maps.Geolocation("525BZ-YED3G-LVMQM-I4SUN-QKSX7-S6FEX", "myapp");
      let options = {timeout: 8000};
      geolocation.getLocation(this.showPosition, this.showErr, options);
    },
    showPosition (position){
      let city_name = position.city ? position.city : "广州市";
      let city_id = position.adcode ? position.adcode : "440100";
      city_id = city_id.toString().substring(0,4) + "00"; // 确保获取的是城市ID，而不是区ID.
      let cityObj = {"city_name":city_name,"city_id":city_id};
      localStorage.setItem("current_city", JSON.stringify(cityObj)); // localStore存储当前城市及ID

      this.cityStorage = JSON.parse(getStore("current_city")); // 获取localStore中的地址
    },
    showErr (){
      let cityObj = {"city_name": "广州市","city_id": "440100"};
      localStorage.setItem("current_city", JSON.stringify(cityObj))
      alert("定位失败！请在首页重新选择城市");
      this.cityStorage = JSON.parse(getStore("current_city")); // 获取localStore中的地址
    },

    /* 获取用户服务地址 */
    async getAddressList (){
      let result = await getAddress();
      this.filterAddress = result;
    },
    /*保存用户服务地址*/
    async saveAddressList (json){
      let res = await saveAddress({data: json}); // 返回保存后的最新地址列表
      if(res.status == "ok"){
        this.filterAddress = res.data; // 刷新保存后的地址数据
        
        // 保存后跳转
        this.$emit("addNewAdd",this.filterAddress.length); // 子组件向父组件传值
        this.bottomText = "添加新地址";
        this.newAddState = false;
      }
    },
    /*删除用户服务地址*/
    async delateAddressList (id){
      await delateAddress({addressId: id});
    },
    /*获取当前城市商圈*/
    async getCityStreet(cityID){
      // let cityStreetlist = await streetList({id: 520400}); // 测试：点击地区没有可选择的商圈，如“安顺市”
      let cityStreetlist = await streetList({id: cityID});
      this.region = cityStreetlist.area; // 区
    },
    // 添加新地址、修改地址
    newAddress (index){
      if(this.bottomText=="添加新地址"){
        this.cityName = this.cityStorage.city_name; // 定位地址
        this.modifyState = 0; // 新增地址状态
        this.$emit("addNewAdd");
        this.Localarea = ''; // 清空
        this.address_Tip = "街道\街道号等";
        this.buttonState = false; // 默认不选中
        this.bottomText = "保存";
        this.newAddState = true;
        this.getCityStreet(this.cityStorage.city_id); // 获取定位城市的ID
      }else{  // 保存地址
        if(!this.Localarea){
          alert("请选择正确的服务地区");
        }else if(this.address_Tip == "街道\街道号等" || this.address_Tip.trim() == ""){
          alert("请正确填写详细地址");
        }else{
          if(this.modifyState == "1"){ // 若为修改地址,点击保存
            this.addressInfo.address_id = this.itemCurrent.id; // 修改地址，无此参数则为新增地址
            this.addressInfo.province = this.itemCurrent.province;
            this.addressInfo.city = this.itemCurrent.city;

          }else{ // 若为新增地址,点击保存
            this.addressInfo.address_id = '';
            this.addressInfo.consignee = this.confirmOrder.appoint ? this.confirmOrder.appoint : this.userInfomation.nick; // 昵称（预约人）
            this.addressInfo.mobile = this.confirmOrder.mobile ? this.confirmOrder.mobile : this.userInfomation.mobile; // 手机号（预约人）
            this.addressInfo.city = this.cityStorage.city_id.toString();
            this.addressInfo.province = this.addressInfo.city.substring(0,2) + "0000"; // 根据城市ID 获得对应 省份ID
          }
          this.changeDefault();
          this.addressInfo.district = this.area_id; // 返回 区ID
          this.addressInfo.street = this.trading_id; // 返回 商圈ID
          this.addressInfo.address = this.address_Tip; // 返回 具体地址
          this.addressInfo.is_default = this.dafaultState; // 返回 地址默认状态
          let addressForm = JSON.stringify(this.addressInfo);
          this.saveAddressList(addressForm); // （后台）保存 / 新增---地址
        }
      }

    },
    // 选择所在地区
    areaChoose (){
      this.areaSelect = true;
    },
    // 点击地区
    currentArea (index,item1){
      this.selectArea = index;
      this.clickArea = item1.name; // 所选中的地区
      this.area_id = item1.area_id; // 所选中的地区ID
      this.area = this.clickArea;
      this.tradeArea = this.region[index].street; // 地区对应商圈
      if(this.tradeArea.length !=0){
        this.tradingArea = true; // 显示选择商圈区域
        this.clickTrading = "请选择商圈"; // 还原默认
        this.selectTrading = "-1"; // 默认不选中商圈
      }else{ // 点击的地区没有商圈
        this.areaButton = '确定';
        this.clickTrading = '';
      }
    },
    // 点击商圈
    currentTrade (index,item2){
      this.selectTrading = index;
      this.clickTrading = item2.name; // 所选中的商圈
      this.trading_id = item2.street_id; // 所选中的商圈ID
      this.trading = this.clickTrading;
      this.areaButton = '确定';
    },
    // 填写具体街道
    clearContent (){
      if(this.address_Tip == '街道\街道号等'){
        this.address_Tip = '';
      }
      return this.address_Tip;
    },
    noChange (){
      if(this.address_Tip == ''){
        this.address_Tip = '街道\街道号等';
      }
      return this.address_Tip;
    },
    // 地区取消选择、确定选择
    hideArea (btn_flag){
      if(this.areaButton == '确定' && btn_flag == true){
        this.Localarea = this.clickArea+" "+this.clickTrading; // 提交选中地址
      }
      this.areaSelect = false; // 隐藏地区选择区域
      this.clickArea = "请选择地区"; // 还原默认
      this.clickTrading = "请选择商圈"; // 还原默认
      this.tradingArea = false; // 默认商圈不显示
      this.selectArea = "-1"; // 默认不选中地区
      this.selectTrading = "-1"; // 默认不选中商圈
      this.areaButton = '取消';
    },
    // 编辑常用地址
    edit (){
      this.editState = false;
    },
    // 修改点击的具体地址
    modify (item,index){
      this.newAddState = true;
      this.cityName= item.city_name;
      this.area = item.district_name;
      this.area_id = item.district; // 地区ID
      this.trading = item.street_name;
      this.trading_id = item.street; // 商圈ID
      this.Localarea = this.area + this.trading;
      this.address_Tip = item.address;
      this.bottomText = "保存";
      this.editState = true;
      this.modifyState = 1; // 修改地址状态
      this.itemCurrent = item; // 所点击的具体地址
      this.itemCurrentIndex = index; // 所点击的具体地址的 索引号
      this.buttonState = item.is_default; // 地址默认状态
      this.getCityStreet(item.city);
    },
    // 修改默认地址
    changeDefault (){
      if(this.buttonState){
        this.dafaultState = 1;
      }else{
        this.dafaultState = 0;
      }
    },
    // 删除地址
    delate (item,index){
      this.filterAddress.splice(index,1);
      this.delateAddressList (item.id);
      if(this.filterAddress.length == 0){ // 已删除完服务地址
        this.$emit("noAddress");
      }
    },
    // 选中地址
    currentAddress (index,item){
      let _this = this;
      let confirmOrder = {};
      this.selectItem = index;
      confirmOrder.selected = index;  // 索引
      confirmOrder.province_id = item.province ; // 省ID
      confirmOrder.city_id = item.city; // 城市ID
      confirmOrder.district_id = item.district; // 区ID
      confirmOrder.street_address = item.address; // 详细街道
      confirmOrder.address = item.province_name + item.city_name + item.district_name + item.street_name + item.address; // 地址项
      this.SET_CONFIRMORDER(confirmOrder);
      setTimeout(function(){_this.$emit("linkBack")},500);
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../../assets/css/mixin.scss';
.address-module{
  background-color: #F3F3F3;
  /*无地址提醒*/
  .no-addressList{
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
  /*添加新地址*/
  .new-address{
    width: 100%;
    .current-city{
      @include wh(100%, 6rem);
      @include bgColor(#fff);
      margin-bottom: 1rem;
      text-align: center;
      line-height: 6rem;
      @include sc(1.6rem, #000);
      .city{
        text-align: center;
        i.icon{
          display: inline-block;
          @include wh(2rem,2rem);
          @include bgi_2('/static/icon/order/address_icon_position.png'
            , 2rem, 2rem, center, center, no-repeat);
        }
        &.color-tip{
          color: #999;
        }
      }
    }
    .detail{
      .detail-add{
        @include bgColor(#fff);
        padding-left: 1.5rem;
        margin-bottom: 3.6rem;
        li{
          position: relative;
          @include wh(100%, 5rem);
          line-height: 5rem;
          @include sc(1.4rem, #000);
          span{
            position: absolute;
            left: 0;
            width: 7.5rem;
            text-align: left;
          }
          .more{
            @include wh(100%, 5rem);
            padding-left: 7.5rem;
            @include sc(1.4rem, #ccc);
          }
          .color-black{
            color: #000;
          }
          textarea.more{
            min-height: 7.2rem;
            padding-top: 1.6rem;
          }
          i.icon{
            position: absolute;
            right: 1.5rem;
            top: 50%;
            transform: translateY(-50%);
            @include wh(.7rem, 1.3rem);
            @include bgi_2('/static/icon/order/icon_next.png'
              ,.7rem, 1.3rem
              ,center,center,no-repeat);
          }
        }
        li:nth-of-type(1){
          @include average(#ccc);
        }
        li:nth-of-type(2){
          height: 7.2rem;
        }
      }
      .default-add{
        position: relative;
        @include wh(100%, 5rem);
        @include sc(1.4rem, #000);
        padding-left: 1.5rem;
        line-height: 5rem;
        @include bgColor(#fff);
        .select{
          position: absolute;
          top: 1.2rem;
          right: 1rem;
        }
      }
    }
  }
  /*选择服务地址*/
  .select-address{
    background-color: #fff;
    padding-bottom: 11rem;
    .address-info{
      padding-left: 1.5rem;
      li.addItem{
        position: relative;
        width: 100%;
        height: 7.4rem;
        @include average(#ccc);
        text-align: left;
        padding-right: 9rem;
        display: flex;
        justify-content: center;
        align-items: center;
        span.detail{
          display: block;
          margin: 0 auto;
          width: 100%;
          line-height: 1.5rem;
          @include sc(1.4rem, #000);
          span.default{
            color: #e70034;
            margin-right: .25rem;
          }
        }
        i.icon{
          position: absolute;
          @include wh(2.2rem,2.2rem);
          top: 50%;
          right: 2rem;
          margin-top: -1rem;
          @include bgi_2('/static/icon/order/btn_choose_nor.png'
            , 2rem, 2rem, center, center, no-repeat);
        }
        i.nowAddress{
          @include bgi_2('/static/icon/order/btn_choose_sel.png'
            , 2rem, 2rem, center, center, no-repeat);
        }
        span.inconsistent{
          color: #999;
        }
        .text-tip{
          position: absolute;
          top: 50%;
          right: 1rem;
          margin-top: -1.2rem;
          @include sc(1.2rem, #999);
        }
        /*地址编辑、删除*/
        .edit-box{
          position: absolute;
          bottom: 1rem;
          right: 1.5rem;
          li.left:nth-of-type(2){
            margin-top: 0.5rem;
            // width: 0.2rem;
            height: 1.6rem;
            margin: 0 1rem;
            div.vertical{
              position: absolute;
              height: 1.6rem;
              border-left: .05rem solid #999;
              top: 50%;
              transform: translateY(-50%);
            }
          }
          .edit-icon{
           @include wh(2.2rem, 2.2rem);
           img{
             width: 100%;
           }
          }
        }
      }
    }
  }
  /*底部按钮*/
  .bottom-btn{
    position: fixed;
    left: 0;
    bottom: 0;
    @include wh(100%, 4.9rem);
    @include bgColor(#e70034);
    @include sc(1.8rem, #fff);
    line-height: 4.9rem;
    .btn{
      position: relative;
      text-align: center;
      color: #fff;
      i.icon{
        position: absolute;
        @include wh(1.9rem,1.9rem);
        top: 1.5rem;
        left: 50%;
        margin-left: -21%;
        @include bgi_2('/static/icon/order/address_icon_add.png'
          , 1.9rem, 1.9rem, center, center, no-repeat);
      }
    }
  }
  /*商圈选择*/
  .trading-box{
    position: fixed;
    top: 0;
    left: 0;
    @include wh(100%, 100%);
    background-color: rgba(0,0,0,0.2);
    z-index: 2;
    .trading-area{
      @include wh(100%, auto);
      position: absolute;
      bottom: 0;
      background-color: #fff;
      .title{
        .top{
          padding: 1.6rem 0 1rem;
          text-align: center;
          h3{
            @include sc(1.6rem, #333);
            line-height: 1.8rem;
          }
          span.cancal{
            position: absolute;
            top: 1.3rem;
            right: 1.5rem;
            @include sc(1.6rem, #999);
          }
        }
        .bottom ul{
          border-bottom: 1px solid #ccc;
          li{
            position: relative;
            float: left;
            padding: 0 1.5rem;
            line-height: 4rem;
             @include sc(1.6rem, #000);
          }
          li.active::before{
            @include wh(70%, .3rem);
            content: "";
            display: block;
            background-color: #e70034;
            position: absolute;
            left: 15%;
            bottom: 0;
          }
        }
      }
      .district{
        width: 100%;
        .district-detail{
          height: 24rem;
          overflow-y: scroll;
          -webkit-overflow-scrolling: touch;
          padding-bottom: 2rem;
          ul.detail{
            padding-left: 1.5rem;
            padding-top: 1rem;
            li{
              line-height: 3rem;
              span{
                @include sc(1.4rem, #999);
                margin-right: 1.5rem;
              }
              span.select{
                color: #000;
              }
              // 地区选中（打勾）
              i.icon{
                display: inline-block;
                transform: translateY(20%);
                @include wh(1.7rem, 1.7rem);
                @include bgi_2('/static/icon/order/address_icon_choose.png'
                  ,1.7rem, 1.7rem
                  ,center,center,no-repeat);
              }
            }
          }
        }
      }
    }
  }
}
</style>