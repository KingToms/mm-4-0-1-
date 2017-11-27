/**
 * 彭秋如<pengqr@lansee.net>
 * 存储关键的key
 */
export default {
  uInfo: 'uInfo',  // 当前登陆用户信息
  // baseUrl: 'http://www.qiaocat2.com',  // 后端接口所在域
  // baseUrl: 'http://www.qm.com',  // 后端接口所在域
  // baseUrl: 'http://port.qiaocat.com', // 正式
  // baseUrl: 'http://api-mm.qiaocat.com', // 正式 V4.0.0

  // baseUrl: 'http://porttest.qiaocat.com', // 测试
  // baseUrl: 'http://api-mm-test.qiaocat.com', // 测试 V4.0.0
  baseUrl:{
    test: 'http://topic-api-mm.qiaocat.com',
    tmp: 'http://tmp-api-mm.qiaocat.com',
    master: 'http://api-mm.qiaocat.com'
  },
  payUrl:{
    test: 'http://crm2test.qiaocat.com',
    // master: 'http://crm2.qiaocat.com'
    master: 'http://crm.qiaocat.com'
  },
  currentCity: 'currentCity',  // 当前城市
  currentSearch: 'currentSearch', // 当前搜索
  userMoile: 'userMobile',  //用户手机号码
  qm_cookie: 'qm_cookie_v4',   //  static/js/datetime.js   使用了同一个名称
  search_text: 'search_text', // 搜索记录
  orderCreate: 'orderCreate', //订单创建时间
  orderStatus: 'orderStatus',  // 订单状态
  orderDesc: 'orderDesc' , // 购物须知及赔付规则
  token: 'authApp'
}
