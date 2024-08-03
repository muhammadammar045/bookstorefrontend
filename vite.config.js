import { defineConfig } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@tailwindConfig': path.resolve(__dirname, 'tailwind.config.js'),
      '@admin': path.resolve(__dirname, 'src/Admin') // Alias for Admin folder
    },
  },
  optimizeDeps: {
    include: ['@tailwindConfig'],
  },
});
