<template>
<find-pwd :title="title"></find-pwd>
</template>
<script>
import findPwd from '../loginpage/findPwd'
export default {
  name: 'resetPwd',
  data () {
    return {
      title: '修改密码'
    }
  },
  components:{
    findPwd
  }
}
</script>
<style lang="scss" scoped>
</style>