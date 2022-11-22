const fs = require('fs')
const path = require('path')

module.exports = (options = {}) => {
  return {
    name: 'html-plugin',
    setup(build) {
      const defaultTemplate = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <!-- inject stylesheet here! -->
</head>
<body>
  <div id="app"></div>
  <!-- inject jscode here! -->
</body>
</html>
      `

      const configs = build.initialOptions
      // configs.metafile = true

      const directory = options.aimdir
        ? options.aimdir
        : configs.outdir
          ? configs.outdir
          : path.dirname(configs.outfile)

      const filename = options.filename
        ? options.filename
        : configs.outfile
          ? path.basename(configs.outfile, path.extname(configs.outfile)) + '.html'
          : 'index.html'
      
      const destination = { directory, filename }

      const destPath = path.resolve(destination.directory, destination.filename)

      build.onStart(async () => {
        let template = defaultTemplate
        
        const jsReplace = '<!-- inject jscode here! --><script type="text/javascript" src="./index.js"></script>'
        const styleReplace = '<!-- inject stylesheet here! --><link rel="stylesheet" href="./index.css"></link>'
        
        template = template
          .replace('<!-- inject jscode here! -->', jsReplace)
          .replace('<!-- inject stylesheet here! -->', styleReplace)
        
        await fs.promises.writeFile(destPath, template)
      })
    }
  }
}
