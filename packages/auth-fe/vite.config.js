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
          'react-router-dom': 'ReactRouterDom',
          '@mui/material': 'MaterialUI',
          '@emotion/react': 'EmotionReact',
          '@emotion/styled': 'EmotionStyled',
          '@tanstack/react-query': 'ReactQuery',
          'axios': 'axios',
          'jwt-decode': 'jwt_decode',
          'react-hook-form': 'ReactHookForm',
          '@hookform/resolvers': 'HookFormResolvers',
          'yup': 'Yup',
        },
      },
    },
  },
});
