<template>
  <div class="question_box">
    <div class="content">
      <img class="bg" src="/static/topic/beauty_down/questionnaire/bg1.jpg" alt="">
      <div class="question">
        <!--问卷题目-->
        <div class="option_box">
          <ul class="options">
            <li class="option">
              <p class="num">第1/5题</p>
              <img class="q_img" src="/static/topic/beauty_down/questionnaire/question1.png" alt="题目1">
              <ol>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
              </ol>
            </li>
            <li class="option">
              <p class="num">第2/5题</p>
              <img class="q_img" src="/static/topic/beauty_down/questionnaire/question2.png" alt="题目2">
              <ol>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
              </ol>
            </li>
            <li class="option">
              <p class="num">第3/5题</p>
              <img class="q_img" src="/static/topic/beauty_down/questionnaire/question3.png" alt="题目3">
              <ol>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
              </ol>
            </li>
            <li class="option">
              <p class="num">第4/5题</p>
              <img class="q_img" src="/static/topic/beauty_down/questionnaire/question4.png" alt="题目4">
              <ol>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
              </ol>
            </li>
            <li class="option">
              <p class="num">第5/5题</p>
              <img class="q_img" src="/static/topic/beauty_down/questionnaire/question5.png" alt="题目5">
              <div class="submit" v-show="submitBtn" @click="submitResult">
                <img src="/static/topic/beauty_down/questionnaire/btn_submit.png" alt="提交答案">
              </div>
              <ol>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
              </ol>
            </li>
          </ul>
        </div>
        <!--返回上题-->
        <div class="reback" @click="rebackUp">
          <img src="/static/topic/beauty_down/questionnaire/reback.png" alt="返回上题">
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Toast } from 'mint-ui';
import '../../../../node_modules/mint-ui/lib/toast/style.css';
import { setQuestionnaire, getMoreDraw } from "@/service/getData";
import { setStore, getStore } from "../../../common/store";
export default {
  name: "questionnaire",
  data() {
    return {
      n: '0', // 第几题
      answerList: [], // 选择的答案数组
      answer: ["A", "B", "C", "D"],
      index: '0',
      submitBtn: false, // 默认不显示提交答案按钮

      questionnaire: '', // 是否提交过问卷
    };
  },
  created() {
    this.questionnaire = getStore('questionnaire') ? getStore('questionnaire') : '';
    if(this.questionnaire == 'ok'){
      alert('您已提交过问卷，不用重复提交~');
      this.$router.push('./luckdraw'); // 重新调回到抽奖页面
      return
    }
  },
  mounted(){
    this.selectAnswer();
  },
  methods: {
    // 答案选择
    selectAnswer() {
      let _this = this;
      $(".options > li").on("click", "li", function() {
        $(this).addClass("active").siblings().removeClass("active");
        if(_this.n < 5){
          _this.n++;
        }
        if (_this.n < 5) { // 前4题
          _this.translate();
        }
        if (_this.n <= 5) {
          _this.index = $(this).index(); // 选择了第几个选项
          _this.answerList[_this.n - 1] = _this.n + '_' + _this.answer[_this.index];
          _this.submitBtn = _this.answerList.length >=5 ? true : false;
          console.log(_this.answerList.join(','));
        }
      });
    },
    // 滑动到下一题
    translate() {
      $(".options").css("-ms-transform", "translateX(-" + 34 * this.n + "rem)");
      $(".options").css("-moz-transform", "translateX(-" + 34 * this.n + "rem)");
      $(".options").css("-webkit-transform", "translateX(-" + 34 * this.n + "rem)");
      $(".options").css("-o-transform", "translateX(-" + 34 * this.n + "rem)");
      $(".options").css("transform", "translateX(-" + 34 * this.n + "rem)");
    },
    // 返回上题
    rebackUp() {
      this.n--;
      if (this.n < 0) {
        this.n = 0;
        return;
      }
      this.n = this.n >=4 ? 3 : this.n;
      this.translate();
    },

    // 提交问卷答案
    async submitResult(){
      if(this.answerList.length < 5){
        Toast({
          message: '部分题目未选择答案',
          duration: 1000,
          className: 'toast-tip'
        });
        return
      }else{
        let res = await setQuestionnaire({q_key: this.answerList.join(',')});
        if(res.status == "ok"){
          setStore('questionnaire', 'ok'); // 记录提交了问卷
          Toast({
            message: '问卷提交成功',
            duration: 200,
            className: 'toast-tip'
          });

          this.getMoreLuckdraw('paper');
        }
      }
    },

    /*增加获奖次数*/
    async getMoreLuckdraw(addType) {
      // type: gold为金币后增加，share为分享后增加，paper为问卷后增加
      let res = await getMoreDraw({type: addType});
      if(res.status == 'ok'){
        // 增加了一次抽奖机会
        alert("已完成问卷，已为您增加1次抽奖机会，马上抽奖吧~");
      }else { // 账号未登录
        alert(res.msg);
      }
      this.$router.push('./luckdraw'); // 重新调回到抽奖页面
    },

  },
  filters(){

  },
}
</script>
<style lang="scss" scoped>
.question_box {
  position: relative;
  .content {
    position: relative; // 背景
    .bg {
      width: 100%;
    } // 问卷内容
    .question {
      position: absolute;
      left: 0;
      top: 31.4%;
      width: 100%;
      padding: 0 5%;
      font-size: 0; // 问卷题目
      .option_box {
        position: relative;
        width: 100%;
        height: 35rem;
        overflow: hidden; // 每一题
        .options {
          width: 264rem;
          overflow: hidden;
          -webkit-transition: all 0.5s;
          -moz-transition: all 0.5s;
          -ms-transition: all 0.5s;
          -o-transition: all 0.5s;
          transition: all 0.5s;
          li.option {
            float: left;
            position: relative;
            width: 34rem;
            height: 34rem;
            font-size: 2rem;
            text-align: center;
            p {}
            .num {
              text-align: right;
              padding-right: 4rem;
              margin: 1rem 0 0.5rem 0;
              font-size: 1.4rem;
              line-height: 2rem;
              color: #B6B6B3;
            }
            .q_img {
              width: 80%;
            }
            // 提交答案
            .submit {
              cursor: pointer;
              margin: 0.8rem auto 0;
              width: 16rem;
              img {
                width: 100%;
              }
            }
            ol {
              position: absolute;
              left: 2rem;
              top: 9rem;
              width: 30rem;
              li {
                width: 100%;
                text-align: center;
                position: relative;
                margin-top: 2rem;
                height: 2.1rem;
                line-height: 2.1rem;
                cursor: pointer;
                &.active:after {
                  content: "";
                  width: 4.8rem;
                  position: absolute;
                  height: 3.68rem;
                  background: url('/static/topic/beauty_down/questionnaire/icon_selected.png') no-repeat center/cover;
                  right: 3rem;
                  top: 0.8rem;
                  margin-top: -1.8rem;
                }
              }
            } // 题目2
            &:nth-of-type(2) {
              ol {
                li {
                  &:nth-of-type(3) {
                    margin-top: 1rem;
                  }
                }
              }
            } // 题目3
            &:nth-of-type(3) {
              ol {
                li {
                  margin-top: 3.2rem;
                  &:nth-of-type(2) {
                    margin-top: 2.4rem;
                    height: 4.4rem;
                  }
                  &:nth-of-type(3) {
                    margin-top: 2.4rem;
                  }
                  &:nth-of-type(4) {
                    margin-top: 2.2rem;
                  }
                }
              }
            } // 题目4
            &:nth-of-type(4) {
              ol {
                li {
                  &:nth-of-type(4) {
                    margin-top: 1.8rem;
                    height: 3.6rem;
                  }
                }
              }
            } // 题目5
            &:nth-of-type(5) {
              ol {
                li {
                  margin-top: 2.6rem;
                  &:nth-of-type(1) {
                    margin-top: 3.1rem;
                  }
                  &:nth-of-type(4) {
                    margin-top: 2.3rem;
                  }
                }
              }
            }
          }
        }
      } // 返回上题
      .reback {
        margin-top: 2.2rem;
        margin-left: 0.5rem;
        width: 8rem;
        cursor: pointer;
        img {
          width: 100%;
        }
      }
    }
  }
}
</style>