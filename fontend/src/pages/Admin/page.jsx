import { useState, useEffect } from 'react'
import { Album, Calendar, Users, User, Image as ImageIcon, Utensils, Bell, Book, Tag, Menu, X, Moon, Sun } from 'lucide-react'

const sidebarItems = [
  { name: 'Album', icon: Album },
  { name: 'Celebrate', icon: Calendar },
  { name: 'Couple', icon: Users },
  { name: 'User', icon: User },
  { name: 'ImageAlbum', icon: ImageIcon },
  { name: 'Ingredient', icon: Utensils },
  { name: 'Cooking', icon: Utensils },
  { name: 'Notification', icon: Bell },
  { name: 'RecipeCook', icon: Book },
  { name: 'TypeCelebrate', icon: Tag }
]

export default function AdminDashboard() {
  const [activeTable, setActiveTable] = useState('Album')
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [tableData, setTableData] = useState([])

  useEffect(() => {
    // Simulating data fetching
    const fetchData = () => {
      const mockData = Array(5).fill().map((_, index) => ({
        id: index + 1,
        name: `${activeTable} ${index + 1}`,
        createdAt: new Date().toLocaleDateString(),
        image: '/placeholder.svg?height=50&width=50'
      }))
      setTableData(mockData)
    }

    fetchData()
  }, [activeTable])

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)
  const toggleDarkMode = () => setIsDarkMode(!isDarkMode)

  const handleImageLoad = (event, id) => {
    console.log(`Image for ${activeTable} ${id} loaded successfully`)
  }

  const handleImageError = (event, id) => {
    console.error(`Failed to load image for ${activeTable} ${id}`)
    event.target.src = '/placeholder.svg?height=50&width=50' // Fallback image
  }

  return (
    <div className={`flex h-screen ${isDarkMode ? 'dark' : ''}`}>
      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 transform transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0
      `}>
        <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
          <h2 className="text-xl font-bold text-pink-600 dark:text-pink-400">Admin Dashboard</h2>
          <button onClick={toggleSidebar} className="lg:hidden p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700">
            <X className="h-6 w-6" />
          </button>
        </div>
        <nav className="mt-4">
          {sidebarItems.map((item) => (
            <button
              key={item.name}
              className={`w-full flex items-center px-4 py-2 text-left ${
                activeTable === item.name
                  ? 'bg-pink-100 dark:bg-pink-900 text-pink-600 dark:text-pink-400'
                  : 'hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
              onClick={() => setActiveTable(item.name)}
            >
              <item.icon className="mr-2 h-5 w-5" />
              {item.name}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-64">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 shadow-md p-4 flex justify-between items-center">
          <button
            onClick={toggleSidebar}
            className="lg:hidden p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <Menu className="h-6 w-6" />
          </button>
          <h1 className="text-2xl font-bold text-pink-600 dark:text-pink-400">{activeTable}</h1>
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700">
              <User className="h-5 w-5" />
            </button>
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
          </div>
        </header>

        {/* Table content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 dark:bg-gray-900 p-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">{activeTable} Management</h2>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">Manage your {activeTable.toLowerCase()} data here.</p>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <input
                  type="text"
                  placeholder={`Search ${activeTable}...`}
                  className="max-w-sm px-4 py-2 border rounded-md dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
                <button className="px-4 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2">
                  Add New {activeTable}
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Created At</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Image</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                    {tableData.map((item) => (
                      <tr key={item.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200">{item.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200">{item.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200">{item.createdAt}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200">
                          <img
                            src={item.image}
                            alt={`${activeTable} ${item.id}`}
                            className="h-10 w-10 rounded-full"
                            onLoad={(e) => handleImageLoad(e, item.id)}
                            onError={(e) => handleImageError(e, item.id)}
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 mr-2">Edit</button>
                          <button className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300">Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}