import axios from 'axios'
import toast from 'react-hot-toast'

let authorizedAxiosInstance = axios.create()

authorizedAxiosInstance.defaults.timeout = 1000 * 60 * 10

authorizedAxiosInstance.defaults.withCredentials = true

authorizedAxiosInstance.interceptors.request.use(config => {
  return config
}, error => {
  return Promise.reject(error)
})

authorizedAxiosInstance.interceptors.response.use(response => {
  return response
}, error => {
  if (error.response?.status !== 410)
    toast.error(error.response?.data?.message || error?.message)
  return Promise.reject(error)
})

export default authorizedAxiosInstance
