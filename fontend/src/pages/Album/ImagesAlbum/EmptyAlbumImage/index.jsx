export default function EmptyAlbumImage() {
  return (
    <div className="col-span-full text-center flex flex-col items-center p-4 rounded">
      <img src='/assets/album_empty.png' className='w-52' />
      <h3 className='font-bold text-3xl text-pink-600'>Album trống</h3>
      <h4 className='font-semibold text-xl text-pink-500'>Hãy thêm những khoảnh khắc đáng nhớ của bạn và người yêu!</h4>
    </div>
  )
}
