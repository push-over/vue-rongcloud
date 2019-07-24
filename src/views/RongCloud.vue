<template>
  <div id='rongcloud'>
    <van-nav-bar title="融云聊天"
                 fixed
                 left-text="返回"
                 left-arrow
                 @click-left="onClickLeft" />
    <div class="wrapper">
      <Message v-for="(item, index) in answer"
               :key="index"
               :data='item' />
    </div>
    <div class="send-message">
      <van-field v-model="say"
                 class="message-textarea"
                 type="textarea"
                 placeholder="请输入..." />
      <van-button class="send-button"
                  type="info"
                  size="small"
                  @click="sendMessage">发送</van-button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Message from './Message'
export default {
  components: {
    Message
  },
  data () {
    return {
      say: ''
    }
  },
  created () {
    this.$nextTick(() => {
      const list = document.getElementById('rongcloud')
      document.documentElement.scrollTop = list.scrollHeight
      //如不行，请尝试-> list.scrollTop = list.scrollHeight
    })
  },
  watch: {
    answer () {
      this.$nextTick(() => {
        const list = document.getElementById('rongcloud')
        document.documentElement.scrollTop = list.scrollHeight
        //如不行，请尝试-> list.scrollTop = list.scrollHeight
      })
    }
  },
  computed: {
    ...mapState({
      answer: 'answer',
      memberInfo: 'memberInfo',
      targetId: 'targetId'
    })
  },
  methods: {
    onClickLeft () {
      this.$router.go(-1)
    },
    sendMessage () {
      const _this = this

      var msg = new RongIMLib.TextMessage({ content: _this.say, extra: _this.memberInfo.avatar });
      var conversationType = RongIMLib.ConversationType.PRIVATE // 单聊, 其他会话选择相应的消息类型即可
      var targetId = this.targetId // 目标 Id
      RongIMClient.getInstance().sendMessage(conversationType, targetId, msg, {
        onSuccess: function (message) {
          // message 为发送的消息对象并且包含服务器返回的消息唯一 Id 和发送消息时间戳
          const say = {
            css: 'right',
            txt: message.content.content,
            headImg: _this.memberInfo.avatar
          }
          _this.answer.push(say)
          _this.say = ''
        },
        onError: function (errorCode, message) {
          var info = ''
          switch (errorCode) {
            case RongIMLib.ErrorCode.TIMEOUT:
              info = '超时'
              break
            case RongIMLib.ErrorCode.UNKNOWN:
              info = '未知错误'
              break
            case RongIMLib.ErrorCode.REJECTED_BY_BLACKLIST:
              info = '在黑名单中，无法向对方发送消息'
              break
            case RongIMLib.ErrorCode.NOT_IN_DISCUSSION:
              info = '不在讨论组中'
              break
            case RongIMLib.ErrorCode.NOT_IN_GROUP:
              info = '不在群组中'
              break
            case RongIMLib.ErrorCode.NOT_IN_CHATROOM:
              info = '不在聊天室中'
              break
          }
          console.log('发送失败: ' + info + errorCode)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/scss/utils";
.wrapper {
  padding-top: vw(92px);
  padding-bottom: vw(200px);
}
.send-message {
  width: 100vw;
  height: vw(200px);
  position: fixed !important;
  bottom: 0;
  left: 0;
  .message-textarea {
    height: 100%;
  }
  .send-button {
    position: fixed;
    right: vw(30px);
    bottom: vw(30px);
  }
}
</style>
