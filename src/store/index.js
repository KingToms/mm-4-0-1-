import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutation'

Vue.use(Vuex)

const state = {
  searchHis: [], // 搜索历史
  hasHistory: Boolean, // 是否有搜索记录
  currentSearch: '', //搜索结果列表
  currentCity: { // 当前城市
    province_id: '', // 省份ID 440000
    city_id: '', // 城市ID 440100
    district_id: '', // 商圈ID 440105
    province_name: '', // 省份名称
    city_name: '', // 城市名称
    district_name: '', // 商圈名称
  }, 
  confirmOrder: {
    appoint: '', // 预约人
    mobile: '', // 预约电话
    date: '', // 预约日期
    time: '', //预约时间
    address: '', // 预约地址
    amount: 0, //优惠券优惠金额
    sn: 0 //使用的优惠券id
  }, //下单流程，确认订单
  bgShow: false,
  orderList:[],
  // 订单管理，记录搜索的订单状态，操作订单时根据订单状态显示不通的提示
  ordermanage:{
    content: 0,
    serviceStart: 0,
    orderStatus:0,
    ordersn:'',
    sendTime:''
  }
}

export default new Vuex.Store({
  state,
  mutations
})
