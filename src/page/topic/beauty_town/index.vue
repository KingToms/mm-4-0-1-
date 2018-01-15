<template>
    <div id="topic-main">
        <img :src="`/static/topic/beauty_down/index/web/${(bgmStatus)?'':'un_'}music_icon.png`" alt="" class="bgm" @click="funBGM">
        <img src="/static/topic/beauty_down/index/web/icon_rule.png" alt="" class="icon-rule" @click="funShowRule">
        <img src="/static/topic/beauty_down/index/web/tab_top.png" alt="" class="top-mask">
        <tabWin></tabWin>
        <img src="/static/topic/beauty_down/index/web/clickMe.png" alt="" class="click-me" v-if="getGoldItem.length>=10">
        <div class="footer-box">
            <div class="left-box">
                <div class="portrait">
                    <img :src="localData.wechat_avatar" alt="">
                </div>
                <div class="gold-number">
                    <div class="number-box">
                        <img :src="`/static/topic/beauty_down/index/web/${item}.png`" alt="" class="number" v-for="(item,i) in getGoldItem.length.toString()" :key="i">
                    </div>
                    <img src="/static/topic/beauty_down/index/web/tab_gold.png" alt="" class="tab-gold">
                </div>
            </div>
            <img :src="`/static/topic/beauty_down/index/web/logo${(getGoldItem.length>9)?'_1':''}.png`" alt="" class="logo" @click="funClick">
        </div>
        <brandShow :brandShowBox="brandShowBox" ref="child" v-on:childMethod="funCalcGoldNumber"></brandShow>
        <div class="alter-wrap" v-if="alertBox">
            <div class="alter">
                <router-link to="/topic-beauty-town/luckdraw" class="luck-draw" v-if="alertImg==='/static/topic/beauty_down/index/web/gold_10.png'"></router-link>
                <img class="full" :src="alertImg" alt="">
                <img src="/static/topic/beauty_down/index/web/icon_x.png" alt="" class="icon-x" @click="funCloseAlert">
            </div>
            <div class="alert-mask"></div>
        </div>
        <!--抽过奖或没有抽奖次数的弹窗-->
        <div class="alter-wrap" v-if="nono">
            <div class="alter">
                <div class="img-wrap">
                    <img class="full" src="/static/topic/beauty_down/index/brand/0.jpg" alt="">
                    <p>您已花光所有抽奖机会</p>
                </div>
                <img src="/static/topic/beauty_down/index/web/icon_x.png" alt="" class="icon-x" @click="nono = false">
            </div>
            <div class="alert-mask"></div>
        </div>
        <div class="block-img">
            <img src="/static/topic/beauty_down/index/web/gold.gif" alt="" class="gold-img gold-13" v-if="getGoldItem.indexOf(13)<0" @click="funGetGold(13)">
            <img src="/static/topic/beauty_down/index/3years_01.png" alt="" class="full box-bg">
        </div>
        <div class="block-img">
            <img src="/static/topic/beauty_down/index/web/gold.gif" alt="" class="gold-img gold-12" v-if="getGoldItem.indexOf(12)<0" @click="funGetGold(12)">
            <img src="/static/topic/beauty_down/index/web/gold.gif" alt="" class="gold-img gold-11" v-if="getGoldItem.indexOf(11)<0" @click="funGetGold(11)">
            <img src="/static/topic/beauty_down/index/web/gold.gif" alt="" class="gold-img gold-10" v-if="getGoldItem.indexOf(10)<0" @click="funGetGold(10)">
            <img src="/static/topic/beauty_down/index/3years_02.png" alt="" class="full box-bg">
        </div>
        <div class="block-img">
            <img src="/static/topic/beauty_down/index/web/gold.gif" alt="" class="gold-img gold-14" v-if="getGoldItem.indexOf(14)<0" @click="funGetGold(14)">
            <img src="/static/topic/beauty_down/index/web/gold.gif" alt="" class="gold-img gold-9" v-if="getGoldItem.indexOf(9)<0" @click="funGetGold(9)">
            <img src="/static/topic/beauty_down/index/web/gold.gif" alt="" class="gold-img gold-8" v-if="getGoldItem.indexOf(8)<0" @click="funGetGold(8)">
            <img src="/static/topic/beauty_down/index/web/gold.gif" alt="" class="gold-img gold-7" v-if="getGoldItem.indexOf(7)<0" @click="funGetGold(7)">
            <img src="/static/topic/beauty_down/index/3years_03.png" alt="" class="full box-bg">
        </div>
        <div class="block-img">
            <img src="/static/topic/beauty_down/index/web/gold.gif" alt="" class="gold-img gold-6" v-if="getGoldItem.indexOf(6)<0" @click="funGetGold(6)">
            <img src="/static/topic/beauty_down/index/web/gold.gif" alt="" class="gold-img gold-5" v-if="getGoldItem.indexOf(5)<0" @click="funGetGold(5)">
            <img src="/static/topic/beauty_down/index/web/gold.gif" alt="" class="gold-img gold-4" v-if="getGoldItem.indexOf(4)<0" @click="funGetGold(4)">
            <img src="/static/topic/beauty_down/index/3years_04.png" alt="" class="full box-bg">
        </div>
        <div class="block-img">
            <img src="/static/topic/beauty_down/index/web/gold.gif" alt="" class="gold-img gold-3" v-if="getGoldItem.indexOf(3)<0" @click="funGetGold(3)">
            <img src="/static/topic/beauty_down/index/web/gold.gif" alt="" class="gold-img gold-2" v-if="getGoldItem.indexOf(2)<0" @click="funGetGold(2)">
            <img src="/static/topic/beauty_down/index/web/gold.gif" alt="" class="gold-img gold-1" v-if="getGoldItem.indexOf(1)<0" @click="funGetGold(1)">
            <img src="/static/topic/beauty_down/index/3years_05.png" alt="" class="full box-bg">
        </div>
        <div class="block-img">
            <img src="/static/topic/beauty_down/index/3years_06.png" alt="" class="full box-bg">
        </div>
        <img src="/static/topic/beauty_down/index/web/tab_1.png" alt="" class="full tab-1" name="end">
    </div>
</template>
<script>
    import tabWin from './winning_list'
    import brandShow from './alert'
    import {getWechatCode, WechatLogin, topicThreeYearAquser, topicThreeGetGold, topicThreeGoldList} from "@/service/getData";
    import commonJS from '../../../common/common.js'

    export default {
        name: "brandDisplay",
        data () {
            return {
                localData: {
                    'wechat_id': '',
                    'wechat_avatar': '',
                    'wechat_nickname': ''
                },
                luckDrawNum: {
                    'be_num': null,
                    'in_num': null
                },
                brandShowBox: {
                    status: false,
                    title: false,
                    isBtn: true,
                    href: '',
                    images: [],
                },
                nono: false,
                alertBox: true,
                getGoldItem: [], // 获得的金币
                bgmStatus: true,
                bgMusic: new Audio(),
                goldMusic: new Audio(),
                alertImg: '/static/topic/beauty_down/index/web/synopsis.png'
            }
        },
        mounted () {
            let _this = this;
            this.$nextTick(function () {
                let goldImg = document.getElementsByClassName('box-bg');
                console.log(goldImg);
                let goldImgNum = goldImg.length;
                for (let i = 0; i < goldImg.length; i++) {
                    goldImg[i].onload = () => {
                        if (!--goldImgNum) {
                            let topicMain = document.getElementById('topic-main');
                            setTimeout(() => {
                                $('html,body').scrollTop(topicMain.scrollHeight);
                                topicMain.style.opacity = '1';
                            }, 2000);
                        }
                    }
                }

                this.bgMusic.src = '/static/topic/beauty_down/index/3years-bgm.mp3';
                this.goldMusic.src = '/static/topic/beauty_down/index/getGoldMusic.mp3';
                this.bgMusic.loop = 'loop';
                this.bgMusic.play();
                /**
                 * 原理是在微信易信执行Ready之前，先注册事件，所以放在所有请求的最前面
                 * 给个全局函数
                 */
                document.addEventListener("WeixinJSBridgeReady", function () {
                    audioAutoPlay('audio');
                }, false);
                document.addEventListener('YixinJSBridgeReady', function () {
                    audioAutoPlay('audio');
                }, false);

                /**
                 * 全局控制播放函数
                 */
                function audioAutoPlay () {
                    let play = function () {
                        _this.bgMusic.play();
                        document.removeEventListener("touchstart", play, false);
                    };
                    _this.bgMusic.play();
                    document.addEventListener("touchstart", play, false);
                }

                let isAppInside = /micromessenger/i.test(navigator.userAgent.toLowerCase()) || /yixin/i.test(navigator.userAgent.toLowerCase());
                if (!isAppInside) {
                    audioAutoPlay();//给非微信易信浏览器
                }
            });
        },
        created () {
            this.localData = JSON.parse(localStorage.getItem('localData'));
            // 如果有微信ID,测不用再次授权
            if (this.localData) {
                this.funWechatLogin();
                this.funTopicThreeYearAquser();
                this.funTopicThreeGoldList();
            } else {
                // 没有微信ID,则获取微信code进行授权
                this.funGetWechatCode();
            }
        },
        methods: {
            /**
             * 获取微信code
             */
            async funGetWechatCode () {
                let res = await getWechatCode({redirectURI: 'http://mm.qiaocat.com/topic-beauty-town'});
                console.log(res);
                if (res.status === 'ok') {
                    location.href = res.url;
                }
            },
            /**
             * 微信code绑定
             */
            async funWechatLogin () {
                let res = await WechatLogin({code: commonJS.getQueryString('code')});
                console.log(res);
                if (res.status === 'ok') {
                    this.localData = {
                        'wechat_id': res.data['unionid'],
                        'wechat_avatar': res.data['headimgurl'],
                        'wechat_nickname': res.data['nickname']
                    };
                    localStorage.setItem('localData', JSON.stringify(this.localData));
                }
            },
            /**
             * 俏猫-专题三周获奖用户列表
             */
            async funTopicThreeYearAquser () {
                let res = await topicThreeYearAquser();
                if (res.status === 'ok' && res['topic_qcat3_num']) {
                    this.luckDrawNum = {
                        'be_num': res['topic_qcat3_num']['be_num'],
                        'in_num': res['topic_qcat3_num']['in_num']
                    }
                }
            },
            /**
             * 俏猫-专题三周年金币列表
             */
            async funTopicThreeGoldList () {
                let _this = this;
                let res = await topicThreeGoldList({'wechat_id': this.localData.wechat_id});
                if (res.status === 'ok') {
                    let jsonData = res.data;
                    for (let p in jsonData) {
                        if (jsonData[p])
                            _this.getGoldItem.push(parseInt(p));
                    }
                }
            },
            /**
             * 俏猫-专题三周年金币领取
             */
            async funTopicThreeGetGold (goleIndex) {
                await topicThreeGetGold({'wechat_id': this.localData.wechat_id, value: goleIndex});
            },
            click () {
                this.$refs.child.callMethod();
            },
            funBrandHerf (index) {
                let href = {
                    '1': 'http://mm.qiaocat.com/home/recommend?plid=103', // 全民便利店
                    '2': 'http://m.qiaocat.com/topic-BrideMakeups', // 俏猫婚策店
                    '3': 'http://mm.qiaocat.com/topic-annual-makeup?plid=94&from=banner&plid=104', // 全明星工厂
                    '4': 'https://shop13319964.wxrrd.com/', // 俏猫商城
                    '5': 'http://www.omicy.com/goods-100371.html?code=tg_qmszn_gdn_20170110', // 无敏氏
                    '6': 'http://mobile.uzise.com/topic-20180108?code=tg_qmszn_gdn_20180110', // 柚子舍
                    '7': 'http://shop.m.jd.com/?shopId=695770', // 伊肤泉
                    '8': 'http://55919434.m.weimob.com/vshop/55919434/index', // 蓓缇佳儿
                    '9': 'https://kdt.im/pFjPKh', // 哇吲
                    '12': 'https://common.ofo.so/campaign/rbqpacket/?channel=33096_1513866284564&banner=https%3A%2F%2Fimg.ofo.so%2Fcms%2F93be09038c920940a7dd5cdf2ba88ab5.jpg', // ofo
                    '14': 'http://m.tb.cn/h.ztJ8UL', // 雅美菲

                };
                return href[index];
            },
            /**
             * 获得金币后弹出展示品牌
             */
            funGetGoldAlaert (goldIndex) {
                let images = [];
                if (goldIndex === 10) {
                    this.brandShowBox.isBtn = false;
                    for (let i = 1; i <= 8; i++) {
                        images.push(`/static/topic/beauty_down/index/brand/10/img${i}.jpg`)
                    }
                } else {
                    this.brandShowBox.isBtn = true;
                    images = [`/static/topic/beauty_down/index/brand/${goldIndex}.jpg`];
                }
                this.brandShowBox.images = images;
                this.brandShowBox.status = true;
                this.brandShowBox.href = this.funBrandHerf(goldIndex);
                this.funTopicThreeGetGold(goldIndex);
                this.click();
            },
            /**
             * 收集金币
             * @param {int} goldIndex - 第几个金币
             */
            funGetGold (goldIndex) {
                this.goldMusic.currentTime = 0;
                this.goldMusic.play();
                this.getGoldItem.push(goldIndex);
                this.funGetGoldAlaert(goldIndex);
            },
            /**
             * 抽奖提示
             */
            funLuckDrawTips () {
                alert('抽奖提示的弹出');
            },
            /**
             * 获得所有金币后弹出
             */
            funCalcGoldNumber () {
                this.brandShowBox.status = false;
                // 集齐所有金币同时抽过奖而且还有抽奖机会,侧提示用户抽奖
                if (this.getGoldItem.length >= 14 && this.luckDrawNum['be_num'] >= 1) {
                    this.funLuckDrawTips();
                } else if (this.getGoldItem.length >= 14) {
                    this.alertImg = '/static/topic/beauty_down/index/web/gold_10.png';
                    this.alertBox = true;
                }
            },
            /**
             * 活动规则
             */
            funShowRule () {
                this.brandShowBox.status = false;
                this.alertImg = '/static/topic/beauty_down/index/web/rule.png';
                this.alertBox = true;
            },
            /**
             * 点击猫头抽奖
             */
            funClick () {
                // 没有抽奖机会时的提示
                if (this.luckDrawNum['be_num'] === 0 && this.luckDrawNum['in_num'] === 3) {
                    this.nono = true;
                } else if (this.getGoldItem.length > 9) {
                    this.$router.push('/topic-beauty-town/luckdraw');
                }
            },
            /**
             * 背景音乐开关
             */
            funBGM () {
                this.brandShowBox.status = false;
                if (this.bgMusic.paused) {
                    this.bgMusic.play();
                } else {
                    this.bgMusic.pause();
                }
                this.bgmStatus = !this.bgMusic.paused;
            },
            /**
             * 关闭弹窗
             */
            funCloseAlert () {
                this.alertImg = '';
                this.brandShowBox.status = false;
                this.alertBox = false;
            }
        },
        components: {tabWin, brandShow}
    }
</script>
<style lang="scss" scoped>
    @import '../../../assets/css/mixin.scss';

    #topic-main {
        opacity: 0;
    }

    .block-img {
        position: relative;
    }

    .footer-box {
        position: fixed;
        padding: 10px;
        width: 100%;
        left: 0;
        bottom: 0;
        z-index: 10;
        @include fj();
        align-items: center;
        .logo {
            width: 70px;
        }
        .left-box {
            @include fj();
            align-items: center;
            .gold-number {
                margin-left: 8px;
                position: relative;
                .number-box {
                    position: absolute;
                    @include fj(center);
                    align-items: center;
                    top: 0;
                    right: 8px;
                    width: 30px;
                    height: 84%;
                    .number {
                        height: 16px;
                        margin-right: 2px;
                    }
                }
                .tab-gold {
                    width: 115px;
                }
            }
            .portrait {
                @include wh(70px, 70px);
                overflow: hidden;
                border-radius: 50%;
                border: 2px solid rgba(255, 255, 255, 0.4);
                box-shadow: 0 0 6px rgba(0, 0, 0, 0.50);
                img {
                    display: block;
                    width: 100%;
                }
            }
        }
    }

    .top-mask {
        position: fixed;
        width: 100%;
        top: 0;
        left: 0;
        z-index: 1;
    }

    @keyframes tips-cj {
        from {
            bottom: 85px;
        }
        to {
            bottom: 80px;
        }
    }

    @mixin dongHua($index,$top,$left) {
        @keyframes #{$index} {
            from {
                top: $top;
            }
            to {
                top: $top - 5;
            }
        }

        top: $top;
        left: $left;
        animation: $index 2s infinite alternate;
    }

    .gold-img {
        position: absolute;
        width: 12%;
        &.gold-1 {
            @include dongHua(gold1, 46%, 42%);
        }
        &.gold-2 {
            @include dongHua(gold2, 24%, 75%);
        }
        &.gold-3 {
            @include dongHua(gold3, 12%, 23%);
        }
        &.gold-4 {
            @include dongHua(gold4, 67%, 72%);
        }
        &.gold-5 {
            @include dongHua(gold5, 31%, 60%);
        }
        &.gold-6 {
            @include dongHua(gold6, 2%, 31%);
        }
        &.gold-7 {
            @include dongHua(gold7, 45%, 87%);
        }
        &.gold-8 {
            @include dongHua(gold8, 12%, 51%);
        }
        &.gold-9 {
            @include dongHua(gold9, 7%, 15%);
        }
        &.gold-10 {
            @include dongHua(gold10, 73%, 74%);
        }
        &.gold-11 {
            @include dongHua(gold11, 74%, 33%);
        }
        &.gold-12 {
            @include dongHua(gold12, 6%, 17%);
        }
        &.gold-13 {
            @include dongHua(gold13, 64%, 69%);
        }
        &.gold-14 {
            @include dongHua(gold14, 54%, 25%);
        }
    }

    .alter-wrap {
        .alter {
            position: fixed;
            padding: 20px;
            width: 90%;
            left: 5%;
            top: 50%;
            transform: translateY(-50%);
            z-index: 30;
            text-align: center;
            .luck-draw {
                display: inline-block;
                position: absolute;
                top: 43%;
                left: 10%;
                @include wh(80%, 24%);
            }
            .img-wrap {
                background: #fff;
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

    .tab-1 {
        position: fixed;
        bottom: 0;
        left: 0;
    }

    .click-me {
        position: fixed;
        right: 0;
        bottom: 80px;
        width: 90px;
        z-index: 10;
        animation: tips-cj 1s infinite alternate;
    }

    .bgm, .icon-rule {
        position: fixed;
        z-index: 20;
        top: 15px;
        left: 15px;
    }

    .icon-rule {
        right: 5px;
        left: initial;
        top: 10%;
        width: 84px;
    }
</style>