<template>
    <div class="exchangewrap">
        <div>
            <div class="header">
                <a  href="javascript:void(0);" @click="$router.go(-1)" class="left"></a>
                <p>兑换抵扣券</p>
            </div>
            <div class="content">
                <img id="img" src="../../../../static/icon/appointment/newcouponcard_04.png" alt="">
                <p>尊享码位于福利卡反面的涂层处，请刮开获取。</p>
                <input v-model="sn" type="text" placeholder="请输入尊享码">
                <div style="width:100%">
                    <button @click="getCoupon">兑换</button>
                </div>
                <div class="" style="text-align:center;margin:0 auto;height:2rem;color:#6e8feb;font-size:1.5rem;" @click="$router.push('/topic-watsons/index')">已兑换快去消费吧>> </div>
                <div class="tips_msg" style="margin:0 auto;line-height:4.4rem;" v-if="ismsg">{{errorMsg}}</div>
            </div>
        </div>
        <div class="msg-box" v-if="isshowmsg">
            <div class="msg-title">提示信息</div>
            <div class="msg-cont">{{errorMsg}}</div>
            <div>
                <button @click="isshowmsg=false">否</button>
                <button @click="isshowmsg=false">是</button>
            </div>
            
        </div>
        <div class="mask-box" v-if="isshowmsg"></div>
    </div>
</template>

<script>
import store from '../../../vuex/store';
import {qcsGhCouponSend,userIsLogin} from '../../../service/getData'
import Vue from 'vue';
import keyConf from '../../../common/keyConf'
import common from "../../../common/common"
export default {
    name:'exchangeCoupon',
    data(){
        return{
            isshowmsg:false,
             coupon_id:'',
             sn:'',
             errorMsg:"",
             ismsg:false,
             appOpen:false,
        }
    },
    created(){
        /*判断是否在APP打开*/
        if (common.getQueryString("app") == "ios" || common.getQueryString("app") == "android") {
            this.appOpen = true; // 页面是在APP中打开
        }
    },
    store,
    mounted(){
        this.$store.commit("changefoot","none");
    },
    methods:{
        async getCoupon(){
            let qm_cookie = $.cookie(keyConf.qm_cookie);
            let isLogin = await userIsLogin();
            let _this=this
            if(!qm_cookie || isLogin.status == 'error'){
                let baseurl='/login?url=/topic-watsons/coupon';
                // window.location.href = `/login?action=login`;
                window.location.href = baseurl;
                this.$router.push(baseurl)
            }else{
                let obj={
                    sn:_this.sn
                }
                let res=await qcsGhCouponSend(obj);
                if(res.status=="ok"){
                    _this.ismsg=false;
                    alert("您获得一张优惠券请前往消费");
                    window.location.href='/topic-watsons/index';
                }else{
                    _this.ismsg=true;
                    _this.errorMsg=res.msg;
                    // _this.isshowmsg=true
                }
                if(_this.sn==""){
                    _this.ismsg=true;
                    _this.errorMsg="尊享码不能为空";
                    // _this.isshowmsg=true
                }
            }
        },
        getdata(){
            console.log(1)
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../../../assets/css/mixin.scss';
.exchangewrap{
    position: relative;
}
.mask-box {
    animation: fadeIn .1s;
    position: fixed;
    width: 100%;
    top: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 11;
}
.msg-box {
    animation: fadeIn 1s;
    position: absolute;
    height: 9rem;
    width: 60%;
    top: 30%;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    z-index: 50;
    transform: translateY(-50%);
    border-radius: .2rem;
    overflow: hidden;
    background-color: #fff;
    .msg-title{
        text-align: center;
        font-size: 2rem;
        // font-weight: bold;
        line-height: 4rem;
    }
    .msg-cont{
        text-align: center;
        line-height: 2rem;
        font-size: 1.3rem;
    }
    div{
        display: flex;
        justify-content: space-around;
    }
    button{
        line-height: 3rem;
        font-size: 1.5rem;
        width: 45%;
        background-color: #fff;
    }
}
.left {
    position: absolute;
    @include wh(3.2rem, 3.2rem);
    @include bis("../../../../src/assets/image/icon/detail/details_btn_return02.png");
    left: 1.2rem;
    top: 0.3rem;
}
.header{
    @include wh(100%,4.9rem);
    background-color: #fff;
    position: relative;
    p{
        line-height: 4.9rem;
        font-weight: bold;
        font-size: 2rem;
        text-align: center;
    }
    a{
        position: absolute;
        font-size: 3rem;
        left: .5rem;
    }
}
.content{
    width: 100%;
    padding:0 1rem;
    img{
        width: 100%;
        margin: 2.25rem 0 0;
    }
    p{
        line-height: 4rem;
        font-size: 1.5rem;
    }
    input{
        outline: none;
        appearance: none;
        -webkit-appearance: none; 
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        @include wh(95%,4rem);
        text-indent: 1rem;
        border: 1px solid #ccc;
        font-size: 1.5rem;
        border-radius: 3px;
    }
    button{
        @include wh(100%,100%);
        // background-color: #c9c9c9;
        background-color: #e70034 ;
        color: #fff;
        font-size: 1.5rem;
        border-radius: .4rem;
        letter-spacing: 2px;
    }
    div{
        width: 100%;
        height: 4.4rem;
        padding: 0 2.5rem;
        margin-top: 3rem;
        margin-bottom: 1.5rem;
    }
    .tips_msg{
       font-size: 1.7rem; 
       text-align: center
    }
}

</style>


