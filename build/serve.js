const esbuild = require('esbuild')
const http = require('http')

esbuild.serve({
  port: 4375,
  host: '127.0.0.1',
  servedir: '/dist',
  onRequest: (args) => {
    console.log(`${args.method}: User ${args.remoteAddress} accesses path ${args.path} with server responsing status code ${args.status} in ${args.timeInMS} ms.`)
  }
}, {
  entryPoints: ['./src/index.js'],
  bundle: true,
  minify: true,
  loader: {
    '.js': 'jsx'
  },
  jsxFactory: 'h',
  jsxFragment: 'Fragment',
  outfile: './dist/index.js'
}).then((service) => {
  // console.log(`Esbuild serve at http://${service.host}:${service.port}.`)
  const { host, port } = service

  http.createServer((req, res) => {
    const options = {
      port: port,
      hostname: host,
      method: req.method,
      path: req.url,
      headers: req.headers
    }

    const proxyReq = http.request(options, (proxyRes) => {
      if(proxyRes.statusCode === 404) {
        const redirectReq = http.request({ ...options, path: '/' }, (redirectRes) => {
          res.writeHead(redirectRes.statusCode, redirectRes.headers)
          // Forward the body of response from esbuild to the client
          redirectRes.pipe(res, { end: true })
        })
        redirectReq.end()
      } else {
        res.writeHead(proxyRes.statusCode, proxyRes.headers)
        proxyRes.pipe(res, { end: true })
      }
    })
    // Forward the body of request to esbuild
    req.pipe(proxyReq, { end: true })
  }).listen(3000)

  console.log(`Proxy serve at http://127.0.0.1:3000.`)
}).catch(() => process.exit(1))
