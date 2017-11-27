<template>
    <div class="double-eleven">
        <div class="banner">
            <div class="text">
                <p>支持成功!</p>
                <p>好友获得武力值 30</p>
            </div>
            <img class="full" src="/static/topic/ysl/bg_poster2.jpg" alt="">
        </div>
        <div class="form">
            <router-link class="participate" to="/topic-ysl">我也参与</router-link>
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

    .banner {
        position: relative;
        p {
            color: #fff;
            font-size: 1.7rem;
        }
        .text {
            text-align: center;
            position: absolute;
            bottom: 2.9rem;
            left: 1.9rem;
        }
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
            display: block;
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