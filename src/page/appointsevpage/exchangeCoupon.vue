<template>
    <div class="exchangewrap">
        <div>
            <div class="header">
                <a  href="javascript:void(0);" @click="$router.go(-1)" class="left"></a>
                <p>兑换抵扣券</p>
            </div>
            <div class="content">
                <img src="../../../static/icon/appointment/newcouponcard_03.png" alt="">
                <p>体验码位于体验卡反面的涂层处,如图所示.</p>
                <input v-model="sn" type="text" placeholder="请输入体验码">
                <div style="width:100%">
                    <button @click="getCoupon">兑换</button>
                </div>
                <div class="tips_msg" v-if="ismsg">{{errorMsg}}</div>
            </div>
        </div>
    </div>
</template>

<script>
import store from '../../vuex/store';
import {qcsCouponSend,userIsLogin} from '../../service/getData'
import Vue from 'vue';
import keyConf from '../../common/keyConf'
import common from "../../common/common"
export default {
    name:'exchangeCoupon',
    data(){
        return{
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
                window.location.href = `/login?action=login`;
                let baseurl='/login?url=/topic-watsons/coupon'
                this.$router.push(baseurl)
            }else{
                let obj={
                    sn:_this.sn
                }
                let res=await qcsCouponSend(obj);
                if(res.status=="ok"){
                    _this.ismsg=false;
                    alert("您获得一张优惠券请前往消费");
                    window.location.href='/appointsev/index';
                }else{
                    _this.ismsg=true;
                    _this.errorMsg=res.msg;
                }
                if(_this.sn==""){
                    _this.errorMsg="优惠码不能为空";
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
@import '../../assets/css/mixin.scss';
.left {
    position: absolute;
    @include wh(3.2rem, 3.2rem);
    @include bis("../../../src/assets/image/icon/detail/details_btn_return02.png");
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
        margin-bottom: 2rem;
    }
    .tips_msg{
       font-size: 1.7rem; 
       text-align: center
    }
}

</style>


