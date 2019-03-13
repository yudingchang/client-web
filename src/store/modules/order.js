import { fetchRow } from '@/api/fetch'
import { updateInspection } from '@/api/inspection'
import _ from 'lodash'

const order = {
  state: {
    data: null,
    original: null
  },

  getters: {
    order: state => {
      return state.data
    },
    orderProducts: state => {
      return {
        products: state.data.products
      }
    },
    orderParams: state => {
      return {
        is_custom_template: state.data.is_custom_template,
        report_locale: state.data.report_locale,
        inspection_type: state.data.inspection_type,
        sample_type: state.data.sample_type,
        estimated_dates: state.data.estimated_dates,
        inspection_dates: state.data.inspection_dates,
        accept_report_emails: state.data.accept_report_emails
      }
    },
    orderTarget: state => {
      return {
        target: state.data.target
      }
    },
    orderInspectionTarget: state => {
      return {
        inspection_target: state.data.inspection_target
      }
    }
  },

  mutations: {
    setOrderData: (state, data) => {
      state.data = data
    },
    setOrderOriginal: (state, data) => {
      state.original = _.cloneDeep(data)
    }
  },

  actions: {
    getOrder({ commit, state }, params) {
      return new Promise((resolve, reject) => {
        fetchRow(params.url).then(response => {
          const data = response.data
          commit('setOrderData', data)
          commit('setOrderOriginal', data)
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },
    updateOrder({ commit, state, getters }, params) {
      const data = {}
      params.forEach(item => {
        const attributes = getters[item]
        _.assign(data, attributes)
      })
      return new Promise((resolve, reject) => {
        updateInspection(state.data._links.self, data).then(response => {
          const data = response.data
          commit('setOrderData', data)
          commit('setOrderOriginal', data)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    transitOrder({ commit, state, getters }, params) {
      const data = {}
      params.forEach(item => {
        const attributes = getters[item]
        _.assign(data, attributes)
      })
      return new Promise((resolve, reject) => {
        updateInspection(state.data._links.transit, data).then(response => {
          const data = response.data
          commit('setOrderData', data)
          commit('setOrderOriginal', data)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default order
