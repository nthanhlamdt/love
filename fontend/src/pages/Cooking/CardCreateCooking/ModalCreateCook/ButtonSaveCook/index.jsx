export default function ButtonSaveCook() {
  return (
    <button
      type="submit"
      className="w-full mt-5 px-4 py-3 text-sm font-medium text-white bg-pink-600 rounded-md hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline-block mr-1" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M5 3a2 2 0 012-2h6a2 2 0 012 2v1h2a2 2 0 012 2v12a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2h2V3zm4 1h2v1H9V4zm0 3a1 1 0 000 2h2a1 1 0 100-2H9z" clipRule="evenodd" />
      </svg>
      Lưu Công Thức
    </button>
  )
}
