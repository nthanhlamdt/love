import { createContext, useContext, useEffect, useState } from 'react'
import { getAlbums } from '../api/api'
import { useAuthContext } from './authContext'

const AlbumContext = createContext()

// eslint-disable-next-line react-refresh/only-export-components
export const useAlbumContext = () => {
  return useContext(AlbumContext)
}

export const AlbumContextProvider = ({ children }) => {
  const [albums, setAlbums] = useState([])
  const [error, setError] = useState(null)
  const { authUser } = useAuthContext()

  useEffect(() => {
    if (authUser) {
      const fetchAlbums = async () => {
        try {
          const data = await getAlbums()
          setAlbums(data.albumImages)
        } catch (err) {
          setError('Không thể tải danh sách album. Vui lòng thử lại sau.')
        }
      }

      fetchAlbums()
    }
  }, [authUser]) // Chỉ phụ thuộc vào authUser

  return (
    <AlbumContext.Provider value={{ albums, setAlbums, error }}>
      {children}
    </AlbumContext.Provider>
  )
}