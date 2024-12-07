import { useRef } from 'react'
import Letter from './Letter'

export default function LoveRequest({ setHandleOpenModal, notification }) {
  const letterRef = useRef(null)

  const handleClickOutside = (event) => {
    if (letterRef.current && !letterRef.current.contains(event.target)) {
      setHandleOpenModal(false)
    }
  }

  return (
    <div
      className='fixed inset-0 flex justify-center items-center bg-[rgba(0,0,0,0.3)] z-[999]'
      onClick={handleClickOutside}
    >
      <div ref={letterRef} className="rounded-lg max-w-lg w-full">
        <Letter notification={notification}/>
      </div>
    </div>
  )
}
