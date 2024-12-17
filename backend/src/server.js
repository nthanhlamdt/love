const cors = require('cors')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
dotenv.config()


const authRoutes = require('./routes/authRoutes')
const userRoutes = require('./routes/userRoutes')
const notificationRoutes = require('./routes/notificationsRoutes')
const celebrateRoutes = require('./routes/celebrateRoutes')
const albumsRoutes = require('./routes/albumsRoutes')
const postRoutes = require('./routes/postRoutes')
const memoryRoutes = require('./routes/memoryRoutes')

const { app, server } = require("./socket/socket")

const connectDB = require('./config/db')

app.use(cors({
  origin: ['http://localhost:5173', 'http://192.168.56.1:5173', 'http://192.168.175.219:5173'],
  methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE']
}))



app.use(bodyParser.json())
app.use(cookieParser())

app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)
app.use('/api/notification', notificationRoutes)
app.use('/api/albums', albumsRoutes)
app.use('/api/celebrate', celebrateRoutes)
app.use('/api/post', postRoutes)
app.use('/api/memory', memoryRoutes)

connectDB().then(() => {
  server.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`)
  })
}).catch(error => {
  console.error('Server error:', error)
})
