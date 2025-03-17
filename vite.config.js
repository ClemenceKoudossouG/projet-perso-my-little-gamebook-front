import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load environment variables based on the current mode (development, production, etc.)
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '@scssVariables': path.resolve(__dirname, 'src/styles/_variables.scss'),
      },
      extensions: ['.js', '.jsx', '.scss', '.css'],
    },
    define: {
      'process.env': env,
    },
  };
});
