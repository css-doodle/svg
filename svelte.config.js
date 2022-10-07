import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter(),
    serviceWorker: {
      register: true,
    },
    paths: {
      base: '/svg'
    },
  }
};

export default config;
