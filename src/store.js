import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  memberInfo: undefined,
  targetId: undefined,
  answer: []
}
const mutations = {
  SET_MEMBER (state, memberInfo) {
    state.memberInfo = memberInfo
  },
  SET_TARGETID (state, targetId) {
    state.targetId = targetId
  },
  SET_ANSWER (state, playload) {
    let say = {
      css: 'left',
      txt: playload.content,
      headImg: playload.extra
    }
    state.answer.push(say)
  },
};
const actions = {

}

export default new Vuex.Store({
  state,
  mutations,
  actions
})
