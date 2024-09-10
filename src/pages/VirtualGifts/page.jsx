// src/components/GiftSender.js

import { useState } from 'react'

const GiftSender = () => {
  const [recipient, setRecipient] = useState('')
  const [gift, setGift] = useState('')
  const [message, setMessage] = useState('')
  const [gifts, setGifts] = useState([])

  const handleSubmit = (e) => {
    e.preventDefault()
    const newGift = { recipient, gift, message }
    setGifts([...gifts, newGift])
    setRecipient('')
    setGift('')
    setMessage('')
    alert('Quà tặng đã được gửi!')
  }

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Gửi Quà Tặng Ảo</h2>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-lg">
        <div className="mb-4">
          <label htmlFor="recipient" className="block text-sm font-medium text-gray-700">Người Nhận</label>
          <input
            type="text"
            id="recipient"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="gift" className="block text-sm font-medium text-gray-700">Chọn Quà Tặng</label>
          <select
            id="gift"
            value={gift}
            onChange={(e) => setGift(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            required
          >
            <option value="">Chọn loại quà</option>
            <option value="flowers">Hoa</option>
            <option value="card">Thiệp Chúc Mừng</option>
            <option value="emoji">Biểu Tượng Đáng Yêu</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="message" className="block text-sm font-medium text-gray-700">Tin Nhắn</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows="4"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            placeholder="Nhập tin nhắn chúc mừng..."
          ></textarea>
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Gửi Quà
        </button>
      </form>

      {/* Danh Sách Quà Đã Gửi */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-4">Danh Sách Quà Đã Gửi</h2>
        <div className="bg-white p-6 rounded shadow-lg">
          {gifts.length === 0 ? (
            <p className="text-gray-500">Chưa có quà tặng nào.</p>
          ) : (
            <div className="space-y-4">
              {gifts.map((gift, index) => (
                <div key={index} className="border border-gray-300 rounded-lg p-4">
                  <h3 className="text-xl font-semibold">Gửi đến: {gift.recipient}</h3>
                  <p className="text-gray-600">Loại Quà: <span className="font-medium">{gift.gift}</span></p>
                  <p className="mt-2">{gift.message}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default GiftSender
