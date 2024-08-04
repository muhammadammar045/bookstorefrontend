import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@adminComponents": path.resolve(__dirname, "src/admin/components"),
      "@adminPages": path.resolve(__dirname, "src/admin/pages"),
      "@adminPartials": path.resolve(__dirname, "src/admin/partials"),
      "@adminUtils": path.resolve(__dirname, "src/admin/utils"),

      "@userPages": path.resolve(__dirname, "src/user/pages"),
      "@userComponents": path.resolve(__dirname, "src/user/components"),

      "@store": path.resolve(__dirname, "src/store"),
      "@utils": path.resolve(__dirname, "src/utils"),
      "@assets": path.resolve(__dirname, "src/assets"),
    },
  },

});
