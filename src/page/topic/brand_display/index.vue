<template>
    <div class="main">
        <div @click="controlMuisc" style="z-index: 20; position: absolute; right: 18px; top: 18px; display: block; transform: rotate(0deg);">
            <svg version="1.0" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="24px" height="24px" viewBox="0 0 46 46" enable-background="new 0 0 46 46" xml:space="preserve">   <g>       <circle opacity="0.6" cx="23" cy="23" r="23"></circle>           <g>               <path fill="#ECECEC" d="M23,2c11.6,0,21,9.4,21,21s-9.4,21-21,21S2,34.6,2,23S11.4,2,23,2 M23,0C10.3,0,0,10.3,0,23s10.3,23,23,23 s23-10.3,23-23S35.7,0,23,0L23,0z"></path>           </g>       <path fill="#ECECEC" d="M27.5,7.3c0.6,1.1,0.8,2.4,1.6,3.4c0.9,1.5,2.1,2.8,3,4.3c0.6,1.1,1.3,2.2,1.4,3.4c0.4,1.6-0.1,3.4-0.9,4.8 c-0.8,0.7-1.1-0.4-0.9-1c0.1-0.9,0.2-1.8,0-2.7c-0.2-1.3-0.6-2.6-1.4-3.7c-0.7-0.8-1.5-2.5-2.8-2.1c-0.9,0.4-0.7,1.5-0.8,2.3 c-0.6,5-1.2,10.1-1.9,15.1c-0.3,2.1-2.3,3.3-4.1,4c-1.6,0.7-3.5,1-5.2,0.4c-1.6-0.4-3.2-1.8-3-3.5c0.1-2.1,1.8-3.8,3.8-4.4 c1.9-0.8,4.2-0.8,6.1,0.2c0.9,0.4,1.3-0.4,1.5-1.3c0.9-6.4,1.7-12.8,2.5-19.2C26.3,6.8,27.4,6.7,27.5,7.3L27.5,7.3z"></path>   </g>   <polygon class="mugine_audio_off" fill="#ECECEC" points="14,11.2 13.2,12.9 33.3,34.2 34.2,32.5 " style="display: none;"></polygon></svg>
        </div>
        <audio src="/static/topic/brand_display/music.mp3" autoplay="autoplay" loop="loop" id="audio"></audio>
        <div id="touch-test">
            <div class="box">
                <div class="page-box" v-for="(item,i) in pageNumber" :key="i" :class="{'slide-active':i===0}">
                    <div style="position: relative;">
                        <a href="JavaScript:;" @click="funHref" class="beautiful-small-city" v-if="i==pageNumber-1"></a>
                        <img class="full" :src="`/static/topic/brand_display/${i+1}.jpg`" alt="">
                    </div>
                </div>
            </div>
        </div>
        <img class="arrow arrow-1" src="/static/topic/brand_display/jiantou.png" alt="">
        <span class="index-number">{{pageIndex+1}}/{{pageNumber}}</span>
    </div>
</template>
<script>
    document.addEventListener('touchmove', function (e) {e.preventDefault()}, false);
    export default {
        name: "brandDisplay",
        data () {
            return {
                startClientY: 0,
                moveClientY: 0,
                touchHeight: 0,
                pageIndex: 0,
                pageNumber: 17,
                counter: 5000,
                interval: null,
            }
        },
        mounted () {
            this.startup(window.innerHeight);
            this.interval = setInterval(this.funInterval, this.counter);

            //原理是在微信易信执行Ready之前，先注册事件，所以放在所有请求的最前面
            document.addEventListener("WeixinJSBridgeReady", function () {
                audioAutoPlay('audio');//给个全局函数
            }, false);
            document.addEventListener('YixinJSBridgeReady', function () {
                audioAutoPlay('audio');//给个全局函数
            }, false);

            function audioAutoPlay (id) {
                //全局控制播放函数
                let audio = document.getElementById(id);
                let play = function () {
                    audio.play();
                    document.removeEventListener("touchstart", play, false);
                };
                audio.play();
                document.addEventListener("touchstart", play, false);
            }

            let isAppInside = /micromessenger/i.test(navigator.userAgent.toLowerCase()) || /yixin/i.test(navigator.userAgent.toLowerCase());
            if (!isAppInside) {//给非微信易信浏览器
                audioAutoPlay();
            }
        },
        methods: {
            funHref () {
                alert('链接还没有');
            },
            funInterval () {
                clearInterval(this.interval);
                if (++this.pageIndex > this.pageNumber - 1) this.pageIndex = 0;
                this.counter = (this.pageIndex >= this.pageNumber - 1) ? 8000 : 5000;
                this.funSetClass(this.pageIndex);
                this.interval = setInterval(this.funInterval, this.counter);
            },
            funSetClass (index) {
                let prevIndex = index - 1;
                let activeIndex = index;
                let nextIndex = index + 1;
                let pageBox = $('.page-box');
                if (nextIndex === this.pageNumber) {
                    nextIndex = 0;
                }
                $('.page-box.slide-prev').removeClass('slide-prev');
                $('.page-box.slide-next').removeClass('slide-next');
                if (index === 0)
                    pageBox.eq(this.pageNumber - 1).attr('class', 'page-box slide-prev');
                (prevIndex >= 0) && pageBox.eq(prevIndex).attr('class', 'page-box slide-prev');
                pageBox.eq(activeIndex).attr('class', 'page-box slide-active');
                pageBox.eq(nextIndex).attr('class', 'page-box slide-next');
            },
            startup (height) {
                let el = document.getElementById("touch-test");

                el.addEventListener("touchstart", e => {
                    clearInterval(this.interval);
                    this.startClientY = e.touches[0].pageY;
                }, false);

                el.addEventListener("touchmove", e => {
                    this.moveClientY = Math.floor(((e.touches[0].clientY - this.startClientY) / height) * 100);
                }, false);

                el.addEventListener("touchend", (e) => {
                    if (this.moveClientY <= -10 || this.moveClientY >= 10) {
                        if (this.moveClientY >= 0) {
                            if (this.pageIndex < 1) return false;
                            if (--this.pageIndex < 0) {
                                this.pageIndex = this.pageNumber - 1;
                            }
                        } else {
                            if (this.pageIndex >= this.pageNumber - 1) return false;
                            if (++this.pageIndex > this.pageNumber - 1) {
                                this.pageIndex = 0;
                            }
                        }
                        this.funSetClass(this.pageIndex);
                    }
                    this.moveClientY = 0;
                    this.interval = setInterval(this.funInterval, this.counter);
                }, false);
            },
            controlMuisc () {
                let audioMp3 = document.getElementById('audio');
                if (audioMp3.paused) {
                    audioMp3.play();
                    $(".mugine_audio_off").css("display", "none");
                } else {
                    audioMp3.pause();
                    $(".mugine_audio_off").css("display", "block");
                }
            }
        },
    }
</script>
<style lang="scss" scoped>
    @import '../../../assets/css/mixin.scss';

    img.full {
        width: 100%;
    }

    .main, .page-container, #touch-test {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
    }

    #touch-test {
        overflow: hidden;
        img {
            display: block;
        }
        .box {
            height: 100%;
        }
        .page-box {
            position: absolute;
            height: 100%;
            top: 100%;
            left: 0;
            background: #fff;

            &.slide-prev {
                top: -100%;
                transition: top 1s;
                z-index: 8;
            }
            &.slide-active {
                top: 0;
                transition: top 1s;
                z-index: 10;
            }
            &.slide-next {
                top: 100%;
                transition: top 1s;
                z-index: 8;
            }
        }
    }

    /*绘制箭头动画*/

    .arrow {
        width: 32px;
        position: absolute;
        left: 50%;
        bottom: 0;
        transform-origin: 50% 50%;
        transform: translate3d(-50%, -50%, 0);
        z-index: 20;
    }

    .arrow-1 {
        animation: arrow-movement 2s ease-in-out infinite;
    }

    @keyframes arrow-movement {
        0% {
            opacity: 0;
            bottom: -10px;
        }
        70% {
            opacity: 1;
        }
        100% {
            opacity: 0;
        }
    }

    .beautiful-small-city {
        position: absolute;
        display: inline-block;
        width: 80%;
        height: 12%;
        left: 10%;
        top: 74%;
    }

    .index-number {
        position: absolute;
        right: 5px;
        bottom: 5px;
        color: #fff;
        font-weight: bold;
        z-index: 20;
        text-shadow: 1px 1px 0 #000;
    }
</style>