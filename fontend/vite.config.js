import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',

  server: {
    host: '0.0.0.0', // Cho phép kết nối từ mọi địa chỉ IP trong mạng LAN
    port: 5173, // Cổng mà bạn muốn sử dụng
    hmr: {
      overlay: false // Tắt overlay lỗi nếu không muốn hiển thị lỗi trong trình duyệt
    }
  },

  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'src')
    }
  }
})
