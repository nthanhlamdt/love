// src/components/TimeCapsule.js

import { useState } from 'react'
import GiftBox from './GiftBox'

const TimeCapsule = () => {
  const [name, setName] = useState('')
  const [date, setDate] = useState('')
  const [content, setContent] = useState('')
  const [capsules, setCapsules] = useState([])

  const handleSubmit = (e) => {
    e.preventDefault()
    const newCapsule = { name, date, content }
    setCapsules([...capsules, newCapsule])
    setName('')
    setDate('')
    setContent('')
  }

  return (
    <div className="container mx-auto p-6">
      {/* Danh Sách Các Hộp Thời Gian */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Danh Sách Hộp Thời Gian</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {capsules.length === 0 ? (
            <p className="text-gray-500 col-span-full">Chưa có hộp thời gian nào.</p>
          ) : (
            capsules.map((capsule, index) => (
              <div key={index} className="border border-gray-300 rounded-lg p-4 bg-white shadow-lg flex flex-col items-center">
                <GiftBox />
                <h3 className="text-xl font-semibold mt-4">{capsule.name}</h3>
                <p className="text-gray-600">Ngày Mở Hộp: <span className="font-medium">{capsule.date}</span></p>
                <p className="mt-2 text-center">{capsule.content}</p>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Tạo Hộp Thời Gian */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Tạo Hộp Thời Gian</h2>
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-lg">
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Tên Hộp Thời Gian</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="date" className="block text-sm font-medium text-gray-700">Ngày Mở Hộp</label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="content" className="block text-sm font-medium text-gray-700">Nội Dung Kỷ Niệm</label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows="4"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
              placeholder="Nhập tin nhắn, mô tả hoặc ghi chép..."
            ></textarea>
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Lưu Hộp Thời Gian
          </button>
        </form>
      </div>
    </div>
  )
}

export default TimeCapsule
