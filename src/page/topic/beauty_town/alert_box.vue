<template>
    <div class="alter-wrap" v-if="brandShowBox.status">
        <div class="alter">
            <img class="congrats" src="/static/topic/beauty_down/index/web/congrats.png" alt="" v-if="brandShowBox.title">
            <img class="full" src="/static/topic/beauty_down/index/web/box_head.png" alt="" style="margin-top: -2.5%;">
            <div class="items-img">
                <div v-if="brandShowBox.images.length>1">
                    <img src="/static/topic/beauty_down/index/web/arrow_left.png" alt="" class="arrow arrow_left" @click.stop="arrowLeft">
                    <img src="/static/topic/beauty_down/index/web/arrow_right.png" alt="" class="arrow arrow_right" @click.stop="arrowRight">
                </div>
                <ul class="clear" id="touch-test">
                    <img :src="brandShowBox.images[0]" alt="" style="opacity: 0">
                    <li v-for="(item,i) in brandShowBox.images" :key="i" :class="{on:i===pageIndex}">
                        <img :src="item" alt="" class="full">
                    </li>
                </ul>
                <p class="show-page" v-if="brandShowBox.images.length>1">{{pageIndex+1}}/{{brandShowBox.images.length}}</p>
                <a :href="brandShowBox.href" class="click-check" v-if="brandShowBox.isBtn">点击查看</a>
            </div>
            <img class="full" src="/static/topic/beauty_down/index/web/box_end.png" alt="">
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
                    title: true,
                    isBtn: true,
                    href: '',
                    images: []
                }
            }
        },
        data () {
            return {
                pageIndex: 0,
                startClientX: 0,
                moveClientX: 0
            };
        },
        mounted () {

        },
        created () {

        },
        methods: {
            callMethod () {
                this.pageIndex = 0;
                this.startClientX = 0;
                this.moveClientX = 0;
                this.$nextTick(function () {
                    this.brandShowBox.images.length > 1 && this.startup();
                });
            },
            arrowLeft () {
                if (--this.pageIndex < 1)
                    this.pageIndex = this.brandShowBox.images.length - 1;
            },
            arrowRight () {
                let len = this.brandShowBox.images.length - 1;
                if (++this.pageIndex > len)
                    this.pageIndex = 0;
            },
            /**
             * 滑动切换图片
             */
            startup () {
                let el = document.getElementById("touch-test");
                el.addEventListener("touchstart", e => {
                    this.startClientX = e.touches[0].pageX;
                }, false);

                el.addEventListener("touchmove", e => {
                    this.moveClientX = Math.floor(((e.touches[0].clientX - this.startClientX) / el.clientWidth) * 100);
                }, false);

                el.addEventListener("touchend", (e) => {
                    if (this.moveClientX <= -10 || this.moveClientX >= 10) {
                        if (this.moveClientX >= 0)
                            this.arrowLeft();
                        else
                            this.arrowRight();
                    }
                }, false);
            },
            /**
             * 关闭弹窗
             */
            funCloseAlert () {
                if (this.brandShowBox.title)
                    this.$emit('childMethod');
                this.brandShowBox.status = false;
            }
        },
    }
</script>
<style lang="scss" scoped>
    @import '../../../assets/css/mixin.scss';

    .show-page {
        text-align: right;
        margin-right: 6%;
        color: #2f2f2f;
    }

    .alter-wrap {
        ul {
            li {
                position: absolute;
                top: 0;
                left: 0;
                z-index: 10;
                margin-right: 1.3%;
                &.on {
                    z-index: 12;
                }
            }
        }
        .click-check {
            @include lineHeight(34px);
            display: inline-block;
            width: 40%;
            font-size: 14px;
            color: #ff9696;
            margin-top: 10px;
            border: 1px solid #ff9696;
            border-radius: 8px;
        }
        .alter {
            position: fixed;
            padding: 20px;
            width: 90%;
            left: 5%;
            top: 50%;
            z-index: 30;
            text-align: center;
            transform: translateY(-50%);
        }
        .congrats {
            position: relative;
            width: 85%;
            margin: 0 auto;
        }
        .items-img {
            position: relative;
            width: 100%;
            background-size: 100%;
            background-image: url("/static/topic/beauty_down/index/web/1px.png");
            img {
                width: 90%;
                display: block;
                margin: 0 auto;
            }
            .arrow {
                position: absolute;
                width: 25px;
                top: 50%;
                z-index: 100;
                transform: translateY(-50%);
            }
            .arrow_left {
                left: 10px;
            }
            .arrow_right {
                right: 5%;
            }
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