import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { createYearlyMemory } from '~/api/api'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function AddMemoryModal({ setShowAddModal }) {
  const [newMemory, setNewMemory] = useState({
    name: '',
    year: new Date().getFullYear(),
    description: '',
    image: null
  })

  const { id } = useParams()
  const [previewUrl, setPreviewUrl] = useState(null)

  const fileInputRef = useRef(null) // Create a reference for the file input

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setNewMemory({ ...newMemory, image: file })
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewUrl(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    createYearlyMemory({ data: newMemory, memoryId: id })
      .then(() => {
        toast.success('Thêm kỉ niệm thành công!')
      })
      .catch(() => {
        toast.error('Đã có lỗi sảy ra vui lòng thử lại!')
      })
    setNewMemory({
      name: '',
      year: new Date().getFullYear(),
      description: '',
      image: null
    })
    setPreviewUrl(null)
    setShowAddModal(false)
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
        onClick={(e) => e.target === e.currentTarget}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="bg-white rounded-lg p-6 max-w-md w-full overflow-auto max-h-[90%]"
        >
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-2xl font-bold text-pink-600">Thêm kỷ niệm mới</h2>
            <button
              className="text-pink-500 hover:text-pink-700"
              onClick={() => setShowAddModal(false)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-1">
            <div>
              <label className="block text-pink-600 text-sm font-semibold mb-1">
                Tiêu đề
              </label>
              <input
                type="text"
                className="w-full p-3 border text-pink-600 border-pink-300 rounded-lg outline-pink-300 focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                value={newMemory.name}
                onChange={(e) => setNewMemory({ ...newMemory, name: e.target.value })}
                required
                placeholder="Nhập tiêu đề kỷ niệm"
              />
            </div>

            <div>
              <label className="block text-pink-600 text-sm font-semibold mb-2">
                Năm
              </label>
              <input
                type="number"
                className="w-full p-3 text-pink-600 border border-pink-300 outline-pink-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                value={newMemory.year}
                onChange={(e) => setNewMemory({ ...newMemory, year: parseInt(e.target.value) })}
                required
                min={new Date().getFullYear() - 90}
                max={new Date().getFullYear()}
              />
            </div>

            <div>
              <label className="block text-pink-600 text-sm font-semibold mb-2">
                Mô tả
              </label>
              <textarea
                className="w-full p-3 border text-pink-600 outline-pink-300 border-pink-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 min-h-[100px]"
                value={newMemory.description}
                onChange={(e) => setNewMemory({ ...newMemory, description: e.target.value })}
                required
                rows={2}
                placeholder="Mô tả về kỷ niệm của bạn"
              />
            </div>

            <div
              onClick={() => fileInputRef.current?.click()}
              className='hover:bg-pink-50'
            >
              <label className="block text-pink-600 text-sm font-semibold mb-2">
                Hình ảnh
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-pink-300 border-dashed rounded-lg hover:border-pink-500 transition-colors">
                <div className="space-y-1 text-center">
                  {previewUrl ? (
                    <div className="relative">
                      <img
                        src={previewUrl}
                        alt="Preview"
                        className="mx-auto h-32 w-auto rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setPreviewUrl(null)
                          setNewMemory({ ...newMemory, image: null })
                        }}
                        className="absolute -top-2 -right-2 bg-pink-500 text-white rounded-full p-1"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ) : (
                    <>
                      <svg className="mx-auto h-12 w-12 text-pink-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <div className="flex text-sm text-pink-600">
                        <span>Tải ảnh lên</span>
                        <input
                          ref={fileInputRef} // Attach the ref to the file input
                          id="file-input" // Ensure this is the same id referenced in the label
                          type="file"
                          className="sr-only"
                          accept="image/*"
                          onChange={handleImageChange}
                        />
                        <p className="pl-1">hoặc kéo thả vào đây</p>
                      </div>
                      <p className="text-xs text-pink-500">PNG, JPG, GIF tối đa 10MB</p>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowAddModal(false)}
                type="button"
                className="px-4 py-2 bg-pink-100 hover:bg-pink-200 text-pink-800 rounded-lg transition-colors"
              >
                Hủy
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-lg transition-colors flex items-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                Lưu kỷ niệm
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
