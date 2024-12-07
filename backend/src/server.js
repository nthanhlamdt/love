const express = require('express')
const connectDB = require('./config/db')

const cors = require('cors')
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser')

const authRoutes = require('./routes/authRoutes')
const userRoutes = require('./routes/userRoutes')
const notificationsRoutes = require('./routes/notificationsRoutes')
const albumsRoutes = require('./routes/albumsRoutes')

require('dotenv').config();

const runServer = () => {
  const app = express();
  const PORT = process.env.PORT || 3000;

  app.use(cors({
      origin: 'http://localhost:5173', // Chỉ cho phép miền này
      credentials: true, // Nếu bạn muốn gửi cookie hoặc HTTP Authentication
    }));

    app.use((req, res, next) => {
      res.setHeader("Content-Security-Policy", "script-src 'self'");
      next();
    });


    app.use(bodyParser.json());
    app.use(cookieParser());

    app.use('/api/auth', authRoutes);
    app.use('/api/user', userRoutes);
    app.use('/api/notification', notificationsRoutes);
    app.use('/api/albums', albumsRoutes)

    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}
connectDB()
  .then(() => {
    runServer()
  })

  .catch(error => {
    console.error('Server error: ', error)
  })

