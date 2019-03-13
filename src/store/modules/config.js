import { getConfigInfo } from '@/api/getConfig.js'

// const url = '/v1/location/list/all_country'
const callback = (name, state, dispatch) => {
  return new Promise((resolve, reject) => {
    if (!state.configs) {
      dispatch('loadConfigs').then(() => {
        resolve(state.configs[name])
      }).catch(error => {
        reject(error)
      })
    } else {
      resolve(state.configs[name])
    }
  })
}

const config = {
  state: {
    configs: null,
    routerShow: true,
    pickerOptions: {
      shortcuts: [{
        text: '最近一周',
        onClick(picker) {
          const end = new Date()
          const start = new Date()
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
          picker.$emit('pick', [start, end])
        }
      }, {
        text: '最近一个月',
        onClick(picker) {
          const end = new Date()
          const start = new Date()
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
          picker.$emit('pick', [start, end])
        }
      }, {
        text: '最近三个月',
        onClick(picker) {
          const end = new Date()
          const start = new Date()
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
          picker.$emit('pick', [start, end])
        }
      }]
    }
  },

  mutations: {
    SET_CONFIGS: (state, data) => {
      state.configs = data
    },
    SET_CATEGORY: (state, category) => {
      state.category = category
    },
    SET_UNIT: (state, unit) => {
      state.unit = unit
    },
    SET_PAYMENT_TYPES: (state, paymentTypes) => {
      state.paymentTypes = paymentTypes
    },
    SET_routerShow: (state) => {
      state.routerShow = !state.routerShow
      // console.log(state)
    }
  },

  actions: {
    loadConfigs({ commit }) {
      return new Promise((resolve, reject) => {
        getConfigInfo().then(response => {
          commit('SET_CONFIGS', response.data.data)
          resolve(response.data.data)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 获取商品分类
    getCategory({ state, dispatch }) {
      return callback('category', state, dispatch)
    },

    // 支付方式
    getPaymentTypes({ state, dispatch }) {
      return callback('paymentTypes', state, dispatch)
    },

    // 支付方式
    getPayments({ state, dispatch }) {
      return callback('payments', state, dispatch)
    },

    // 计量单位
    getUnit({ state, dispatch }) {
      return callback('unit', state, dispatch)
    }
  }
}

export default config
