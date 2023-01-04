const parcelCss = require('@parcel/css')
const fs = require('fs')
const path = require('path')

module.exports = (options) => {
	return {
		name: 'parcel-css-plugin',
		setup(build) {
			const transform = async (filePath, suffix='.css') => {
				const data = await fs.promises.readFile(filePath, { encoding: 'utf-8' })
        const regex = new RegExp(`(.*)${suffix.replace(/\./g, '\\.')}`)
        const cssSourcePath = path.relative(process.cwd(), filePath)
        const namespace = cssSourcePath.match(regex)[1].replace(new RegExp(`\\${path.sep}`, 'g'), '__').replace(/\./g, '_')

        const filename = { namespace, basename: path.basename(cssSourcePath, suffix) }

				const resCode = parcelCss.transform({
					filename: filename[options.filename] || namespace,
					code: Buffer.from(data),
					minify: options.minify || false,
					sourceMap: options.sourceMap || false,
					inputSourceMap: options.inputSourceMap,
					targets: options.targets,
					drafts: options.drafts,
					cssModules: suffix === '.module.css' && options.cssModules,
          analyzeDependencies: options.analyzeDependencies,
          pseudoClasses: options.pseudoClasses,
          unusedSymbols: options.unusedSymbols,
          errorRecovery: options.errorRecovery
				})

				return {
          namespace: namespace,
          styles: resCode.exports,
          css: resCode.code.toString()
        }
			}

			const cssMap = new Map()

      build.onLoad({ filter: /(\.module)?\.css$/ }, async (args) => {
        const isCssFiles = !/\.module\.css$/.test(path.basename(args.path))
        // styles imported from files with postfix '.css' not transforming into css module.
        if(!options.cssModules || isCssFiles) {
          const { css } = await transform(args.path)
          return {
            contents: css,
            loader: 'css'
          }
        }

        const { namespace, styles, css } = await transform(args.path, '.module.css')

        const importPath = `css-module://${namespace}`
        cssMap.set(importPath, css)

        const resolveStyles = (styles) => {
          return (className) => {
            if(typeof className !== 'string') throw new TypeError(`resolveStyles: parameter 'className' must be a string.`)
            return styles[className.replace(/[A-Z]/g, (i) => '-' + i.toLowerCase())].name
          }
        }

        return {
          contents: `import '${importPath}'\nconst styles = ${JSON.stringify(styles)}\nexport default (${resolveStyles})(styles)\n`
        }
      })

      build.onResolve({ filter: /css-module:\/\// }, (args) => {
        return {
          path: args.path,
          namespace: 'CSS_MODULE'
        }
      })

      build.onLoad({ filter: /.*/, namespace: 'CSS_MODULE' }, (args) => {
        return {
          contents: cssMap.get(args.path),
          loader: 'css'
        }
      })
		}
	}
}


