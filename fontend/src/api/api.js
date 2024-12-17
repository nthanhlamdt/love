/* eslint-disable no-console */
// apiService.js
import axiosInstance from './axiosInstance'

// Yêu cầu đăng kí
export const registerUser = async ({ password, confirmPassword, fullName, phoneNumber, gender, dateBirth }) => {
  const response = await axiosInstance.post('/auth/register', { password, confirmPassword, fullName, phoneNumber, gender, dateBirth })
  return response.data
}

// Yêu cầu đăng nhập
export const loginUser = async ({ password, phoneNumber }) => {
  const response = await axiosInstance.post('/auth/login', { password, phoneNumber })
  return response.data
}

// Chấp nhận kết nối
export const setLove = async ({ status, sendId, loveDate, notificationId }) => {
  const response = await axiosInstance.post('/user/setlove', { status, sendId, loveDate, notificationId })
  return response.data
}

// Lấy thông tin cặp đôi
export const getCoupleUser = async () => {
  const response = await axiosInstance.get('/user/setlove')
  return response.data
}


// Gửi thông báo
export const sendNotification = async ({ phoneNumber, loveDate, message, title, type }) => {
  const response = await axiosInstance.post('/notification/', { phoneNumber, type, message, title, loveDate })
  return response.data
}

// Đọc thông báo
export const readingNotification = async ({ idNotification, status }) => {
  const response = await axiosInstance.post('/notification/reading', { idNotification, status })
  return response.data
}

// Lấy danh sách thông báo
export const getNotification = async () => {
  const response = await axiosInstance.get('/notification/')
  return response.data
}

// Yêu cầu tạo album
export const createAlbums = async ({ name, description }) => {
  const response = await axiosInstance.post('/albums/', { name, description })
  return response.data
}

// Lấy danh sách album
export const getAlbums = async ({ userLoveId }) => {
  const response = await axiosInstance.get('/albums/',
    { params: { userLoveId } }
  )
  return response.data
}

// Cập nhật cover image
export const patchAlbums = async ({ file, albumId }) => {
  const formData = new FormData()
  formData.append('file', file) // Thêm tệp hình ảnh
  formData.append('albumId', albumId) // Thêm ID album

  const response = await axiosInstance.patch('/albums/', formData, {
    headers: {
      'Content-Type': 'multipart/form-data' // Đặt header cho multipart
    }
  })
  return response.data
}

// Xóa album
export const deleteAlbums = async ({ albumId }) => {
  const response = await axiosInstance.delete('/albums/', {
    data: { albumId }
  })
  return response.data
}

// Xóa album
export const updateAlbums = async ({ albumId, name, description }) => {
  const response = await axiosInstance.put('/albums/', { albumId, name, description })
  return response.data
}

// Thêm ảnh vào album
export const addImageToAlbum = async ({ data, files }) => {
  const formData = new FormData()

  // Kiểm tra và thêm các file vào formData
  if (files && files.length > 0) {
    // Nếu có file, thêm chúng vào formData
    files.forEach(file => {
      formData.append('files', file)
    })
  }

  // Kiểm tra và thêm thông tin album (data) vào formData
  if (data) {
    // Dữ liệu có thể là một mảng chứa một đối tượng, vì vậy cần đảm bảo luôn gửi dưới dạng JSON
    formData.append('data', JSON.stringify(data))
  }

  try {
    // Gửi POST request lên server với 'multipart/form-data'
    const response = await axiosInstance.post('/albums/image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    return response.data
  } catch (error) {
    console.error('Lỗi khi thêm hình ảnh vào album:', error)
    throw error
  }
}

// Xóa ảnh trong album
export const deleteImageAlbums = async ({ imageId }) => {
  const response = await axiosInstance.delete('/albums/image', {
    data: { imageId }
  })
  return response.data
}

export const getCelebrate = async (userLoveId) => {
  const response = await axiosInstance.get('/celebrate', {
    params: { userLoveId }
  })
  return response.data
}

export const patchCelebrateImages = async ({ type, file, text, userLoveId }) => {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('type', type)
  formData.append('text', text)
  formData.append('userLoveId', userLoveId)

  const response = await axiosInstance.patch('/celebrate', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  return response.data
}

export const getPost = async ({ userLoveId }) => {
  const response = await axiosInstance.get('/post', {
    params: { userLoveId }
  })
  return response.data
}

export const uploadPost = async ({ file, userLove, status }) => {
  const response = await axiosInstance.post('/post', { file, userLove, status }, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  return response.data
}

export const getMemoryType = async ({ userLoveId }) => {
  const response = await axiosInstance.get('/memory/type', {
    params: { userLoveId }
  })
  return response.data
}

export const createMemory = async (data, userLoveId) => {
  const formData = new FormData()
  formData.append('date', data.date)
  formData.append('name', data.name)
  formData.append('userLoveId', userLoveId)
  formData.append('description', data.description)
  formData.append('memoryType', data.memoryType)
  formData.append('image', data.image)

  const response = await axiosInstance.post('/memory', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  return response.data
}

export const getMemory = async ({ userLoveId, month, year }) => {
  const response = await axiosInstance.get('/memory', {
    params: { userLoveId, month, year }
  })
  return response.data
}

export const createYearlyMemory = async ({ data, memoryId }) => {
  const formData = new FormData()
  formData.append('year', data.year)
  formData.append('name', data.name)
  formData.append('memoryId', memoryId)
  formData.append('description', data.description)
  formData.append('image', data.image)

  const response = await axiosInstance.post('/memory/yearly', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  return response.data
}

export const getYearlyMemory = async ({ memoryId }) => {
  const response = await axiosInstance.get('/memory/yearly', {
    params: { memoryId }
  })
  return response.data
}