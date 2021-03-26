export default {
  dev: {
    '/api/': {
      target: 'http://39.102.37.204',
      changeOrigin: true,
      pathRewrite: { '^/api/': '/' },
    },
    '/mock/api/': {
      target: 'http://localhost:8000',
      changeOrigin: true,
      pathRewrite: { '^/mock/api/': '/' },
    },
  },
};
