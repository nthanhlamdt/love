function ImagePresent({ photo }) {
  return (
    <div
      className="bg-pink-100 max-w-xs rounded-lg shadow-lg border border-pink-300 cursor-pointer relative flex flex-col items-center"
    >
      <img
        src={photo.url}
        className="w-full max-w-xs aspect-1 object-cover rounded-lg"
      />

      <span className='absolute bottom-4 bg-[rgba(249,168,212,0.3)] text-sm font-bold px-3 py-1 rounded-lg'>
        {photo.caption}
      </span>
    </div>
  )
}

export default ImagePresent