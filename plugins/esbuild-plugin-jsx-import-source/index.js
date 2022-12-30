const fs = require('fs')

module.exports = (options={ jsxImportSource: 'react' }) => {
  return {
    name: 'jsx-import-source-plugin',
    setup(build) {
      const configs = build.initialOptions

      const jsxFactory = configs.jsxFactory
      const jsxFragment = configs.jsxFragment

      if(!jsxFactory) console.log('Warning[esbuild plugin jsxSourceImport]: jsxFactory is not declared and React.createElement will be used!')
      if(!jsxFragment) console.log('Warning[esbuild plugin jsxSourceImport]: jsxFragment is not declared and React.Fragment will be used!')
      
      const jsxImportSource = options.jsxImportSource

      if(jsxImportSource && jsxImportSource !== 'react') {
        const injectPath = `./${jsxImportSource}-jsxImportSource.js`

        data = `export { ${jsxFactory}, ${jsxFragment} } from '${jsxImportSource}'`
        if(!fs.existsSync(injectPath)) fs.promises.writeFile(injectPath, data)

        isArray(configs.inject)
        ? configs.inject.push(injectPath)
        : configs.inject = [injectPath]
      }
    }
  }
}

function isArray(arr) {
  return arr instanceof Array
}
