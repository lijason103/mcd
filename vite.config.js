import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Set base to your GitHub repo name for GitHub Pages deployment
  // Example: If your repo is https://github.com/username/my-repo
  // Set base to '/my-repo/'
  base: '/mcd/',
})
