import Camera from './Camera'
import HistoryPicture from './HistoryPicture'

function PostPicture() {
  return (
    <div className='w-full h-full overflow-y-scroll snap-y snap-mandatory'>
      <div className='snap-start h-full'>
        <Camera />
      </div>

      <div className='snap-start h-full'>
        <HistoryPicture />
      </div>
      <div className='snap-start h-full'>
        <HistoryPicture />
      </div>
      <div className='snap-start h-full'>
        <HistoryPicture />
      </div>
    </div>
  )
}

export default PostPicture
