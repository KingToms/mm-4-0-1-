<template>
    <div class="tab-win">
        <marquee direction="up" scrolldelay="200" loop="-1" class="txt-tips" v-if="items.length">
            <p v-for="(item,i) in items" :key="i">恭喜 {{item['user_name']}} 获得 {{item['prize_name']}}</p>
        </marquee>
        <img src="/static/topic/beauty_down/index/web/tab_win.png" alt="" class="full">
    </div>
</template>
<script>
    import {topicThreeYearAquser} from "@/service/getData";

    export default {
        data () {
            return {
                items: []
            };
        },
        mounted () {

        },
        created () {
            this.funTopicThreeYearAquser();
        },
        methods: {
            /**
             * 俏猫-专题三周获奖用户列表
             */
            async funTopicThreeYearAquser () {
                let res = await topicThreeYearAquser();
                if (res.status === 'ok') {
                    this.items = res.data;
                }
            },
        },
    }
</script>
<style lang="scss" scoped>
    @import '../../../assets/css/mixin.scss';

    .tab-win {
        overflow: hidden;
        position: fixed;
        top: 0;
        width: 70%;
        left: 15%;
        z-index: 10;
        .txt-tips {
            position: absolute;
            top: 5px;
            left: 7.5%;
            width: 85%;
            height: 65%;
            text-align: center;
            p {
                color: #fff;
                font-size: 12px;
                font-weight: 700;
                overflow: hidden;
                text-overflow:ellipsis;
                white-space: nowrap;
                @include lineHeight(40px);
            }
        }
    }
</style>