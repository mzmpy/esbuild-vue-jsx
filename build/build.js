const esbuild = require('esbuild')

esbuild.build({
  entryPoints: ['./src/index.js'],
  bundle: true,
  // minify: true,
  loader: {
    '.js': 'jsx'
  },
  external: ['vue', 'element-plus'],
  jsxFactory: 'h',
  jsxFragment: 'Fragment',
  outfile: './dist/index.js'
}).catch(() => process.exit(1))