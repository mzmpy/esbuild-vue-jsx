import type { Plugin } from 'esbuild'

interface Options {
  jsxImportSource?: string
}

declare function esbuildPluginJsxImportSource(options: Options): Plugin

export = esbuildPluginJsxImportSource
