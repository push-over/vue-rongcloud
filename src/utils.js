import store from './store'

export const init = (params, addPromptInfo) => {
  var appkey = params.appkey
  var token = params.token
  RongIMClient.init(appkey)
  RongIMClient.setConnectionStatusListener({
    onChanged: function (status) {
      switch (status) {
        case RongIMLib.ConnectionStatus['CONNECTED']:
        case 0:
          addPromptInfo('连接成功')
          break

        case RongIMLib.ConnectionStatus['CONNECTING']:
        case 1:
          addPromptInfo('正在连接中')
          break

        case RongIMLib.ConnectionStatus['DISCONNECTED']:
        case 2:
          addPromptInfo('当前用户主动断开链接')
          break

        case RongIMLib.ConnectionStatus['NETWORK_UNAVAILABLE']:
        case 3:
          addPromptInfo('网络不可用')
          break

        case RongIMLib.ConnectionStatus['CONNECTION_CLOSED']:
        case 4:
          addPromptInfo('未知原因，连接关闭')
          break

        case RongIMLib.ConnectionStatus['KICKED_OFFLINE_BY_OTHER_CLIENT']:
        case 6:
          addPromptInfo('用户账户在其他设备登录，本机会被踢掉线')
          break

        case RongIMLib.ConnectionStatus['DOMAIN_INCORRECT']:
        case 12:
          addPromptInfo('当前运行域名错误，请检查安全域名配置')
          break
      }
    }
  })

  // 消息监听器
  RongIMClient.setOnReceiveMessageListener({
    // 接收到的消息
    onReceived: function (message) {
      // 判断消息类型
      switch (message.messageType) {
        case RongIMClient.MessageType.TextMessage:
          // message.content.content => 文字内容
          store.commit('SET_ANSWER', message.content)
          addPromptInfo('新消息 ' + message.targetId + ':' + JSON.stringify(message))
          break
        case RongIMClient.MessageType.VoiceMessage:
          // message.content.content => 格式为 AMR 的音频 base64
          break
        case RongIMClient.MessageType.ImageMessage:
          // message.content.content => 图片缩略图 base64
          // message.content.imageUri => 原图 URL
          break
        case RongIMClient.MessageType.LocationMessage:
          // message.content.latiude => 纬度
          // message.content.longitude => 经度
          // message.content.content => 位置图片 base64
          break
        case RongIMClient.MessageType.RichContentMessage:
          // message.content.content => 文本消息内容
          // message.content.imageUri => 图片 base64
          // message.content.url => 原图 URL
          break
        case RongIMClient.MessageType.InformationNotificationMessage:
          // do something
          break
        case RongIMClient.MessageType.ContactNotificationMessage:
          // do something
          break
        case RongIMClient.MessageType.ProfileNotificationMessage:
          // do something
          break
        case RongIMClient.MessageType.CommandNotificationMessage:
          // do something
          break
        case RongIMClient.MessageType.CommandMessage:
          // do something
          break
        case RongIMClient.MessageType.UnknownMessage:
          // do something
          break
        default:
        // do something
      }
    }
  })

  RongIMClient.connect(token, {
    onSuccess: function (userId) {
      addPromptInfo('连接成功，用户id：' + userId, userId)
    },
    onTokenIncorrect: function () {
      addPromptInfo('token无效')
    },
    onError: function (errorCode) {
      switch (errorCode) {
        case RongIMLib.ErrorCode.TIMEOUT:
          addPromptInfo('超时')
          //链接超时进行重新的链接start
          var callback = {
            onSuccess: function (userId) {
              console.log("Reconnect successfully." + userId);
            },
            onTokenIncorrect: function () {
              console.log('token无效');
            },
            onError: function (errorCode) {
              console.log(errorcode);
            }
          };
          var config = {
            // 默认 false, true 启用自动重连，启用则为必选参数
            auto: true,
            // 重试频率 [100, 1000, 3000, 6000, 10000, 18000] 单位为毫秒，可选
            url: 'cdn.ronghub.com/RongIMLib-2.5.0.min.js',
            rate: [100, 1000, 3000, 6000, 10000]
          };
          RongIMClient.reconnect(callback, config);
          //链接超时进行重新链接end
          break;
        case RongIMLib.ErrorCode.UNKNOWN_ERROR:
          addPromptInfo('未知错误')
          break;
        case RongIMLib.ErrorCode.UNACCEPTABLE_PaROTOCOL_VERSION:
          addPromptInfo('不可接受的协议版本')
          break;
        case RongIMLib.ErrorCode.IDENTIFIER_REJECTED:
          console.log('ddd')
          addPromptInfo('appkey不正确')
          break;
        case RongIMLib.ErrorCode.SERVER_UNAVAILABLE:
          addPromptInfo('服务器不可用')
          break;
      }
      addPromptInfo(errorCode)
    }
  }, null)
}