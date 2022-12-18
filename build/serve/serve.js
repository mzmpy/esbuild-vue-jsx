const koa = require('koa')
const koaStatic = require('koa-static')
const koaRouter = require('koa-router')

const esbuild = require('esbuild')
const esbuildPluginParcelCss = require('../../plugins/esbuild-plugin-parcel-css')
const esbuildPluginHtml = require('../../plugins/esbuild-plugin-html')
const esbuildPluginSmartImport = require('../../plugins/esbuild-plugin-elementplus-smartimport')
const esbuildPluginJsxImportSource = require('../../plugins/esbuild-plugin-jsx-import-source')

const clearLastLines = (count) => {
  process.stdout.moveCursor(0, -count)
  process.stdout.clearScreenDown()
}

let timeInMS = new Date()

esbuild.build({
  entryPoints: ['./src/index.js'],
  bundle: true,
  minify: true,
  loader: {
    '.js': 'jsx'
  },
  // external: ['vue', 'element-plus'],
  jsxFactory: 'h',
  jsxFragment: 'Fragment',
  watch: {
    onRebuild(error) {
      timeInMS = new Date()
      if(error) {
        console.log(`\nWatch build failed: ${error}`)
      }
    }
  },
  plugins: [
    esbuildPluginParcelCss({
      cssModules: {
        pattern: '[name]-[hash]-[local]'
      }
    }),
    esbuildPluginHtml({
      source: './static/index.html'
    }),
    esbuildPluginSmartImport(),
    esbuildPluginJsxImportSource({
      jsxImportSource: 'vue'
    })
  ],
  outfile: './dist/index.js'
}).then(() => {
  timeInMS = new Date() - timeInMS
  console.log(`\nBuilding is done in ${timeInMS} ms.`)
  setTimeout(() => {
    clearLastLines(1)
  }, 3000)
})

const app = new koa()
const router = new koaRouter()

router.get('/(.+)', async (ctx) => {
  ctx.redirect('/')
})

app.use(koaStatic(process.cwd() + '/dist/'))
app.use(router.routes())

app.listen(3000)
console.log(`Server running at http://127.0.0.1:3000.`)
