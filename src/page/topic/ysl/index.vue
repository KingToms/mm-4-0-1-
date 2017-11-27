<template>
    <router-view></router-view>
</template>
<script>
    import common from "../../../common/common";

    let appId = 'wxa408e026b5511183',
        redirectURI = 'http://mm.qioacat.com/topic-ysl',
        wxLogin = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + appId + '&redirect_uri=' + redirectURI + '&response_type=code&scope=snsapi_login&state=STATE#wechat_redirect';
    let code = common.getQueryString("code") || '';
    console.log(code);
    if (!code)
        location.href = wxLogin;
</script>