const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://login.microsoftonline.com/ac228f1a-5052-4c38-a6f2-6846014a42c4/oauth2/v2.0/token', // Replace with your API endpoint
      changeOrigin: true,
      pathRewrite: {
        '^/api': '',
      },
    })
  );
};
