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
  getVisionaryStatements() {
    return apiClient.get(`/visionaryStatements`)
  },
  getIntegratorStatements(perPage, page) {
    return apiClient.get(`/integratorStatements?_limit=${perPage}&_page=${page}`)
  },
  registerUser(payload) {
    return apiClient.post('/user',payload)
  },
  sendToIntegrator(payload){
    return apiClient.post('/integratorScore',payload)
  },
  sendToVisionary(payload){
    return apiClient.post('/visionaryScore',payload)
  },
  getIntegratorResults(userId){
    return apiClient.get(`/integratorScore?userId_like=${userId}`)
  },
  getVisionaryResults(userId){
    return apiClient.get(`/visionaryScore?userId_like=${userId}`)
  },
  sendToResult(payload){
    return apiClient.post('/result',payload)
  }
}
