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
const cookRoutes = require('./routes/cookRoutes')
const messageRoutes = require('./routes/chatRoutes')

const { app, server } = require("./socket/socket")

const connectDB = require('./config/db')

app.use(cors({
  origin: ['https://love-fontend.onrender.com', 'http://localhost:5173'],
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
app.use('/api/cook', cookRoutes)
app.use('/api/message', messageRoutes)

connectDB()
  .then(() => {
    server.listen(process.env.PORT || 3000, () => {
      console.log(`Server is running on http://localhost:${process.env.PORT || 3000}`);
    });
  })
  .catch(error => {
    console.error('Server error:', error);
  });
