import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',      // allow external access
    port: 5173,           // or any custom port
    allowedHosts: ['https://book-to-tax-i1.onrender.com/'] 
  }
});
