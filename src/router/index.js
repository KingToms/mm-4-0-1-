import Vue from 'vue'
import Router from 'vue-router'
import App from '../App'

// 公共key存放
import keyConf from '../common/keyConf'

// components
Vue.use(Router)

let authBaseUrl = '/user'

// 懒加载组件，将组件chunk打包  尽量以懒加载的方式加载文件
// @代表src目录  在/build/webpack.config.base.js中有alias配置，'@':'src'

/**
 * 注意
 * 注意
 * 注意
 * 注意
 * require请求配置的路径以纯小写，模块名称按原来的名称
 * @param {*} resolve
 */



// 首页
const IndexCom = resolve => require.ensure([], () => resolve(require('@/page/index')), 'home')
const Home = resolve => require.ensure([], () => resolve(require('@/page/homepage/home')), 'home')
// 首页-推荐
// const Recommend = resolve => require.ensure([], () => resolve(require('@/page/homepage/children/recommend')), 'home')
const Recommend = resolve => require.ensure([], () => resolve(require('@/page/homepage/children/recommend.4.0.1')), 'home')
// 首页-化妆
// const Makeup = resolve => require.ensure([], () => resolve(require('@/page/homepage/children/makeup')), 'home')
const Makeup = resolve => require.ensure([], () => resolve(require('@/page/homepage/children/makeup.4.0.1')), 'home')
// 首页-美睫
const Beauty = resolve => require.ensure([], () => resolve(require('@/page/homepage/children/beauty')), 'home')
// 首页-纹绣
const Tattoo = resolve => require.ensure([], () => resolve(require('@/page/homepage/children/tattoo')), 'home')
// 首页-医美
const Medical = resolve => require.ensure([], () => resolve(require('@/page/homepage/children/medical')), 'home')
// 首页-培训
const Train = resolve => require.ensure([], () => resolve(require('@/page/homepage/children/train')), 'home')
// 邀请好友
const Invitation = resolve => require.ensure([], () => resolve(require('@/page/invitpage/index')), 'home')
// 新用户邀请
const InvitUser = resolve => require.ensure([], () => resolve(require('@/page/invitpage/inviteUser')),'invite')
// 人气最高店铺，新店开张
const Stylist = resolve => require.ensure([], ()=> resolve(require('@/page/stylistpage/index')),'stylist')

// 个人中心
const UserCenter = resolve => require.ensure([], () => resolve(require('@/page/userpage/userCenter')),'user')
// 个人资料
const Profile = resolve => require.ensure([], () => resolve(require('@/page/userpage/profile')), 'user')
// 关注（商品、店铺）
const Follow = resolve => require.ensure([], () => resolve(require('@/page/userpage/follow')), 'follow')
// 常用地址
const CommonAddress = resolve => require.ensure([], () => resolve(require('@/page/userpage/com_address')), 'user')
// 猫粮
const CatFood = resolve => require.ensure([], () => resolve(require('@/page/userpage/cat_food')), 'cat_food')
// 猫粮说明
const CatFoodDesc = resolve => require.ensure([], () => resolve(require('@/page/userpage/cat_food_description')), 'cat_food')
// 我的钱包
const Wallet = resolve => require.ensure([], () => resolve(require('@/page/userpage/wallet')), 'wallet')
// 设置
const Setting = resolve => require.ensure([], () => resolve(require('@/page/userpage/setting')),'setting')
// 免责声明
const Statement = resolve => require.ensure([], () => resolve(require('@/page/userpage/statement')), 'setting')
// 意见反馈
const Feedback = resolve => require.ensure([], () => resolve(require('@/page/userpage/feedback')),'setting')
// 投诉举报
const Complaint = resolve => require.ensure([], () => resolve(require('@/page/userpage/complaint')), 'setting')
// 用户优惠券中心
const MyCoupon = resolve => require.ensure([], () => resolve(require('@/page/userpage/coupon')), 'usmodule')
// 我的足迹
const FooterHis = resolve => require.ensure([], () => resolve(require('@/page/userpage/footerHis')), 'setting')

// 登录注册
const Login = resolve => require.ensure([], () => resolve(require('@/page/loginpage/login')), 'loginPage')
const FindPwd = resolve => require.ensure([], () => resolve(require('@/page/loginpage/findPwd')), 'resetPwd')
const ResetPwd = resolve => require.ensure([], () => resolve(require('@/page/userpage/resetPwd.vue')), 'resetPwd')
const Register = resolve => require.ensure([], () => resolve(require('@/page/registerpage/register')), 'loginPage')

// 城市选择
const City = resolve => require.ensure([], () => resolve(require('@/page/citypage/city')), 'city')
// 消息中心
const MessageCenter = resolve => require.ensure([], () => resolve(require('@/page/messagepage/messageCenter')), 'messageCenter')
// 活动消息
const ActivityMessage = resolve => require.ensure([], () => resolve(require('@/page/messagepage/activity')), 'activity')
// 客服消息
const Message = resolve => require.ensure([], () => resolve(require('@/page/messagepage/message')), 'message')
// 系统消息
const SystemMessage = resolve => require.ensure([], () => resolve(require('@/page/messagepage/system')), 'system')



// 搜索
const Search = resolve => require.ensure([], () => resolve(require('@/page/searchpage/index')), 'search')
const Result = resolve => require.ensure([], () => resolve(require('@/page/searchpage/result')), 'search')
const SearchStart = resolve => require.ensure([], () => resolve(require('@/page/searchpage/children/search')), 'search')

// 订单
const Order = resolve => require.ensure([], () => resolve(require('@/page/orderpage/order')), 'pay')
const Payment = resolve => require.ensure([], () => resolve(require('@/page/paypage/pay')), 'pay')
const PayResult = resolve => require.ensure([], () => resolve(require('@/page/paypage/payResult')),'pay')
const PaySuccess = resolve => require.ensure([], () => resolve(require('@/page/paypage/children/success')), 'pay')
const PayException = resolve => require.ensure([], () => resolve(require('@/page/paypage/children/exception')), 'pay')

const OrderManage = resolve => require.ensure([], () => resolve(require('@/page/orderpage/orderManage')),'order')
const OrderDetail = resolve => require.ensure([], () => resolve(require('@/page/orderpage/orderDetail')),'orderDetail')
const CancelOrder = resolve => require.ensure([], () => resolve(require('@/page/orderpage/cancelOrder')),'cancelDetail')

const Evaluate = resolve => require.ensure([], () => resolve(require('@/page/evaluatepage/evaluate')),'evaluate')
const EvaResult = resolve => require.ensure([], () => resolve(require('@/page/evaluatepage/evaResult')),'evaluate')

const CouponCenter = resolve => require.ensure([], () => resolve(require('@/page/couponpage/coupon')),'coupon')

// 产品详情
const Detail = resolve => require.ensure([], () => resolve(require('@/page/detailpage/detail')), 'detailPage')
// 产品详情---图文详情(注：IOS的webview专用)
const Imgtext = resolve => require.ensure([], () => resolve(require('@/page/detailpage/imgtext')), 'imgtext')
// 产品详情---店铺页面
const Shopping = resolve => require.ensure([], () => resolve(require('@/page/detailpage/shopping')), 'shopping')
// 订单赔付规则
const OrderDesc = resolve => require.ensure([], () => resolve(require('../page/detailpage/children/orderDesv')), 'orderdescd')

const  Discovery = resolve => require.ensure([], () => resolve(require('@/page/discoverypage/discovery')),' discovery')

// const PhotoSwipe = resolve => require.ensure([], () => resolve(require('@/page/photoSwipe/index')), 'photoswipe')

/*专题模块开始*/

const topicOrder = r => require.ensure([], () => r(require('@/page/topic/order')), 'topic');

// 万圣节专题
const Halloween = r => require.ensure([], () => r(require('@/page/topic/halloween/index')), 'halloween');
// 新人888优惠券专题
const NewUser_888 = r => require.ensure([], () => r(require('@/page/topic/newUser_888/index')), 'new_user_888');
// 新人50优惠券专题
const NewUser_50 = r => require.ensure([], () => r(require('@/page/topic/newUser_50/index')), 'new_user_50');
// 新人600优惠券专题
const NewUser_600_invite = r => require.ensure([], () => r(require('@/page/topic/newUser_600/invitation')), 'new_user_600');
const NewUser_600 = r => require.ensure([], () => r(require('@/page/topic/newUser_600/index')), 'new_user_600');
// 万圣节鬼混夜1元、10元专题
const DressParty = r => require.ensure([], () => r(require('@/page/topic/dressparty/index')), 'dressparty');
const lineUp = r => require.ensure([], () => r(require('@/page/topic/dressparty/lineup')), 'dressparty');
// 万圣节鬼混夜0.01元专题
const MakeUp_001 = r => require.ensure([], () => r(require('@/page/topic/makeup001/index')), 'makeup001');
const lineUp_001 = r => require.ensure([], () => r(require('@/page/topic/makeup001/lineup001')), 'makeup001');
// 双11美妆狂欢夜
const doubleEleven = r => require.ensure([], () => r(require('@/page/topic/doubleEleven_1111/index')), 'double-eleven');
// 双11俏猫邀你领好礼
const sendGift = r => require.ensure([], () => r(require('@/page/topic/giftGiving_1111/index')), 'send_gift');
// Y.S.L圣罗兰专题
const ysl = r => require.ensure([], () => r(require('@/page/topic/ysl/index')), 'ysl');
const yslP1 = r => require.ensure([], () => r(require('@/page/topic/ysl/page/p1')), 'ysl');
const yslP2 = r => require.ensure([], () => r(require('@/page/topic/ysl/page/p2')), 'ysl');
const yslP3 = r => require.ensure([], () => r(require('@/page/topic/ysl/page/p3')), 'ysl');
const yslP4 = r => require.ensure([], () => r(require('@/page/topic/ysl/page/p4')), 'ysl');
const yslP5 = r => require.ensure([], () => r(require('@/page/topic/ysl/page/p5')), 'ysl');
const yslP6 = r => require.ensure([], () => r(require('@/page/topic/ysl/page/p6')), 'ysl');
const yslP7 = r => require.ensure([], () => r(require('@/page/topic/ysl/page/p7')), 'ysl');
// 2017感恩节专题
const Thanksgiving_2017 = r => require.ensure([], () => r(require('@/page/topic/thanksgiving_2017/index')), 'thanksgiving_2017');
// 2017大转盘抽奖
const luckDraw_1129 = r => require.ensure([], () => r(require('@/page/topic/luckDraw_2017/luckdraw1129')), 'luckDraw_2017');
const luckDraw_1230 = r => require.ensure([], () => r(require('@/page/topic/luckDraw_2017/luckdraw1230')), 'luckDraw_2017');
// 2017年会妆专题
const annualMakeup = r => require.ensure([], () => r(require('@/page/topic/annualMakeup/index')), 'annualMakeup');
/*专题模块结束 */

// 路由导向错误
const ErrorPage = resolve => require.ensure([], () => resolve(require('@/page/errorpage/error')), 'errorPage')

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/', // 顶级目录
      component: App,
      children: [ // 二级路由，对应app.vue
        {
          path: '',
          redirect: '/index'
        },
        {
          path: '/index',
          component: IndexCom,
          children:[
            {
              path: '',
              redirect: '/home'
            },
            {
              // 首页
              path: '/home',
              component: Home,
              children: [
                {
                  path: '/home',
                  redirect: '/home/recommend'
                },
                {
                  path: '/home/recommend',
                  name: 'recommend',
                  component: Recommend
                },
                // {
                //   path: '/home/makeup',
                //   name: 'makeup',
                //   component: Makeup
                // },
                {
                  path: '/home/beauty',
                  name: 'beauty',
                  component: Beauty
                },
                {
                  path: '/home/tattoo',
                  name: 'tattoo',
                  component: Tattoo
                },
                {
                  path: '/home/medical',
                  name: 'medical',
                  component: Medical
                },
                {
                  path: '/home/train',
                  name: 'train',
                  component: Train
                }
              ]
            },
            {
              // 我的
              path: '/usercenter',
              component: UserCenter
            },
            {
              path: '/orderlist',
              name: 'ordermanage',
              component: OrderManage
            },
            {
              path: '/discovery',
              name :'iscovery',
              component: Discovery
            }
          ]
        },
        // 化妆
        {
          path: '/home/makeup/:cate_id?/:cate_title?',
          name: 'makeup',
          component: Makeup
        },
        // 人气最高店铺，新店开张
        {
          path: '/stylist/:tabName/:id?',
          component: Stylist
        },
        {
          // 登录
          path: '/login',
          name: 'login',
          component: Login
        },
        {
          // 注册
          path: '/register',
          name: 'rigister',
          component: Register
        },
        {
          // 密码找回
          path: '/findpwd',
          name: 'findPwd',
          component: FindPwd
        },
        {
          // 重置密码
          path: '/resetPwd',
          name: 'resetPwd',
          component: ResetPwd
        },
        {
          // 邀请好友
          path: '/invitation',
          name: 'invitation',
          component: Invitation
        },
        {
          // 新用户邀请
          path: '/invituser',
          name: 'invituser',
          component: InvitUser
        },
        {
          // 选择城市
          path: '/city',
          name: 'city',
          component: City
        },
        {
          // 消息中心
          path: '/messageCenter',
          name: 'messageCenter',
          component: MessageCenter
        },
        {
          // 活动消息
          path: '/messageCenter/activity',
          name: 'activity',
          component: ActivityMessage
        },
        {
          // 客服消息
          path: '/messageCenter/message',
          name: 'message',
          component: Message
        },
        {
          // 系统消息
          path: '/messageCenter/system',
          name: 'system',
          component: SystemMessage
        },
        {
          path: '/search',
          name: 'search',
          component: Search,
          children: [
            {
              path: '/search',
              redirect: '/search/start'
            },
            {
              path: '/search/start',
              name: 'searchstart',
              component: SearchStart
            }
          ]
        },
        // 搜索结果
        {
          path: '/search/result',
          name: 'searchresult',
          component: Result
        },
        //店铺
        {
          path: '/detail/shopping/:shopid',
          name: 'shopping',
          component: Shopping
        },
        // 详情页面
        {
          path: '/detail/:id',
          name: 'detail',
          component: Detail
        },
        // 详情页面--图文详情 (注：IOS的webview专用)
        {
          path: '/detail/imgtext/:id',
          name: 'imgtext',
          component: Imgtext
        },
        {
          path: '/desc',
          component: OrderDesc
        },
        //订单页面
        {
          path: '/order/:id?',
          name: 'order',
          component: Order
        },
        // 支付
        {
          path: '/pay/:orderid',
          name: 'payment',
          component: Payment
        },
        // 订单详情
        {
          path: '/order/detail/:ordersn',
          name: 'orderDetail',
          component: OrderDetail
        },
        // 取消订单
        {
          path: '/order/cancel/:ordersn',
          name: 'cancelOrder',
          component: CancelOrder
        },
        // 评价
        {
          path: '/order/evaluate/:sn',
          name: 'evaluate',
          component: Evaluate
        },
        {
          path: '/order/evaluate/result',
          name:'evaResult',
          component: EvaResult
        },
        {
          path: '/payresult',
          name: 'payResult',
          component: PayResult,
          children: [
            {
              path: '/payresult/success/:ordersn?',
              name: 'paySuccess',
              component: PaySuccess
            },
            {
              path: '/payresult/exception/:ordersn?',
              name: 'payException',
              component: PayException
            }
          ]
        },
        {
          path: '/coupon',
          name: 'coupon',
          component: CouponCenter
        },
        // 个人资料
        {
          path: '/profile',
          component: Profile
        },
        // 关注--商品、店铺
        {
          path: '/follow',
          name: 'follow',
          component: Follow
        },
        // 个人中心--常用地址
        {
          path: '/usercenter/com_address',
          name: 'com_address',
          component: CommonAddress
        },
        // 个人中心--猫粮
        {
          path: '/cat_food',
          name: 'cat_food',
          component: CatFood
        },
        // 个人中心--猫粮说明
        {
          path: 'catFoodDesc',
          name: 'cat_food_description',
          component: CatFoodDesc
        },
        // 个人中心--我的钱包
        {
          path: '/wallet',
          name: 'wallet',
          component: Wallet
        },
        // 设置
        {
          path: '/setting',
          component: Setting
        },
        // 免责声明
        {
          path: '/statement',
          component: Statement
        },
        // 反馈
        {
          path: '/feedback',
          component: Feedback
        },
        // 投诉
        {
          path: '/complaint',
          component: Complaint
        },
        // 个人中心--优惠券
        {
          path: '/mycoupon',
          component: MyCoupon
        },
        {
          path: '/footerhis',
          component: FooterHis
        },
        /**
         * 专题路由
         */
        // 专题一：万圣节特效妆
        {
          path: '/topic-halloween',
          component: Halloween
        },
        // 专题二：万圣节鬼混夜特价1元、10元
        {
          path: '/topic-dressparty',
          name: 'DressParty',
          component: DressParty,
        },
        {
          path: '/topic-dressparty/lineup/:ordersn/:dressparty',
          name: 'lineUp',
          component: lineUp,
        },
        // 专题三：万圣节鬼混夜特价0.01元
        {
          path: '/topic-makeup001',
          name: 'MakeUp_001',
          component: MakeUp_001
        },
        {
          path: '/topic-makeup001/lineup001/:ordersn/:dressparty',
          name: 'lineUp_001',
          component: lineUp_001,
        },
        // 专题四：双11美妆狂欢夜
        {
          path: '/topic-double-eleven',
          component: doubleEleven
        },
        // 专题五：双11俏猫邀你领好礼
        {
        path: '/topic-sendgift',
        component: sendGift
        },
        {
          path: '/topic-ysl',
          component: ysl,
            children:[
                {path:'',component:yslP1},
                {path:'p2',component:yslP2},
                {path:'p3',component:yslP3},
                {path:'p4',component:yslP4},
                {path:'p5',component:yslP5},
                {path:'p6',component:yslP6},
                {path:'p7',component:yslP7}
            ]
         },
        {
          path: '/topic-order/:id',
          name: 'topicOrder',
          component: topicOrder
        },
        {
          path: '/topic-new-user-888',
          component: NewUser_888
        },
        {
          path: '/topic-new-user-50',
          component: NewUser_50
        },
        {
          path: '/topic-newuser-invite-600',
          component: NewUser_600_invite
        },
        {
          path: '/topic-new-user-600',
          component: NewUser_600
        },
        {
          path: '/topic-thanksgiving-2017',
          component: Thanksgiving_2017
        },
        {
          path: '/topic-luckdraw-1129',
          component: luckDraw_1129
        },
        {
          path: '/topic-luckdraw-1230',
          component: luckDraw_1230
        },
        {
          path: '/topic-annual-makeup',
          component: annualMakeup
        },
        {
          // 错误页
          path: '*',
          name: 'error',
          component: ErrorPage
        },
      ]
    },
    /*
    {path: '/order', name: 'order', component: Order},
    */
  ]
})

 router.beforeEach((to, from, next) => {
   /* if(to.fullPath.indexOf('usercenter') > -1){
     debugger
   } */
  // 访问'我的俏猫', 如果已经登录，自动跳转为 '/usercenter'
  if(to.fullPath.indexOf('login') > -1 && $.cookie(keyConf.qm_cookie)){
    next('/usercenter')
    return
  }

  if(to.fullPath.indexOf('usercenter') > -1 && !$.cookie(keyConf.qm_cookie)){
    next('/login')
    return
  }

  if(to.fullPath.indexOf('follow') > -1 && !$.cookie(keyConf.qm_cookie)){
    next('/login')
    return
  }

  if(to.fullPath.indexOf('wallet') > -1 && !$.cookie(keyConf.qm_cookie)){
    next('/login')
    return
  }

  if(to.fullPath.indexOf('cat_food') > -1 && !$.cookie(keyConf.qm_cookie)){
    next('/login')
    return
  }

  if(to.fullPath.indexOf('login') > -1 && !$.cookie(keyConf.qm_cookie)){
    next()
    return
  }

  if ((to.fullPath.indexOf('order') > -1 || to.fullPath.indexOf('topic-order') > -1) && !$.cookie(keyConf.qm_cookie)) {
    next({path: '/login', query: {url: to.fullPath}})
    return
  }

  if(to.fullPath.indexOf('/topic-dressparty/lineup') > -1 && !$.cookie(keyConf.qm_cookie)){
    next({path: '/topic-dressparty', query: {type: 1}})
    return
  }

  if(to.fullPath.indexOf('/topic-makeup001/lineup001') > -1 && !$.cookie(keyConf.qm_cookie)){
    next({path: '/topic-makeup001', query: {type: 0.01}})
    return
  }

  next()
  })

export default router
