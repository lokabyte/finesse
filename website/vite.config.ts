import { defineConfig } from 'vite';

export default defineConfig({
  root: '.',
  base: '/finesse/',
  build: {
    outDir: 'dist',
  },
  server: {
    port: 4321,
  },
});
