<template>
    <router-view></router-view>
</template>
<script>
    import { getMoreDraw } from "@/service/getData";
    export default {
        data () {
            return {};
        },
        created () {
            this.shareWechat();
        },
        methods: {
            /* 增加获奖次数 */
            async getMoreLuckdraw(addType) {
                // type: gold为金币后增加，share为分享后增加，paper为问卷后增加
                let res = await getMoreDraw({type: addType});
                if(res.status == 'ok'){
                    // 增加了一次抽奖机会
                    alert("分享成功，已为您增加1次抽奖机会，马上抽奖吧~");
                    this.$router.push('./luckdraw');
                }
            },

            /*微信分享*/
            shareWechat () {
                let _this = this;
                wx.ready(function () {
                    _this.share_setup(
                        "美丽小城，俏猫三周年！",
                        "俏猫三周年·集金币抽iphoneX~",
                        "http://mm.qiaocat.com/topic-beauty-town",
                        "http://mm.qiaocat.com/static/topic/beauty_down/luckdraw_3/share.jpg"
                    );
                });
            },
            share_setup (title, desc, link, imgUrl) {
                wx.onMenuShareAppMessage({
                    title: title,
                    desc: desc,
                    link: link,
                    imgUrl: imgUrl,
                    success: function (res) {
                        console.log(1, res);
                        alert("分享成功");
                        if(this.$route.path == '/topic-beauty-town/luckdraw' || this.$route.path == '/topic-beauty-town/receipt'){
                            // 微信分享成功回调
                            alert("页面回调");
                            this.getMoreLuckdraw('share');
                        }
                    },
                    error: function (err) {
                        console.log(1, err);
                    }
                });
                wx.onMenuShareTimeline({
                    title: title,
                    link: link,
                    imgUrl: imgUrl,
                    success: function (res) {
                        //todo
                        console.log(2, res);
                        alert("分享成功");
                        if(this.$route.path == '/topic-beauty-town/luckdraw' || this.$route.path == '/topic-beauty-town/receipt'){
                            // 微信分享成功回调
                            alert("页面回调");
                            this.getMoreLuckdraw('share');
                        }
                    },
                    error: function (err) {
                        console.log(2, err);
                    }
                });
            }
        },
    }
</script>
<style>
    img.full {
        display: block;
        width: 100%;
    }
</style>