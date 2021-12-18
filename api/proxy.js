/* eslint-disable @typescript-eslint/no-var-requires */
const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = (req, res) => {
  let target = null
  if (req.url.startsWith('/boss')) {
    target = 'http://eduboss.lagou.com'
  }
  if (res.url.startsWith('/front')) {
    target = 'http://edufront.lagou.com'
  }
  createProxyMiddleware({
    target,
    changeOrigin: true
  })(req, res)
}
