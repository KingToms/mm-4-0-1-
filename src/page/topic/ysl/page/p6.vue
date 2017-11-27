<template>
    <div class="double-eleven">
        <div class="banner">
            <div class="text">
                <p>你的好友 小新</p>
                <p>正在参加YSL争夺赛</p>
                <p>需要你的支持</p>
            </div>
            <img class="full" src="/static/topic/ysl/bg_poster2.jpg" alt="">
        </div>
        <div class="form">
            <input type="text" class="border mobile" placeholder="请输入手机号码" v-model="params.mobile">
            <div class="clear get-code-wrap">
                <input type="text" class="border code" placeholder="验证码" v-model="params.code">
                <input id="sendCode" class="btn get-code" type="button" value="获取验证码" @click="funGetCode">
            </div>
            <div class="participate" @click="funParticipate">帮好友增加武力值</div>
            <img class="full rule" src="/static/topic/ysl/rule.png" alt="">
        </div>
    </div>
</template>
<script>
    import {getCode, authLogin} from "@/service/getData";
    import common from "../../../../common/common";
    import {setStore} from "../../../../common/store.js";
    import keyConf from "../../../../common/keyConf.js";

    export default {
        name: "ysl",
        data () {
            return {
                params: {
                    mobile: '18589245630',
                    code: '',
                    plid: ''
                }
            };
        },
        created () {
            this.params.plid = common.getQueryString("plid") || '';
        },
        methods: {
            async funGetCode () {
                // 发送验证码
                if (this.params.mobile.length != 11) {
                    alert("手机格式不正确");
                    return;
                }
                let countdown = 120;
                this.settime($(this.$el.querySelector("#sendCode")), countdown);
                let res = await getCode({mobile: this.params.mobile, type: 1});
                console.log(res);
                if (res.status === 'ok') {

                } else {
                    this.$mint.Toast(res.msg);
                }
            },
            async funParticipate () {
                if (!/^((1[0-9]{1})+\d{9})$/.test(this.params.mobile)) {
                    alert("请输入正确的电话号码");
                    return false;
                } else if (!/^\d{6}$/.test(this.params.code)) {
                    alert("请输入正确的验证码");
                    return false;
                }

                let result = await authLogin(this.params);
                if (result.status == "ok") {
                    $.cookie(keyConf.qm_cookie, this.mobile, {expires: 1, path: "/"});
                    setStore(keyConf.userMoile, this.mobile);
                    // to do
                    this.$router.push('/topic-ysl/p7');
                } else {
                    alert(result.msg);
                }
            },
            settime ($el, countdown) {
                let _this = this;
                if (countdown === 0) {
                    $el.removeAttr("disabled");
                    $el.val('发送验证码');//.css('backgroundColor', '#000');
                } else {
                    $el.attr('disabled', 'true');//.css('backgroundColor', '#000');
                    $el.val(`${countdown}s`);
                    countdown--;
                    setTimeout(function () {
                        _this.settime($el, countdown);
                    }, 1000);
                }
            }
        },
        components: {}
    }
</script>
<style lang="scss" scoped>
    .clear:after {
        content: '';
        display: block;
        clear: both;
    }

    img.full {
        width: 100%;
    }

    input.border {
        border: 1px solid #000;
        height: 44px;
        text-indent: 15px;
        font-size: 16px;
        color: #999;
    }

    .banner {
        position: relative;
        p {
            color: #fff;
            font-size: 1.7rem;
        }
        .text {
            text-align: center;
            position: absolute;
            bottom: 2.9rem;
            left: 1.9rem;
        }
    }

    .form {
        margin: 20px;

        .mobile {
            width: 100%;
        }
        .get-code-wrap {
            padding-top: 10px;
            .code {
                width: 60%;
                float: left;
            }
            .get-code {
                width: 35%;
                float: right;
                background: #000;
                height: 44px;
                line-height: 44px;
                font-size: 16px;
                color: #ccc;
                text-align: center;
            }
        }
        .participate {
            margin-top: 10px;
            height: 44px;
            text-align: center;
            line-height: 44px;
            color: #fee9a8;
            font-size: 18px;
            background: #000;
        }
        img.rule {
            margin: 30px 0 45px 0;
        }
    }

</style>