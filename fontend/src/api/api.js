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

export const updateUser = async ({ fullName, gender, phoneNumber, dateBirth }) => {
  const response = await axiosInstance.put('/user', { fullName, gender, phoneNumber, dateBirth })
  return response.data
}

export const updateAvatarUser = async ({ file }) => {
  const formData = new FormData()
  formData.append('file', file)
  const response = await axiosInstance.patch('/user', formData, {
    headers: {
      'Content-Type': 'multipart/form-data' // Đặt header cho multipart
    }
  })
  return response.data
}

// Gửi thông báo
export const sendNotification = async ({ phoneNumber, loveDate, message, title, type, albumId }) => {
  const response = await axiosInstance.post('/notification/', { phoneNumber, type, message, title, loveDate, albumId })
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
export const getAlbums = async () => {
  const response = await axiosInstance.get('/albums/')
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
export const addImageToAlbum = async ({ data, file }) => {
  const formData = new FormData()

  console.log(data)
  formData.append('file', file)
  formData.append('albumId', data.albumId)
  formData.append('name', data.name)
  formData.append('time', data.time)
  formData.append('location', data.location)

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

export const updateImageAlbum = async ({ imageId, name, time, location }) => {
  const response = await axiosInstance.put('/albums/image', { imageId, name, time, location })
  return response.data
}

export const getCelebrate = async () => {
  const response = await axiosInstance.get('/celebrate')
  return response.data
}

export const patchCelebrateImages = async ({ type, file, text }) => {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('type', type)
  formData.append('text', text)

  const response = await axiosInstance.patch('/celebrate', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  return response.data
}

export const getPost = async () => {
  const response = await axiosInstance.get('/post')
  return response.data
}

export const uploadPost = async ({ file, status }) => {
  const response = await axiosInstance.post('/post', { file, status }, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  return response.data
}

export const getMemoryType = async () => {
  const response = await axiosInstance.get('/memory/type')
  return response.data
}

export const createMemoryType = async (dataType) => {
  const response = await axiosInstance.post('/memory/type', {
    name: dataType.name,
    icon: dataType.icon
  })
  return response.data
}


export const createMemory = async (data) => {
  const formData = new FormData()
  formData.append('date', data.date)
  formData.append('name', data.name)
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

export const getMemory = async ({ month }) => {
  const response = await axiosInstance.get('/memory', {
    params: { month }
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

export const getTimeMachine = async ({ userLoveId }) => {
  const response = await axiosInstance.get('/memory/time-machine', {
    params: { userLoveId }
  })
  return response.data
}

export const createCooking = async (data) => {
  const formData = new FormData()

  formData.append('title', data.title)
  formData.append('name', data.name)
  formData.append('description', data.description)
  formData.append('peopleEating', data.peopleEating)
  formData.append('image', data.image) // Assuming 'image' is a file input
  formData.append('time', data.time)

  // Chuyển đổi mảng ingredients và steps thành JSON
  formData.append('ingredients', JSON.stringify(data.ingredients))
  formData.append('recipes', JSON.stringify(data.steps))

  const response = await axiosInstance.post('/cook', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })

  return response.data
}

export const getCooking = async () => {
  const response = await axiosInstance.get('/cook')
  return response.data
}

export const getIngredient = async ({ cookId }) => {
  const response = await axiosInstance.get('/cook/ingredient', {
    params: { cookId }
  })
  return response.data
}

export const getStep = async ({ cookId }) => {
  const response = await axiosInstance.get('/cook/step', {
    params: { cookId }
  })
  return response.data
}

export const getMessage = async () => {
  const response = await axiosInstance.get('/message')
  return response.data
}

export const sendMessage = async (message) => {
  const response = await axiosInstance.post('/message', {
    message
  })

  return response.data
}

export const updateMessagesStatusToReaded = async () => {
  const response = await axiosInstance.patch('/message')

  return response.data
}