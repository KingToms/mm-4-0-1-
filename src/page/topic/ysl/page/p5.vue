<template>
    <div class="double-eleven">
        <div class="banner">
            <div class="text">
                <p>你的好友 {{name}}</p>
                <p>正在参加YSL争夺赛</p>
                <p>需要你的支持</p>
            </div>
            <img class="full" src="/static/topic/ysl/bg_poster2.jpg" alt="">
        </div>
        <div class="btn-wrap">
            <router-link class="ysl-btn" :to="`/topic-ysl/p6?id=${id}&from=YSL`">支持他</router-link>
            <router-link class="ysl-btn" to="/topic-ysl">我要参与</router-link>
        </div>
        <div class="form">
            <img class="full rule" src="/static/topic/ysl/rule.png" alt="">
        </div>
    </div>
</template>
<script>
    import {userIsLogin, authToken, getCenterCoupons, yslGetNick} from "@/service/getData";

    export default {
        name: "ysl",
        data () {
            return {
                id: '',
                name: ''
            };
        },
        created () {
            this.id = this.$route.query.id || '';
            this.funYslGetNick();
        },
        methods: {
            async funYslGetNick () {
                if (this.id) {
                    let res = await yslGetNick({id: this.id});
                    console.log(res);
                    if (res.status === 'ok') {
                        this.name = res.data
                    } else {
                        alert(res.msg);
                    }
                }
            },
            funParticipate () {
                this.$router.push('/topic-ysl/p2');
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

    .btn-wrap {
        margin: 15px 20px;
        display: flex;
        justify-content: space-between;
        .ysl-btn {
            width: 45%;
            height: 44px;
            color: #fee9a8;
            line-height: 44px;
            font-size: 18px;
            text-align: center;
            background: #000;
        }
    }

    .form {
        margin: 20px;
        img.rule {
            margin: 30px 0 45px 0;
        }
    }

</style>