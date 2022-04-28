import { defineConfig, UserConfigExport } from 'vite';
import react from '@vitejs/plugin-react';

const devConfig: UserConfigExport = {
  plugins: [react()],
};

const buildDemoConfig: UserConfigExport = {
  build: {
    outDir: 'demo',
  },
  plugins: [react()],
};

const buildLibConfig: UserConfigExport = {
  build: {
    lib: {
      // entry file
      entry: 'src/index.ts',
      // lib name
      name: 'use-case-reducers',
      fileName: type => `main.${type}.js`,
    },
    rollupOptions: {
      external: ['react'],
      output: {
        globals: {
          react: 'React',
        },
        exports: 'named',
      },
    },
  },
};

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  // run yarn dev
  if (command === 'serve') return devConfig;

  // run yarn build
  if (mode === 'lib') return buildLibConfig;

  // run yarn build:demo
  return buildDemoConfig;
});
