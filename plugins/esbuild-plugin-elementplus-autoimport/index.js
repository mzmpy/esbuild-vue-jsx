const path = require('path')

module.exports = function esbuildPluginElementPlusAutoImport(options = { module: 'es' }) {
  return {
    name: 'elementplus-autoimport',
    setup(build) {
      if(!(['es', 'cjs', 'auto'].includes(options.module))) throw new Error(`Auto import element-plus: value of module must be one of 'auto, es, cjs'`)

      build.onResolve({ filter: /^element-plus\/components$/ }, async (args) => {
        const relativePath = options.module === 'auto'
          ? `node_modules/element-plus/dist/index.full.min.js`
          : `node_modules/element-plus/${options.module === 'es' ? 'es' : 'lib'}/components/index.${options.module === 'es' ? 'm' : ''}js`
        const redirectPath = path.resolve(process.cwd(), relativePath)

        return {
          path: redirectPath
        }
      })

      build.onResolve({ filter: /^element-plus\/locale$/ }, async (args) => {
        const relativePath = options.module === 'auto'
          ? `node_modules/element-plus/dist/index.full.min.js`
          : `node_modules/element-plus/${options.module === 'es' ? 'es' : 'lib'}/locale/index.${options.module === 'es' ? 'm' : ''}js`
        const redirectPath = path.resolve(process.cwd(), relativePath)

        return {
          path: redirectPath
        }
      })
    }
  }
}
