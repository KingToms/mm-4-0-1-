<template>
    <transition name="router-slid" mode="out-in">
        <div class="error-page">
            <h1>页面不存在<br>{{s}}秒后自动离开...</h1>
        </div>
    </transition>
</template>

<script>
    export default {
        name: 'error',
        data () {
            return {
                s: 3
            }
        },
        created () {
            let iCount = setInterval(() => {
                if (this.s == 1) {
                    this.$router.go(-1);
                    clearInterval(iCount);
                    setTimeout(() => {
                        this.s = 3;
                    }, 200)
                }
                else {
                    this.s--;
                }
            }, 1000)
        },
        methods: {}
    }
</script>

<style lang="scss" scoped>
    .error-page {
        text-align: center;
        height: 100%;
        margin-top: 25%;
    }

    a {
        color: #42b983;
    }
</style>
