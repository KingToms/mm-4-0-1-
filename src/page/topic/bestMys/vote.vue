<template>
  <div class="main">
    <div class="info">
      <div class="search-box">
        <form action="" @submit.prevent="searchFun(searchText)">
          <img class="search-icon" src="/static/topic/bestMys/icon_search.png" alt="">
          <input class="search" type="search" @focus="hideShare" @blur="showShare" autocomplete="off" placeholder="请输入选手编号" v-model="searchText">
          <div v-show="searchText.length > 0" @click="searchFun(searchText)" class="btn-search">搜索</div>
        </form>
      </div>
      <div class="photo-box">
        <div class="item-box" v-for="(item,index) in mysLists" :key="index">
          <div class="item demo1">
            <div class="mys-item" :style="{backgroundImage: 'url('+item.headimgurl+')'}">
            </div>
          </div>
          <div class="mys-detail">
            <p>票数：{{item.voting_number}}</p>
            <p>编号：{{item.number}} &nbsp;{{item.user_name}}</p>
            <button class="vote-btn" @click="voteMys(item.uid, index)">投票</button>
          </div>
        </div>
      </div>
    </div>
    <img src="/static/topic/bestMys/3.1bg.jpg" alt="" class="bg">

    <!--投票登录窗口-->
    <div class="vote-login" v-if="showLogin">
      <div class="content">
        <div class="close" @click="closeLoginBox"></div>
        <img v-if="!success" src="/static/topic/bestMys/3.2bg.png" alt="">
        <img v-else src="/static/topic/bestMys/3.3bg.png" alt="">
        <div class="rule-detail">
          <div v-if="!success" class="sign-box">
            <!--手机号、验证码-->
            <input class="tel" type="tel" v-model="mobile" @focus="inputText" @blur="inputBlur" placeholder="请输入手机号码" maxlength="11">
            <i class="icon-delete" v-show="iconShow" @click="resetText"></i>
            <input class="mCode" v-model="code" type="tel" placeholder="请输入验证码" maxlength="6">
            <input type="button" value="发送验证码" id="sendCode" class="btn-code" @click="sendCode"></input>
            <div class="signup" @click="codeLogin">投票</div>
          </div>
          <div v-else class="result-box">
            <div class="success-img">
              <img class="icon" src="/static/topic/bestMys/icon_success.png" alt="">
              <p>投票成功</p>
              <a href="http://mm.qiaocat.com/detail/1001000?stylist_id=324254448&plid=125" target="_blank">
                <img src="/static/topic/bestMys/adver_banner.jpg" alt="" class="adver-img">
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--分享按钮-->
    <div class="share-btn" v-show="showShareBtn">
      <img class="share" @click="shareBoxShow = true" src="/static/topic/bestMys/vote_share.png" alt="">
      <div class="top-btn" @click="toTop">
        <img src="/static/topic/bestMys/icon_top.png" alt="回到顶部">
      </div>
    </div>
    <!--分享指引-->
    <div class="share-guide" @click="hideShareBox" v-if="shareBoxShow">
      <div>
        <img src="/static/topic/bestMys/guide.png" alt="">
      </div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue';
import { Toast } from 'mint-ui';
import '../../../../node_modules/mint-ui/lib/toast/style.css';
import { getCode, authLogin, userIsLogin, mysTpList, mysTpTp, mysTpSs } from '../../../service/getData.js'
import { setStore } from '../../../common/store.js';
import common from '../../../common/common.js'
import keyConf from '../../../common/keyConf.js'
export default {
  name: "voteMys",
  data() {
    return {
      searchText: '',
      mysLists: [], //美业师列表
      count: '0', //美业师总数
      page: '1', // 页数
      page_size: '10', // 一页显示10条
      flag: true,

      shareBoxShow: false, // 分享指引
      showShareBtn: true, //显示分享按钮

      showLogin: false, //投票登录窗口
      vote_uid: '', //当前投票的uid
      vote_index: '', //当前投票的序号
      mobile: '', //手机号码
      code: '', //验证码
      iconShow: false,// 删除按钮显示隐藏
      countdown: 60,
      success: false, //投票结果
      plid: '',
    };
  },
  created() {
    this.shareWechat();
    this.getMysList();
    this.scroll();
  },
  methods: {
    /*微信分享*/
    shareWechat() {
      let _this = this;
      wx.ready(function() {
        _this.share_setup(
          "寻找最美美业师，谁是你心中的NO.1",
          "巴拉拉小魔仙以神的名义，投上你最神圣的一票吧~",
          "http://mm.qiaocat.com/topic-best-mys/vote",
          "http://mm.qiaocat.com/static/topic/bestMys/share1.jpg"
        );
      });
    },
    share_setup(title, desc, link, imgUrl) {
      let _this = this;
      wx.onMenuShareAppMessage({
        title: title,
        desc: desc,
        link: link,
        imgUrl: imgUrl,
        success: function(res) {
          console.log(1, res);
          _this.shareBoxShow = false;

        },
        error: function(err) {
          console.log(1, err);
        }
      });
      wx.onMenuShareTimeline({
        title: title,
        link: link,
        imgUrl: imgUrl,
        success: function(res) {
          //todo
          console.log(2, res);
          _this.shareBoxShow = false;
        },
        error: function(err) {
          console.log(2, err);
        }
      });
    },

    // 获取美业师列表
    async getMysList() {
      this.flag = false;
      let res = await mysTpList({ page: this.page, page_size: this.page_size });
      // console.log("美业师列表：", res);
      if (res.status == 'ok') {
        this.mysLists = this.mysLists.concat(res.data);
        this.count = res.count;
        this.flag = true;
        if (this.count == this.mysLists.length) { //最后一页啦，上拉刷新不了
          this.flag = false;
        }
      }
    },

    // 上拉刷新下一页
    scroll() {
      let _this = this;
      if (this.$route.path === '/topic-best-mys/vote') {
        common.scroll(() => {
          if (_this.flag) {
            _this.page++;
            _this.getMysList();
          }
        })
      }
    },

    // 搜索选手
    async searchFun(number) {
      if (number.trim() == '') {
        alert("选手编号不能为空");
      } else {
        let res = await mysTpSs({ number: number });
        if (res.status == 'ok') {
          this.mysLists = [];
          if (res.data) { //是否有搜索的编号美业师
            this.mysLists.push(res.data);
          } else {
            // this.mysLists = [];
            alert("暂无对应编号美业师");
            this.searchText = ''; //清空搜索栏
            this.getMysList(); //重新获取列表
          }
        } else {
          alert(res.msg);
        }
      }
    },

    // 投票
    async voteMys(uid, index) {
      let qm_cookie = $.cookie(keyConf.qm_cookie);
      let isLogin = await userIsLogin();
      if (!qm_cookie || isLogin.status == 'error') {
        this.showLogin = true;
        this.success = false;
        this.vote_uid = uid; //操作的当前美业师uid
        this.vote_index = index; //操作的当前美业师index
      } else {
        let res = await mysTpTp({ voting_uid: uid });
        if (res.status == 'ok') {
          this.showLogin = true;
          this.success = true;
          this.vote_uid = '';
          this.vote_index = '';
          this.mysLists[index].voting_number = this.mysLists[index].voting_number + 1;
        } else {
          this.showLogin = false; //隐藏窗口
          alert(res.msg);
        }

      }
    },

    /*投票登录*/
    // 输入手机号码时
    inputText() {
      let self = this
      setTimeout(function() {
        self.iconShow = true;
      }, 300);
    },
    inputBlur() {
      if (this.mobile == "") {
        let self = this
        setTimeout(function() {
          self.iconShow = false;
        }, 300);
      }
    },
    // 删除手机号码
    resetText() {
      this.mobile = "";
      this.iconShow = false;
    },
    // 获取短信验证码
    async sendCode() {
      if (this.mobile.length < 11) {
        Toast({
          message: '手机格式不正确',
          duration: 1500,
          className: 'toast-tip'
        });
        return
      }
      this.countdown = 60
      common.settime($(this.$el.querySelector("#sendCode")), this.countdown);
      let res = await getCode({ mobile: this.mobile, type: 1 })
      if (res.status != 'ok') {
        alert(res.msg);
      }
    },
    // 验证码登录
    async codeLogin() {
      this.plid = common.getQueryString("plid") ? common.getQueryString("plid") : "";
      let result = await authLogin({ mobile: this.mobile, code: this.code, plid: this.plid })
      if (result.status == 'ok') {
        $.cookie(keyConf.qm_cookie, this.mobile, { expires: 1, path: '/' })
        setStore(keyConf.userMoile, this.mobile)

        this.voteMys(this.vote_uid, this.vote_index);
      } else {
        alert(result.msg);
      }
    },

    // 关闭登录窗口
    closeLoginBox() {
      this.showLogin = false; //隐藏窗口
      this.code = '';
    },

    // 显示分享按钮
    showShare() {
      this.showShareBtn = true;
    },

    // 隐藏分享按钮
    hideShare() {
      this.showShareBtn = false;
    },


    // 隐藏分享指引
    hideShareBox() {
      this.shareBoxShow = false;
    },
    // 回到顶部
    toTop() {
      $("html,body").animate({ scrollTop: 0 }, "slow");
      return false;
    },
  },
}
</script>
<style lang="scss" scoped>
.main {
  position: relative;
  width: 100%;
  min-height: 100%;
  padding-top: 62.3%;
  background-color: #4B3077;
  /*背景图*/
  .bg {
    position: absolute;
    left: 0;
    top: 0;
    display: block;
    vertical-align: top;
    width: 100%;
  }
  .info {
    position: relative;
    z-index: 1;
    padding: 0 6.8% 10rem;
    .search-box {
      position: relative;
      width: 100%;
      height: 4.4rem;
      .search-icon {
        display: block;
        position: absolute;
        top: 1.2rem;
        left: 5%;
        width: 1.6rem;
      }
      .search {
        display: block;
        width: 100%;
        padding: 0.6rem 6rem 0.6rem 12%;
        height: 4.4rem;
        line-height: 4.4rem;
        margin-top: 6%;
        font-size: 1.7rem;
        color: #fff;
        background-color: transparent;
      }
      .btn-search {
        display: block;
        width: 5rem;
        line-height: 2.4rem;
        border-radius: 1.5rem;
        position: absolute;
        top: 1rem;
        right: 0.7rem;
        text-align: center;
        color: #fff;
        font-size: 1.3rem;
        background-color: #8584d0;
        z-index: 99;
      }
    }
    .photo-box {
      margin-top: 8%;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      /*美业师信息*/
      .item-box {
        padding-bottom: 1rem;
        /*美业师头像*/
        .item {
          position: relative;
          width: 16rem;
          height: 16rem;
          p {
            position: absolute;
            left: 50%;
            transform: translate(-50%, 0);
            bottom: -0.3rem;
            color: #fff;
            text-align: center;
            font-size: 1rem;
            &.operate {
              width: 100%;
              bottom: 4rem;
              z-index: -1;
            }
          }
          ;

          &.demo1 {
            background-image: url('/static/topic/bestMys/2.1.1.png');
            background-size: cover;
            .mys-item {
              position: absolute;
              top: 1.42rem;
              left: 1.82rem;
              width: 12.4rem;
              height: 12.4rem; // margin: 1.42rem 0 0 1.82rem;
              border-radius: 0.5rem;
              background-position: center;
              background-size: cover;
              img {
                width: 100%;
                border-radius: 0.5rem;
              }
            }
          }
        }
        /*美业师投票*/
        .mys-detail {
          position: relative;
          width: 16rem;
          padding: 0 0 0 1.4rem;
          margin-top: -1.4rem;
          p {
            width: 110%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            color: #fff;
            font-size: 1.4rem;
          }
          .vote-btn {
            width: 100%;
            height: 3.3rem;
            line-height: 3.3rem;
            text-align: center;
            color: #fff;
            font-size: 1.7rem;
            border-radius: 1.65rem;
            background-color: #8584D0;
            margin-top: 0.5rem;
            margin-left: -0.5rem;
          }
        }
      }
    }
  } // 底部按钮
  .share-btn {
    position: fixed;
    bottom: 0;
    width: 100%;
    max-width: 37.5rem;
    z-index: 1;
    .share {
      width: 100%;
      display: block;
      vertical-align: top;
    }
    .top-btn {
      position: absolute;
      right: 1rem;
      bottom: 15rem;
      img {
        display: block;
        vertical-align: top;
        width: 3.6rem;
        padding: 1rem;
      }
    }
  } // 分享指引
  .share-guide {
    position: fixed;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 99;
    max-width: 37.5rem;
    div {
      width: 100%;
      height: 100%;
      max-width: 750px;
      margin: 0 auto;
    }
    img {
      width: 100%;
      height: 100%;
    }
  } // 投票登录窗口
  .vote-login {
    position: fixed;
    top: 0;
    width: 100%;
    height: 100%;
    max-width: 37.5rem;
    background-color: rgba(0, 0, 0, 0.4);
    z-index: 99;
    .content {
      width: 80%;
      margin: 0 auto;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -55%);
      .close {
        width: 4.4rem;
        height: 4.4rem;
        position: absolute;
        top: -0.5rem;
        right: -0.5rem;
      }
      img {
        width: 100%;
      }
      .rule-detail {
        position: absolute;
        left: 0;
        top: 10%;
        width: 100%;
        height: 88%;
        padding: 2rem 1rem;
        text-align: left;
        /*登录投票*/
        .sign-box {
          position: relative;
          width: 100%;
          height: 20rem;
          margin-top: 19%;
          input.tel,
          input.mCode {
            position: absolute;
            height: 4.4rem;
            left: -2%;
            text-align: left;
            text-indent: 1rem;
            background-color: transparent;
            font-size: 1.5rem;
            padding-left: 2rem;
            color: #fff;
            z-index: 2;
          }
          .tel {
            display: block;
            width: 100%;
            top: -1%;
          }
          .icon-delete {
            position: absolute;
            right: 10%;
            top: 6%;
            width: 1.8rem;
            height: 1.8rem;
            background-image: url('../../../assets/image/icon/login/icon_delete.png');
            background-size: cover;
            z-index: 2;
          }
          .mCode {
            width: 55%;
            top: 30.5%;
          }
          .btn-code {
            position: absolute;
            top: 31%;
            right: 4%;
            width: 38%;
            height: 4.4rem;
            line-height: 4.4rem;
            text-align: center;
            font-size: 1.5rem;
            color: #fff;
            cursor: pointer;
            background-color: transparent !important;
          }
          .signup {
            position: absolute;
            width: 100%;
            height: 4.4rem;
            line-height: 4.4rem;
            bottom: 15%;
            padding: 0 2rem;
            left: 0%;
            cursor: pointer;
            color: #fff;
            text-align: center;
            font-size: 2.1rem;
          }
          .disable-btn {
            color: #aaa;
          }
        }
        /*投票结果*/
        .result-box {
          position: relative;
          width: 100%;
          height: 20rem;
          margin-top: 18%;
          text-align: center;
          .success-img {
            margin-top: -2rem;
            img.icon {
              width: 6rem;
            }
            p {
              color: #fff;
              font-size: 2rem;
              margin-top: 0.4rem;
              letter-spacing: 0.3rem;
            }
            img.adver-img {
              display: block;
              width: 90%;
              margin: 1.8rem auto 0;
            }
          }
        }
      }
    }
  }
}
</style>