const {createProxyMiddleware} = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/app',
        createProxyMiddleware({
            target: 'http://192.168.1.124/dms/hs',
            changeOrigin: true
        })
    )
}