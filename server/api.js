import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://localhost:3005',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

export default {
  getVisionaryStatements(perPage, page) {
    return apiClient.get(`/visionaryStatements?_limit=${perPage}&_page=${page}`)
  },
  getIntegratorStatements(perPage, page) {
    return apiClient.get(`/integratorStatements?_limit=${perPage}&_page=${page}`)
  },
  registerUser(payload) {
    return apiClient.post('/user',payload)
  },

}
