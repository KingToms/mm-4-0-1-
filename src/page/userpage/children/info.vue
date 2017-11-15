<template>
  <div class="info">
    <div class="weui-uploader__input-box">
      <input id="uploaderInput" class="weui-uploader__input" type="file" accept="image/*" @change="uploadAvatar">
    </div>
    <alert-tip v-if="showAlert" :showHide="showAlert" @closeTip="closeTip" :alertText="alertText"></alert-tip>
  </div>
</template>
<script>
import {getStore} from '../../../common/store.js'
import keyConf from '../../../common/keyConf.js'
import alertTip from '../../../components/common/alertTip'
export default {
  name: 'info',
  data () {
    return {
      userInfo: getStore(keyConf.uInfo),
      showAlert: false,
      alertText: null,
    }
  },
  methods: {
    uploadAvatar () {
      //上传头像
      if (this.userInfo) {
        let input = document.querySelector('.weui-uploader__input')
        let data = new FormData()
        data.append('file', input.files[0])
        try{
          let response = await fetch(``, {
            method: 'POST',
            credentials: 'include',
            body: data
          })
          // 将返回的字符串转json
          let res = await response.json()
          if (res.code == 200) {
            // 设置用户头像
            this.userInfo.avatar = res.image_path
          }
        }catch (error) {
          this.showAlert = true
          this.alertText = '上传失败'
          throw new Error(error)
        }
      }
    },
    closeTip () {
      this.showAlert = false
    }
  },
  components: {
    alertTip
  }
}
</script>
<style lang="scss" scoped>
</style>