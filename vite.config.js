import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@adminPages": path.resolve(__dirname, "src/admin/pages/AllAdminPages.js"),
      "@adminComponents": path.resolve(__dirname, "src/admin/components/AllAdminComponents.js"),
      "@adminPartials": path.resolve(__dirname, "src/admin/partials"),

      "@userPages": path.resolve(__dirname, "src/user/pages/Allpages.js"),
      "@userComponents": path.resolve(__dirname, "src/user/components/AllComponents.js"),

      "@commonPartials": path.resolve(__dirname, "src/common/Common.js"),
      "@storeVars": path.resolve(__dirname, "src/store/storeVars.js"),
      "@loadingState": path.resolve(__dirname, "src/common/Loading/AllLoadingStateComponents.js"),

      "@layout": path.resolve(__dirname, "src/layout/AllLayouts.js"),
      "@utils": path.resolve(__dirname, "src/utils"),
      "@assets": path.resolve(__dirname, "src/assets"),
    },
  },

});
