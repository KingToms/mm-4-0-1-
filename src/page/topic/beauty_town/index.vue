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
        <div class="alter-wrap" v-if="alertStatus>0">
            <div class="alter">
                <div class="img-wrap" v-if="alertStatus===1">
                    <a href="/topic-annual-makeup?plid=94&from=banner">
                        <img class="full" src="http://tmp-mm.qiaocat.com/static/topic/beauty_down/luckdraw_3/advert.png" alt="">
                    </a>
                </div>
                <div class="img-wrap" v-if="alertStatus===2">
                    <div class="btn-box">
                        <span class="left" @click="funShare"></span>
                        <a href="http://mm.qiaocat.com/topic-beauty-town/questionnaire"></a>
                    </div>
                    <img class="full" src="/static/topic/beauty_down/index/web/all_2.png" alt="">
                </div>
                <img src="/static/topic/beauty_down/index/web/icon_x.png" alt="" class="icon-x" @click="alertStatus = 0">
            </div>
            <div class="alert-mask"></div>
        </div>
        <div class="block-img">
            <span class="house house-14-b" @click="funGetGoldAlaert(13,false)"></span>
            <img src="/static/topic/beauty_down/index/web/gold.gif" alt="" class="gold-img gold-13" v-if="getGoldItem.indexOf(13)<0" @click="funGetGold(13)">
            <img src="/static/topic/beauty_down/index/3years_01.png" alt="" class="full box-bg">
        </div>
        <div class="block-img">
            <span class="house house-14-a" @click="funGetGoldAlaert(13,false)"></span>
            <span class="house house-13" @click="funGetGoldAlaert(12,false)"></span>
            <span class="house house-12" @click="funGetGoldAlaert(11,false)"></span>
            <span class="house house-11-b" @click="funGetGoldAlaert(10,false)"></span>
            <img src="/static/topic/beauty_down/index/web/gold.gif" alt="" class="gold-img gold-12" v-if="getGoldItem.indexOf(12)<0" @click="funGetGold(12)">
            <img src="/static/topic/beauty_down/index/web/gold.gif" alt="" class="gold-img gold-11" v-if="getGoldItem.indexOf(11)<0" @click="funGetGold(11)">
            <img src="/static/topic/beauty_down/index/web/gold.gif" alt="" class="gold-img gold-10" v-if="getGoldItem.indexOf(10)<0" @click="funGetGold(10)">
            <img src="/static/topic/beauty_down/index/3years_02.png" alt="" class="full box-bg">
        </div>
        <div class="block-img">
            <span class="house house-11-a" @click="funGetGoldAlaert(10,false)"></span>
            <span class="house house-10" @click="funGetGoldAlaert(9,false)"></span>
            <span class="house house-9" @click="funGetGoldAlaert(8,false)"></span>
            <span class="house house-7" @click="funGetGoldAlaert(14,false)"></span>
            <span class="house house-8-b" @click="funGetGoldAlaert(7,false)"></span>
            <img src="/static/topic/beauty_down/index/web/gold.gif" alt="" class="gold-img gold-14" v-if="getGoldItem.indexOf(14)<0" @click="funGetGold(14)">
            <img src="/static/topic/beauty_down/index/web/gold.gif" alt="" class="gold-img gold-9" v-if="getGoldItem.indexOf(9)<0" @click="funGetGold(9)">
            <img src="/static/topic/beauty_down/index/web/gold.gif" alt="" class="gold-img gold-8" v-if="getGoldItem.indexOf(8)<0" @click="funGetGold(8)">
            <img src="/static/topic/beauty_down/index/web/gold.gif" alt="" class="gold-img gold-7" v-if="getGoldItem.indexOf(7)<0" @click="funGetGold(7)">
            <img src="/static/topic/beauty_down/index/3years_03.png" alt="" class="full box-bg">
        </div>
        <div class="block-img">
            <span class="house house-8-a" @click="funGetGoldAlaert(7,false)"></span>
            <span class="house house-6" @click="funGetGoldAlaert(6,false)"></span>
            <span class="house house-5" @click="funGetGoldAlaert(5,false)"></span>
            <span class="house house-4-b" @click="funGetGoldAlaert(4,false)"></span>
            <img src="/static/topic/beauty_down/index/web/gold.gif" alt="" class="gold-img gold-6" v-if="getGoldItem.indexOf(6)<0" @click="funGetGold(6)">
            <img src="/static/topic/beauty_down/index/web/gold.gif" alt="" class="gold-img gold-5" v-if="getGoldItem.indexOf(5)<0" @click="funGetGold(5)">
            <img src="/static/topic/beauty_down/index/web/gold.gif" alt="" class="gold-img gold-4" v-if="getGoldItem.indexOf(4)<0" @click="funGetGold(4)">
            <img src="/static/topic/beauty_down/index/3years_04.png" alt="" class="full box-bg">
        </div>
        <div class="block-img">
            <span class="house house-4-a" @click="funGetGoldAlaert(4,false)"></span>
            <span class="house house-3" @click="funGetGoldAlaert(3,false)"></span>
            <span class="house house-2" @click="funGetGoldAlaert(2,false)"></span>
            <span class="house house-1" @click="funGetGoldAlaert(1,false)"></span>
            <img src="/static/topic/beauty_down/index/web/gold.gif" alt="" class="gold-img gold-3" v-if="getGoldItem.indexOf(3)<0" @click="funGetGold(3)">
            <img src="/static/topic/beauty_down/index/web/gold.gif" alt="" class="gold-img gold-2" v-if="getGoldItem.indexOf(2)<0" @click="funGetGold(2)">
            <img src="/static/topic/beauty_down/index/web/gold.gif" alt="" class="gold-img gold-1" v-if="getGoldItem.indexOf(1)<0" @click="funGetGold(1)">
            <img src="/static/topic/beauty_down/index/3years_05.png" alt="" class="full box-bg">
        </div>
        <div class="block-img">
            <img src="/static/topic/beauty_down/index/3years_06.png" alt="" class="full box-bg">
        </div>
        <img src="/static/topic/beauty_down/index/web/tab_1.png" alt="" class="full tab-1" name="end">
        <!--分享指引-->
        <div class="share-guide" @click="hideShareBox" v-if="showShareBox">
            <img src="/static/topic/beauty_down/index/guide.png" alt="">
        </div>
    </div>
</template>
<script>
    import tabWin from './winning_list'
    import brandShow from './alert_box'
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
                    title: true,
                    isBtn: true,
                    href: '',
                    images: [],
                },
                alertStatus: 0,
                alertBox: true,
                getGoldItem: [], // 获得的金币
                bgmStatus: true,
                bgMusic: new Audio(),
                goldMusic: new Audio(),
                alertImg: '/static/topic/beauty_down/index/web/synopsis.png',
                showShareBox: false
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
                            $('html,body').scrollTop(topicMain.scrollHeight);
                            topicMain.style.opacity = '1';
                            let imgS = [];
                            for (let i = 1; i <= 8; i++) {
                                imgS.push(`/static/topic/beauty_down/index/brand/10/img${i}.jpg`)
                            }
                            for (let i = 1; i <= 4; i++) {
                                imgS.push(`/static/topic/beauty_down/index/brand/11/img${i}.jpg`)
                            }
                            _this.preload(imgS);
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
            let tmp = JSON.parse(localStorage.getItem('localData'));
            if (tmp) this.localData = tmp;
            // 已授权
            if (commonJS.getQueryString('code')) {
                this.funWechatLogin();
            } else {
                // 没有微信ID,则获取微信code进行授权
                this.funGetWechatCode();
            }

            // 微信分享
            this.shareWechat();
        },
        methods: {
            /*
             * 微信分享
             */
            shareWechat () {
                let _this = this;
                wx.ready(function () {
                    _this.share_setup(
                        "俏猫3周年 | 集金币赢IphoneX",
                        "戳~快点来拼手速吧，收集金币即可参与抽奖！",
                        "http://mm.qiaocat.com/topic-beauty-town",
                        "http://mm.qiaocat.com/static/topic/beauty_down/luckdraw_3/share.jpg"
                    );
                });
            },
            share_setup (title, desc, link, imgUrl) {
                let _this = this;
                wx.onMenuShareAppMessage({
                    title: title,
                    desc: desc,
                    link: link,
                    imgUrl: imgUrl,
                    success: function (res) {

                    },
                    error: function (err) {

                    }
                });
                wx.onMenuShareTimeline({
                    title: title,
                    link: link,
                    imgUrl: imgUrl,
                    success: function (res) {
                        //todo
                        console.log(2, res);
                    },
                    error: function (err) {
                        console.log(2, err);
                    }
                });
            },

            /**
             * 获取微信code
             */
            async funGetWechatCode () {
                if (!this.localData.wechat_id) {
                    let res = await getWechatCode({redirectURI: 'http://mm.qiaocat.com/topic-beauty-town'});
                    // let res = await getWechatCode({redirectURI: 'http://mm.qiaocat.com/testUse'});
                    if (res.status === 'ok') {
                        location.href = res.url;
                    }
                } else {
                    this.funTopicThreeYearAquser();
                    this.funTopicThreeGoldList();
                }
            },
            /**
             * 微信code绑定
             */
            async funWechatLogin () {
                let res = await WechatLogin({code: commonJS.getQueryString('code')});
                console.log(res);
                if (res.status === 'ok' || res.data) {
                    this.localData = {
                        'wechat_id': res.data['unionid'],
                        'wechat_avatar': res.data['headimgurl'],
                        'wechat_nickname': res.data['nickname']
                    };
                    localStorage.setItem('localData', JSON.stringify(this.localData));
                } else {
                    this.funGetWechatCode();
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
            /**
             * 预加载图片
             */
            preload (arr) {
                let newImages = [];
                for (let i = 0; i < arr.length; i++) {
                    newImages[i] = new Image();
                    newImages[i].src = arr[i];
                }
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
                    '13': 'http://mm.qiaocat.com/topic-brandDisplay', // 俏猫交友中心
                    '14': 'http://m.tb.cn/h.ztJ8UL', // 雅美菲
                };
                return href[index];
            },
            /**
             * 获得金币后弹出展示品牌
             */
            funGetGoldAlaert (goldIndex, type = true) {
                let images = [];
                if (goldIndex === 10) {
                    this.brandShowBox.isBtn = false;
                    for (let i = 1; i <= 8; i++) {
                        images.push(`/static/topic/beauty_down/index/brand/10/img${i}.jpg`)
                    }
                } else if (goldIndex === 11) {
                    this.brandShowBox.isBtn = false;
                    for (let i = 1; i <= 4; i++) {
                        images.push(`/static/topic/beauty_down/index/brand/11/img${i}.jpg`)
                    }
                } else {
                    this.brandShowBox.isBtn = true;
                    images = [`/static/topic/beauty_down/index/brand/${goldIndex}.jpg`];
                }
                this.brandShowBox.images = images;
                this.brandShowBox.status = true;
                this.brandShowBox.title = type;
                this.brandShowBox.href = this.funBrandHerf(goldIndex);
                type && this.funTopicThreeGetGold(goldIndex);
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
             * 获得所有金币后弹出
             */
            funCalcGoldNumber () {
                this.brandShowBox.status = false;
                // 集齐所有金币同时抽过奖而且还有抽奖机会,侧提示用户抽奖
                if (this.getGoldItem.length >= 14 && this.luckDrawNum['be_num'] === 0 && this.luckDrawNum['in_num'] === 3) {
                    // 没有抽奖机会时的提示
                    this.alertStatus = 1;
                } else if (this.getGoldItem.length >= 14 && this.luckDrawNum['in_num'] > this.luckDrawNum['be_num']) {
                    // 抽过奖并且还有抽奖机会,测提示抽奖
                    this.alertStatus = 2;
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
                if (this.luckDrawNum['be_num'] === 0 && this.luckDrawNum['in_num'] === 3) {
                    // 没有抽奖机会时的提示
                    this.alertStatus = 1;
                } else if (this.getGoldItem.length > 9) {
                    this.bgMusic.pause();
                    // this.$router.push('/topic-beauty-town/luckdraw?plid=107');
                    window.location.href = 'http://mm.qiaocat.com/topic-beauty-town/luckdraw?plid=107'
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
            },
            /**
             * 分享
             */
            funShare () {
                this.showShareBox = true;
                setTimeout(() => {
                    this.alertStatus = 0;
                }, 300);
            },
            /**
             * 隐藏分享指引
             */
            hideShareBox () {
                this.showShareBox = !this.showShareBox;
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
        .house {
            display: inline-block;
            position: absolute;
            &.house-1 {
                top: 58%;
                left: 15%;
                width: 40%;
                height: 42%;
            }
            &.house-2 {
                top: 34%;
                left: 64%;
                width: 36%;
                height: 45%;
            }
            &.house-3 {
                top: 22%;
                left: 13%;
                width: 30%;
                height: 32%;
            }
            &.house-4-a {
                top: 0;
                left: 58%;
                width: 42%;
                height: 24%;
            }
            &.house-4-b {
                bottom: 0;
                left: 58%;
                width: 42%;
                height: 24%;
            }
            &.house-5 {
                top: 40%;
                left: 52%;
                width: 27%;
                height: 27%;
            }
            &.house-6 {
                top: 9%;
                left: 16%;
                width: 31%;
                height: 46%;
            }
            &.house-7 {
                bottom: 0;
                left: 6%;
                width: 35%;
                height: 40%;
            }
            &.house-8-a {
                top: 0;
                right: 0;
                width: 43%;
                height: 21%;
            }
            &.house-8-b {
                bottom: 0;
                right: 0;
                width: 37%;
                height: 33%;
            }
            &.house-9 {
                top: 24%;
                left: 41%;
                width: 41%;
                height: 40%;
            }
            &.house-10 {
                top: 20%;
                left: 5%;
                width: 35%;
                height: 33%;
            }
            &.house-11-a {
                top: 0;
                right: 0;
                width: 40%;
                height: 23%;
            }
            &.house-11-b {
                bottom: 0;
                right: 0;
                width: 40%;
                height: 19%;
            }
            &.house-12 {
                bottom: 0;
                left: 0;
                width: 44%;
                height: 39%;
            }
            &.house-13 {
                top: 14%;
                left: 4%;
                width: 35%;
                height: 33%;
            }
            &.house-14-a {
                top: 0;
                right: 0;
                width: 41%;
                height: 20%;
            }
            &.house-14-b {
                bottom: 0;
                right: 0;
                width: 41%;
                height: 28%;
            }
        }
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
                position: relative;
            }
            .btn-box {
                position: absolute;
                bottom: 9%;
                width: 90%;
                height: 30%;
                left: 5%;
                @include fj();
                a, span {
                    display: inline-block;
                    height: 100%;
                    width: 45%;
                }
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

    // 分享指引
    .share-guide {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: 99;
        img {
            width: 100%;
            height: 100%;
        }
    }
</style>