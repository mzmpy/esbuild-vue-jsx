const fs = require('fs')
const path = require('path')

fs.readFile(path.resolve('./static/index.html'), { encoding: 'utf-8' }, (err, data) => {
  if (err) throw err
  
  const jsReplace = '<!-- inject jscode here! --><script type="text/javascript" src="./index.js"></script>'
  const styleReplace = '<!-- inject stylesheet here! --><link rel="stylesheet" href="./index.css"></link>'

  data = data
    .replace('<!-- inject jscode here! -->', jsReplace)
    .replace('<!-- inject stylesheet here! -->', styleReplace)

  fs.writeFile(path.resolve('./dist/index.html'), data, err => {
    if (err) throw err
  })
})
