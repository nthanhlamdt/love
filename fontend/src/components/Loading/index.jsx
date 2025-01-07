export default function Loading() {
  return (
    <div className='fixed inset-0 bg-[rgba(0,0,0,0.4)] z-[99999] flex items-center justify-center'>
      <span className="loading loading-spinner w-20 text-pink-800"></span>
    </div>
  )
}
