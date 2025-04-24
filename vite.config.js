import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react({
      // This ensures JSX files are properly handled
      jsxImportSource: 'react',
      babel: {
        plugins: [
          ['@babel/plugin-transform-react-jsx', { runtime: 'automatic' }]
        ],
      },
    }),
  ],
  resolve: {
    // Add these extensions to your import statements
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'],
    // Optional: Add alias for cleaner imports
    alias: {
      '@': '/src',
      '@components': '/src/components',
      '@auth': '/src/components/Auth'
    }
  },
  // Improve build optimization
  build: {
    outDir: 'dist',
    assetsInlineLimit: 4096,
  },
  // Configure development server
  server: {
    port: 5173,
    strictPort: true,
    open: true,
  },
  // Enable better error overlays
  preview: {
    port: 4173,
    strictPort: true,
  }
});