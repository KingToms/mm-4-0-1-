<template>
    <router-view></router-view>
</template>
<script>
    export default {
        name: "test",
        data () {
            return {}
        },
        created () {
            this.preload(['http://mm.qiaocat.com/static/topic/beauty_down/luckdraw_3/share_1.jpg'])
        },
        methods: {
            /**
             * 预加载图片
             */
            preload (arr) {
                let newImages = [];
                for (let i = 0; i < arr.length; i++) {
                    newImages[i] = new Image();
                    newImages[i].src = arr[i];
                }
            }
        }
    }
</script>
<style>
    img.full {
        display: block;
        width: 100%;
    }
</style>