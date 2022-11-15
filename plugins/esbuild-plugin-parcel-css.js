const parcelCss = require('@parcel/css')
const fs = require('fs')
const path = require('path')

module.exports = (options = {}) => {
	return {
		name: 'parcel-css-plugin',
		setup(build) {
			const transform = async (filePath, suffix='.css') => {
				const data = await fs.promises.readFile(filePath, { encoding: 'utf-8' })
        const regex = new RegExp(`(.*)${suffix.replace(/\./g, '\\.')}`)
        const cssSourcePath = path.relative(process.cwd(), filePath)
        const namespace = cssSourcePath.match(regex)[1].replace(path.sep, '__').replace(/\./g, '_')

				const resCode = parcelCss.transform({
					filename: cssSourcePath,
					code: Buffer.from(data),
					minify: options.minify || false,
					sourceMap: options.sourceMap || false,
					inputSourceMap: options.inputSourceMap,
					targets: options.targets,
					drafts: options.drafts,
					cssModules: options.cssModules || false
				})

				return {
          namespace: namespace,
          styles: resCode.exports,
          css: resCode.code.toString()
        }
			}

			const cssMap = new Map()

      build.onLoad({ filter: /(\.module)?\.css/ }, async (args) => {
        if(!options.cssModules) {
          const { css } = await transform(args.path)
          return {
            contents: css,
            loader: 'css'
          }
        }

        const { namespace, styles, css } = await transform(args.path, '.module.css')

        const importPath = `parcel-css-plugin://${namespace}`
        cssMap.set(importPath, css)

        return {
          contents: `import '${importPath}'\nexport default ${JSON.stringify(styles)}\n`
        }
      })

      build.onResolve({ filter: /parcel-css-plugin:\/\// }, (args) => {
        return {
          path: args.path,
          namespace: 'PARCEL_CSS_PLUGIN'
        }
      })

      build.onLoad({ filter: /.*/, namespace: 'PARCEL_CSS_PLUGIN' }, (args) => {
        return {
          contents: cssMap.get(args.path),
          loader: 'css'
        }
      })
		}
	}
}


