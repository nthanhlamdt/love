export default function LoadingTimeMachine() {
  return (
    <div>
      <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-r from-pink-500 via-red-500 to-purple-500 opacity-50">
        <div className="w-96 h-96 border-t-4 border-b-4 border-purple-500 rounded-full animate-spin" />
        <div className="w-72 h-72 border-l-4 border-r-4 border-purple-600 rounded-full animate-spin absolute" />
        <div className="w-64 h-64 border-t-4 border-b-4 border-purple-500 rounded-full animate-spin absolute" />
        <div className="w-56 h-56 border-l-4 border-r-4 border-purple-600 rounded-full animate-spin absolute" />
        <div className="w-48 h-48 border-t-4 border-b-4 border-purple-500 rounded-full animate-spin absolute" />
        <div className="w-36 h-36 border-l-4 border-r-4 border-purple-600 rounded-full animate-spin absolute" />
        <div className="w-24 h-24 border-t-4 border-b-4 border-purple-500 rounded-full animate-spin absolute" />
        <div className="w-12 h-12 border-l-4 border-r-4 border-purple-600 rounded-full animate-spin absolute" />
      </div>
    </div>
  )
}
