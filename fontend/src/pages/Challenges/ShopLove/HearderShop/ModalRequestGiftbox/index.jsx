'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, Upload, CheckCircle, X } from 'lucide-react'

export default function ModalRequestGiftbox({ setIsOpenModal }) {
  const [requests, setRequests] = useState([
    {
      id: 1,
      title: 'Đi xem phim cuối tuần',
      description: 'Em muốn đi xem bộ phim mới ra mắt vào tối thứ 7 này. Anh nhớ đặt vé nhé!',
      image: '/placeholder.svg?height=200&width=300',
      status: 'pending'
    },
    {
      id: 2,
      title: 'Nấu bữa tối lãng mạn',
      description: 'Em muốn anh nấu một bữa tối lãng mạn cho hai đứa mình vào ngày kỷ niệm tháng sau.',
      image: '/placeholder.svg?height=200&width=300',
      status: 'pending'
    },
    {
      id: 3,
      title: 'Đi dã ngoại cuối tuần',
      description: 'Em muốn chúng mình đi dã ngoại ở công viên gần nhà vào Chủ nhật tới.',
      image: '/placeholder.svg?height=200&width=300',
      status: 'pending'
    }
  ])

  const fileInputRef = useRef(null)

  const handleProofUpload = (id, file) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const proof = e.target?.result
      setRequests((prevRequests) =>
        prevRequests.map((request) =>
          request.id === id ? { ...request, proof, status: 'completed' } : request
        )
      )
    }
    reader.readAsDataURL(file)
  }

  const triggerFileInput = (id) => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
      fileInputRef.current.onchange = (e) => {
        const file = e.target.files?.[0]
        if (file) {
          handleProofUpload(id, file)
        }
      }
    }
  }

  const removeProof = (id) => {
    setRequests((prevRequests) =>
      prevRequests.map((request) =>
        request.id === id ? { ...request, proof: undefined, status: 'pending' } : request
      )
    )
  }

  const handleSubmitProof = (id) => {
    setRequests((prevRequests) =>
      prevRequests.map((request) =>
        request.id === id ? { ...request, status: 'submitted' } : request
      )
    )
  }

  const handleConfirmCompletion = (id) => {
    setRequests((prevRequests) =>
      prevRequests.map((request) =>
        request.id === id ? { ...request, status: 'hidden' } : request
      )
    )
  }

  const visibleRequests = requests.filter((request) => request.status !== 'hidden')

  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.2)] flex justify-center items-center z-[999] p-8">
      <div className="relative max-w-4xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden">
        <X className='absolute right-5 top-5 cursor-pointer' onClick={() => setIsOpenModal('')}/>
        <div className="p-6">
          <h1 className="text-3xl font-bold text-center mb-8 text-pink-600">Yêu Cầu Từ Người Yêu</h1>
          <AnimatePresence>
            {visibleRequests.map((request) => (
              <motion.div
                key={request.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-white p-4 rounded-lg shadow mb-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start space-x-4">
                  <img
                    src={request.image}
                    alt={request.title}
                    className="rounded-md object-cover w-36 h-24"
                  />
                  <div className="flex-grow">
                    <h3 className="font-semibold text-lg mb-2">{request.title}</h3>
                    <p className="text-gray-600 mb-4">{request.description}</p>
                    <div className="flex items-center space-x-2 mb-4">
                      {request.status === 'submitted' ? (
                        <div className="flex items-center space-x-2">
                          <div className="flex items-center text-blue-500">
                            <CheckCircle className="h-5 w-5 mr-2" />
                            <span>Đã gửi minh chứng</span>
                          </div>
                          <button
                            onClick={() => handleConfirmCompletion(request.id)}
                            className="flex items-center px-2 py-1 text-sm border rounded hover:bg-gray-100"
                          >
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Xác nhận hoàn thành
                          </button>
                        </div>
                      ) : request.status === 'completed' ? (
                        <div className="flex items-center space-x-2">
                          <div className="flex items-center text-green-500">
                            <CheckCircle className="h-5 w-5 mr-2" />
                            <span>Đã hoàn thành</span>
                          </div>
                          <button
                            onClick={() => handleSubmitProof(request.id)}
                            className="flex items-center px-2 py-1 text-sm border rounded hover:bg-gray-100"
                          >
                            <Upload className="h-4 w-4 mr-1" />
                            Gửi minh chứng
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => triggerFileInput(request.id)}
                          className="flex items-center px-2 py-1 text-sm border rounded hover:bg-gray-100"
                        >
                          <Upload className="h-4 w-4 mr-1" />
                          Tải lên minh chứng
                        </button>
                      )}
                    </div>
                    {request.proof && (
                      <div className="mb-4 relative">
                        <img
                          src={request.proof}
                          alt="Minh chứng"
                          className="rounded-md object-cover w-48 h-36"
                        />
                        <button
                          onClick={() => removeProof(request.id)}
                          className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {visibleRequests.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-8 text-gray-500"
            >
              <Heart className="mx-auto h-16 w-16 mb-4 text-pink-300" />
              <p className="text-xl">Không có yêu cầu nào từ người yêu</p>
              <p className="mt-2">Hãy chủ động tạo những khoảnh khắc đáng nhớ cùng nhau!</p>
            </motion.div>
          )}
        </div>
      </div>
      <motion.div
        className="fixed bottom-4 right-4"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <button className="flex items-center px-4 py-2 text-white bg-pink-500 rounded-full shadow-lg hover:bg-pink-600">
          <Heart className="mr-2 h-5 w-5" /> Yêu thương
        </button>
      </motion.div>
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
      />
    </div>
  )
}
