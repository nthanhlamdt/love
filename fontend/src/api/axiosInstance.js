// axiosInstance.js
import axios from 'axios'

const API_URL = 'https://love-server.onrender.com/api'

const instance = axios.create({
  baseURL: API_URL
})

// Kiểm tra token hợp lệ và thêm header Authorization
instance.interceptors.request.use(
  config => {
    const expiryDate = localStorage.getItem('tokenExpiry')
    const tokenData = localStorage.getItem('token')

    if (tokenData && expiryDate && Date.now() < expiryDate) {
      const token = JSON.parse(tokenData)
      config.headers['Authorization'] = `Bearer ${token}`
    } else {
      localStorage.removeItem('token')
      localStorage.removeItem('tokenExpiry')
    }

    return config
  },
  error => {
    return Promise.reject(error)
  }
)

export default instance
