/* eslint-disable @typescript-eslint/no-var-requires */
const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = () => {
  createProxyMiddleware('/boss', {
    target: 'http://eduboss.lagou.com',
    changeOrigin: true
  })
  createProxyMiddleware('/front', {
    target: 'http://edufront.lagou.com',
    changeOrigin: true
  })
}
