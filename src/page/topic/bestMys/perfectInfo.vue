<template>
  <div class="main">
    <div class="info">
      <p class="note">请真实填写以下信息：</p>
      <input class="name" type="text" placeholder="请输入真实姓名" v-model="name">
      <div class="photo-box">
        <div class="item demo1">
          <img src="/static/topic/bestMys/2.1.2.jpg" alt="">
          <p>示例</p>
        </div>
        <div class="item add-img">
          <img src="/static/topic/bestMys/2.1.2.jpg" alt="">
          <p class="operate">点击上传正面形象照</p>
          <i class="icon-delete" @click="clearImg"></i>
        </div>
        <div class="item demo2">
          <img src="/static/topic/bestMys/2.1.3.jpg" alt="">
          <p>示例</p>
        </div>
        <div class="item add-img">
          <p class="operate">点击上传美业师相关证件</p>
          <i class="icon-delete" @click="clearImg"></i>
        </div>
      </div>
      <div class="submit">提交</div>
    </div>
    <img src="/static/topic/bestMys/2.1.0bg.jpg" alt="" class="bg">
  </div>
</template>
<script>
export default {
  name: "perfectInfo",
  data() {
    return {
      name: '',
    };
  },
  methods: {
  }
}
</script>
<style lang="scss" scoped>
.main {
  position: relative;
  width: 100%;
  height: 100%;
  padding-top: 15%;
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
    padding: 0 6.8%;
    .note {
      color: #fff;
      font-size: 1.7rem;
      padding-left: 6%;
    }
    .name {
      padding-left: 6%;
      display: block;
      width: 100%;
      height: 4.4rem;
      line-height: 4.4rem;
      margin-top: 6%;
      font-size: 1.7rem;
      color: #fff;
      background-color: transparent;
    }
    .photo-box {
      margin-top: 8%;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      .item {
        position: relative;
        margin-bottom: 0.5rem;
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
          img {
            width: 78%;
            margin: 1.5rem 0 0 1.85rem;
            border-radius: 1rem;
          }
        }
        &.demo2 {
          background-image: url('/static/topic/bestMys/2.1.4.png');
          background-size: cover;
          img {
            width: 79.5%;
            margin: 3.5rem 0 0 1.65rem; // border-radius: 1rem;
          }
        }
      }
      .add-img {
        background-image: url('/static/topic/bestMys/button_upload.png');
        background-size: cover;
        img {
          width: 78%;
          margin: 1.35rem 0 0 1.75rem;
          border-radius: 1rem;
          z-index: 1;
        }
      }
      .icon-delete {
        position: absolute;
        right: 5%;
        top: 0%;
        width: 2.5rem;
        height: 2.5rem;
        background-image: url('../../../assets/image/icon/login/icon_delete.png');
        background-size: cover;
        z-index: 2;
      }
    }
    /*提交*/
    .submit {
      width: 100%;
      height: 4.4rem;
      line-height: 4.4rem;
      border-radius: 2.2rem;
      background-color: #8584D0;
      color: #fff;
      text-align: center;
      font-size: 2.1rem;
      margin-top: 2.5rem;
    }
  }
}
</style>