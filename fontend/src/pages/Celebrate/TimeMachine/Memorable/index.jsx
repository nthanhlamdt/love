import { useEffect, useState } from 'react'
import CardMemorable from './CardMemorable'
import LoadingTimeMachine from './LoadingTimeMachine'

export default function Memorable({ statusTime, setStatusTime }) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(!statusTime)
    }, 2000)
    return () => clearTimeout(timer)
  }, [statusTime])
  return (
    isVisible && (
      <div>
        <LoadingTimeMachine />
        <CardMemorable statusTime={statusTime} setStatusTime={setStatusTime}/>
      </div>
    )
  )
}
