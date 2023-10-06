
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv';

dotenv.config();
// https://vitejs.dev/config/
export default function defineConfig() {
  return {
  plugins: [react()],
  server: {
    proxy: {
      '/api_v1': {
        target: process.env.VITE_PROXY_URL,
        changeOrigin: true,
      }
    }
  }
} 
}

