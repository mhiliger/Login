import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.js'),
      name: 'AuthFE',
      fileName: (format) => `auth-fe.${format}.js`,
    },
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'react-router-dom',
        '@mui/material',
        '@emotion/react',
        '@emotion/styled',
        '@tanstack/react-query',
        'axios',
        'jwt-decode',
        'react-hook-form',
        '@hookform/resolvers',
        'yup',
      ],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          '@mui/material': 'MaterialUI',
          '@tanstack/react-query': 'ReactQuery',
        },
      },
    },
  },
});
