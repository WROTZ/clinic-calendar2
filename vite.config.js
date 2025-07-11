import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// ✅ Replace with your repo name below (clinic-calendar2)
export default defineConfig({
  plugins: [react()],
  base: '/clinic-calendar2/' // VERY IMPORTANT
})