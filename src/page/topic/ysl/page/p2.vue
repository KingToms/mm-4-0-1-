<template>
    <div class="double-eleven">
        <div class="banner">
            <p class="Congratulate">恭喜你</p>
            <p class="desc">成功参与争夺赛并获得50武力值</p>
            <p class="desc">快号令你的人马,帮你抢YSL!</p>
        </div>
        <div class="btn-wrap">
            <router-link class="ysl-btn" to="/topic-ysl/p4">生成召集令</router-link>
            <router-link class="ysl-btn" to="/topic-ysl/p3">查看我排名</router-link>
        </div>
        <div class="ranking">
            <img class="title" src="/static/topic/ysl/ranking.png" alt="">
            <div class="list-wrap">
                <div class="list" v-for="(item,i) in items" :key="i">
                    <img class="icon_NO" :src="'/static/topic/ysl/icon_NO.'+i+'.png'" alt="" v-if="i<3">
                    <span class="number style" v-else-if="i<20">{{i + 1}}</span>
                    <span class="number" v-else>{{i + 1}}</span>
                    <span class="portrait" :style="{'background-image': 'url('+item.avatar+')'}"></span>
                    <span class="name">{{item.nickname}}</span>
                    <span class="force">{{item.force_value}}</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import {yslIndex} from "@/service/getData";

    export default {
        name: "ysl",
        data () {
            return {
                items: {}
            };
        },
        created () {
            this.funYslIndex();
        },
        methods: {
            async funYslIndex () {
                let res = await yslIndex();
                console.log(res);
                if (res.status === 'ok') {
                    this.items = res.data;
                } else {
                    alert(res.msg);
                    if (res.code === 100) {
                        // 跳到自己排行榜
                        this.$router.push('/topic-ysl/p3');
                    } else if (res.code === 300) {
                        // 跳到参与活动页面
                        this.$router.push('/topic-ysl');
                    }
                }
            },
        }
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
        .Congratulate {
            color: #fee9a8;
            padding: 30px 0 20px 0;
            font-size: 30px;
            text-shadow: 0 3px 4px #000;
            font-weight: 500;
        }
        .desc {
            color: #fff;
            font-size: 16px;
            text-shadow: 0 3px 4px #000;
            font-weight: 500;
        }
    }

    .btn-wrap {
        margin: 15px 20px;
        display: flex;
        justify-content: space-between;
        .ysl-btn {
            width: 45%;
            height: 44px;
            color: #fee9a8;
            line-height: 44px;
            font-size: 18px;
            text-align: center;
            background: #000;
        }
    }

    .ranking {
        border: 1px solid #000;
        margin: 0 20px 30px 20px;
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
        }
        .force {
            position: absolute;
            right: 15px;
            color: #d52121;
            font-size: 16px;
            font-weight: bold;
        }
    }
</style>