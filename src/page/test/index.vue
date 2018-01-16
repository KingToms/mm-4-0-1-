<template>
    <div id="topic-main">
    </div>
</template>
<script>
    import commonJS from '../../common/common.js'

    export default {
        name: "test",
        data () {
            return {
                code: commonJS.getQueryString('code') || '',
                callBack: 'http://192.168.50.18:8080/topic-beauty-town'
            }
        },
        created () {
            if (this.code && this.callBack)
                window.location.href = `${this.callBack}?code=${this.code}`;
        },
        methods: {}
    }
</script>
<style lang="scss" scoped>
    @import '../../assets/css/mixin.scss';

</style>