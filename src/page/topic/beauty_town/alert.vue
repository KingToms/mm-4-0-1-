<template>
    <div class="alter-wrap" v-if="brandShowBox.status">
        <div class="alter">
            <!--<div class="items-img">
                <img src="/static/topic/beauty_down/index/brand/10/1-新浪图书馆.jpg" alt="" class="full">
            </div>-->
            <img class="full" src="/static/topic/beauty_down/index/web/getGold.png" alt="">
            <img src="/static/topic/beauty_down/index/web/icon_x.png" alt="" class="icon-x" @click="funCloseAlert">
        </div>
        <div class="alert-mask"></div>
    </div>
</template>
<script>
    export default {
        props: {
            // 是否显示弹窗
            brandShowBox: {
                type: Object,
                default: {
                    status: false,
                    images: []
                }
            }
        },
        data () {
            return {};
        },
        created () {
        },
        methods: {
            /**
             * 关闭弹窗
             */
            funCloseAlert () {
                this.brandShowBox = false;
            }
        },
    }
</script>
<style lang="scss" scoped>
    @import '../../../assets/css/mixin.scss';

    .alter-wrap {
        .alter {
            position: fixed;
            padding: 20px;
            width: 90%;
            left: 5%;
            top: 20%;
            z-index: 30;
            text-align: center;
        }
        .items-img {
            position: absolute;
            top: 16%;
            left: 9.5%;
            width: 80%;
            height: 55%;
            background: #bdbdbd;
        }
        .icon-x {
            width: 40px;
            display: block;
            margin: 0 auto;
            margin-top: 10px;
        }

        .alert-mask {
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            position: fixed;
            background: rgba(0, 0, 0, 0.5);
            z-index: 20;
        }
    }
</style>