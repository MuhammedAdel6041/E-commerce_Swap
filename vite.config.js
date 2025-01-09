import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['chunk-G3PMV62Z']  // Replace this with the specific dependency name if available
  }
});
