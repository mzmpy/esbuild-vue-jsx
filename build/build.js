const esbuild = require('esbuild')
const esbuildPluginParcelCss = require('../plugins/esbuild-plugin-parcel-css')
const esbuildPluginHtml = require('../plugins/esbuild-plugin-html')
const esbuildPluginAutoImport = require('../plugins/esbuild-plugin-elementplus-autoimport')

esbuild.build({
  entryPoints: ['./src/index.js'],
  bundle: true,
  // minify: true,
  treeShaking: true,
  loader: {
    '.js': 'jsx'
  },
  // external: ['vue', 'element-plus'],
  jsxFactory: 'h',
  jsxFragment: 'Fragment',
  plugins: [
    esbuildPluginParcelCss({
      cssModules: {
        pattern: '[name]-[hash]-[local]'
      }
    }),
    esbuildPluginHtml({
      filename: 'index.html'
    }),
    esbuildPluginAutoImport()
  ],
  outfile: './dist/index.js'
}).catch(() => process.exit(1))
