const userInfo = process.browser ? JSON.parse(window.sessionStorage.getItem('userInfo') || '{}') : {}

export const state = () => ({
  counter: 0,
  userInfo,
})

export const mutations = {
  increment(state) {
    state.counter++
  },
  CHANGE_USER_INFO(state, val) {
    state.userInfo = val
  }
}

export const actions = {
  nuxtServerInit ({ dispatch, commit }, { req }) {
    // console.log(req.session)
    // if (req.session.user) {
    //   commit('user', req.session.user)
    // }
  },
  changeUserInfo({ commit }, val) {
    commit('CHANGE_USER_INFO', val)
  }
}

export const strict = true
