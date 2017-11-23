<template>
    <div class="double-eleven">
        <div class="banner">
            <p class="Congratulate">亲爱的周小新</p>
            <p class="desc">
                你当前的排名为
                <span>25</span>
            </p>
            <p class="desc">
                你与第
                <span>24</span>
                还差
                <span>200</span>
                武力值,
            </p>
            <p class="desc">快去号令你的人马!</p>
            <p class="desc">快号令你的人马,帮你抢YSL!</p>
        </div>
        <div class="ranking">
            <img class="title" src="/static/topic/ysl/ranking.png" alt="">
            <div class="list-wrap">
                <div class="list" v-for="(item,i) in 50" :key="i">
                    <img class="icon_NO" :src="'/static/topic/ysl/icon_NO.'+i+'.png'" alt="" v-if="i<3">
                    <span class="number style" v-else-if="i<20">{{i + 1}}</span>
                    <span class="number" v-else>{{i + 1}}</span>
                    <span class="portrait"></span>
                    <span class="name">喵喵喵</span>
                    <span class="force">10000</span>
                </div>
            </div>
        </div>
        <router-link class="generate" to="/topic-ysl/p4">生成召集令</router-link>
    </div>
</template>
<script>
    export default {
        name: "ysl",
        data () {
            return {};
        },
        created () {},
        methods: {},
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

    .banner {
        background-image: url("/static/topic/ysl/bg_small.jpg");
        text-align: center;
        padding-bottom: 30px;
        background-size: 100% 100%;
        span {
            font-size: 20px;
            color: #cb1f1f;
            font-weight: bold;
        }
        .Congratulate {
            color: #fee9a8;
            padding: 23px 0 15px 0;
            font-size: 30px;
            text-shadow: 0 3px 4px #000;
            font-weight: 500;
        }
        .desc {
            color: #fff;
            font-size: 18px;
            text-shadow: 0 3px 4px #000;
            font-weight: 500;
        }
    }

    .ranking {
        border: 1px solid #000;
        margin: 30px 20px 80px 20px;
        .title {
            width: 220px;
            display: block;
            margin: 15px auto;
        }
    }

    .list-wrap {
        .list {
            display: flex;
            align-items: center;
            position: relative;
            padding: 10px 0;
            &:after {
                position: absolute;
                display: block;
                content: '';
                height: 1px;
                width: 100%;
                bottom: 0;
                background: #ddd;
            }
        }
        .number {
            margin: 0 15px;
            font-size: 13px;
            display: inline-block;
            width: 30px;
            height: 30px;
            line-height: 30px;
            text-align: center;
            border-radius: 50%;
            color: #666;
            &.style {
                background: #eee;
                border: 1px solid #ccc;
            }
        }
        .icon_NO {
            display: block;
            width: 32px;
            margin: 0 15px;
        }
        .portrait {
            display: inline-block;
            width: 40px;
            height: 40px;
            margin-right: 10px;
            background: #ddd;
            border-radius: 50%;
            background-size: cover;
            background-image: url("http://pic.qiaocat.com/upload/product/714aa40cd4aa3660af4ec26477b80d68.jpg");
        }
        .name {
            font-size: 13px;
        }
        .force {
            position: absolute;
            right: 15px;
            color: #d52121;
            font-size: 16px;
            font-weight: bold;
        }
    }

    .generate {
        position: fixed;
        width: 100%;
        height: 50px;
        line-height: 50px;
        color: #fee9a8;
        background: #000;
        font-size: 18px;
        text-align: center;
        bottom: 0;
        left: 0;
    }
</style>