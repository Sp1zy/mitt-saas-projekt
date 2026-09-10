import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
    plugins: [
        react(),
        tailwindcss(),
    ],
    base: '/',
    // Matches the Supabase Site URL default so confirmation links work locally.
    server: {
        port: 3000,
        strictPort: true,
    },
})