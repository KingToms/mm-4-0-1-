<template>
  <div class="shop_box" v-if="info.length != 0 && info.store_type">
    <!--个人店铺-->
    <div class="personal store_box" v-if="info.store_type && info.store_type == '1'">
      <div class="store_top clear">
        <div class="portrait" :style="{backgroundImage: 'url('+(info.user_img ? info.user_img : require('../../../assets/image/icon/detail/details_photo_store.png'))+')'}">
        </div>
        <div class="describe clear">
          <div class="left_box">
            <div class="person">
              <div class="name">{{info.nick}}</div>
              <span class="grade">{{info.level_name || level_list[info.level]}}</span>
            </div>
            <p class="quality">
              <span class="type" v-for="(i,index) in tech_type" :key="index">{{i | techType}}</span>
            </p>
          </div>
          <div class="right_box">
            <img class="approve" src="../../../assets/image/icon/detail/default_icon_approve.png" alt="">
            <!-- <p class="examine">认证</p> -->
          </div>
        </div>
      </div>
      <div class="store_bottom">
        <router-link :to="`/detail/shopping/${info.stylist_id}`">
          <div class="store">进入店铺</div>
        </router-link>
      </div>
    </div>

    <!--医院机构/俏猫自营-->
    <div class="mechanism store_box" v-if="info.store_type && info.store_type == '2'">
      <div class="store_top clear">
        <div class="portrait" :style="{backgroundImage: 'url('+(info.user_img ? info.user_img : require('../../../assets/image/icon/detail/details_photo_store.png'))+')'}">
        </div>
        <div class="describe clear">
          <div class="left_box">
            <div class="person">
              <div class="name">{{info.store_name}}</div>
            </div>
            <p class="quality">
              <span class="hospital" v-show="info.aptitude">
                【资质】{{info.aptitude}}
              </span>
            </p>
          </div>
          <div class="right_box">
            <img class="approve" src="../../../assets/image/icon/detail/default_icon_approve.png" alt="">
            <!-- <p class="examine">认证</p> -->
          </div>
        </div>
        <div class="address">
          <img src="../../../assets/image/icon/detail/details_icon_address.png" class="add_icon" alt="">
          <span class="add_more">{{info.store_add}}</span>
        </div>
      </div>
      <div class="store_bottom">
        <router-link :to="`/detail/shopping/${info.stylist_id}`">
          <div class="store">进入店铺</div>
        </router-link>
      </div>
      <!-- 归属医院的美业师 -->
      <!-- <div class="people">
              <div class="people_left">
                <img src="../../../assets/image/icon/detail/people01.jpg" alt="">
                <span class="people_name">秋琴莉</span>
              </div>
              <div class="people_right">
                <span class="well">【擅长】眼部、面部轮廓</span>
                <a href="javascript:void(0)" class="go"></a>
              </div>
            </div> -->
    </div>
  </div>
</template>
<script>
export default {
  name: "shopDesc",
  data() {
    return {
      level_list: ["见习", "新晋", "专业", "高级", "首席", "明星"], // 美业师等级
      tech_type: [], // 美业师技术类型
    };
  },
  props: ["info"],
  created() {
    this.tech_type = this.info.type ? this.info.type.split(",") : '';
  },
  mounted() {
  },
  methods: {
  },
  filters: {
    techType(n) {
      switch (n) {
        case "1":
          return "化妆";
        case "64":
          return "美睫";
        case "128":
          return "半永久";
        case "512":
          return "培训";
        case "2048":
          return "医美";
        case "2069":
          return "互动";
        default:
          return "化妆";
      }
    },
  },
}
</script>
<style lang="scss" scoped>
@import "../../../assets/css/mixin.scss";
.shop_box {
  width: 100%;
  margin-top: 1rem;
  padding: 2.4rem 1rem 0;
  background-color: #fff; // 组件公共样子
  .store_top {
    margin-bottom: 2.4rem;
    .portrait {
      border: 0.05rem solid #ddd;
      float: left;
      width: 6.6rem;
      height: 6.6rem;
      border-radius: 50%;
      background-position: center;
      background-size: contain;
      background-repeat: no-repeat;
    }
    .describe {
      position: relative;
      padding-left: 6.6rem;
      width: 100%;
      .left_box {
        min-height: 6.6rem;
        padding: 1rem 4.2rem 0 1rem;
        .person {
          margin-bottom: 1rem;
          .name {
            vertical-align: top;
            display: inline-block; // height: 1.5rem;
            line-height: 1.8rem;
            font-size: 1.6rem;
            color: #000;
            margin-right: 1rem;
          }
          span.grade {
            margin-left: 0.6rem;
            display: inline-block;
            @include wh(5rem, 1.6rem);
            @include sc(1.1rem, $bgWhite);
            box-sizing: border-box;
            padding-left: .3rem;
            line-height: 1.6rem;
            @include bis("../../../assets/image/icon/home/product_bg_grade.png");
          }
        } // 个人类型
        .quality .type {
          display: inline-block;
          border: 1px solid #999;
          height: 2rem;
          line-height: 2rem;
          padding: 0 1rem;
          border-radius: 1rem;
          font-size: 1.2rem;
          color: #999;
          margin-right: 0.6rem;
          margin-bottom: 0.4rem;
        } // 机构
        .quality .hospital {
          margin-left: -0.5rem;
          font-size: 1.2rem;
          color: #666;
        }
      }
      .right_box {
        position: absolute;
        top: 0;
        right: 0;
        min-height: 6.6rem;
        padding: 1.2rem 0 0 0;
        text-align: center;
        .approve {
          width: 5.1rem;
          vertical-align: top;
          margin-bottom: 0.5rem;
        }
        .examine {
          background-color: $themeRed;
          width: 4rem;
          height: 1.8rem;
          line-height: 1.8rem;
          font-size: 1.1rem;
          color: #000;
          text-align: center;
          border-radius: .4rem;
        }
      }
    }
    .address {
      position: relative;
      margin-top: 1.5rem;
      width: 100%;
      .add_icon {
        position: absolute;
        top: 0;
        left: 0;
        width: 1.8rem;
        vertical-align: top;
      }
      .add_more {
        display: inline-block;
        padding-left: 2.3rem;
        height: 1.8rem;
        line-height: 1.8rem;
        font-size: 1.3rem;
        color: #666;
      }
    }
  }
  .store_bottom {
    padding-bottom: 2.4rem;
    .store {
      margin: 0 auto;
      width: 12rem;
      height: 2.8rem;
      line-height: 2.6rem;
      border: .1rem solid #000;
      text-align: center;
      color: #000;
      font-size: 1.4rem;
      border-radius: .4rem;
      cursor: pointer;
    }
  }
  .people {
    width: 100%;
    height: 5rem;
    line-height: 5rem;
    border-top: 1px solid #ccc;
    font-size: 1.3rem;
    .people_left {
      float: left;
      img {
        width: 3rem;
        border-radius: 50%;
        vertical-align: middle;
        margin-right: 0.2rem;
      }
      .people_name {
        color: #666;
      }
    }
    .people_right {
      position: relative;
      float: right;
      padding-right: 2.2rem;
      .well {
        color: #000;
      }
      .go {
        position: absolute;
        right: 0.6rem;
        top: 1.8rem;
        width: 1.2rem;
        height: 1.3rem;
        background-size: cover;
        background: url("../../../assets/image/icon/detail/icon_next.png") no-repeat center;
      }
    }
  }
}
</style>
