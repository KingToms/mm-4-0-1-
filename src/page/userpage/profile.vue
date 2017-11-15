<template>
  <div class="profile">
    <div class="bg" v-show="bgShow">
      <div class="gender">
        <ul>
          <li @click="info.sex=0,bgShow=false">男</li>
          <li @click="info.sex=1,bgShow=false">女</li>
        </ul>
        <div @click="bgShow=false">取消</div>
      </div>
    </div>
    <mt-datetime-picker @confirm="handleConfirm" :startDate="startDate" v-model="pickerVisible" type="date"
      year-format="{value} 年"
      month-format="{value} 月"
      date-format="{value} 日"
     ref="picker">
    </mt-datetime-picker>
    <div class="header">
      <div class="title">
        <h2>{{title}}</h2>
      </div>
      <a class="back" href="javascript:void(0);" @click="back" ></a>
      <a class="complaint" href="javascript:void(0)" @click="save">保存</a>
    </div>
    <content v-show="model==='content'">
      <div class="photo">
        <img :src="info.avatar?info.avatar:base64" alt="">
        <input type="file" @change="readFile">
      </div>
      <div class="info">
        <ul>
          <li @click="model='nickName'">
            <span>昵称</span>
            <span class="nickName">{{info.nick}}</span>
            <icon></icon>
          </li>
          <li @click="bgShow=true">
            <span>性别</span>
            <span class="gender">{{info.sex==0?"男":"女"}}</span>
            <icon></icon>
          </li>
          <li @click="openPicker">
            <span>出生日期</span>
            <span class="birthday">{{info.birthday}}</span>
            <icon></icon>
          </li>
          <li @click="$router.push('/resetPwd')">
              <span>修改密码</span>
              <icon></icon>
          </li>
        </ul>
      </div>
    </content>
    <div class="nickName" v-show="model==='nickName'">
      <input type="text" v-model="info.nick" autofocus>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import lHeader from '../../components/common/lHeader'
import 'mint-ui/lib/style.css'
import { DatetimePicker } from 'mint-ui'
import {upLoadImage,saveInfo,getUserInfo} from '../../service/getData'

Vue.component(DatetimePicker.name, DatetimePicker)
export default {
  name: 'profile',
  data () {
    return {
      title: '个人资料',
      model: 'content',
      bgShow: false,
      pickerVisible: '',
      startDate: new Date('1960'),
      base64:'/static/icon/ucenter/data_photo_default.png',
      info:{
        nick: '1858****991',
        sex: '女',
        birthday: '1998-08-20',
        avatar: ''
      }
    }
  },
  components:{
    lHeader
  },
  created(){
    this.getUserInfo()
  },
  methods: {
    back(){
      if(this.model === 'nickName'){
        this.model = 'content'
        return
      }
      this.$router.go(-1)
    },
    async save(){
      if(this.model === 'nickName'){
        this.model = 'content'
        return
      }
      let res = await saveInfo(this.info)
      if(res.status === 'ok'){
        alert('修改成功')
      }
    },
    async funUploadImg(base64, key) {
      // 上传图片
      let res = await upLoadImage({image: base64})
      if (res.status == 'ok') {
        this.info.avatar = res.data
      }
    },
    async getUserInfo () {
      let res = await getUserInfo()
      if(res.status === 'ok'){
        this.info.nick = res.data.nick
        this.info.sex = res.data.sex
        this.info.birthday = res.data.birthday
        this.info.avatar = res.data.avatar
      }
      else
        alert('数据获取异常,请刷新重试')
    },
    readFile(obj){
      let _this = this
      let file = obj.target.files[0]
      let reader = new FileReader()

      reader.onload = function (e) {
        let key = obj.target.id
        _this.base64 = e.target.result
        _this.funUploadImg(e.target.result, key)
      }
      reader.readAsDataURL(file)
    },
    openPicker() {
      this.$refs.picker.open();
    },
    handleConfirm(){
      let year = this.pickerVisible.getFullYear()
      let month = this.pickerVisible.getMonth()+1
      let day = this.pickerVisible.getDate()
      this.info.birthday = `${year}-${month<10?'0'+month:month}-${day<10?'0'+day:day}`
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../../assets/css/mixin.scss';
.profile{
  position: fixed;
  width: 100%;
  .bg{
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0,0,0,.4);
    @include wh(100%,100%);
    z-index: 2;
    .gender{
      width: 100%;
      position: absolute;
      bottom: 0;
      padding: 1rem 1.5rem;
      ul{
        width: 100%;
        @include bgColor(#fff);
        border-radius: .5rem;
        li{
          @include wh(100%,4.4rem);
          @include sc(1.8rem,#000);
          text-align: center;
          line-height: 4.4rem;
          &:first-child{
            @include average(#ddd);
          }
        }
      }
      div{
        margin-top: 1rem;
        border-radius: .5rem;
        @include bgColor(#fff);
        @include wh(100%,4.4rem);
        @include sc(1.6rem,#999);
        text-align: center;
        line-height: 4.4rem;
      }
    }
    .birthday{
      @include wh(100%,25rem);
      @include bgColor(#fff);
    }
  }
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
  .photo{
    position: relative;
    padding-top: 5rem;
    text-align: center;
    img{
      @include wh(8rem,8rem);
      border-radius: 50%;
    }
    input[type=file]{
      @include wh(8rem,8rem);
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      opacity: 0;
      background-color: #9900ff;
    }
  }
  .info{
    padding-top: 4.8rem;
    ul{
      margin-left: 1.5rem;
      li{
        position: relative;
        @include average(#ccc);
        @include wh(100%,5rem);
        line-height: 5rem;
        @include sc(1.5rem,#000);
        span:nth-of-type(2){
          position: absolute;
          right: 3rem;
        }
        icon{
            position: absolute;
            @include wh(1.1rem,1.1rem);
            @include bgi_2('/static/icon/order/indent_icon_name.png',1.1rem,1.1rem);
            top: 50%;
            right: 1rem;
            transform: translateY(-50%);
          }
      }
    }
  }
  >.nickName{
    @include wh(100%,4rem);
    padding: 2rem 1.5rem;
    input[type=text]{
      @include wh(100%,4rem);
    }
  }
}
</style>