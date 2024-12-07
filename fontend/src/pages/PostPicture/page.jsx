import { useState } from 'react'
import Camera from './Camera'
import HistoryPicture from './HistoryPicture'

function PostPicture() {
  const [pictures, setPictures] = useState([
    {
      id:'1',
      src: 'https://scontent.fdad3-4.fna.fbcdn.net/v/t39.30808-1/428612755_411073891393500_5432439734118428374_n.jpg?stp=dst-jpg_s200x200&_nc_cat=104&ccb=1-7&_nc_sid=0ecb9b&_nc_eui2=AeH2kWMeA4lLErOZdtScM6QlmtpI9eJbTh2a2kj14ltOHQqAQoPtzk0hq8EFeob4aIxLqL4Q5nTv0OD6FvGd5uoH&_nc_ohc=lWH1CdRT5YsQ7kNvgGDVBkg&_nc_zt=24&_nc_ht=scontent.fdad3-4.fna&_nc_gid=Ajx5UaWcv7l2NZcBtcPVvAg&oh=00_AYDWDKIHr1O8nYRZL6Pxysvqd49RtQKeApBrTda9VOkxPw&oe=672B8E76',
      user: 'Ngô Thành Lâm',
      title: 'Hello nhá'
    }
  ])
  return (
    <div className='w-full h-full overflow-y-scroll snap-y snap-mandatory'>
      <div className='snap-start h-full'>
        <Camera pictures={pictures} setPictures={setPictures} />
      </div>
      {pictures.map(picture => (
        <div key={picture.id} className='snap-start h-full'>
          <HistoryPicture picture={ picture } />
        </div>
      ))}

    </div>
  )
}

export default PostPicture
