/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import ModalUpdateImage from './ModalUpdateImage'
import { getCelebrate } from '../../../../api/api'
import { toast } from 'react-toastify'

export default function ImagesCalendar() {
  const [isModal, setIsModal] = useState(false)
  const [images, setImages] = useState([])
  const [texts, setTexts] = useState([])
  const [typeUpdate, setTypeUpdate] = useState(1)

  useEffect(() => {
    getCelebrate()
      .then((data) => {
        setImages([
          data.image1,
          data.image2,
          data.image3,
          data.image4
        ])

        setTexts([
          data.text1,
          data.text2,
          data.text3,
          data.text4
        ])
      })
      .catch(() => {
        toast.error('Chưa kết nối')
      })
  }, [])

  const handleTypeUpdate = (type) => {
    setIsModal(true)
    setTypeUpdate(type)
  }

  return (
    <>
      <div className="grid grid-cols-2 gap-12 sm:gap-10">
        <div
          className="text-center min-w-36 h-48 sm:h-56 border-8 bg-[rgba(255,255,255,0.6)] border-white shadow-xl shadow-pink-600 rounded-sm transform -rotate-[10deg] translate-x-3 translate-y-4"
          onClick={() => handleTypeUpdate(1)}
        >
          <img
            src={images[0] ? images[0] : '/assets/celebrate_image_1.png'}
            alt="Couple photo 1"
            className="object-cover object-center h-36 sm:h-44 w-full" />
          <span className="py-3 text-pink-500 font-lovelight text-2xl font-semibold">{texts[0] ? texts[0] : 'Yêu là cảm nhận'}</span>
        </div>

        <div
          className="text-center min-w-36 h-48 sm:h-56 border-8 bg-[rgba(255,255,255,0.6)] border-white shadow-xl shadow-pink-600 rounded-sm transform rotate-6 translate-y-1 -translate-x-3"
          onClick={() => handleTypeUpdate(2)}
        >
          <img
            src={images[1] ? images[1] : '/assets/celebrate_image_2.png'}
            alt="Couple photo 2"
            className="object-cover object-center h-36 sm:h-44 w-full" />
          <span className="py-3 text-pink-500 font-lovelight text-2xl font-semibold">{texts[1] ? texts[1] : 'Thương là nhớ'}</span>
        </div>

        <div
          className="text-center min-w-36 h-48 sm:h-56 border-8 bg-[rgba(255,255,255,0.6)] border-white shadow-xl shadow-pink-600 rounded-sm transform rotate-3 translate-x-4 -translate-y-7"
          onClick={() => handleTypeUpdate(3)}
        >
          <img
            src={images[2] ? images[2] : '/assets/celebrate_image_3.png'}
            alt="Couple photo 3"
            className="object-cover object-center h-36 sm:h-44 w-full" />
          <span className="py-3 text-pink-500 font-lovelight text-2xl font-semibold">{texts[2] ? texts[2] : 'Yêu là không ngại'}</span>
        </div>

        <div
          className="text-center min-w-36 h-48 sm:h-56 border-8 bg-[rgba(255,255,255,0.6)] border-white shadow-xl shadow-pink-600 rounded-sm transform -rotate-[8deg] -translate-x-4 -translate-y-5"
          onClick={() => handleTypeUpdate(4)}
        >
          <img
            src={images[3] ? images[3] : '/assets/celebrate_image_4.png'}
            alt="Couple photo 4"
            className="object-cover object-center h-36 sm:h-44 w-full" />
          <span className="py-3 text-pink-500 font-lovelight text-2xl font-semibold">{texts[3] ? texts[3] : 'Hạnh phúc là yêu'}</span>
        </div>
      </div>

      {isModal && <ModalUpdateImage setIsModal={setIsModal} type={typeUpdate} setImages={setImages} setTexts={setTexts} />}
    </>
  )
}
