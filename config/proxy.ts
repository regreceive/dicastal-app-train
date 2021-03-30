export default {
  dev: {
    '/api/': {
      target: 'http://localhost:8764',
      changeOrigin: true,
      pathRewrite: { '^/api/': '/' },
    },
  },
};
