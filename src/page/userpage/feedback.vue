<template>
  <div class="feedback">
    <div class="feedback-content" v-show="isRule===1">
      <div class="header">
        <div class="title">
          <h2>{{title}}</h2>
        </div>
        <a class="back" href="javascript:void(0);" @click="$router.go(-1)" ></a>
        <router-link class="complaint" to="/complaint">投诉举报</router-link>
      </div>
      <content>
        <textarea name="" id="content" rows="20" v-model="description" maxlength="250" placeholder="请输入您的反馈意见或建议(至多250个字)"></textarea>
      </content>
      <div class="btn" @click="feedback">提交</div>
    </div>
    <complaint-result v-show="isRule===2"></complaint-result>
  </div>
</template>
<script>
import complaintResult from './children/complaintResult'
import keyConf from '../../common/keyConf'
import {getStore} from '../../common/store'
import {feedback} from '../../service/getData'
export default {
  name: 'feedback',
  data () {
    return {
      title: '投诉反馈',
      uinfo: JSON.parse(getStore(keyConf.uInfo)),
      description:'',
      isRule: 1
    }
  },
  components:{
    complaintResult
  },
  methods: {
    async feedback (){
      /* if(this.description.length<10)
      {
        alert('请填写需要反馈的内容')
        return
      } */
      let res = await feedback({
        description: this.description,
        user_name: this.uinfo.user_name,
        contact: this.uinfo.mobile
      })
      if(res.status === 'ok')
        this.isRule = 2
      else
        alert('数据异常，请重试')
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../assets/css/mixin.scss';
.feedback{
  .header{
    @include bgColor(#fff);
    position: relative;
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
    a{
       position: absolute;
       top: .7rem;
    }
    .back{
      left: .7rem;
      @include wh(2.4rem,2.4rem);
      background-image: url('../../assets/image/icon/login/nav_btn_return.png');
      background-repeat: no-repeat;
      background-position: center;
      background-size: 2.2rem 2.2rem;
    }
    .complaint{
      right: .7rem;
      @include sc(1.6rem,#000);
    }
  }
  textarea{
    // @include wh(100%)
    width: 100%;
    padding: 1.5rem 1.5rem 0;
    @include sc(1.6rem,#000);
  }
  .btn{
    position: fixed;
    bottom: 0;
    @include bgColor($themeRed);
    @include wh(100%,4.4rem);
    @include sc(1.8rem,$bgWhite);
    text-align: center;
    line-height: 4.4rem;
  }
}
</style>