import { sveltekit } from '@sveltejs/kit/vite';

const config = {
  plugins: [
    sveltekit()
  ],

  build: {
    rollupOptions: {
      external: [
        'css-doodle/generator'
      ]
    }
  }
};

export default config;
