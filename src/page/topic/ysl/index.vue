<template>
    <router-view></router-view>
</template>
<script>
    export default {
        name: "ysl",
        data () {
            return {};
        },
        created () {
            this.shareWechat();
        },
        methods: {
            /*微信分享*/
            shareWechat () {
                let _this = this;
                wx.ready(function () {
                    _this.share_setup(
                        "圣罗兰召唤符",
                        "圣罗兰召唤符~",
                        "http://mm.qiaocat.com/topic-ysl",
                        ""
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
    .mint-msgbox-message {
        height: inherit !important;
        line-height: inherit !important;
    }
</style>