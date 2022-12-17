const fs = require('fs')
const path = require('path')

module.exports = (options = {}) => {
  return {
    name: 'html-plugin',
    setup(build) {
      // read esbuild's bundling configuration
      const configs = build.initialOptions
      configs.metafile = true

      const entryPoints = configs.entryPoints

      build.onEnd(async (result) => {
        const outputs = result.metafile.outputs
        const outputsMap = {}

        Object.keys(outputs).forEach((key) => {
          if(!outputs[key].entryPoint) return
          outputsMap[outputs[key].entryPoint] = {
            generate: generatePath(key, '.html'),
            outputPoint: key,
            cssBundle: outputs[key].cssBundle || ''
          }
        })

        if(entryPoints instanceof Array) {
          for(item of entryPoints) {
            writeHtml('./default.html', outputsMap[path.posix.join(item)])
          }
        } else {
          for(key in entryPoints) {
            writeHtml('./default.html', outputsMap[path.posix.join(entryPoints[key])])
          }
        }
      })
    }
  }
}

function generatePath(sourcePath, suffix='') {
  return path.posix.join(path.dirname(sourcePath), path.basename(sourcePath, path.extname(sourcePath)) + suffix)
}

async function writeHtml(sourceFile, info) {
  let template = await fs.promises.readFile(path.resolve(__dirname, sourceFile), { encoding: 'utf-8' })
            
  const jsReplace = `<!-- inject jscode here! --><script type="text/javascript" src="./${path.basename(info.outputPoint)}"></script>`
  const styleReplace = `<!-- inject stylesheet here! --><link rel="stylesheet" href="./${path.basename(info.cssBundle)}"></link>`
  
  template = template
    .replace('<!-- inject jscode here! -->', jsReplace)
    .replace('<!-- inject stylesheet here! -->', styleReplace)
  
  await fs.promises.writeFile(info.generate, template)
}
