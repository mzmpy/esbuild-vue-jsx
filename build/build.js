const esbuild = require('esbuild')
const esbuildPluginParcelCss = require('../plugins/esbuild-plugin-parcel-css')

esbuild.build({
  entryPoints: ['./src/index.js'],
  bundle: true,
  // minify: true,
  loader: {
    '.js': 'jsx'
  },
  // external: ['vue', 'element-plus'],
  jsxFactory: 'h',
  jsxFragment: 'Fragment',
  plugins: [
    esbuildPluginParcelCss()
  ],
  outfile: './dist/index.js'
}).catch(() => process.exit(1))