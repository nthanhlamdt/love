import { createContext, useContext, useEffect, useState } from 'react'
import { getAlbums } from '../api/api'
import { useAuthContext } from './authContext'


const AlbumContext = createContext()

// eslint-disable-next-line react-refresh/only-export-components
export const useAlbumContext = () => {
  return useContext(AlbumContext)
}

export const AlbumContextProvider = ({ children }) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [albums, setAlbums] = useState([])
  const { authUser } = useAuthContext()
  const userLove = JSON.parse(localStorage.getItem('userLove')) || null
  useEffect(() => {
    if (authUser && userLove) {
      getAlbums({ userLoveId:  userLove._id })
        .then(data => {
          setAlbums(data.albumImages)
        })
    }
  })

  return (
    <AlbumContext.Provider value={{ albums, setAlbums }}>
      {children}
    </AlbumContext.Provider>
  )
}
