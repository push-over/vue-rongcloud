<template>
  <div class="init">
    <van-nav-bar title="连接融云" />
    <van-cell-group>
      <van-field v-model="appkey"
                 required
                 label="appkey"
                 placeholder="请输入您的 appkey" />
      <van-field v-model="token"
                 label="token"
                 placeholder="请输入您的 token"
                 required />
      <van-field v-model="targetId"
                 label="targetId"
                 placeholder="请输入 targetId"
                 required />
    </van-cell-group>
    <van-button class="init-button"
                type="info"
                @click="initRongCloud">初始化连接</van-button>
    <div class="rong-show-box">
      <p v-for="data in showDatas"
         v-bind:key="data">
        {{data}}
      </p>
    </div>
  </div>
</template>

<script>
import { init } from '@/utils.js'

export default {
  data () {
    return {
      appkey: 'c9kqb3rdc4nqj',
      token: '',
      targetId: '',
      showDatas: [],
    }
  },
  methods: {
    addPromptInfo (prompt, userId = null) {
      const _this = this

      const avatarList = [
        'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=4100987808,2324741924&fm=26&gp=0.jpg',
        'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2988245209,2476612762&fm=26&gp=0.jpg',
        'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=4259300811,497831842&fm=26&gp=0.jpg',
        'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3684587473,1286660191&fm=26&gp=0.jpg',
        'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2884107401,3797902000&fm=26&gp=0.jpg'
      ]
      const avatar = avatarList[Math.floor(Math.random() * (3 + 1))]
      _this.showDatas.push(prompt)
      const timer = setInterval(() => {
        if (userId) {
          clearInterval(timer);
          _this.$store.commit('SET_MEMBER', {
            userId: userId,
            avatar: avatar
          })
          _this.$store.commit('SET_TARGETID', _this.targetId)
          _this.$router.push({ name: 'RongCloud' })
        }
      }, 500)
    },
    initRongCloud () {
      var appkey = this.appkey
      var token = this.token
      if (!appkey || !token) {
        alert('appkey 和 token 不能为空')
      } else {
        init({
          appkey: appkey,
          token: token
        }, this.addPromptInfo)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/scss/utils";
.init-button {
  position: fixed !important;
  bottom: vw(30px);
  left: 50%;
  transform: translateX(-50%);
}

.rong-show-box {
  margin-top: vw(100px);
  text-align: center;
}
</style>
