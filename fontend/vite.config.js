import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './',

  server: {
    host: true, // Cho phép kết nối từ mạng khác
    port: 5173, // Cổng mà bạn muốn sử dụng
    hmr: {
      overlay: false
    }
  },

  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'src')
    }
  }
})
