import { loginByUsername, logout, getUserInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'

const user = {
  state: {
    user: '',
    status: '',
    code: '',
    personal: '',
    company: '',
    email: '',
    phonenumber: '',
    is_paypassword: '',
    token: getToken(),
    name: '',
    avatar: '',
    introduction: '',
    roles: [],
    setting: {
      articlePlatform: []
    }
  },

  mutations: {
    SET_CODE: (state, code) => {
      state.code = code
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_INTRODUCTION: (state, introduction) => {
      state.introduction = introduction
    },
    SET_SETTING: (state, setting) => {
      state.setting = setting
    },
    SET_STATUS: (state, status) => {
      state.status = status
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_PERSONAL: (state, personal) => {
      state.personal = personal
    },
    SET_EMAIL: (state, email) => {
      state.email = email
    },
    SET_PHONENUMBER: (state, phone_number) => {
      state.phone_number = phone_number
    },
    SET_PAYPASSWORD: (state, is_paypassword) => {
      state.is_paypassword = is_paypassword
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_SEX: (state, sex) => {
      state.sex = sex
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_COMPANY: (state, com) => {
      state.company = com
    }
  },

  actions: {
    // 用户名登录
    LoginByUsername({ commit }, userInfo) {
      console.log('dddd')
      // console.log(userInfo);
      // const email = userInfo.email.trim()
      return new Promise((resolve, reject) => {
        loginByUsername(userInfo).then(response => {
          const data = response.data
          commit('SET_TOKEN', data.data.api_token)
          setToken(data.data.api_token)
          console.log(data.data.api_token)
          resolve()
        }).catch(error => {
          console.log('error')
          reject(error)
          // this.$notify.error({
          //   title: '错误',
          //   message: '账号或者密码不匹配',
          //   position: 'bottom-right'
          // })
        })
      })
    },

    // 获取用户信息
    GetUserInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getUserInfo(state.token).then(response => {
          if (!response.data) { // 由于mockjs 不支持自定义状态码只能这样hack
            reject('error')
          }
          const data = response.data.data
          console.log(data)
          if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
            commit('SET_ROLES', data.roles)
          } else {
            reject('getInfo: roles must be a non-null array !')
          }

          commit('SET_NAME', data.name)
          commit('SET_PHONENUMBER', data.phone_number)
          commit('SET_EMAIL', data.email)
          commit('SET_PAYPASSWORD', data.is_paypassword)
          commit('SET_AVATAR', data.personal_information.avatar)
          commit('SET_SEX', data.personal_information.gender)
          commit('SET_INTRODUCTION', data.introduction)
          // commit('SET_COMPANY', data.company)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 第三方验证登录
    // LoginByThirdparty({ commit, state }, code) {
    //   return new Promise((resolve, reject) => {
    //     commit('SET_CODE', code)
    //     loginByThirdparty(state.status, state.email, state.code).then(response => {
    //       commit('SET_TOKEN', response.data.token)
    //       setToken(response.data.token)
    //       resolve()
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    },

    // 动态修改权限
    ChangeRoles({ commit, dispatch }, role) {
      return new Promise(resolve => {
        commit('SET_TOKEN', role)
        setToken(role)
        getUserInfo(role).then(response => {
          const data = response.data
          commit('SET_ROLES', data.roles)
          commit('SET_NAME', data.name)
          // commit('SET_AVATAR', data.avatar)
          commit('SET_INTRODUCTION', data.introduction)
          dispatch('GenerateRoutes', data) // 动态修改权限后 重绘侧边菜单
          resolve()
        })
      })
    }
  }
}

export default user
