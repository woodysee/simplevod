const proxy = require('http-proxy-middleware');

module.exports = app => {
  app.use(
    proxy('/api', {
      target: 'localhost:3001',
      ws: true
    })
  );
};
