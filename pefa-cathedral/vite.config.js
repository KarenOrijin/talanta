import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Cursor Publish and local dev use site root — never /talanta/ here.
// GitHub Pages workflow sets base via: vite build --base=/talanta/
export default defineConfig(({ mode }) => {
  const base = process.env.VITE_BASE_PATH || '/';
  return {
    plugins: [react()],
    base,
    build: {
      outDir: 'dist',
    },
  };
});
