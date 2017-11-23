<template>
    <div class="double-eleven">
        <img class="full" src="/static/topic/ysl/bg_poster1.jpg" alt="">
        <div class="form">
            <input type="text" class="border mobile" placeholder="请输入手机号码">
            <div class="clear get-code-wrap">
                <input type="text" class="border code" placeholder="验证码">
                <div class="get-code">获取验证码</div>
            </div>
            <div class="participate" @click="funParticipate">参与</div>
            <img class="full rule" src="/static/topic/ysl/rule.png" alt="">
        </div>
    </div>
</template>
<script>
    import {userIsLogin, authToken, getCenterCoupons} from "@/service/getData";

    export default {
        name: "ysl",
        data () {
            return {};
        },
        created () {},
        methods: {
            funParticipate () {
                this.$router.push('/topic-ysl/p2');
            }
        },
        components: {}
    }
</script>
<style lang="scss" scoped>
    .clear:after {
        content: '';
        display: block;
        clear: both;
    }

    img.full {
        width: 100%;
    }

    input.border {
        border: 1px solid #000;
        height: 44px;
        text-indent: 15px;
        font-size: 16px;
        color: #999;
    }

    .form {
        margin: 20px;

        .mobile {
            width: 100%;
        }
        .get-code-wrap {
            padding-top: 10px;
            .code {
                width: 60%;
                float: left;
            }
            .get-code {
                width: 35%;
                float: right;
                background: #000;
                height: 44px;
                line-height: 44px;
                font-size: 16px;
                color: #ccc;
                text-align: center;
            }
        }
        .participate {
            margin-top: 10px;
            height: 44px;
            text-align: center;
            line-height: 44px;
            color: #fee9a8;
            font-size: 18px;
            background: #000;
        }
        img.rule {
            margin: 30px 0 45px 0;
        }
    }

</style>