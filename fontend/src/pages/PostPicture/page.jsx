/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import Camera from './Camera'
import HistoryPicture from './HistoryPicture'
import { getPost } from '~/api/api'

function PostPicture() {
  const [pictures, setPictures] = useState([])

  useEffect(() => {
    getPost()
      .then((data) => {
        setPictures(data)
      })
      .catch((e) => {
        // eslint-disable-next-line no-console
        console.error('getpost error', e)
      })
  }, [])
  return (
    <div className='w-full h-full overflow-y-scroll snap-y snap-mandatory'>
      <div className='snap-start h-full'>
        <Camera pictures={pictures} setPictures={setPictures} />
      </div>
      {pictures.map(picture => (
        <div key={picture._id} className='snap-start h-full'>
          <HistoryPicture picture={ picture } />
        </div>
      ))}
    </div>
  )
}

export default PostPicture
