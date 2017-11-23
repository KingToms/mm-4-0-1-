<template>
    <div class="double-eleven">
        <img class="full" src="/static/topic/ysl/bg_share.jpg" alt="">
        <div class="tips">
            <div>
                <p>长按保存图片,分享至朋友圈</p>
                <p>邀请好友帮你增加武力值</p>
            </div>
        </div>
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
    canvas {
        background: #000;
    }

    .clear:after {
        content: '';
        display: block;
        clear: both;
    }

    img.full {
        width: 100%;
    }

    .tips {
        position: relative;
        text-align: center;
        margin: 30px 20px 0 20px;
        font-size: 1.7rem;
        div {
            position: relative;
            padding: 0 20px;
            display: inline-block;
            background: #fff;
            z-index: 1;
        }
        &:before {
            position: absolute;
            display: block;
            content: '';
            top: 50%;
            left: 0;
            width: 100%;
            height: 1px;
            background: #000;
        }
    }
</style>