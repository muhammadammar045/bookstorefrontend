import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@adminComponents": path.resolve(__dirname, "src/Admin/components"),
      "@adminPages": path.resolve(__dirname, "src/Admin/pages"),
      "@adminPartials": path.resolve(__dirname, "src/Admin/partials"),
      "@adminUtils": path.resolve(__dirname, "src/Admin/utils"),

      "@userPages": path.resolve(__dirname, "src/User/pages"),
      "@userComponents": path.resolve(__dirname, "src/User/components"),

      "@store": path.resolve(__dirname, "src/store"),
      "@utils": path.resolve(__dirname, "src/utils"),
      "@assets": path.resolve(__dirname, "src/assets"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
        },
      },
    },
  },
  // For debugging:
  server: {
    port: 3000,
    fs: {
      strict: true,
      allow: ['<rootDir>/src'],
    },
    watch: {
      usePolling: true,
    },
  },
});
