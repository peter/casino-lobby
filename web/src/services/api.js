import axios from 'axios'
import store from '@/store'

const BASE_URL = process.env.VUE_APP_API_URL || 'http://localhost:3000/v1'

function listRequest (url, options = {}) {
  return axios.get(url, options).then(response => response.data)
}

function create (contentType, options = {}) {
  function list (options = {}) {
    const listUrl = BASE_URL + `/${contentType}`
    return listRequest(listUrl, options)
  }

  return {
    list
  }
}

axios.interceptors.request.use(function (config) {
  store.commit('setLoading', true)
  return config
})

axios.interceptors.response.use(function (response) {
  store.commit('setLoading', false)
  return response
}, function (error) {
  store.commit('setLoading', false)
  return Promise.reject(error)
})

export default {
  create
}
